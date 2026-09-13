<div align="center">
  <img src="dist/Canvas.png" alt="EasyQuiz Logo" width="200" />
  <h1>EasyQuiz ⚡ <img src="https://img.shields.io/badge/Build-v1.7.9-00e5ff?style=flat-square" id="eq-version-badge" /></h1>
  <p><b>A Evolução Invisível do Auxílio Cognitivo via IA</b></p>

  <a href="https://minifoxie.github.io/EasyQuiz/" target="_blank">
    <img src="https://img.shields.io/badge/ACESSAR_SITE_OFICIAL_COM_OS_CÓDIGOS-2B2D31?style=for-the-badge&logo=codeigniter&logoColor=white" width="400" alt="Site Oficial" />
  </a>
</div>

<br>

<a id="portal" href="#portal">
  <img src="https://img.shields.io/badge/O_Que_é_o_EasyQuiz-111111?style=for-the-badge&logo=google-gemini&logoColor=white" />
</a>

O **EasyQuiz** é uma ferramenta puramente Client-Side e *Serverless* que automatiza resoluções acadêmicas. Usando a API do Google Gemini aliada à Visão Computacional local, ele mapeia a semântica de qualquer página web e executa **Digitação Humanizada** imperceptível via eventos nativos do navegador.

Toda a detecção de elementos é cega (não depende de IDs ou seletores CSS previsíveis) e o disparo das ações simula hardwares físicos reais, passando imune à imensa maioria dos sistemas Anti-Cheat.

---

<a id="modos" href="#modos">
  <img src="https://img.shields.io/badge/Modos_de_Operação_&_Códigos-0052CC?style=for-the-badge&logo=gitbook&logoColor=white" />
</a>

O EasyQuiz opera em duas frentes distintas dependendo da sua necessidade. Você deve criar um **Favorito** (Bookmarklet) no seu navegador e colocar o código do modo desejado como URL. 

Quando abrir uma prova, basta clicar no Favorito criado.

### 🥷 1. Modo Discreto (Stealth)
Ideal para operações críticas. Opera de forma 100% invisível sem injetar nenhum botão fixo na tela. Todas as ações são disparadas por atalhos secretos do teclado.

**Código de Instalação (Arraste para os Favoritos ou copie):**
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@4a289c9/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```

<details>
<summary><b>📖 Clique aqui para ler o Manual Completo do Modo Discreto</b></summary>
<br>

# 🕵️ Modo Discreto: O Guia Furtivo Supremo

O **Modo Discreto** (Stealth) do EasyQuiz foi arquitetado do zero para contornar qualquer tipo de inspeção visual, análise de rede superficial e detecção de automação por DOM.

Ele **não injeta NENHUMA interface na sua prova**. Zero botões, zero janelas. Todo o processamento lógico ocorre via atalhos silenciosos de teclado, e os feedbacks acontecem por meio de um sistema de "Micro-Toasts" que desaparecem em frações de segundo.

---

## ⚡ A Arquitetura de "Hooking" (Como burlamos os Anti-Cheats)

Se um script apenas muda o valor de uma caixa de texto (`input.value = "Resposta"`), plataformas modernas (React/Angular) detectam a injeção mecânica instantaneamente e anulam a submissão, enviando a prova em branco.

O Modo Discreto aplica um **Event Hooking** avançado:
1. Quando a IA decide o que responder, ela salva a *String* na memória isolada.
2. O EasyQuiz escuta o seu teclado físico.
3. Ao apertar **qualquer tecla**, o sistema anula a letra original que você apertou e injeta a letra correspondente da resposta certa (disparando os eventos `keydown`, `keypress`, `input` e `keyup` com as marcações de `isTrusted: true` via Prototype Override).
4. O resultado: Para o site, você é apenas um humano normal digitando muito rápido a resposta perfeitamente correta.

---

## ⌨️ Tabela de Comandos de Batalha (Atalhos)

Estes atalhos governam o sistema. Memorize-os:

| Atalho | Descrição Tática |
| :--- | :--- |
| `Shift + Q` | **Escanear:** Ativa o robô. Ele lê o DOM da questão focada (ou a última que você clicou) e dispara silenciosamente para a nuvem. |
| `Shift + Z` | **Abort / Panic:** Cancela qualquer digitação em andamento e mata a requisição pendente. |
| `Shift + R` | **Recarregar IA:** Força a IA a ler a questão de novo se ela der timeout. |
| `Shift + A` | **Menu de API:** Um mini-popup translúcido no rodapé para você colar suas chaves do Gemini. Suporta Múltiplas Chaves para balanceamento! |
| `Shift + M` | **Trocar de Cérebro:** Alterna internamente entre Gemini Flash, Pro e outras variantes. |
| `Shift + V` | **Auditoria de Visão:** Pisca rapidamente na tela um screenshot bruto de como a IA está enxergando suas fórmulas matemáticas, sumindo logo em seguida. |

---

## 🚀 Como Iniciar

1. Vá para a seção de Instalação na página principal.
2. Copie o código do "Modo Discreto" e crie um Favorito.
3. Entre na página da sua prova.
4. Clique no Favorito. A tela **NÃO VAI MUDAR NADA**, mas o script já está vivo!
5. Pressione `Shift + A` e adicione sua chave de acesso.
6. Pronto! Agora é só apertar `Shift + Q` em cima de cada questão.

> **Importante:** Não aperte `Shift + Q` 20 vezes na mesma prova ao mesmo tempo. Dê tempo para a inteligência computar e preencher a resposta atual antes de pular para a próxima.


</details>

<br>

### 🖥️ 2. Modo Legacy (Painel HUD)
Ideal para desenvolvedores ou para quem deseja auditar visualmente tudo o que a IA está pensando e enxergando.

**Código de Instalação (Arraste para os Favoritos ou copie):**
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@4a289c9/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();
```

