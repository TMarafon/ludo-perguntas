# Jornada do Conhecimento 3D

## Visão Geral
Jogo de tabuleiro 3D em espiral para crianças (calibrado para ~8 anos / 3º ano), onde jogadores respondem perguntas de diferentes disciplinas para avançar no tabuleiro. O objetivo é chegar ao centro do labirinto primeiro.

## Tecnologias
- HTML5 + CSS3 + JavaScript puro (vanilla)
- Three.js para renderização 3D
- GSAP para animações dos peões

## Arquitetura
- `index.html`: único arquivo da aplicação, contendo markup, estilos e toda a lógica do jogo.
- Sem build tools ou dependências locais.

## Estrutura do Jogo
1. Tela de configuração: quantidade de jogadores, nomes, cores e modo do pool de perguntas.
2. Tabuleiro 3D em espiral 12x12 (144 casas).
3. Painel lateral com tanques de disciplinas (Matemática, Inglês, Português, Geografia, História do Brasil, Biologia).
4. Modal de perguntas e respostas.
5. Tela de feedback e ranking final.

## Convenções
- Código em português (nomes de variáveis, funções e interface).
- Estilos inline aceitos para prototipagem rápida.
- Preferir edições mínimas e focadas.

## Funcionalidades Planejadas / Conhecidas
- Pool de perguntas depletado por jogador ou em conjunto.
- Sistema de tanques que diminui com acertos e recarrega com inatividade.
- Casas surpresa (16 casas a partir da casa 10): ao parar, o jogador sorteia uma carta que pode avançar/recuar casas, trocar de posição com adversário ou reabastecer um tanque de disciplina. Cada casa pode ser ativada por qualquer jogador toda vez que cair nela.
