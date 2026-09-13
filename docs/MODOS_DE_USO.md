<div align="center">
  <img src="../dist/Canvas.png" alt="EasyQuiz Logo" width="100" />
  <h1>🎛️ Modos de Operação do EasyQuiz</h1>
</div>

---

O EasyQuiz foi projetado para se adaptar a diferentes estilos de uso e necessidades. Atualmente, a plataforma entrega **dois modos completos de operação**, que variam apenas na forma como a interface é exibida, mas compartilham do mesmo "cérebro" de Inteligência Artificial.

## 1️⃣ Modo Legacy (Painel Flutuante)

O **Modo Legacy** injeta uma interface de usuário complexa, arrastável e de altíssima qualidade (Shadow DOM), inspirada fortemente em IDEs como o VS Code. Este modo é para quem gosta de ter controle absoluto e transparência sobre o que a IA está analisando.

### Principais Abas:
- 🚀 **Resolver**: Executa a IA, exibe as opções detectadas e permite Injeção Automática das respostas.
- 🧠 **Cérebro da IA**: Mostra como a inteligência está mapeando o DOM e as lógicas de raciocínio passo-a-passo.
- 🖼️ **Mídias & Imagens**: Se a questão tem tabelas, equações SVG ou fotos anexadas, elas vão aparecer aqui como a IA as enxerga.
- ⏱️ **Cronômetro**: Mantém um log do tempo gasto em cada resolução.
- 💻 **Terminal**: Um console embutido com logs de detecção, erros silenciosos e telemetria, perfeito para debug.
- ⚙️ **Configurações**: Onde você adiciona sua Chave de API, muda os modelos da IA ou força configurações estritas de execução visual.

### Atalhos Principais (Legacy):
- `Alt + Q`: Abre ou fecha o painel principal. Ao abrir em cima de uma questão nova, **dispara a análise automaticamente**.
- Pressionar o **Botão "Minimizar"** no topo da janela transforma todo o HUD em uma pílula flutuante que não atrapalha a leitura.

---

## 2️⃣ Modo Discreto (Stealth/Ninja)

Como o nome sugere, o **Modo Discreto** é 100% invisível por padrão. Não existe nenhuma janela flutuando no canto do navegador, nem ícones óbvios na sua tela. Toda a operação é governada silenciosamente via **Atalhos de Teclado Secretos** e as respostas são aplicadas simulando o próprio usuário.

Ideal para preenchimentos focados ou apresentações onde a interface não deve poluir a leitura do quiz. 

### Mecânicas de Digitação Humanizada:
Quando a IA resolve injetar um texto em um campo (ex: responder "Sim, confirmo"), no Modo Discreto, a ferramenta vai aguardar você **pressionar qualquer tecla no seu teclado real**. A cada tecla pressionada fisicamente, o sistema preenche e exibe **um caractere** da resposta da IA. Isso emula perfeitamente a digitação natural humana.

### Lista Completa de Atalhos (Discreto):

| Atalho | Ação Executada |
| :--- | :--- |
| **`Shift + Q`** ou **`Alt + Q`** | Inicia a análise da questão atual ativamente (sem avisos gigantes). |
| **`Shift + Z`** | Aborta/Cancela a análise imediatamente ou para a injeção pela metade. |
| **`Shift + R`** | Re-analisa a questão do zero (útil caso a rede oscile). |
| **`Shift + A`** | Abre um modal minúsculo no canto para inserir/trocar a Chave API. |
| **`Shift + M`** | Permite trocar de modelo Gemini/Claude em tempo real. |
| **`Shift + C`** | Abre o Menu de Comandos (para ligar "Auto Aplicar" furtivo, etc). |
| **`Shift + V`** | Exibe rapidamente o que a visão computacional enxergou da tela. |
| **`Shift + H`** | Abre o painel de DevTools/Auditoria para debugar falhas de DOM. |

> **Feedback Sutil:** Em todos os atalhos, o Modo Discreto se comunica com você por meio de **Toasts** extremamente pequenos (textos que flutuam e somem em 1 segundo no canto superior direito).
