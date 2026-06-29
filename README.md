# Jornada do Conhecimento 3D

Jogo de tabuleiro 3D em espiral para crianças (calibrado para ~8 anos / 3º ano), onde jogadores respondem perguntas de diferentes disciplinas para avançar no tabuleiro. O objetivo é chegar ao centro do labirinto primeiro.

## 📋 Requisitos

- Navegador moderno com suporte a WebGL (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregar Three.js e GSAP via CDN)

## 🚀 Como executar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` diretamente no navegador
3. Não é necessário servidor web ou instalação de dependências

Alternativamente, use um servidor local:
```bash
# Python 3
python -m http.server

# Node.js (com npx)
npx serve

# PHP
php -S localhost:8000
```

## 🎮 Como jogar

1. Abra o arquivo `index.html` em qualquer navegador moderno.
2. Configure a quantidade de jogadores, nomes e cores.
3. Escolha o modo do pool de perguntas e a frequência de reabastecimento dos tanques.
4. Clique em **Começar Aventura!**.
5. Na sua vez, escolha uma disciplina no painel lateral e responda a pergunta.
6. Acertos avançam o peão; erros fazem recuar.
7. Responda corretamente dentro do tempo para ganhar +1 casa de bônus: 5s nas fáceis, 8s nas médias e 10s nas difíceis.
8. O jogo termina quando todos os jogadores chegam ao centro do tabuleiro.

## ✨ Recursos

- Tabuleiro 3D em espiral 12x12 (144 casas) com Three.js.
- 6 disciplinas: Matemática, Inglês, Português, Geografia, História do Brasil e Biologia.
- Tanques de disciplina que definem a dificuldade e a recompensa de cada pergunta.
- Casas surpresa com cartas especiais.
- Bônus rotativo por disciplina.
- Botão de tela cheia no canto superior direito.
- **Histórico de respostas salvo no cache do navegador** (localStorage).
- **Ranking histórico** na tela de configuração, listando cada jogador individualmente e ordenado pelo tempo total pessoal de jogo, percentual de acertos e respostas rápidas.
- **Explicação pós-resposta** em cada pergunta, reforçando o aprendizado tanto nos acertos quanto nos erros.
- **Detalhamento completo do jogador** ao clicar em um resultado do ranking, com opção de excluir o registro do jogo.
- **Relatório completo de desempenho no final da partida**, incluindo:
  - Total de perguntas respondidas
  - Acertos e erros
  - Taxa de acerto
  - Desempenho por disciplina
  - Dificuldades escolhidas
  - Tempo médio e total de resposta
  - Respostas rápidas (bônus de velocidade)
  - Lista detalhada de perguntas e respostas

## 🧠 Aspectos Psicológicos e Pedagógicos

O jogo foi desenhado com princípios pedagógicos e psicológicos para promover aprendizagem significativa em crianças de ~8 anos:

### Explicação Pós-Resposta
- **Por que funciona:** Explicar o "porquê" da resposta fortalece a retenção e a compreensão. A criança não apenas memoriza a resposta correta, mas entende o raciocínio por trás dela.
- **Implementação:** Cada pergunta possui uma explicação pedagógica que aparece imediatamente após a resposta, tanto no acerto quanto no erro.

### Feedback de Erro Construtivo
- **Evita linguagem negativa:** Não usa termos como "Resposta errada" ou "é errando que se aprende". Em vez disso, foca na instrução do correto.
- **Revisão contextualizada:** A mensagem de erro inclui o enunciado da pergunta (ex: "Vamos revisar: 'O antônimo de alto é?'") para que a criança reconecte a resposta correta ao contexto.
- **Cor neutra:** O feedback visual usa azul (`#3f37c9`) em vez de vermelho, reduzindo a carga emocional negativa associada ao erro.

### Punição Reduzida
- **Recuo de 1 casa:** Ao errar, o jogador recua apenas 1 casa, independentemente da dificuldade. Isso reduz a frustração e mantém o foco no aprendizado em vez da penalidade.
- **Punição não escalonada:** A punição não aumenta com a dificuldade, evitando que perguntas mais difíceis sejam percebidas como ameaças.

### Exposição ao Erro Saudável
- **Idade apropriada:** Crianças de 8 anos estão em fase ideal para lidar com erros desde que sejam informativos e não avaliativos.
- **Erro como revisão:** O erro é apresentado como oportunidade de revisão, não como fracasso pessoal.
- **Ausência de comparação imediata:** Não há ranking comparativo durante o jogo, apenas relatório individual ao final, reduzindo pressão social.

### Bônus por Velocidade
- **Reforço positivo:** Responder rápido dá +1 casa extra, incentivando agilidade sem punir a lentidão.
- **Tempo calibrado:** 5s (fácil), 8s (médio), 10s (difícil) — tempos adequados para a faixa etária.

### Relatório Individual
- **Metacognição:** Ao final, cada jogador vê seu desempenho detalhado, promovendo reflexão sobre aprendizagem.
- **Foco em progresso pessoal:** O ranking histórico é pessoal (cada jogador tem seu próprio tempo), não comparativo entre crianças.

### Progresso Baseado em Dedicação, não Sorte
- **Sem aleatoriedade:** Não há dados ou sorte. O progresso depende exclusivamente de responder corretamente às perguntas, reforçando que o aprendizado é o caminho para o sucesso.
- **Mérito cognitivo:** A criança aprende que o esforço em estudar e responder corretamente tem resultado direto e previsível no jogo.

### Incentivo à Diversidade de Disciplinas
- **Bônus rotativo:** Cada disciplina tem um período de bônus (+1 casa extra), incentivando os jogadores a explorarem diferentes assuntos em vez de focar apenas em um confortável.
- **Tanques de disciplina:** O sistema de dificuldade/recompensa por disciplina equilibra o desafio, encorajando experimentação e aprendizado multidisciplinar.

## 🛠 Tecnologias

- HTML5 + CSS3 + JavaScript puro (vanilla)
- Three.js para renderização 3D
- GSAP para animações dos peões

## 📁 Estrutura

- `index.html`: único arquivo da aplicação, contendo markup, estilos e toda a lógica do jogo.
- `PLANNING.md`: visão geral, arquitetura e convenções do projeto.
- `TASK.md`: registro das tarefas e versões implementadas.
- `README.md`: documentação do projeto.

## 🔧 Desenvolvimento

O projeto usa uma arquitetura de arquivo único para facilitar o desenvolvimento e a distribuição. Convenções:

- Código em português (nomes de variáveis, funções e interface)
- Estilos inline aceitos para prototipagem rápida
- Preferir edições mínimas e focadas
- Máximo de 500 linhas por arquivo (refatorar se necessário)

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Adicionar novas perguntas ao pool
- Melhorar a interface visual
- Corrigir bugs
- Sugerir novas funcionalidades
