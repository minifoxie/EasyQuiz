# EasyQuiz

<p align="center">
  <img src="docs/logo.png?v=2.5" width="160" alt="EasyQuiz Logo">
</p>

> **O Motor Autônomo Definitivo para Quizzes — 100% Client-Side no Navegador.**
> Resolva provas, gere respostas e analise imagens com cliques mínimos. Sem servidores ou extensões.

---

## 🌐 Site Oficial e Instalação

Para acessar o painel interativo, tutoriais visuais e a maneira mais fácil de instalar o script via **arrastar-e-soltar**, visite nosso site oficial:

**[Acesse o Site Oficial do EasyQuiz](https://minifoxie.github.io/EasyQuiz/)**

Lá você encontra a documentação visual completa, atualizações recentes e configuração dos módulos.

---

## 🚀 O que é o EasyQuiz?

O **EasyQuiz** é um script inteligente executado via bookmarklet diretamente no seu navegador. Ele utiliza inteligência artificial conectada ao **Google Gemini** para ler enunciados de questões de forma invisível e responder de forma autônoma, replicando a digitação humana.

### 🎭 Modos de Operação

O projeto possui duas modalidades de uso adaptáveis às suas necessidades:

1. **Modo Discreto (Recomendado):** 
   - 100% invisível. Sem painéis flutuantes.
   - Operado exclusivamente através de atalhos rápidos do teclado.
   - Digitação ninja com eventos nativos de teclado para evitar detecção.
   
2. **Modo Legacy (Painel HUD):**
   - Laboratório visual completo.
   - Abre uma janela lateral flutuante e isolada via *Shadow DOM*.
   - Permite auditar o raciocínio (*Chain of Thought*) da IA, ler os logs e visualizar a telemetria em tempo real.

---

## ⚙️ Como Começar (Em 3 Passos)

1. Entre no **[Site Oficial](https://minifoxie.github.io/EasyQuiz/)**.
2. Escolha o modo de sua preferência e arraste o botão **"EQ Discret"** ou **"EQ Legacy"** para a sua Barra de Favoritos (`Ctrl + Shift + B` para exibi-la).
3. Abra a página do quiz que deseja resolver, clique no favorito para injetar o motor, e utilize os atalhos abaixo.

### 🔑 Configurando sua Chave API
O cérebro do EasyQuiz roda via Google Gemini, o que requer uma API Key (gratuita e configurada em 1 minuto).
- Acesse o [Google AI Studio](https://aistudio.google.com/app/apikey) e gere uma chave.
- Pressione `Shift + A` (no Modo Discreto) ou abra o painel no Modo Legacy para colar a sua chave.
- *Dica Zero Limits:* Se você cadastrar mais de uma chave (de contas diferentes), o motor fará uma rotação automática para evitar bloqueios de limite de uso.

---

## ⌨️ Tabela de Atalhos de Teclado (Modo Discreto)

| Atalho | Função |
|---|---|
| `Shift + Q` | Analisa a questão selecionada e calcula a resposta silenciosamente |
| `Shift + A` | Abre o gerenciador para configurar ou adicionar chaves API |
| `Shift + Z` | Interrompe imediatamente a execução e aborta digitações |
| `Shift + R` | Força a re-análise da questão |
| `Shift + M` | Alterna entre modelos do Gemini |
| `Shift + V` | Visão Computacional (Lê imagens, gráficos e equações da tela) |
| `Shift + C` | Abre painel rápido de comandos e atalhos |

*Para o **Modo Legacy**, apenas clique no bookmarklet e abra o painel flutuante com `Alt + Q`.*

---

## 🛠️ Códigos de Injeção Manuais

Se preferir não usar o site para arrastar o botão, crie um novo favorito no seu navegador e cole o código correspondente no campo **URL**:

<details>
<summary><strong>Código Modo Discreto</strong></summary>

```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@latest/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EQ: '+e)}}).catch(function(e){alert('EQ falha: '+e)})})();
```
</details>

<details>
<summary><strong>Código Modo Legacy</strong></summary>

```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@latest/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EQ: '+e)}}).catch(function(e){alert('EQ falha: '+e)})})();
```
</details>

---

## 📜 Licença e Créditos

Distribuído sob a Licença MIT. Uso livre para fins educacionais e experimentais.
Desenvolvido e potencializado por **Google Gemini**, **Claude**, e **Antigravity**.