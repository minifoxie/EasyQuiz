/**
 * PromptDiscrete — Prompt especializado para o Modo Discreto.
 * Estende o SYSTEM_PROMPT base com instruções de planejamento de interactionFlow.
 */

import type { CapturedContext, CapturedImage, EasyQuizSettings } from '../core/types'
import { buildUserPrompt } from '../core/prompt'
import { getSessionMemories } from '../core/storage'

export const DISCRETE_SYSTEM_SUFFIX = `

═══════════════════════════════════════════════════════════
MODO DISCRETO — ARQUITETA DE FLUXO DE INTERAÇÃO
═══════════════════════════════════════════════════════════
Você está no MODO DISCRETO. Além de resolver a questão com actions[], você DEVE:
Planejar o "interactionFlow" — lista ordenada de etapas, cada uma mapeando
UM gesto do usuário (tecla ou clique) para UMA ação declarativa.

REGRAS DO interactionFlow:
1. Cada action em actions[] deve ter exatamente um step em interactionFlow[].
2. Triggers válidos:
   - "key"   → qualquer tecla (para val/texto)
   - "click" → qualquer clique (para chk/clk/sel/drag/adv)
3. Para ação "val" (texto): use trigger="key" com chars = ceil(len(v) / 6) mín 2.
   O sistema insere chars caracteres por keypress gradualmente.
4. Para ação "chk","clk": trigger="click".
5. Para ação "sel" (dropdown): 2 steps — step N = abrir (click), step N+1 = selecionar (click).
6. Para ação "drag": trigger="click" por item (1 clique = 1 drag).
7. Para ação "adv": trigger="click" — o usuário clica no botão de avançar manualmente.
8. "hint" deve ser SEMPRE um termo técnico de sistema — NUNCA a resposta ou ação real:
   - Teclado: "Keyboard Interact", "Input Detected", "Key Event", "Buffer Flush", "Key Capture"
   - Clique: "Mouse Interact", "Click", "Selecionar", "Mover Item", "Confirmar"
   - Progresso: "Step N/M", "Sync N%", "Field Update", "Buffer N/M"
   - Concluído: "Concluído", "Done", "Pronto"
9. "customMsg" (opcional, máx 22 chars): mensagem criada por você para guiar o usuário.
   Use para: mudanças de modalidade ("Now: Mouse"), progresso de campo ("Field 2/3"),
   confirmações ("Confirm?"), avisos ("Next: Click"). Omita se não necessário.
10. Para multi-campo: 1 step de "key" por campo. Use customMsg para sinalizar transição.
    Para multi-checkbox (ex: 3 caixas a marcar): 1 step "click" POR checkbox separado.
    Nunca agrupe múltiplos checkboxes em 1 único step — cada checkbox = 1 step de click.
11. Fluxo híbrido (texto+seleção): use customMsg="Now: Mouse Interact" ao mudar de modalidade.
12. Questão simples (1 clique): 1-2 steps. Complexa (redação, categorização, multi-select): até 20 steps.
13. Nunca revele a resposta nos hints/customMsg — são termos de sistema disfarçados.
14. Se actions[] contiver múltiplos {t:"chk"}, certifique-se de incluir 1 step por chk em interactionFlow.

SCHEMA JSON OBRIGATÓRIO (adicional ao plano normal):
{
  "pageType": "...", "mode": "...", "confidence": 0.0-1.0,
  "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...",
  "interactionFlow": [
    {
      "step": 1,
      "trigger": "key",
      "action": { "t": "val", "id": "eq-xxx", "v": "texto completo" },
      "chars": 3,
      "hint": "Keyboard Interact",
      "customMsg": null
    },
    {
      "step": 2,
      "trigger": "click",
      "action": { "t": "chk", "id": "eq-yyy", "c": true },
      "hint": "Mouse Interact",
      "customMsg": "Confirm Option"
    }
  ]
}

FALLBACK: se por alguma razão não conseguir planejar interactionFlow[], omita-o.
O sistema gerará o fluxo automaticamente com regras padrão.
`

export interface InteractionStep {
  step: number
  trigger: 'key' | 'click'
  action: Record<string, unknown>
  chars?: number
  hint: string
  customMsg?: string | null
}

export interface DiscretePlan {
  pageType: string
  mode: string
  confidence: number
  rationale: string
  thinking?: string
  actions: unknown[]
  memoryToStore?: string
  interactionFlow?: InteractionStep[]
}

/**
 * Gera um interactionFlow padrão a partir das actions[] caso a IA não tenha retornado.
 * Regras: val→key, chk/clk→click, sel→2×click, drag→click, adv→click
 */
export function buildFallbackFlow(actions: Record<string, unknown>[]): InteractionStep[] {
  const flow: InteractionStep[] = []
  let step = 1

  for (const action of actions) {
    const t = action.t as string
    if (t === 'val') {
      const v = String(action.v ?? '')
      const chars = Math.max(2, Math.ceil(v.length / 6))
      flow.push({ step: step++, trigger: 'key', action, chars, hint: 'Keyboard Interact', customMsg: null })
    } else if (t === 'chk' || t === 'clk') {
      flow.push({ step: step++, trigger: 'click', action, hint: 'Mouse Interact', customMsg: null })
    } else if (t === 'sel') {
      flow.push({ step: step++, trigger: 'click', action, hint: 'Mouse Interact', customMsg: 'Opening...' })
      flow.push({ step: step++, trigger: 'click', action, hint: 'Option Selected', customMsg: null })
    } else if (t === 'drag') {
      flow.push({ step: step++, trigger: 'click', action, hint: 'Mover Item', customMsg: null })
    } else if (t === 'adv') {
      flow.push({ step: step++, trigger: 'click', action, hint: 'Next Page Loading', customMsg: null })
    }
  }

  return flow
}

/** Valida e normaliza o interactionFlow retornado pela IA */
export function normalizeFlow(raw: unknown, actions: unknown[]): InteractionStep[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return buildFallbackFlow(actions as Record<string, unknown>[])
  }

  const result: InteractionStep[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const s = item as Record<string, unknown>
    const trigger = s.trigger === 'key' ? 'key' : 'click'
    result.push({
      step: typeof s.step === 'number' ? s.step : result.length + 1,
      trigger,
      action: (s.action || {}) as Record<string, unknown>,
      chars: typeof s.chars === 'number' ? Math.max(1, s.chars) : undefined,
      hint: typeof s.hint === 'string' ? s.hint.slice(0, 30) : (trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact'),
      customMsg: typeof s.customMsg === 'string' ? s.customMsg.slice(0, 22) : null,
    })
  }

  // Se flow veio vazio depois da normalização, gera fallback
  if (result.length === 0) {
    return buildFallbackFlow(actions as Record<string, unknown>[])
  }

  return result
}

/** Constrói o prompt de usuário para o modo discreto (reutiliza buildUserPrompt base) */
export function buildDiscreteUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  return buildUserPrompt(context, images, settings)
}
