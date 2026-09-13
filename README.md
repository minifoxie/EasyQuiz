<div align="center">
  <img src="dist/Canvas.png" alt="EasyQuiz" width="160" />
  <h1>EasyQuiz <span style="color:#00e5ff;font-family:monospace;font-size:.7em;">v1.8.6</span></h1>
  <p><b>Script de Bookmarklet com IA para resolução furtiva de quizzes</b></p>
  <sub>⚠️ Beta Precisa — em desenvolvimento ativo, pode ter instabilidades.</sub>
  <br><br>
  <a href="https://minifoxie.github.io/EasyQuiz/">
    <img src="https://img.shields.io/badge/Acesse_o_Site_Oficial-2B2D31?style=for-the-badge&logo=codeigniter&logoColor=white" width="360" alt="Site Oficial" />
  </a>
</div>

<br>

> **Para a melhor experiência, acesse nosso site oficial.** Lá você encontra os códigos atualizados, tutorial de instalação visual e documentação interativa: **https://minifoxie.github.io/EasyQuiz/**

---

## O que é o EasyQuiz?

O EasyQuiz é um **Script de Bookmarklet** — um script JavaScript salvo como favorito no navegador. Ao clicar nele em qualquer página de quiz, ele analisa a questão com a IA do Google Gemini e pode responder ou guiar você na resposta.

- **Sem instalação de extensão** — funciona como um simples favorito
- **Sem servidores** — toda a comunicação é direta entre seu navegador e a API do Google
- **Sua chave de API fica apenas no seu computador**

---

## Modos de Operação

Existem dois modos. Escolha o que preferir:

### 🥷 Modo Discreto _(Recomendado)_
Opera completamente invisível. Sem botões na tela, sem nada visível. Você controla tudo por atalhos secretos do teclado.

**Atalhos principais:**
| Tecla | Ação |
| :--- | :--- |
| `Shift + Q` / `Alt + Q` | Analisar e resolver a questão atual |
| `Shift + A` | Configurar sua chave de API |
| `Shift + H` | Ver logs e detalhes da análise |
| `Shift + Z` | Cancelar qualquer ação em andamento |

**Código para instalar:**
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@69de6dc/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```

<details>
<summary>📖 Manual completo do Modo Discreto</summary>
<br>

### Como funciona
O Modo Discreto roda completamente em segundo plano. Você não vê nada na tela até pressionar um atalho. Toda a comunicação com a IA acontece de forma silenciosa.

Quando a IA termina de processar, um pequeno indicador discreto aparece no canto da tela. Pressione qualquer tecla para ir "liberando" a resposta caractere por caractere (imitando digitação humana), ou clique para selecionar uma opção.

### Atalhos completos
| Atalho | O que faz |
| :--- | :--- |
| `Shift + Q` / `Alt + Q` | Analisa a questão atual e busca resposta na IA |
| `Shift + R` | Re-analisa a questão (útil se algo falhou) |
| `Shift + Z` | Cancela qualquer análise ou digitação em andamento |
| `Shift + A` | Abre o gerenciador de chaves de API |
| `Shift + M` | Troca o modelo de IA (Gemini Flash, Pro, etc.) |
| `Shift + V` | Exibe a imagem que foi enviada para a IA |
| `Shift + H` | Abre painel de logs completo |
| `Shift + C` | Menu de comandos rápidos |
| `Shift + I` | Mostra status rápido |
| `Escape` | Fecha qualquer menu aberto |

</details>

---

### 🖥️ Modo Legacy (Painel HUD)
Exibe um painel flutuante completo na tela, com abas para ver o raciocínio da IA, logs, capturas de tela e configurações. Ideal para quem quer ver exatamente o que está acontecendo.

Ative com **`Alt + Q`** após clicar no bookmarklet.

**Código para instalar:**
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@69de6dc/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz erro: '+e)}}).catch(function(e){alert('EasyQuiz falha no download: '+e)})})();
```

<details>
<summary>📖 Manual completo do Modo Legacy</summary>
<br>

### As abas do Painel
- **Principal** — botão "Resolver Questão" e resultado da IA
- **Cérebro** — mostra o raciocínio interno que a IA usou antes de responder
- **Mídia** — a imagem exata que foi enviada para a IA (útil para questões visuais)
- **Terminal** — logs técnicos de tudo que aconteceu
- **Configurações** — onde você coloca sua chave de API e muda o modelo

### Como usar
1. Clique no bookmarklet instalado em qualquer quiz
2. Pressione `Alt + Q` para abrir o painel
3. Vá em **Configurações** (ícone de engrenagem) e adicione sua chave de API
4. Volte para a aba principal e clique em **"RESOLVER QUESTÃO ATUAL"**
5. A IA analisará e você pode usar "Injetar Resposta" para preencher automaticamente

</details>

---

## Como instalar

1. **Abra a barra de favoritos** no Chrome: `Ctrl + Shift + B`
2. **Clique com o botão direito** na barra → _Adicionar página_
3. **No campo URL**, cole o código do modo que você escolheu acima
4. **Salve** com qualquer nome (ex: "EasyQuiz Discreto")
5. Acesse um quiz e **clique no favorito** criado

---

## Como obter uma chave de API

A chave de API é gratuita e necessária para a IA funcionar.

1. Acesse **[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)**
2. Clique em **"Create API Key"**
3. Copie a chave gerada (começa com `AIzaSy...`)
4. No EasyQuiz, configure com `Shift + A` (Discreto) ou na aba de Configurações (Legacy)

> **Recomendamos cadastrar 4 ou mais chaves** de contas diferentes para ter mais velocidade e evitar limites de uso. O sistema distribui as requisições automaticamente entre elas.

---

## Compatibilidade

Funciona apenas em navegadores baseados em **Chromium**:

| Chrome ✅ | Edge ✅ | Brave ✅ | Opera ✅ | Firefox ❌ | Safari ❌ |
| :---: | :---: | :---: | :---: | :---: | :---: |

Safari e Firefox bloqueiam as APIs de captura de tela usadas pelo sistema.

---

## Como a IA resolve as questões?

O sistema passa por 4 etapas internas a cada análise:

1. **Leitura** — varre a página procurando o bloco que parece ser uma questão de prova
2. **Captura** — se houver imagens ou fórmulas, faz um screenshot delas
3. **Raciocínio** — envia tudo para o Gemini e força a IA a pensar passo a passo antes de responder
4. **Ação** — injeta a resposta simulando digitação física real para não ser detectado

> A sua chave de API nunca passa por nossos servidores — a comunicação é direta entre o seu navegador e o Google.

---

<div align="center">
  <br>
  <i>Desenvolvido com:</i><br><br>
  <img src="https://img.shields.io/badge/Google_Gemini-1A73E8?style=for-the-badge&logo=googlebard&logoColor=white" />
  <img src="https://img.shields.io/badge/Claude_Sonnet-D97757?style=for-the-badge&logo=anthropic&logoColor=white" />
  <img src="https://img.shields.io/badge/Antigravity_IDE-000000?style=for-the-badge&logo=google&logoColor=white" />
</div>
