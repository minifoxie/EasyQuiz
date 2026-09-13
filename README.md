# EasyQuiz

> **Sistema de auto adaptação e auto resposta a sites com autonomia completa.**
> Versão Beta — 100% Client-Side no Navegador.

---

Para acessar o painel interativo, tutoriais visuais e atalhos rápidos, visite nosso site oficial:

**[Acesse o Site Oficial do EasyQuiz](https://minifoxie.github.io/EasyQuiz/)**

---

## O que é o EasyQuiz?

O **EasyQuiz** é um script de bookmarklet executado diretamente no seu navegador. Ele utiliza inteligência artificial conectada ao **Google Gemini** para ler enunciados de questões e responder de forma autônoma, sem necessidade de servidores intermediários ou extensões pesadas.

O projeto possui duas modalidades de uso:

1. **Modo Discreto (Stealth):** 100% invisível. Não abre nenhuma janela na tela. É operado silenciosamente através de atalhos do teclado.
2. **Modo Legacy (Painel HUD):** Abre uma janela lateral completa e flutuante para você auditar visualmente o raciocínio da IA, conferir imagens capturadas e gerenciar tudo com cliques.

---

## Como Instalar (Passo a Passo)

### Método 1: Arrastar para a Barra de Favoritos (Recomendado)
1. Abra o site: **[https://minifoxie.github.io/EasyQuiz/](https://minifoxie.github.io/EasyQuiz/)**
2. Vá até a aba do modo desejado (**Modo Discreto** ou **Modo Legacy**).
3. Clique e arraste o botão **" Arrastar para Favoritos"** diretamente para a sua barra de favoritos do navegador.

### Método 2: Manualmente
1. No Chrome ou Edge, pressione `Ctrl + Shift + B` para exibir a Barra de Favoritos.
2. Clique com o botão direito na barra e selecione **Adicionar página** (ou Novo Favorito).
3. No campo **Nome**, coloque `EasyQuiz`.
4. No campo **URL**, cole o código JavaScript do modo desejado (abaixo).
5. Clique em **Salvar**.

---

## Códigos dos Bookmarklets

### Modo Discreto (Recomendado)
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@c923b65/dist/discrete.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(c)}catch(e){alert('EasyQuiz Discreto erro: '+e)}}).catch(function(e){alert('EasyQuiz Discreto falha no download: '+e)})})();
```

### Modo Legacy (Painel HUD)
```javascript
javascript:(function(){fetch('https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@c923b65/dist/easyquiz.js?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();(0,eval)(c)}catch(e){alert('EasyQuiz erro: '+e)}}).catch(function(e){alert('EasyQuiz falha no download: '+e)})})();
```

---

## Tabela de Atalhos de Teclado

| Atalho | Modo | Função |
|---|---|---|
| `Shift + Q` | Discreto | Analisa a questão selecionada e calcula a resposta |
| `Shift + A` | Discreto | Abre o gerenciador para configurar ou adicionar chaves API |
| `Shift + Z` | Discreto | Interrompe imediatamente qualquer digitação ou requisição |
| `Shift + R` | Discreto | Força a re-análise da questão |
| `Shift + M` | Discreto | Alterna entre modelos do Gemini (Flash / Pro) |
| `Shift + V` | Discreto | Pisca na tela a imagem capturada para questões visuais |
| `Alt + A` ou `Alt + Q` | Legacy | Abre e fecha o painel flutuante |

---

## Configuração Centralizada de API Keys

As chaves de API do Google Gemini são **centralizadas**. Se você cadastrar sua chave no Modo Discreto (`Shift + A`), ela estará automaticamente disponível no Modo Legacy (`Alt + A` ou `Alt + Q`), e vice-versa.

### Como obter sua chave gratuita:
1. Acesse o **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Clique em **Create API Key**.
3. Copie a chave gerada (começa com `AIzaSy...`).
4. Pressione `Shift + A` no Modo Discreto ou abra a engrenagem no Modo Legacy e cole a chave.

### Dica: Múltiplas Chaves para Alta Velocidade
Recomendamos cadastrar **2 ou mais chaves de contas diferentes** do Google. O EasyQuiz fará o balanceamento automático de carga entre elas, garantindo velocidade máxima e zero bloqueios por limite de uso.

---

## Tecnologias e Créditos

Desenvolvido utilizando as melhores ferramentas e modelos de IA:
- **Google Gemini**
- **Claude Sonnet**
- **Antigravity IDE**
- **GitHub**

---

## Licença

Distribuído sob a Licença MIT. Uso livre para fins educacionais e pessoais.


### Modo Discreto:
O Modo Discreto funciona 100% invisível no navegador. 
Atalhos:
- Shift + A: Abre o menu para adicionar chave da API.
- Shift + Q: Lê a questão e obtém a resposta da IA e responde.
- Shift + Z: Cancela qualquer execução.