<div align="center">
  <img src="dist/Canvas.png" alt="EasyQuiz Logo" width="200" />
  <h1>EasyQuiz <img src="https://img.shields.io/badge/Build-v1.7.3-00e5ff?style=flat-square" id="eq-version-badge" /></h1>
  <p><b>Seu Assistente Pessoal de Resoluções com Inteligência Artificial</b></p>
  <p><em>100% Serverless, Transparente e Autônomo.</em></p>

  [![Licença MIT](https://img.shields.io/badge/License-MIT-00e5ff?style=flat-square)](#)
  [![Zero Servidor](https://img.shields.io/badge/Arquitetura-100%25%20Serverless-00ff9d?style=flat-square)](#)
  [![Navegadores](https://img.shields.io/badge/Suporte-Chromium_Only-blue?style=flat-square)](#)

  <br>
  
  <i>Desenvolvido colaborativamente por Engenheiros e IAs de ponta:</i><br>
  <img src="https://img.shields.io/badge/Google_Gemini-1A73E8?style=for-the-badge&logo=googlebard&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Claude_Sonnet-D97757?style=for-the-badge&logo=anthropic&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Antigravity_IDE-000000?style=for-the-badge&logo=google&logoColor=white" />
  <br><br>
  <br><a href="#inicio-rapido"><img src="https://img.shields.io/badge/PEGAR_CÓDIGOS_DE_INSTALAÇÃO-ff0055?style=for-the-badge&logo=codeigniter&logoColor=white" width="350" alt="Pegar Códigos" /></a>
</div>

<br>

O **EasyQuiz** nasceu da necessidade de modernizar e revolucionar o auxílio aos estudos virtuais. Ao invés de você perder tempo copiando textos longos, cortando e colando perguntas ou lutando para extrair dados de tabelas no Canvas ou Moodle, o EasyQuiz **se acopla diretamente na sua aba e faz todo o trabalho braçal**.

Com um único clique de teclado, ele lê a tela, enxerga os gráficos, processa na Inteligência Artificial e (se você quiser) injeta as respostas preenchendo as bolinhas e campos de texto como se fosse um humano digitando para você. Sem precisar hospedar nenhum servidor, totalmente seguro e rodando na sua máquina.

---

## 📑 Tabela de Conteúdos
1. [Por que o EasyQuiz é diferente?](#por-que-diferente)
2. [Instalação Rápida e Códigos Oficiais](#inicio-rapido)
3. [Como Obter Sua Chave da API](#sistema-multi-key)
4. [Modos de Operação (Legacy vs Discreto)](#modos-operacao)
5. [Mecânicas Internas e Tecnologias](#mecanicas)
6. [Suporte e Compatibilidade](#suporte)

---

## <a id="por-que-diferente" href="#por-que-diferente"><img src="https://img.shields.io/badge/-Por_que_o_EasyQuiz_é_diferente?-000000?style=for-the-badge&logo=google-gemini&logoColor=white" /></a>
- **Zero Hospedagem:** A maioria das extensões requer que o criador pague milhares de reais em servidores. O EasyQuiz funciona de "Cliente-Para-IA". Seu navegador conversa de forma privada com o Google, usando a sua própria chave gratuita.
- **Detecção Computacional Cega:** Ele não usa seletores duros como "ache o input X". Ele mapeia a semântica da página. Se você abrir um Google Forms ou a plataforma Canvas, o algoritmo escaneia, dá nota e marca a área da sua tela com destaques Neon para confirmar o que vai resolver.
- **Digitação Humanizada:** Anti-cheats geralmente percebem ferramentas automáticas. O EasyQuiz injeta e digita as respostas *caractere por caractere*, imitando o ritmo que um humano levaria pressionando as teclas do teclado real.

---

<br>

<a id="inicio-rapido"></a>
<div align="center">
  ---

<a id="inicio-rapido" href="#inicio-rapido"><img src="https://img.shields.io/badge/INÍCIO_RÁPIDO_E_CÓDIGOS-FF0055?style=for-the-badge&logo=rocket&logoColor=white" /></a>
  <br>
  <p><em>Preste bastante atenção aqui: o EasyQuiz é um Bookmarklet! Isso significa que não existe botão de "Baixar".<br>Você o instala como se fosse adicionar uma página aos seus favoritos em apenas 10 segundos.</em></p>
</div>

> [!IMPORTANT]
> **O Passo a Passo da Instalação:**
> 1. Pressione **`Ctrl + Shift + B`** no seu navegador para exibir a Barra de Favoritos abaixo da barra de endereço.
> 2. Clique com o botão direito na barra, e depois em **"Adicionar Página"** (ou Adicionar Favorito).
> 3. Escolha um **Nome** legal (Ex: "🌟 EasyQuiz Ninja").
> 4. Copie o bloco de código exato abaixo que se adequa ao seu estilo, e **Cole na caixa de URL (Endereço)** do favorito.
> 5. Para usar, basta estar no site do seu Quiz e **clicar no favorito que você salvou**!

### Códigos Oficiais de Injeção:

<img src="https://img.shields.io/badge/OPÇÃO_A:_Legacy-333333?style=for-the-badge&logo=windowsterminal&logoColor=white" />

> 💡 **Para quem gosta de controle total.** Este modo exibe um painel completo para auditar a IA visualmente.
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz erro: '+e)}}).catch(function(e){alert('EasyQuiz falha no download: '+e)})})();
```

<img src="https://img.shields.io/badge/OPÇÃO_B:_Discreto-111111?style=for-the-badge&logo=ninja&logoColor=white" />

> 🥷 **Recomendado para furtividade.** Totalmente invisível. Funciona via atalhos e simula digitação física de teclado real.
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```
*(Dica: Ao passar o mouse por cima do bloco de código, um botão nativo de Copiar aparecerá no canto direito)*

---

<a id="sistema-multi-key"></a>
## <a id="sistema-multi-key" href="#sistema-multi-key"><img src="https://img.shields.io/badge/Sistema_Multi--Key-0052CC?style=for-the-badge&logo=google-cloud&logoColor=white" /></a>

O EasyQuiz foi projetado com uma **Arquitetura Multi-Key** avançada. Como não cobramos mensalidades, toda a mágica ocorre diretamente entre sua máquina e os servidores do **Google Gemini**.

Para o sistema atingir sua velocidade e estabilidade máximas, **recomendamos fortemente que você adicione pelo menos 4 Chaves de API de contas Google diferentes**. O EasyQuiz fará um "Balanceamento de Carga" inteligente entre elas. Se uma chave cansar (Rate Limit), ele pula para a próxima instantaneamente, garantindo um fluxo impecável e sem interrupções!

### Passo a Passo para criar suas Chaves:
1. Acesse o portal oficial para desenvolvedores: **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Faça login com sua conta do Google principal.
3. Clique no botão azul gigante **"Create API Key"** (Criar chave).
4. O sistema gerará um texto longo (algo como `AIzaSyBw...`). **Copie esse código**.
5. No **EasyQuiz**, abra as configurações ⚙️ (Modo Legacy) ou pressione `Shift + A` (Modo Discreto) e cole sua chave.
6. **Repita o processo!** Entre no Google AI Studio com outras contas Google que você possua (contas de e-mail alternativas) e gere mais chaves. Adicione todas no EasyQuiz usando o botão "+".

> **Segurança e Privacidade Absoluta:** Suas chaves são armazenadas localmente no seu computador (`localStorage`). Elas **nunca** são enviadas para nós ou para terceiros. Você é o único dono do tráfego.

---

<br>

<a id="modos-operacao"></a>
<div align="center">
  <a id="modos-operacao" href="#modos-operacao"><img src="https://img.shields.io/badge/Modos_de_Operação-111111?style=for-the-badge&logo=slider&logoColor=white" /></a>
</div>

O EasyQuiz foi projetado para se adaptar a diferentes estilos de uso. A plataforma entrega dois modos completos, que variam apenas na interface, mas compartilham do mesmo "cérebro" IA.

### <a href="#modo-legacy"><img src="https://img.shields.io/badge/Modo_Legacy-444444?style=flat-square&logo=windowsterminal&logoColor=white" /></a>
Injeta uma interface de usuário complexa, arrastável e de altíssima qualidade (Shadow DOM), inspirada fortemente em IDEs como o VS Code. Para quem gosta de controle absoluto.

- **Resolver**: Executa a IA, exibe as opções detectadas e permite Injeção Automática das respostas.
- **Cérebro da IA**: Mostra como a inteligência está mapeando o DOM passo-a-passo.
- **Mídias & Imagens**: Exibe exatamente como a Visão Computacional está enxergando os gráficos da sua prova.
- **Terminal**: Um console embutido com logs de telemetria e erros silenciosos.
- **`Alt + Q`** — Abre/Fecha o painel e **dispara a análise automaticamente**. 

### <a href="#modo-discreto"><img src="https://img.shields.io/badge/Modo_Discreto-111111?style=flat-square&logo=ninja&logoColor=white" /></a>
**100% invisível por padrão.** Toda a operação é governada silenciosamente via atalhos de teclado e as respostas são aplicadas simulando a sua própria digitação física.
Quando a IA resolve injetar um texto, a ferramenta aguarda você pressionar qualquer tecla real. A cada tecla física pressionada, o sistema libera *um caractere* da resposta da IA, imitando a sua digitação e burlando detectores!

#### <img src="https://img.shields.io/badge/Comandos_do_Modo_Discreto-222222?style=flat-square&logo=keyboard&logoColor=white" />

##### <img src="https://img.shields.io/badge/Ações_de_Resolução-0052CC?style=flat-square&logo=play&logoColor=white" />
| Atalho | Descrição da Ação |
| :--- | :--- |
| **`Shift + Q`** / **`Alt + Q`** | **Iniciar Análise**: Foca na questão atual e inicia a resolução ativamente. |
| **`Shift + R`** | **Forçar Re-análise**: Útil se a internet falhar ou a resposta da IA não for satisfatória. |
| **`Shift + Z`** | **Panic Button (Abortar)**: Cancela qualquer análise em andamento ou interrompe a digitação automática no meio da frase. |

##### <img src="https://img.shields.io/badge/Configurações-555555?style=flat-square&logo=gear&logoColor=white" />
| Atalho | Descrição da Ação |
| :--- | :--- |
| **`Shift + A`** | **Gerenciador de Chaves**: Abre a interface minimalista para colar sua Key da API do Google. |
| **`Shift + M`** | **Troca de Modelos**: Cicla instantaneamente entre os modelos disponíveis (Gemini Flash, Pro, etc). |
| **`Shift + C`** | **Comandos Rápidos**: Ativa funções como *Auto Aplicar* ou *Avanço Automático de Páginas*. |

##### <img src="https://img.shields.io/badge/Depuração-000000?style=flat-square&logo=bug&logoColor=white" />
| Atalho | Descrição da Ação |
| :--- | :--- |
| **`Shift + V`** | **Visão Computacional**: Exibe um popup revelando a imagem exata capturada da prova que foi enviada pra IA. |
| **`Shift + H`** | **Modo Auditoria**: Abre um DevTools flutuante com logs completos para investigar erros e fluxos complexos. |

---

<br>

<a id="mecanicas"></a>
<div align="center">
  <a id="mecanicas" href="#mecanicas"><img src="https://img.shields.io/badge/Tecnologias_&_Mecânicas-444444?style=for-the-badge&logo=code-igniter&logoColor=white" /></a>
</div>

O EasyQuiz é desenhado sob o lema *"Transparência Total"*. A integração com os frameworks ocorre utilizando as mais avançadas estratégias de engenharia reversa de DOM (Document Object Model).

### <img src="https://img.shields.io/badge/Motor_de_Detecção_Semântica-663399?style=flat-square&logo=graphql&logoColor=white" />
Ao invés de programar o EasyQuiz para entender "site por site" (o que o deixaria obsoleto rapidamente), ele possui um **Algoritmo Classificador de DOM Genérico**.
Ele escaneia a árvore da página em busca de agrupamentos suspeitos e atribui uma **pontuação de relevância**. O bloco com mais cara de "Questão de Prova" é classificado como a "Questão Ativa" do momento.

### Visão Computacional de Baixo Nível
Para interpretar fórmulas matemáticas complexas renderizadas na tela usando HTML bizarro ou Canvas, o EasyQuiz usa a **Media Capture Strategy**:
- O robô tira um screenshot vetorial em milissegundos puramente do retângulo da pergunta detectada.
- A imagem é convertida em *Data URI* e enviada de forma multimodal para a IA ler a foto e o código cru juntos.

### <img src="https://img.shields.io/badge/Event_Dispatcher_&_Framework_Hijacking-0052CC?style=flat-square&logo=react&logoColor=white" />
Formulários em **React, Vue ou Angular** não aceitam simples cliques via código. Se um robô alterar o HTML, a interface muda, mas o React não registra a mudança e envia a prova em branco.
O EasyQuiz burla isso redefinindo os `_valueTracker` do React nativamente e disparando `PointerEvents` sintéticos orquestrados (`pointerdown`, `mouseup`, `click`), com delays realistas e coordenadas (x, y) humanizadas.

> **Zero Rastros**: Todos os estilos e lógicas pesadas são aplicadas isoladas dentro de um `Shadow DOM`, o que impede que scripts de terceiros da página consigam bisbilhotar as variáveis da extensão.

---

## <a id="deep-dive" href="#deep-dive"><img src="https://img.shields.io/badge/Deep_Dive_da_IA-1A73E8?style=for-the-badge&logo=google-bard&logoColor=white" /></a>
O EasyQuiz não simplesmente "joga" a pergunta no Gemini e espera um milagre. Ele emprega técnicas avançadas de **Chain of Thought (CoT)** e **Agentic Prompting** divididas em micro-etapas de execução rigorosas que você pode acompanhar pelo "Cérebro" ou "Auditoria" da ferramenta.

### <img src="https://img.shields.io/badge/1._Contextualização_(Scanning)-111?style=flat-square" />
Quando você aperta `Alt + Q`, o sistema extrai a **árvore estrutural** da questão (separando o que é enunciado, opções e texto de apoio). Ao mesmo tempo, caso haja imagens, ele tira um *screenshot* cirúrgico usando a sua GPU local. Tudo isso é empacotado e enviado de forma criptografada para o modelo.

### <img src="https://img.shields.io/badge/2._Raciocínio_(Reasoning)-111?style=flat-square" />
A IA é proibida pelo sistema de cuspir a resposta logo de cara. Primeiro, ela é forçada a gerar um bloco lógico chamado `[RACIOCÍNIO]`. Aqui, ela debate consigo mesma, resolve equações passo a passo, relembra literatura teórica e elimina as "pegadinhas" (distratores) uma a uma. Isso eleva a taxa de acerto lógico para margens assustadoras.

### <img src="https://img.shields.io/badge/3._Planejamento_de_Ação_(Action_Plan)-111?style=flat-square" />
Sabendo a resposta, a IA não diz "É a Letra A", pois os sites randomizam a ordem das opções. Ela emite um payload JSON arquitetado contendo um **Plano de Execução**:
- **Radios/Checkboxes:** Ela cita o pedaço do texto exato que o robô deve procurar e clicar.
- **Campos de Digitação (Inputs):** Ela prevê a string perfeita para ser digitada.

### <img src="https://img.shields.io/badge/4._Validação_e_Injeção-111?style=flat-square" />
O script do EasyQuiz recebe o payload e atua como validador. Ele vasculha o seu DOM buscando o que a IA mandou clicar. Se for achado, a ferramenta executa a ação burlando Frameworks e Listeners da página, garantindo que o acerto seja validado e enviado para o servidor do seu professor sem deixar vestígios mecânicos.

---

<a id="suporte"></a>
## <a id="suporte" href="#suporte"><img src="https://img.shields.io/badge/Navegadores_Suportados-000000?style=for-the-badge&logo=google-chrome&logoColor=white" /></a>
A tecnologia embarcada requer nativamente o motor **Chromium**. O ecossistema Apple (Safari) ou o Firefox possuem bloqueios nas APIs de captura de tela web e não são suportados.

| <img src="https://img.shields.io/badge/Google_Chrome-4285F4?style=flat-square&logo=googlechrome&logoColor=white" /> | <img src="https://img.shields.io/badge/Microsoft_Edge-0078D7?style=flat-square&logo=microsoftedge&logoColor=white" /> | <img src="https://img.shields.io/badge/Brave-FF2000?style=flat-square&logo=brave&logoColor=white" /> | <img src="https://img.shields.io/badge/Opera-FF1B2D?style=flat-square&logo=opera&logoColor=white" /> |
| :---: | :---: | :---: | :---: |
| ✅ | ✅ | ✅ | ✅ |

### <img src="https://img.shields.io/badge/Sites_Comportados-000000?style=flat-square&logo=web&logoColor=white" />
* **Google Forms, Canvas (Instructure), Moodle, Blackboard**
* Plataformas experimentais (Kahoot!, Quizizz)
* Quizzes HTML5 clássicos e dezenas de plataformas customizadas, independentemente da formatação da escola/empresa, contanto que usem inputs da web moderna.

---

> *Este é um projeto de código aberto, focado puramente em estudos de inteligência artificial, manipulação segura de DOM e expansão cognitiva automatizada. Use com responsabilidade e excelência!* ⚡
