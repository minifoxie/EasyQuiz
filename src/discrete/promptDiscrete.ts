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
3. Para ação "val" (texto/número): use trigger="key". Sempre 1 único step por campo contendo o VALOR COMPLETO no campo "v" (ex: "282,6").
   - NUNCA divida o valor em múltiplos steps nem caractere por caractere.
   - 1 tecla do usuário = 1 campo preenchido com seu valor exato e completo.
   - Nunca duplique steps para o mesmo campo val.
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

═══════════════════════════════════════════════════════════
REGRA ESPECIAL — QUESTÕES DE VERDADEIRO OU FALSO (Grade/Tabela de radio buttons)
═══════════════════════════════════════════════════════════
Quando a questão tiver uma TABELA de julgamento V/F (cada linha com radio buttons V e F):
- Cada linha da tabela = 1 action do tipo {t:"chk"} + 1 step trigger="click".
- NUNCA use o atributo "id" gerado pelo sistema (eq-...) para estes rádios.
- SEMPRE use o campo "name" (ex: "vf_row_1") + "v" (valor exacto "V" ou "F") para identificar o radio correto.
- O campo "v" na action DEVE ser exatamente "V" (Verdadeiro) ou "F" (Falso) — sempre maiúsculo.
- Formato correto de action para V/F: { "t": "chk", "name": "vf_row_1", "v": "V", "c": true }
- Formato ERRADO: { "t": "chk", "id": "eq-abc123", "c": true } ← NUNCA use só id sem name+v!
- Se o controle exposto tiver "name" disponível no controls[], USE-O OBRIGATORIAMENTE.
- N afirmações na tabela = N actions chk (uma por linha) + N steps de trigger="click" + 1 step adv.
- NUNCA resuma múltiplas linhas a um único step.

Exemplo de fluxo correto para tabela V/F com 3 linhas (linha1=V, linha2=F, linha3=V):
actions: [
  { "t": "chk", "name": "vf_row_1", "v": "V", "c": true },
  { "t": "chk", "name": "vf_row_2", "v": "F", "c": true },
  { "t": "chk", "name": "vf_row_3", "v": "V", "c": true },
  { "t": "adv", "label": "Verificar resposta" }
]
interactionFlow: [
  { "step": 1, "trigger": "click", "action": { "t": "chk", "name": "vf_row_1", "v": "V", "c": true }, "hint": "Mouse Interact" },
  { "step": 2, "trigger": "click", "action": { "t": "chk", "name": "vf_row_2", "v": "F", "c": true }, "hint": "Mouse Interact" },
  { "step": 3, "trigger": "click", "action": { "t": "chk", "name": "vf_row_3", "v": "V", "c": true }, "hint": "Mouse Interact" },
  { "step": 4, "trigger": "click", "action": { "t": "adv", "label": "Verificar resposta" }, "hint": "Confirmar" }
]

