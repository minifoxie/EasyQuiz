/**
 * Layout Cache — Memória Inteligente do Layout da Página
 * 
 * Mapeia na primeira visita quais regiões do DOM são sidebars, navs e
 * áreas de conteúdo principal. Salvo em sessionStorage para persistir
 * durante a sessão mas ser renovado a cada nova visita.
 * 
 * Isso resolve o problema do Khan Academy onde cards laterais (lista de
 * exercícios, barra de progresso) eram incorretamente lidos como parte
 * da questão.
 */

interface LayoutSnapshot {
  /** Seletores CSS que identificam as regiões de sidebar/nav */
  knownSidebarSelectors: string[]
  /** Seletor CSS que identifica o container principal de conteúdo */
  mainContentSelector: string | null
  /** Timestamp de quando o snapshot foi criado */
  createdAt: number
  /** Hostname para invalidação de cache cross-domain */
  hostname: string
}

const CACHE_KEY = '__eq_layout_cache__'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutos de sessão

let _inMemoryCache: LayoutSnapshot | null = null

function loadCache(): LayoutSnapshot | null {
  if (_inMemoryCache) return _inMemoryCache
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LayoutSnapshot
    if (parsed.hostname !== location.hostname) return null
    if (Date.now() - parsed.createdAt > CACHE_TTL_MS) return null
    _inMemoryCache = parsed
    return parsed
  } catch {
    return null
  }
}

function saveCache(snapshot: LayoutSnapshot): void {
  _inMemoryCache = snapshot
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(snapshot))
  } catch {}
}

/**
 * Detecta e grava no cache as regiões laterais conhecidas do DOM.
 * Deve ser chamada uma vez, logo após a primeira carga da página.
 * 
 * Para o Khan Academy, isso detecta:
 * - A barra lateral de progresso/missões 
 * - A lista de exercícios pendentes
 * - O header de navegação superior
 */
export function buildLayoutSnapshot(): LayoutSnapshot {
  const existing = loadCache()
  if (existing) return existing

  const knownSidebarSelectors: string[] = []
  let mainContentSelector: string | null = null

  // Candidatos a sidebar/nav para exclusão
  const sidebarCandidates = [
    'nav',
    'aside',
    'header',
    'footer',
    '[role="navigation"]',
    '[role="banner"]',
    '[role="complementary"]',
    // Khan Academy específico
    '[class*="sidebar" i]',
    '[class*="lesson-list" i]',
    '[class*="task-list" i]',
    '[class*="mission" i]',
    '[class*="progress-list" i]',
    '[class*="_ka-drawer_" i]',
    '[class*="breadcrumb" i]',
    // Quizizz específico
    '[class*="game-sidebar" i]',
    '[class*="leaderboard" i]',
    // Kahoot
    '[class*="side-panel" i]',
  ]

  for (const selector of sidebarCandidates) {
    try {
      const el = document.querySelector(selector)
      if (!el) continue
      const rect = (el as HTMLElement).getBoundingClientRect()
      // Filtra elementos muito finos (não são sidebars reais) ou escondidos
      if (rect.width < 10 || rect.height < 10) continue
      knownSidebarSelectors.push(selector)
    } catch {}
  }

  // Candidatos ao conteúdo principal
  const mainCandidates = [
    '[role="main"]',
    'main',
    '.perseus-renderer',
    '.framework-perseus',
    '[data-test-id="exercise-content"]',
    '.main-content',
    '#main-content',
    '[class*="exercise-content" i]',
    '[class*="question-area" i]',
  ]

  for (const selector of mainCandidates) {
    try {
      const el = document.querySelector(selector)
      if (!el) continue
      const rect = (el as HTMLElement).getBoundingClientRect()
      if (rect.width > window.innerWidth * 0.3 && rect.height > 100) {
        mainContentSelector = selector
        break
      }
    } catch {}
  }

  const snapshot: LayoutSnapshot = {
    knownSidebarSelectors,
    mainContentSelector,
    createdAt: Date.now(),
    hostname: location.hostname,
  }

  saveCache(snapshot)
  console.log(`[EasyQuiz LayoutCache] Snapshot criado: ${knownSidebarSelectors.length} sidebars, main: ${mainContentSelector || 'N/A'}`)
  return snapshot
}

/**
 * Retorna os seletores CSS de regiões laterais conhecidas nesta sessão.
 * Usado para filtrar elementos que não fazem parte da questão.
 */
export function getKnownSidebarSelectors(): string[] {
  const cache = loadCache()
  return cache?.knownSidebarSelectors ?? []
}

/**
 * Verifica se um elemento está dentro de uma região lateral memorizada.
 * Substituição inteligente para o antigo `isKhanSidebarElement`.
 */
export function isInKnownSidebarRegion(element: Element): boolean {
  const selectors = getKnownSidebarSelectors()
  if (selectors.length === 0) return false
  
  try {
    for (const sel of selectors) {
      if (element.closest(sel)) return true
    }
  } catch {}
  return false
}

/**
 * Retorna o seletor do container principal de conteúdo da questão
 * se foi previamente identificado pelo snapshot.
 */
export function getMainContentSelector(): string | null {
  const cache = loadCache()
  return cache?.mainContentSelector ?? null
}

/**
 * Invalida o cache atual (útil ao detectar mudança de rota em SPA)
 */
export function invalidateLayoutCache(): void {
  _inMemoryCache = null
  try { sessionStorage.removeItem(CACHE_KEY) } catch {}
}
