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
