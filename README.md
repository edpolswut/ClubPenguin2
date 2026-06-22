<h1 align="center">🐧 Club Penguin 2 - p5.js</h1>

## 📋 Sobre o Projeto

Este projeto é um jogo de navegador web "point-and-click" que recria a experiência clássica do Club Penguin. O jogo inclui um sistema de movimento com deteção de colisão por mapas de cor, personalização do pinguim, um sistema de loja funcional e três minijogos clássicos integrados.

## 👤 Membros

Cassiano Magno Chagas
Edgar Felipe Polswut
Nicolas Jacinto Grzebieniak de Oliveira

## ▶️ Vídeo de defesa

https://youtu.be/CwStj8XSdxk

## ✨ Funcionalidades

* **Movimentação Point-and-Click:** Clique em qualquer lugar do cenário para mover o pinguim. O movimento é restrito por mapas de colisão (Collision Maps).
* **Sistema de Guarda-Roupa:** Equipe e desequipe chapéus, roupas, acessórios de rosto e pescoço através do "Player Card" interativo.
* **Loja de Roupas (Cloth Store):** Explore o catálogo e compre novos itens com as moedas ganhas.
* **Minijogos:**
  * ☕ **Empilha Pilhas (Bean Counter):** Descarregue sacos de café dos camiões e desvie-se de bigornas caindo.
  * 🌊 **Boia Cross (Hydro Hopper):** Sobreviva numa boia enquanto se desvia de obstáculos na água.
  * 🛟 **SOS Puffle:** Navegue por um puzzle de água e plataformas para resgatar um Puffle perdido antes de ficar sem fôlego!

## 🚀 Tecnologias Utilizadas

* **[p5.js](https://p5js.org/):** Renderização de canvas, sprites, áudio e loop principal do jogo.
* **JavaScript (ES6):** Lógica orientada a objetos (classes para cenas, botões, jogador e minijogos).
* **HTML/CSS:** Estrutura base de alojamento da aplicação no navegador.

## 🛠️ Como Executar o Projeto

Devido à forma como o `p5.js` e o navegador lidam com ficheiros locais (política CORS), é necessário correr o jogo através de um servidor local.

### Usando o VS Code
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**.
3. Clique com o botão direito no ficheiro `index.html` e selecione **"Open with Live Server"**. O navegador abrirá automaticamente o jogo.
