<div align="center">
  <img src="../dist/Canvas.png" alt="EasyQuiz Logo" width="100" />
  <h1>🛠️ Mecânicas Internas e Tecnologias</h1>
</div>

---

O EasyQuiz é desenhado sob o lema *"Zero Servidor, Transparência Total"*. Todo o processamento é feito na sua própria máquina e a integração com os frameworks ocorre utilizando as mais avançadas estratégias de engenharia reversa de DOM (Document Object Model).

## 🧩 O Motor de Detecção Semântica

Ao invés de programar o EasyQuiz para entender site por site (o que o deixaria obsoleto rapidamente caso os sites atualizassem), ele possui um **Algoritmo Classificador de DOM Genérico**.

1. Ele escaneia a página em busca de agrupamentos suspeitos: `fieldset`, `div` com muitos `input type="radio"`, listas numeradas, etc.
2. Cada elemento recebe uma **pontuação de relevância**. Se um bloco contém um texto com interrogação e 4 opções de botões embaixo, ele ganha altíssima pontuação.
3. O sistema "foca" no bloco vencedor, demarcando um escudo visual (Highlighter). O texto e o HTML interno apenas desse bloco são extraídos.

## 👁️ Visão Computacional de Baixo Nível

A IA frequentemente não entende fórmulas matemáticas que estão renderizadas na tela usando classes esquisitas do HTML ou Canvas desenhados via script.
Para mitigar isso, o EasyQuiz usa a **Media Capture Strategy**:

- O bot encontra o retângulo exato que a questão ocupa.
- O navegador usa APIs modernas (`html2canvas` simulado e extrações de bounding box) para criar um Print (Screenshot vetorial) puramente do retângulo daquela pergunta.
- A imagem é comprimida e convertida em uma *Data URI* e enviada de forma multmodal para o modelo Gemini junto com o texto cru. A IA *lê* a foto e o texto juntos.

## 🧬 Event Dispatcher & Framework Hijacking

Formulários modernos não são apenas HTML. Eles usam **React, Vue ou Angular**. Se um robô apenas disser `input.checked = true`, a interface muda, mas o React (que roda por trás) não registra a mudança e envia a resposta em branco!

O EasyQuiz resolve isso através de Injeção Avançada:
- Ele redefine os `_valueTracker` do React nativamente.
- Dispara `PointerEvents` sintéticos perfeitamente orquestrados (`pointerdown`, `mousedown`, `pointerup`, `mouseup`, `click`), com delay e coordenadas aleatorizadas (x, y do centro do botão).
- Para campos de digitação, o sistema sobrescreve temporariamente o protótipo do `HTMLInputElement` para enganar os Listeners do Angular, revelando caracteres em velocidade não-linear para burlar detectores de anti-cheat básicos e imitar humanos.

> **Zero Rastros**: Todos os estilos visuais e lógicas são aplicadas isoladas dentro de um `Shadow DOM`, o que impede que os scripts maliciosos de sites tentem bisbilhotar as variáveis da extensão. Apenas a injeção mecânica viaja para fora do escopo protegido.
