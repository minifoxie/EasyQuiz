export type StrategyWidget = 'text' | 'choice' | 'select' | 'combobox' | 'drag' | 'order' | 'navigation' | 'javascript'

export interface StrategyDescriptor {
  id: string
  widget: StrategyWidget
  label: string
  precondition: string
  evidence: string
  risk: 'low' | 'medium' | 'high'
  cost: 'fast' | 'normal' | 'last-resort'
}

const STRATEGIES: StrategyDescriptor[] = [
  {
    id: 'native-value-events',
    widget: 'text',
    label: 'Setter nativo com input/change/blur',
    precondition: 'Campo editável visível e não desabilitado.',
    evidence: 'value ou textContent coincide exatamente com o valor esperado.',
    risk: 'low',
    cost: 'fast',
  },
  {
    id: 'native-choice-state',
    widget: 'choice',
    label: 'Estado nativo de radio/checkbox',
    precondition: 'Input ou widget ARIA único localizado.',
    evidence: 'checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.',
    risk: 'low',
    cost: 'fast',
  },
  {
    id: 'native-select-events',
    widget: 'select',
    label: 'Seleção nativa por value/texto exato',
    precondition: 'Select visível com opção correspondente.',
    evidence: 'option.selected e selected value correspondem ao esperado.',
    risk: 'low',
    cost: 'fast',
  },
  {
    id: 'aria-combobox-keyboard',
    widget: 'combobox',
    label: 'Combobox ARIA por foco e teclado',
    precondition: 'Combobox visível com popup/opções acessíveis.',
    evidence: 'aria-expanded, aria-activedescendant ou opção selecionada mudam.',
    risk: 'medium',
    cost: 'normal',
  },
  {
    id: 'click-to-place',
    widget: 'drag',
    label: 'Selecionar item e clicar no destino',
    precondition: 'Cartão e dropzone visíveis com protocolo click-to-place.',
    evidence: 'Item passa a ser filho do destino ou recebe estado de colocado.',
    risk: 'medium',
    cost: 'normal',
  },
  {
    id: 'html5-drag-drop',
    widget: 'drag',
    label: 'HTML5 dragstart/dragover/drop',
    precondition: 'Origem draggable e destino aceita drag/drop.',
    evidence: 'Relocation, callback ou estado placed confirmado.',
    risk: 'medium',
    cost: 'normal',
  },
  {
    id: 'keyboard-order',
    widget: 'order',
    label: 'Ordenação por foco e teclado',
    precondition: 'Itens ordenáveis com foco/roles ou botões de mover.',
    evidence: 'Ordem dos itens no DOM corresponde à sequência esperada.',
    risk: 'medium',
    cost: 'normal',
  },
  {
    id: 'navigation-feedback',
    widget: 'navigation',
    label: 'Verificar e confirmar feedback/transição',
    precondition: 'Botão de verificação/avanço único e habilitado.',
    evidence: 'Feedback esperado e assinatura específica da questão mudam.',
    risk: 'high',
    cost: 'normal',
  },
  {
    id: 'javascript-explicit',
    widget: 'javascript',
    label: 'JavaScript limitado via capability explícita',
    precondition: 'Engine javascript autorizada e ação declarativa insuficiente.',
    evidence: 'Efeito DOM esperado confirmado por verificador.',
    risk: 'high',
    cost: 'last-resort',
  },
]

export function getStrategyCatalog(widgets?: StrategyWidget[]): StrategyDescriptor[] {
  if (!widgets || widgets.length === 0) return STRATEGIES.filter((strategy) => strategy.widget !== 'javascript')
  const allowed = new Set(widgets)
  return STRATEGIES.filter((strategy) => allowed.has(strategy.widget))
}

export function formatStrategyCatalog(widgets?: StrategyWidget[]): string {
  return getStrategyCatalog(widgets)
    .map((strategy) => `${strategy.id}: ${strategy.label} | pré: ${strategy.precondition} | prova: ${strategy.evidence} | risco: ${strategy.risk}`)
    .join('\n')
}
