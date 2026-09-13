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
