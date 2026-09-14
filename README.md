# EasyQuiz

<p align="center">
  <img src="docs/logo.png?v=2.5" width="160" alt="EasyQuiz Logo">
</p>

> Use o EasyQuiz diretamente no navegador para analisar quizzes e preencher respostas com a ajuda do Google Gemini.

## Comece aqui

1. Abra o [site oficial do EasyQuiz](https://minifoxie.github.io/EasyQuiz/).
2. Escolha **Modo Discreto** ou **Modo Legacy**.
3. Arraste o botão do modo escolhido para a barra de favoritos.
4. Abra o quiz, clique no favorito salvo e configure sua chave do Gemini.

### Acesso rápido

- [Instalar pelo site](https://minifoxie.github.io/EasyQuiz/)
- [Ir direto aos códigos de instalação](#códigos-de-instalação)
- [Criar uma chave gratuita no Google AI Studio](https://aistudio.google.com/app/apikey)
- [Abrir o repositório no GitHub](https://github.com/minifoxie/EasyQuiz)

---

## O que é o EasyQuiz?

O EasyQuiz é um bookmarklet: um favorito especial que carrega o script na página do quiz. Ele funciona no navegador, sem extensão e sem servidor próprio. A inteligência artificial é acessada pela API do Google Gemini.

### Escolha um modo

**Modo Discreto** é indicado para quem quer trabalhar apenas com atalhos e poucos indicadores na tela.

**Modo Legacy** é indicado para quem quer um painel visual com configurações, logs, métricas e ferramentas de inspeção.

### Configure sua chave do Gemini

1. Crie uma chave gratuita no [Google AI Studio](https://aistudio.google.com/app/apikey).
2. No Modo Discreto, pressione `Shift + A` e cole a chave.
3. No Modo Legacy, abra o painel com `Alt + Q` e acesse as configurações.

Você pode cadastrar mais de uma chave para alterná-las quando uma atingir o limite de uso. As chaves ficam salvas localmente no navegador e não são enviadas para o site do EasyQuiz.

---

## Atalhos do Modo Discreto

| Atalho | Função |
|---|---|
| `Shift + Q` | Analisa a questão selecionada e calcula a resposta silenciosamente |
| `Shift + A` | Abre o gerenciador para configurar ou adicionar chaves API |
| `Shift + Z` | Interrompe imediatamente a execução e aborta digitações |
| `Shift + R` | Força a re-análise da questão |
| `Shift + M` | Alterna entre modelos do Gemini |
| `Shift + V` | Visão Computacional (Lê imagens, gráficos e equações da tela) |
| `Shift + C` | Abre painel rápido de comandos e atalhos |

No Modo Legacy, clique no bookmarklet e pressione `Alt + Q` para abrir o painel.

---

## Códigos de instalação

Se preferir não usar o site para arrastar o botão, crie um novo favorito no seu navegador e cole o código correspondente no campo **URL**:

<details>
<summary><strong>Código Modo Discreto</strong></summary>

<!-- BOOKMARKLET:DISCRETE:START -->
```javascript
javascript:(function(){function L(f){var v='?v='+Date.now();return fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@65697af/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 1;return r.text()}).catch(function(){return fetch('https://fastly.jsdelivr.net/gh/minifoxie/EasyQuiz@65697af/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 2;return r.text()})}).catch(function(){return fetch('https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 3;return r.text()})}).then(function(t){if(!t||t.trim().charAt(0)==='<')throw new Error('Código indisponível');return t})}L('discrete.js').then(function(c){try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```
<!-- BOOKMARKLET:DISCRETE:END -->
</details>

<details>
<summary><strong>Código Modo Legacy</strong></summary>

<!-- BOOKMARKLET:LEGACY:START -->
```javascript
javascript:(function(){function L(f){var v='?v='+Date.now();return fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@65697af/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 1;return r.text()}).catch(function(){return fetch('https://fastly.jsdelivr.net/gh/minifoxie/EasyQuiz@65697af/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 2;return r.text()})}).catch(function(){return fetch('https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 3;return r.text()})}).then(function(t){if(!t||t.trim().charAt(0)==='<')throw new Error('Código indisponível');return t})}L('easyquiz.js').then(function(c){try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz Legacy erro: '+e)}}).catch(function(e){alert('EasyQuiz Legacy falha no download: '+e)})})();
```
<!-- BOOKMARKLET:LEGACY:END -->
</details>

---

## Licença e créditos

Distribuído sob a Licença MIT. Uso livre para fins educacionais e experimentais.