SCHEMA JSON OBRIGATÓRIO (adicional ao plano normal):
{
  "pageType": "...", "mode": "...", "confidence": 0.0-1.0,
  "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...",
  "interactionFlow": [
    {
      "step": 1,
      "trigger": "key",
      "action": { "t": "val", "id": "eq-xxx", "v": "texto completo" },
      "chars": 1,
      "hint": "Keyboard Interact",
      "customMsg": null
    },
    {
      "step": 2,
      "trigger": "click",
      "action": { "t": "chk", "name": "vf_row_1", "v": "V", "c": true },
      "hint": "Mouse Interact",
      "customMsg": null
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
 * Regras: val→key (1 step por CHAR do valor), chk/clk→click, sel→2×click, drag→click, adv→click
 */
export function buildFallbackFlow(actions: Record<string, unknown>[]): InteractionStep[] {
  const flow: InteractionStep[] = []
  let step = 1

  for (const action of actions) {
    const t = action.t as string
    if (t === 'val') {
      flow.push({
        step: step++,
        trigger: 'key',
        action,
        hint: 'Keyboard Interact',
        customMsg: null,
      })
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
    const action = (s.action || {}) as Record<string, unknown>

    // Auto-reparação: val steps SEMPRE chars=1
    const chars = trigger === 'key' ? 1 : undefined

    result.push({
      step: typeof s.step === 'number' ? s.step : result.length + 1,
      trigger,
      action,
      chars,
      hint: typeof s.hint === 'string' ? s.hint.slice(0, 30) : (trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact'),
      customMsg: typeof s.customMsg === 'string' ? s.customMsg.slice(0, 22) : null,
    })
  }

  // Se flow veio vazio depois da normalização, gera fallback
  if (result.length === 0) {
    return buildFallbackFlow(actions as Record<string, unknown>[])
  }

  // ── Auto-reparação de problemas comuns na saída da IA ────────────────────────
  return repairFlow(result, actions as Record<string, unknown>[])
}

/**
 * repairFlow — Camada de sanidade pós-normalização.
 *
 * Corrige 3 classes de problemas frequentes em outputs de IA:
 *
 * 1. Steps chk/clk sem action válida (action vazio ou com só `t`) — reconstrói a partir de actions[].
 * 2. Steps chk com `name` ausente mas `id` do tipo "eq-..." — tenta recuperar `name` do DOM.
 * 3. Elimina steps duplicados consecutivos idênticos (evita double-inject).
 */
function repairFlow(
  flow: InteractionStep[],
  actions: Record<string, unknown>[],
): InteractionStep[] {
  const repaired: InteractionStep[] = []

  for (let i = 0; i < flow.length; i++) {
    const step = flow[i]
    const act = step.action as Record<string, unknown>

    // ── Reparo 1: action vazia ou sem tipo — tenta pegar da actions[] correspondente ──
    if (!act.t && actions[i]) {
      step.action = actions[i]
    }

    // ── Reparo 2: chk sem name mas com id do tipo eq-xxx — tenta recuperar name do DOM ──
    if (act.t === 'chk' && !act.name && act.id) {
      const idStr = String(act.id)
      if (idStr.startsWith('eq-') || idStr.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/)) {
        try {
          const el = document.querySelector(`[data-easyquiz-id="${idStr}"], #${idStr}`) as HTMLInputElement | null
          if (el?.name) {
            ;(step.action as Record<string, unknown>).name = el.name
            if (el.value && el.value !== 'on') {
              ;(step.action as Record<string, unknown>).v = el.value
            }
          }
        } catch {}
      }
    }

    // ── Reparo 2.1: val com valor truncado ou fatiado — recupera valor completo de actions[] ──
    if (act.t === 'val') {
      const matchingAct = actions.find(
        (a) => a.t === 'val' && ((act.id && a.id === act.id) || (act.name && a.name === act.name))
      )
      if (matchingAct && matchingAct.v !== undefined && String(matchingAct.v).length > String(act.v ?? '').length) {
        ;(step.action as Record<string, unknown>).v = matchingAct.v
      }
    }

    // ── Reparo 3: elimina step duplicado consecutivo, colapsa múltiplos val e evita avanço duplo ──
    const prev = repaired[repaired.length - 1]
    if (prev) {
      const prevAct = prev.action as Record<string, unknown>

      // Se ambos são 'val' mirando o mesmo alvo: funde em um único step com o valor completo
      if (prevAct.t === 'val' && act.t === 'val') {
        const sameTarget =
          (Boolean(act.id) && Boolean(prevAct.id) && act.id === prevAct.id) ||
          (Boolean(act.name) && Boolean(prevAct.name) && act.name === prevAct.name) ||
          (!act.id && !act.name && !prevAct.id && !prevAct.name)
        if (sameTarget) {
          const fullActFromActions = actions.find(
            (a) => a.t === 'val' && ((act.id && a.id === act.id) || (act.name && a.name === act.name))
          )
          const bestVal = fullActFromActions?.v ?? (String(prevAct.v || '').length >= String(act.v || '').length ? prevAct.v : act.v)
          prevAct.v = bestVal
          continue
        }
      }

      const isDup =
        prev.trigger === step.trigger &&
        prevAct.t === act.t &&
        prevAct.name === act.name &&
        prevAct.v === act.v &&
        prevAct.id === act.id
      if (isDup) {
        // Mantém o step mais informativo
        continue
      }
      // Se já temos um step de avanço (adv), não permite outro step adv consecutivo
      if (prevAct.t === 'adv' && act.t === 'adv') {
        continue
      }
    }

    step.step = repaired.length + 1
    repaired.push(step)
  }

  return repaired.length > 0 ? repaired : flow
}

/** Constrói o prompt de usuário para o modo discreto (reutiliza buildUserPrompt base) */
export function buildDiscreteUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  return buildUserPrompt(context, images, settings)
}