<details>
<summary><b>📖 Clique aqui para ler o Manual Completo do Modo Legacy</b></summary>
<br>

# 💻 Modo Legacy: Auditoria Visual Completa

O **Modo Legacy** (ou Modo Painel) é o "Laboratório de Desenvolvedor" do EasyQuiz. Ele foi construído utilizando um **Shadow DOM** hiper-avançado. Isso significa que ele injeta uma janela flutuante completa, arrastável e de altíssima definição dentro da sua aba, mas o código dessa janela fica isolado e encriptografado, impedindo que o site hospedeiro veja o que ela contém.

Se você gosta de ter transparência absoluta, controlar a IA visualmente e ver as engrenagens girando, este é o seu modo.

---

## 🛠️ A Anatomia do Painel

Quando você clica no Bookmarklet do Modo Legacy, nada acontece inicialmente. A mágica só começa quando você pressiona **`Alt + Q`**. Um painel HUD deslizará elegantemente para dentro da sua tela.

O painel é dividido em seções cruciais:

### 1. Botão Gigante "RESOLVER QUESTÃO ATUAL"
Este botão é o coração do sistema. Ao clicar nele, o EasyQuiz procurará o "Ponto de Foco" mais provável (a div que parece conter a pergunta e as opções) e iniciará o **Scrape Semântico**.
- Em verde, ele demarcará na sua tela o que ele está lendo, criando uma "Caixa de Contenção" ao redor do texto e da imagem, se houver.
- Logo depois, ele enviará tudo de forma segura para os datacenters do Google Gemini.

### 2. Aba de Controle Principal
Aqui a IA cospe o resultado do processamento dela em uma interface limpa.
- **Botão "Injetar Resposta":** Ao ser clicado, força os PointerEvents no DOM para preencher a resposta detectada.
- **Botão "Limpar":** Destrói as memórias locais daquela execução, liberando a rede para uma nova análise.

### 3. Aba "Cérebro" (Chain of Thought)
A aba mais interessante tecnicamente. O EasyQuiz exige que a IA crie um planejamento detalhado, debata consigo mesma e argumente a resposta *antes* de afirmar que a "Letra B" está certa. Todo esse monólogo interno em texto cru aparece nesta aba para você ler e ter certeza de que a Inteligência Artificial não teve uma "alucinação".

### 4. Aba "Mídia"
Se a questão for muito visual (Ex: uma fórmula matemática complexa de engenharia no Canvas, ou gráficos interativos), o sistema usa **Visão Computacional** e tira um Screenshot automático dessa área. A imagem crua que o seu navegador envia para a Inteligência Artificial fica amostrada nesta aba, para você conferir se a foto foi tirada perfeitamente.

### 5. Aba "Terminal"
O painel de telemetria. É onde o motor JavaScript registra `DOM Injections`, `PointerEvent Overrides` e `React Hook Bypasses`. Um deleite para programadores, e essencial se a ferramenta não estiver conseguindo clicar num botão específico.

### 6. Aba de Engrenagem (Configurações)
Onde você insere as suas **Múltiplas API Keys**. Permite gerenciar as chaves, mudar as versões dos modelos e configurar o limiar de sensibilidade do detector de blocos.

---

## 🚀 Como Iniciar

1. Vá para a seção de Instalação na página principal.
2. Copie o código do "Modo Legacy" e crie um Favorito.
3. Entre na página da sua prova.
4. Clique no Favorito. A tela **NÃO VAI MUDAR NADA**.
5. Pressione `Alt + Q`. A janela flutuante vai aparecer!
6. Clique na **Engrenagem** para configurar a sua API Key.
7. Clique na Aba Principal e dê **RESOLVER**!


</details>

---

<a id="info" href="#info">
  <img src="https://img.shields.io/badge/Tecnologias_&_Segurança-444444?style=for-the-badge&logo=shield&logoColor=white" />
</a>

* **Sistema Multi-Key:** Balanceamento de carga automático se você cadastrar múltiplas chaves API do Google.
* **Sem Rastros (Privacy-First):** As suas chaves de API não saem do seu navegador. Não temos acesso ao que você faz.
* **100% Chromium:** Suporta apenas Google Chrome, Edge, Brave e Opera. (Safari e Firefox bloqueiam as requisições de captura de tela nativas).

<div align="center">
  <br><br>
  <i>Desenvolvido colaborativamente por Engenheiros e IAs de ponta:</i><br>
  <img src="https://img.shields.io/badge/Google_Gemini-1A73E8?style=for-the-badge&logo=googlebard&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Claude_Sonnet-D97757?style=for-the-badge&logo=anthropic&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Antigravity_IDE-000000?style=for-the-badge&logo=google&logoColor=white" />
</div>
