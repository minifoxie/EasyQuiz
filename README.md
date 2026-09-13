<div align="center">
  <img src="dist/Canvas.png" alt="EasyQuiz Logo" width="200" />
  <h1>EasyQuiz ⚡</h1>
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
</div>

<br>

O **EasyQuiz** nasceu da necessidade de modernizar e revolucionar o auxílio aos estudos virtuais. Ao invés de você perder tempo copiando textos longos, cortando e colando perguntas ou lutando para extrair dados de tabelas no Canvas ou Moodle, o EasyQuiz **se acopla diretamente na sua aba e faz todo o trabalho braçal**.

Com um único clique de teclado, ele lê a tela, enxerga os gráficos, processa na Inteligência Artificial e (se você quiser) injeta as respostas preenchendo as bolinhas e campos de texto como se fosse um humano digitando para você. Sem precisar hospedar nenhum servidor, totalmente seguro e rodando na sua máquina.

---

## 🎯 Por que o EasyQuiz é diferente?
- **Zero Hospedagem:** A maioria das extensões requer que o criador pague milhares de reais em servidores. O EasyQuiz funciona de "Cliente-Para-IA". Seu navegador conversa de forma privada com o Google, usando a sua própria chave gratuita.
- **Detecção Computacional Cega:** Ele não usa seletores duros como "ache o input X". Ele mapeia a semântica da página. Se você abrir um Google Forms ou a plataforma Canvas, o algoritmo escaneia, dá nota e marca a área da sua tela com destaques Neon para confirmar o que vai resolver.
- **Digitação Humanizada:** Anti-cheats geralmente percebem ferramentas automáticas. O EasyQuiz injeta e digita as respostas *caractere por caractere*, imitando o ritmo que um humano levaria pressionando as teclas do teclado real.

---

<br>

<div align="center">
  <h2>🚀 INÍCIO RÁPIDO E CÓDIGOS DE INSTALAÇÃO (IMPORTANTE)</h2>
  <p><em>Preste bastante atenção aqui: o EasyQuiz é um Bookmarklet! Isso significa que não existe botão de "Baixar".<br>Você o instala como se fosse adicionar uma página aos seus favoritos.</em></p>
</div>

> [!IMPORTANT]
> 1. Pressione **`Ctrl + Shift + B`** no seu navegador para exibir a Barra de Favoritos abaixo da barra de endereço.
> 2. Clique com o botão direito na barra, e depois em **"Adicionar Página"** (ou Adicionar Favorito).
> 3. Escolha um **Nome** legal (Ex: "🌟 EasyQuiz Ninja").
> 4. Copie o bloco de código exato abaixo que se adequa ao seu estilo, e **Cole na caixa de URL (Endereço)** do favorito.
> 5. Para usar, basta estar no site do seu Quiz e **clicar no favorito que você salvou**!

### Códigos Oficiais de Injeção:

#### 🖥️ OPÇÃO A: Modo Legacy (Painel Visual Completo)
Ideal para visualizar o fluxo completo, debugar os pensamentos da IA e configurar abas visuais.
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz erro: '+e)}}).catch(function(e){alert('EasyQuiz falha no download: '+e)})})();
```

#### 🥷 OPÇÃO B: Modo Discreto (Totalmente Invisível)
*Recomendado!* Não flutua telas gigantes. Ele age por atalhos silenciosos e minúsculos avisos (Toasts).
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```
*(Clique no botão mágico de **Copy/Copiar** que aparece ao passar o mouse por cima do código)*

---

## 📚 Manuais Avançados e Detalhados

Construímos guias expansivos caso você queira dominar 100% da plataforma. Escolha o guia que atende a sua necessidade de exploração:

### 📖 [1. Guia Detalhado de Instalação (E como pegar a API Key)](docs/INSTALACAO.md)
Tudo sobre como instalar, dúvidas comuns, compatibilidade em Desktop, e um **passo-a-passo detalhado com o link oficial para você gerar a sua Chave de API do Gemini no Google AI Studio (Totalmente Grátis).** Se for sua primeira vez, *você deve ler este guia*.

### 📖 [2. Lista de Comandos e os Modos de Uso](docs/MODOS_DE_USO.md)
Como usar o poder total de forma silenciosa? Aprenda *literalmente* tudo. Desde o atalho **`Shift + Z`** de emergência para abortar fluxos furtivamente, até como configurar auto-aplicadores de cliques e transição de IAs. Detalhamento integral da UI e dos Atalhos Ninja!

### 📖 [3. Mecânicas, Motores de Detecção e Tecnologias](docs/MECANICAS.md)
Leitura obrigatória para curiosos de tecnologia! Explicamos detalhadamente as artimanhas por trás dos panos: simulação de PointerEvents, evasões de React e Angular DOM Hijacking, e as capturas multimodais para visão computacional de baixo nível usando a sua placa de vídeo!

---

## 🌎 Suporte e Compatibilidade Tecnológica
A tecnologia embarcada requer o motor **Chromium**. Se você for do ecossistema Apple, não utilize o Safari.

| <img src="https://img.shields.io/badge/Google_Chrome-4285F4?style=flat-square&logo=googlechrome&logoColor=white" /> | <img src="https://img.shields.io/badge/Microsoft_Edge-0078D7?style=flat-square&logo=microsoftedge&logoColor=white" /> | <img src="https://img.shields.io/badge/Brave-FF2000?style=flat-square&logo=brave&logoColor=white" /> | <img src="https://img.shields.io/badge/Opera-FF1B2D?style=flat-square&logo=opera&logoColor=white" /> |
| :---: | :---: | :---: | :---: |
| ✅ | ✅ | ✅ | ✅ |

### 🛠️ Sites Comportados pelo Algoritmo:
* **Google Forms, Canvas (Instructure), Moodle, Blackboard**
* Quizzes HTML5 clássicos, e dezenas de plataformas customizadas, já que as injeções semânticas detectam padrões de inputs globais, independente da formatação customizada da escola/empresa.

---
> *Este é um projeto de código aberto, focado puramente em estudos de inteligência artificial, dom hacking e expansão cognitiva automatizada. Use com responsabilidade e excelência!* ⚡
