/**
 * Engenharia Reversa de Interação (Simulação de Eventos de Mouse)
 * Este módulo teórico cuida de cliques em coordenadas lógicas em gráficos (como no Khan Academy).
 */

export interface GraphBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface LogicalPoint {
  x: number;
  y: number;
}

/**
 * Dispara um evento real de clique simulado em um ponto X, Y da tela.
 * Encadeia mousedown, mouseup e click para enganar detecções de bots.
 */
function simulateMouseClickAt(targetElement: Element, clientX: number, clientY: number) {
  const events = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']
  
  for (const eventName of events) {
    const event = new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
      button: 0,
      buttons: 1
    })
    targetElement.dispatchEvent(event)
  }
}

/**
 * Converte coordenadas matemáticas (lógicas) para coordenadas reais de pixel na tela,
 * baseado no bounding client rect do elemento do gráfico e nos seus limites lógicos.
 */
function logicalToPixel(
  point: LogicalPoint, 
  bounds: GraphBounds, 
  rect: DOMRect
): { clientX: number; clientY: number } {
  // Converte o X lógico para pixel (da esquerda para a direita)
  const xRatio = (point.x - bounds.minX) / (bounds.maxX - bounds.minX)
  const clientX = rect.left + (xRatio * rect.width)
  
  // Converte o Y lógico para pixel (de baixo para cima na tela, por isso inverte)
  const yRatio = (point.y - bounds.minY) / (bounds.maxY - bounds.minY)
  const clientY = rect.bottom - (yRatio * rect.height)

  return { clientX, clientY }
}

/**
 * Tenta inferir os limites matemáticos de um gráfico interativo no Khan Academy.
 * Em ambientes reais, o Khan armazena isso no modelo React ou em viewBox do SVG.
 */
function inferGraphBounds(graphElement: HTMLElement): GraphBounds {
  // Heurística de fallback. Em um sistema real em produção, 
  // leríamos isso do texto SR ou de atributos customizados extraídos do DOM.
  let minX = -10, maxX = 10, minY = -10, maxY = 10

  try {
    // Tenta extrair viewBox se for um SVG
    const svg = graphElement.tagName.toLowerCase() === 'svg' ? graphElement : graphElement.querySelector('svg')
    if (svg) {
      const vb = svg.getAttribute('viewBox')
      if (vb) {
        // ... Lógica teórica avançada de parseamento de viewBox vs coordenadas lógicas
      }
    }
    
    // Tenta ler rótulos dos eixos (as marcações de números)
    const tickLabels = Array.from(graphElement.querySelectorAll('.tick text, [class*="axis-label"]'))
    const nums = tickLabels.map(el => parseFloat(el.textContent || '')).filter(n => !isNaN(n))
    
    if (nums.length > 0) {
      const maxVal = Math.max(...nums)
      const minVal = Math.min(...nums)
      // Arredonda para dar o "padding" padrão do eixo
      minX = minVal
      maxX = maxVal
      minY = minVal
      maxY = maxVal
    }
  } catch (err) {
    console.warn('[Interação] Falha ao inferir limites do gráfico. Usando padrão -10 a 10.', err)
  }

  return { minX, maxX, minY, maxY }
}

/**
 * Função principal a ser exposta para a IA: 
 * A IA decide que precisa "clicar na coordenada (2, 4) do gráfico".
 * Essa função traduz a ordem da IA para cliques reais no navegador.
 */
export function executeLogicalGraphClick(logicalX: number, logicalY: number) {
  try {
    // 1. Identificar o container do gráfico interativo
    // O Khan usa .perseus-graph, .graphie ou .interactive-graph
    const graphElement = document.querySelector('.perseus-graph, .graphie, [class*="interactive-graph"]') as HTMLElement
    
    if (!graphElement) {
      throw new Error("Gráfico interativo não encontrado no DOM.")
    }

    // 2. Extrair informações de tamanho e posição física do gráfico
    const rect = graphElement.getBoundingClientRect()
    
    // 3. Inferir os limites matemáticos do plano cartesiano
    const bounds = inferGraphBounds(graphElement)
    
    // 4. Calcular conversão
    const point = { x: logicalX, y: logicalY }
    const pixelCoords = logicalToPixel(point, bounds, rect)
    
    // 5. Validar limites (se o pixel alvo está dentro da tela visível do gráfico)
    if (pixelCoords.clientX < rect.left || pixelCoords.clientX > rect.right ||
        pixelCoords.clientY < rect.top || pixelCoords.clientY > rect.bottom) {
      throw new Error(`Coordenadas de pixel (${pixelCoords.clientX}, ${pixelCoords.clientY}) estão fora da área visível do gráfico.`)
    }

    // 6. Encontrar o elemento mais específico no ponto do pixel
    // Isso é crucial para que o React intercepte o evento no nó correto (e não no wrapper genérico)
    const targetElement = document.elementFromPoint(pixelCoords.clientX, pixelCoords.clientY) || graphElement

    // 7. Disparar clique cirúrgico realístico
    simulateMouseClickAt(targetElement, pixelCoords.clientX, pixelCoords.clientY)
    
    console.log(`[Autopilot] ✅ Clique efetuado com sucesso no ponto lógico (${logicalX}, ${logicalY}). Pixels reais: ${pixelCoords.clientX.toFixed(1)}px, ${pixelCoords.clientY.toFixed(1)}px.`)

  } catch (error) {
    console.error(`[Autopilot] ❌ Falha ao executar clique em gráfico:`, error)
  }
}
