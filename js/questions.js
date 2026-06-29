// --- BANCO DE QUESTÕES (CALIBRADO PARA 8 ANOS / 3º ANO) ---
const questionPool = {
    Matematica: {
        facil: [
            { q: "Quanto é 23 + 12?", o: ["35", "45", "33", "25"], c: 0, e: "23 + 12 = 35. Some as unidades (3 + 2 = 5) e as dezenas (20 + 10 = 30)." },
            { q: "Se você tem 15 balas e ganha mais 11, quantas tem agora?", o: ["24", "25", "26", "27"], c: 2, e: "15 + 11 = 26. Quando ganhamos algo, usamos a adição." },
            { q: "Quanto é 45 - 11?", o: ["34", "32", "44", "36"], c: 0, e: "45 - 11 = 34. Subtraímos as unidades (5 - 1 = 4) e as dezenas (40 - 10 = 30)." },
            { q: "Quanto é 30 + 40?", o: ["50", "60", "70", "80"], c: 2, e: "30 + 40 = 70. Some as dezenas: 3 dezenas + 4 dezenas = 7 dezenas." },
            { q: "Mariana tinha 18 figurinhas e perdeu 5. Quantas restaram?", o: ["11", "12", "13", "14"], c: 2, e: "18 - 5 = 13. Quando perdemos algo, usamos a subtração." },
            { q: "Quanto é 50 - 20?", o: ["20", "30", "40", "10"], c: 1, e: "50 - 20 = 30. Subtraímos as dezenas: 5 dezenas - 2 dezenas = 3 dezenas." },
            { q: "Quanto é 12 + 12?", o: ["22", "24", "26", "20"], c: 1, e: "12 + 12 = 24. Some as unidades (2 + 2 = 4) e as dezenas (10 + 10 = 20)." },
            { q: "Se um aquário tem 9 peixes e colocamos mais 7, quantos ficam?", o: ["15", "16", "17", "14"], c: 1, e: "9 + 7 = 16. Adicionamos os peixes que já estavam com os que chegaram." },
            { q: "Quanto é 29 - 7?", o: ["22", "21", "23", "20"], c: 0, e: "29 - 7 = 22. Subtraímos 7 das 9 unidades, sobrando 2 unidades, e mantemos as 2 dezenas." },
            { q: "Papai comprou 10 maçãs e comeu 3. Quantas sobraram?", o: ["6", "7", "8", "5"], c: 1, e: "10 - 3 = 7. Quando comemos algo, usamos a subtração para saber o que sobrou." }
        ],
        media: [
            { q: "Quanto é 150 + 250?", o: ["300", "350", "400", "450"], c: 2, e: "150 + 250 = 400. Some as centenas (100 + 200 = 300) e as dezenas (50 + 50 = 100)." },
            { q: "Resolva: 35 - 17", o: ["18", "12", "22", "15"], c: 0, e: "35 - 17 = 18. Faça 35 - 10 = 25, depois 25 - 7 = 18." },
            { q: "Quanto é 85 + 15?", o: ["90", "95", "100", "105"], c: 2, e: "85 + 15 = 100. 85 + 10 = 95, e 95 + 5 = 100." },
            { q: "Se uma caixa tem 120 lápis e tiramos 40, quantos sobram?", o: ["70", "80", "90", "60"], c: 1, e: "120 - 40 = 80. Subtraímos 4 dezenas de 12 dezenas, sobrando 8 dezenas." },
            { q: "Quanto é 64 + 19?", o: ["81", "83", "73", "85"], c: 1, e: "64 + 19 = 83. 64 + 20 = 84, depois subtraímos 1 que colocamos a mais: 84 - 1 = 83." },
            { q: "Resolva: 100 - 45", o: ["65", "55", "45", "50"], c: 1, e: "100 - 45 = 55. 100 - 40 = 60, depois 60 - 5 = 55." },
            { q: "Em uma escola há 45 meninos e 38 meninas. Quantos alunos no total?", o: ["83", "73", "85", "82"], c: 0, e: "45 + 38 = 83. Some as unidades (5 + 8 = 13), depois as dezenas (40 + 30 = 70), totalizando 83." },
            { q: "Quanto é 200 - 120?", o: ["70", "90", "80", "60"], c: 2, e: "200 - 120 = 80. 200 - 100 = 100, depois 100 - 20 = 80." },
            { q: "Quanto é 75 + 25?", o: ["90", "100", "110", "105"], c: 1, e: "75 + 25 = 100. 75 + 20 = 95, e 95 + 5 = 100." },
            { q: "Tia Jane fez 60 doces e vendeu 22. Quantos sobraram?", o: ["38", "42", "36", "48"], c: 0, e: "60 - 22 = 38. 60 - 20 = 40, depois 40 - 2 = 38." }
        ],
        dificil: [
            { q: "Quanto é 134 + 58?", o: ["182", "192", "194", "188"], c: 1, e: "134 + 58 = 192. 134 + 50 = 184, e 184 + 8 = 192." },
            { q: "Resolva de cabeça: 500 - 125", o: ["375", "425", "385", "365"], c: 0, e: "500 - 125 = 375. 500 - 100 = 400, depois 400 - 25 = 375." },
            { q: "Faça a conta: (40 + 20) - 15", o: ["35", "45", "55", "50"], c: 1, e: "(40 + 20) - 15 = 60 - 15 = 45. Resolva primeiro o que está dentro dos parênteses." },
            { q: "Se um livro tem 350 páginas e li 149, quantas faltam?", o: ["201", "199", "211", "202"], c: 0, e: "350 - 149 = 201. 350 - 100 = 250, 250 - 40 = 210, 210 - 9 = 201." },
            { q: "Quanto é 245 + 155?", o: ["390", "400", "410", "405"], c: 1, e: "245 + 155 = 400. 200 + 100 = 300, 40 + 50 = 90, 5 + 5 = 10, total 400." },
            { q: "Resolva: 1000 - 300 - 50", o: ["600", "750", "650", "700"], c: 2, e: "1000 - 300 - 50 = 650. Subtraia na ordem: 1000 - 300 = 700, depois 700 - 50 = 650." },
            { q: "Lucas tem 138 cards, Pedro tem 52. Quantos cards eles têm juntos?", o: ["180", "190", "188", "192"], c: 1, e: "138 + 52 = 190. 138 + 50 = 188, e 188 + 2 = 190." },
            { q: "Quanto é 312 - 45?", o: ["267", "257", "277", "263"], c: 0, e: "312 - 45 = 267. 312 - 40 = 272, depois 272 - 5 = 267." },
            { q: "Se eu somar 88 com 77, qual o resultado?", o: ["155", "165", "163", "153"], c: 1, e: "88 + 77 = 165. 80 + 70 = 150, e 8 + 7 = 15, total 165." },
            { q: "Resolva: 150 + 150 - 75", o: ["225", "250", "235", "215"], c: 0, e: "150 + 150 - 75 = 300 - 75 = 225. Resolva a adição primeiro, depois a subtração." }
        ]
    },
    Ingles: {
        facil: [
            { q: "Que cor em inglês é 'Red'?", o: ["Azul", "Verde", "Vermelho", "Amarelo"], c: 2, e: "'Red' é a palavra em inglês para a cor vermelha." },
            { q: "Como dizemos 'Olá' em inglês?", o: ["Goodbye", "Please", "Hello", "Thank you"], c: 2, e: "'Hello' é a saudação usada para dizer 'olá' em inglês." },
            { q: "O número 'Three' representa qual algarismo?", o: ["1", "2", "3", "4"], c: 2, e: "'Three' significa o número 3 em inglês." },
            { q: "Como se diz 'Gato' em inglês?", o: ["Dog", "Cat", "Bird", "Fish"], c: 1, e: "'Cat' é a palavra em inglês para gato." },
            { q: "Qual dessas cores é o 'Blue'?", o: ["Azul", "Branco", "Rosa", "Preto"], c: 0, e: "'Blue' é a cor azul em inglês." },
            { q: "O número 'Five' equivale a:", o: ["3", "4", "5", "6"], c: 2, e: "'Five' significa o número 5 em inglês." },
            { q: "Como se diz 'Tchau' em inglês?", o: ["Hi", "Goodbye", "Welcome", "Sorry"], c: 1, e: "'Goodbye' é usado para se despedir, equivalente ao 'tchau' em português." },
            { q: "Que cor é o sol? Em inglês é:", o: ["Yellow", "Green", "Orange", "Red"], c: 0, e: "O sol é geralmente representado na cor amarela, que em inglês é 'Yellow'." },
            { q: "Como se diz 'Cachorro' em inglês?", o: ["Cat", "Lion", "Dog", "Pig"], c: 2, e: "'Dog' é a palavra em inglês para cachorro." },
            { q: "O número 'Ten' é o número:", o: ["1", "5", "10", "100"], c: 2, e: "'Ten' significa o número 10 em inglês." }
        ],
        media: [
            { q: "Quem é a 'Mother' na família?", o: ["Pai", "Mãe", "Irmã", "Avó"], c: 1, e: "'Mother' significa 'mãe' em inglês." },
            { q: "O que significa o sentimento 'Happy'?", o: ["Triste", "Feliz", "Bravo", "Cansado"], c: 1, e: "'Happy' é o adjetivo que expressa alegria, ou seja, 'feliz'." },
            { q: "Como se diz 'Maçã' em inglês?", o: ["Orange", "Banana", "Apple", "Grape"], c: 2, e: "'Apple' é a palavra em inglês para maçã." },
            { q: "Se um animal é um 'Bird', ele pode:", o: ["Nadar", "Voar", "Correr muito", "Rastejar"], c: 1, e: "'Bird' significa pássaro, e a característica principal dos pássaros é voar." },
            { q: "Quem é o 'Father' na família?", o: ["Irmão", "Tio", "Pai", "Avô"], c: 2, e: "'Father' significa 'pai' em inglês." },
            { q: "O que significa o sentimento 'Sad'?", o: ["Assustado", "Feliz", "Triste", "Sonolento"], c: 2, e: "'Sad' é o adjetivo usado para dizer que alguém está triste." },
            { q: "Como dizemos 'Leão' em inglês?", o: ["Tiger", "Bear", "Lion", "Monkey"], c: 2, e: "'Lion' é a palavra em inglês para leão." },
            { q: "Qual fruta é uma 'Banana'?", o: ["Morango", "Melancia", "Banana", "Abacaxi"], c: 2, e: "'Banana' é o mesmo nome em inglês e em português." },
            { q: "Como se diz 'Obrigado' em inglês?", o: ["Please", "Excuse me", "Thank you", "You're welcome"], c: 2, e: "'Thank you' é a expressão usada para agradecer, equivalente a 'obrigado'." },
            { q: "O que é um 'Book'?", o: ["Caderno", "Livro", "Lápis", "Borracha"], c: 1, e: "'Book' significa 'livro' em inglês." }
        ],
        dificil: [
            { q: "Qual desses dias da semana é a 'Monday'?", o: ["Sábado", "Domingo", "Segunda-feira", "Sexta-feira"], c: 2, e: "'Monday' é o primeiro dia da semana em inglês, equivalente à segunda-feira." },
            { q: "Qual parte da casa é a 'Kitchen'?", o: ["Quarto", "Banheiro", "Cozinha", "Quintal"], c: 2, e: "'Kitchen' é o cômodo da casa onde preparamos as refeições: a cozinha." },
            { q: "O verbo 'Run' significa qual ação?", o: ["Pular", "Correr", "Dormir", "Cantar"], c: 1, e: "'Run' é o verbo que descreve a ação de correr." },
            { q: "Que cor em inglês é 'Purple'?", o: ["Cinza", "Roxo", "Rosa", "Marron"], c: 1, e: "'Purple' é a cor roxa em inglês." },
            { q: "O que significa o verbo 'Jump'?", o: ["Gritar", "Andar", "Dançar", "Pular"], c: 3, e: "'Jump' significa pular, como quando pulamos em um jogo." },
            { q: "Qual cômodo da casa é o 'Bedroom'?", o: ["Sala de estar", "Cozinha", "Quarto", "Garagem"], c: 2, e: "'Bedroom' junta 'bed' (cama) e 'room' (quarto), então significa quarto." },
            { q: "O que significa 'Gray' em inglês?", o: ["Cinza", "Preto", "Branco", "Verde"], c: 0, e: "'Gray' é a cor cinza em inglês." },
            { q: "Qual desses dias é o final de semana?", o: ["Tuesday", "Thursday", "Wednesday", "Sunday"], c: 3, e: "'Sunday' é o domingo, um dos dias de fim de semana." },
            { q: "O que significa a palavra 'Window'?", o: ["Porta", "Janela", "Parede", "Teto"], c: 1, e: "'Window' significa janela, a abertura da casa por onde entra luz." },
            { q: "Como se diz 'Irmão' em inglês?", o: ["Sister", "Brother", "Cousin", "Uncle"], c: 1, e: "'Brother' é a palavra em inglês para irmão." }
        ]
    },
    Portugues: {
        facil: [
            { q: "Qual palavra rima com 'Mão'?", o: ["Pé", "Coração", "Dente", "Cabelo"], c: 1, e: "'Coração' rima com 'mão' porque as duas têm a mesma sonoridade final: '-ão'." },
            { q: "Quantas sílabas tem a palavra 'GATO'?", o: ["1", "2", "3", "4"], c: 1, e: "'GA-TO' tem 2 sílabas: 'ga' e 'to'." },
            { q: "Qual o sinônimo da palavra 'Lindo'?", o: ["Feio", "Grande", "Bonito", "Pequeno"], c: 2, e: "Sinônimo é uma palavra com o mesmo significado. 'Lindo' e 'bonito' significam a mesma coisa." },
            { q: "Qual palavra está escrita de forma correta?", o: ["Caza", "Casa", "Kasa", "Caca"], c: 1, e: "'Casa' é a grafia correta. A letra 'C' antes de 'A' tem som de 'ca'." },
            { q: "Quantas sílabas tem a palavra 'SOL'?", o: ["1", "2", "3", "4"], c: 0, e: "'SOL' é uma sílaba só, pois tem uma só vogal: 'o'." },
            { q: "Qual o antônimo (oposto) de 'Alto'?", o: ["Forte", "Baixo", "Comprido", "Largo"], c: 1, e: "Antônimo é a palavra de significado oposto. O oposto de 'alto' é 'baixo'." },
            { q: "Qual palavra rima com 'Gato'?", o: ["Rato", "Cachorro", "Bola", "Janela"], c: 0, e: "'Rato' rima com 'gato' porque as duas terminam com o som '-ato'." },
            { q: "A palavra 'BOLA' começa com qual letra?", o: ["P", "D", "B", "T"], c: 2, e: "'BOLA' começa com a letra 'B'. A primeira letra é o 'B' de 'bola'." },
            { q: "Qual o sinônimo de 'Rápido'?", o: ["Devagar", "Ligeiro", "Forte", "Alto"], c: 1, e: "'Ligeiro' é sinônimo de 'rápido', pois as duas palavras indicam algo que acontece com velocidade." },
            { q: "Quantas sílabas tem a palavra 'PIPOCA'?", o: ["2", "3", "4", "5"], c: 1, e: "'PI-PO-CA' tem 3 sílabas: 'pi', 'po' e 'ca'." }
        ],
        media: [
            { q: "Qual a grafia correta da palavra abaixo?", o: ["Palhaço", "Palhaso", "Palhaco", "Palhasço"], c: 0, e: "'Palhaço' é a grafia correta, com 'lh' no meio e 'ç' no final." },
            { q: "O coletivo de cães (um grupo de cães) é chamado de:", o: ["Cardume", "Matilha", "Enxame", "Constelação"], c: 1, e: "'Matilha' é o nome dado a um grupo de cães." },
            { q: "Na frase 'O carro azul correu', qual palavra é um ADJETIVO (característica)?", o: ["O", "carro", "azul", "correu"], c: 2, e: "'Azul' é o adjetivo porque descreve uma característica do carro: a cor." },
            { q: "Qual das palavras abaixo precisa usar 'Ç'?", o: ["Almoco", "Cebola", "Cinema", "Bacia"], c: 0, e: "A palavra correta é 'almoço'. O 'ç' aparece antes de 'o' para manter o som suave." },
            { q: "O grupo de estrelas no céu forma uma:", o: ["Alcateia", "Constelação", "Banda", "Turma"], c: 1, e: "'Constelação' é o nome que damos a um conjunto de estrelas que formam uma figura no céu." },
            { q: "Qual dessas palavras é um SUBSTANTIVO (nome de objeto)?", o: ["Correr", "Bonito", "Caneta", "Eles"], c: 2, e: "'Caneta' é um substantivo porque é o nome de um objeto." },
            { q: "Qual a palavra correta para preencher: O pássaro ___ no céu.", o: ["voou", "voo", "voou", "vôo"], c: 0, e: "'Voou' é a forma correta do verbo voar no passado. 'Voo' é um substantivo." },
            { q: "Qual o antônimo de 'Gordo'?", o: ["Magro", "Forte", "Alto", "Pesado"], c: 0, e: "O antônimo de 'gordo' é 'magro', pois têm significados opostos." },
            { q: "Qual palavra tem duas letras 'SS' escritas corretamente?", o: ["Pásaro", "Pássaro", "Pásaro", "Pacaro"], c: 1, e: "'Pássaro' é a grafia correta, com 'ss' entre as vogais, e leva acento por ser palavra proparoxítona." },
            { q: "Na frase 'Ana estuda muito', a palavra 'Ana' é um:", o: ["Verbo", "Adjetivo", "Substantivo Próprio", "Pronome"], c: 2, e: "'Ana' é um substantivo próprio porque é o nome de uma pessoa específica." }
        ],
        dificil: [
            { q: "Qual é o plural correto da palavra 'PÃO'?", o: ["Pões", "Pães", "Pãos", "Paizinhos"], c: 1, e: "O plural de 'pão' é 'pães'. Palavras terminadas em '-ão' geralmente formam o plural em '-ães'." },
            { q: "Qual o antônimo correto da palavra 'Início'?", o: ["Meio", "Começo", "Fim", "Partida"], c: 2, e: "'Início' e 'fim' são antônimos, pois representam o começo e o término de algo." },
            { q: "Qual das palavras abaixo está com a acentuação correta?", o: ["Pássaro", "Passaró", "Pasaro", "Pássaró"], c: 0, e: "'Pássaro' é proparoxítona (a sílaba tônica é a antepenúltima), por isso leva acento na letra 'a'." },
            { q: "O plural de 'Anel' é:", o: ["Anels", "Aneles", "Anéis", "Anei"], c: 2, e: "O plural de 'anel' é 'anéis'. Palavras terminadas em 'l' mudam para 'is' no plural." },
            { q: "Qual o sinal de pontuação usado para indicar uma PERGUNTA?", o: ["Ponto Final (.)", "Ponto de Exclamação (!)", "Ponto de Interrogação (?)", "Vírgula (,)"], c: 2, e: "O ponto de interrogação '?' é usado no final de frases que fazem perguntas." },
            { q: "Qual palavra tem um encontro de consoantes complexo?", o: ["Prato", "Pato", "Gato", "Rato"], c: 0, e: "'Prato' tem o encontro 'pr', formado por duas consoantes juntas no início da palavra." },
            { q: "Qual palavra indica uma AÇÃO (verbo)?", o: ["Pular", "Cadeira", "Feliz", "Ontem"], c: 0, e: "'Pular' é um verbo porque expressa uma ação. 'Cadeira' é substantivo, 'feliz' é adjetivo e 'ontem' é advérbio." },
            { q: "Qual o plural de 'Caracol'?", o: ["Caracols", "Caracoles", "Caracóis", "Caracóiz"], c: 2, e: "O plural de 'caracol' é 'caracóis'. O 'l' no final vira 'is' e o 'o' fica aberto com acento." },
            { q: "Qual frase está pontuada corretamente para expressar SURPRESA?", o: ["Que dia lindo.", "Que dia lindo?", "Que dia lindo!", "Que dia lindo,"], c: 2, e: "O ponto de exclamação '!' expressa emoção, surpresa ou admiração." },
            { q: "Escolha a palavra correta: Nós ___ ao parque ontem.", o: ["fomos", "vamos", "iremos", "vão"], c: 0, e: "'Fomos' é o passado do verbo 'ir'. A palavra 'ontem' indica que a ação já aconteceu." }
        ]
    },
    Geografia: {
        facil: [
            { q: "Qual o nome do planeta em que vivemos?", o: ["Marte", "Terra", "Júpiter", "Vênus"], c: 1, e: "Vivemos no planeta Terra, o terceiro planeta a partir do Sol." },
            { q: "Em qual país nós moramos?", o: ["Argentina", "Estados Unidos", "Brasil", "Portugal"], c: 2, e: "Nós moramos no Brasil, o maior país da América do Sul." },
            { q: "O Sol que brilha no céu é um(a):", o: ["Planeta", "Cometa", "Estrela", "Satélite"], c: 2, e: "O Sol é uma estrela, a mais próxima da Terra, e fornece luz e calor." },
            { q: "Qual oceano banha as praias do Brasil?", o: ["Pacífico", "Atlântico", "Índico", "Glacial"], c: 1, e: "O Oceano Atlântico banha a costa leste do Brasil." },
            { q: "Qual o maior planeta do Sistema Solar?", o: ["Terra", "Marte", "Júpiter", "Saturno"], c: 2, e: "Júpiter é o maior planeta do Sistema Solar, muito maior do que a Terra." },
            { q: "Qual continente fica o Brasil?", o: ["Europa", "África", "Ásia", "América"], c: 3, e: "O Brasil está localizado no continente americano, na parte chamada América do Sul." },
            { q: "O que é a Lua em relação à Terra?", o: ["Uma estrela", "Um planeta", "Um satélite natural", "Um cometa"], c: 2, e: "A Lua é o satélite natural da Terra, pois gira em torno dela." },
            { q: "Qual o nome do estado famoso por ter a maior floresta tropical?", o: ["Amazonas", "São Paulo", "Rio de Janeiro", "Bahia"], c: 0, e: "O Amazonas abriga a maior parte da Floresta Amazônica, a maior floresta tropical do mundo." },
            { q: "Quantos planetas existem no nosso Sistema Solar?", o: ["5", "7", "8", "10"], c: 2, e: "O Sistema Solar tem 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno." },
            { q: "Qual linha imaginária divide a Terra em Norte e Sul?", o: ["Linha do Equador", "Trópico de Câncer", "Meridiano de Greenwich", "Trópico de Capricórnio"], c: 0, e: "A Linha do Equador divide a Terra em Hemisfério Norte e Hemisfério Sul." }
        ],
        media: [
            { q: "Qual é a capital do Brasil?", o: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], c: 2, e: "Brasília é a capital federal do Brasil, localizada na região Centro-Oeste." },
            { q: "Qual a capital do estado de São Paulo?", o: ["Santos", "Campinas", "São Paulo", "Rio de Janeiro"], c: 2, e: "A capital do estado de São Paulo é a cidade de São Paulo, a maior cidade do Brasil." },
            { q: "Qual o segundo planeta mais próximo do Sol?", o: ["Mercúrio", "Vênus", "Terra", "Marte"], c: 1, e: "Vênus é o segundo planeta mais próximo do Sol, logo depois de Mercúrio." },
            { q: "O Brasil é dividido em quantas regiões oficiais?", o: ["3", "4", "5", "6"], c: 2, e: "O Brasil é dividido em 5 regiões oficiais: Norte, Nordeste, Centro-Oeste, Sudeste e Sul." },
            { q: "Qual é a capital do Rio de Janeiro?", o: ["Niterói", "Rio de Janeiro", "Búzios", "Petrópolis"], c: 1, e: "A capital do estado do Rio de Janeiro é a cidade do Rio de Janeiro." },
            { q: "Qual planeta é conhecido como o 'Planeta Vermelho'?", o: ["Vênus", "Marte", "Saturno", "Mercúrio"], c: 1, e: "Marte é chamado de Planeta Vermelho por causa da cor de sua superfície, rica em óxido de ferro." },
            { q: "Em qual estado brasileiro fica a famosa praia de Copacabana?", o: ["Bahia", "Ceará", "Rio de Janeiro", "São Paulo"], c: 2, e: "A praia de Copacabana fica na cidade do Rio de Janeiro, no estado homônimo." },
            { q: "Qual o planeta que possui os anéis mais famosos e visíveis?", o: ["Urano", "Saturno", "Neptuno", "Júpiter"], c: 1, e: "Saturno é famoso por seus belos anéis formados por gelo, rocha e poeira." },
            { q: "Qual a maior região em extensão territorial do Brasil?", o: ["Nordeste", "Sudeste", "Sul", "Norte"], c: 3, e: "A região Norte é a maior do Brasil em extensão territorial, abrangendo a maior parte da Amazônia." },
            { q: "Qual o nome do país vizinho ao sul do Brasil?", o: ["Colômbia", "Uruguai", "México", "Chile"], c: 1, e: "O Uruguai fica ao sul do Brasil, fazendo fronteira com o Rio Grande do Sul." }
        ],
        dificil: [
            { q: "Em qual continente ficam a França, a Itália e a Espanha?", o: ["África", "Ásia", "Europa", "Oceania"], c: 2, e: "A França, a Itália e a Espanha são países localizados no continente europeu." },
            { q: "Qual é a capital dos Estados Unidos?", o: ["Nova York", "Miami", "Washington D.C.", "Los Angeles"], c: 2, e: "Washington D.C. é a capital dos Estados Unidos, não confundir com Nova York." },
            { q: "Qual o planeta mais distante do Sol atualmente?", o: ["Plutão", "Urano", "Netuno", "Saturno"], c: 2, e: "Netuno é o oitavo planeta e o mais distante do Sol no Sistema Solar atualmente." },
            { q: "Qual é a capital da Argentina?", o: ["Santiago", "Montevidéu", "Buenos Aires", "Lima"], c: 2, e: "Buenos Aires é a capital da Argentina, a maior cidade do país." },
            { q: "Qual o continente mais populoso do mundo (onde fica a China e Índia)?", o: ["América", "África", "Europa", "Ásia"], c: 3, e: "A Ásia é o continente mais populoso do mundo, com países como China e Índia." },
            { q: "Qual o nome do planeta mais quente do sistema solar?", o: ["Mercúrio", "Vênus", "Marte", "Júpiter"], c: 1, e: "Vênus é o planeta mais quente devido à atmosfera densa que retém o calor." },
            { q: "Qual a capital da França?", o: ["Londres", "Roma", "Madri", "Paris"], c: 3, e: "Paris é a capital da França, famosa por monumentos como a Torre Eiffel." },
            { q: "Quantos continentes existem no planeta Terra?", o: ["4", "5", "6", "7"], c: 2, e: "Geralmente consideramos 6 continentes: África, América, Ásia, Europa, Oceania e a Antártida." },
            { q: "Qual planeta leva menos tempo para dar uma volta no Sol?", o: ["Mercúrio", "Terra", "Vênus", "Marte"], c: 0, e: "Mercúrio é o planeta mais próximo do Sol e, por isso, completa sua volta mais rápido." },
            { q: "Qual é a capital de Portugal?", o: ["Porto", "Lisboa", "Madrid", "Coimbra"], c: 1, e: "Lisboa é a capital de Portugal, localizada na costa oeste do país." }
        ]
    },
    Historia_do_Brasil: {
        facil: [
            { q: "Quem liderava os navios portugueses que chegaram ao Brasil?", o: ["Dom Pedro I", "Cristóvão Colombo", "Pedro Álvares Cabral", "Zumbi dos Palmares"], c: 2, e: "Pedro Álvares Cabral comandou a esquadra portuguesa que chegou ao Brasil em 1500." },
            { q: "Quem já morava no Brasil antes dos portugueses chegarem?", o: ["Os espanhóis", "Os africanos", "Os indígenas", "Os franceses"], c: 2, e: "Os povos indígenas já habitavam o Brasil há milhares de anos antes da chegada dos portugueses." },
            { q: "Qual grande árvore deu origem ao nome do nosso país?", o: ["Ipê", "Pau-Brasil", "Palmeira", "Carvalho"], c: 1, e: "O pau-brasil era uma árvore muito valorizada pelos portugueses e deu nome ao país." },
            { q: "Qual o nome da embarcação antiga usada para chegar ao Brasil?", o: ["Submarino", "Caravela", "Iate", "Canoa"], c: 1, e: "As caravelas eram os navios usados pelos portugueses nas grandes navegações." },
            { q: "Quem proclamou a Independência do Brasil?", o: ["Pedro Álvares Cabral", "Dom Pedro I", "Deodoro da Fonseca", "Tiradentes"], c: 1, e: "Dom Pedro I proclamou a Independência do Brasil em 7 de setembro de 1822." },
            { q: "Como chamamos os primeiros habitantes do Brasil?", o: ["Índios", "Portugueses", "Espanhóis", "Ingleses"], c: 0, e: "Os primeiros habitantes do Brasil são chamados de povos indígenas, ou indígenas." },
            { q: "Em qual país a família real morava antes de vir para o Brasil?", o: ["França", "Inglaterra", "Portugal", "Espanha"], c: 2, e: "A família real portuguesa veio para o Brasil em 1808, fugindo das guerras na Europa." },
            { q: "Qual bicho nativo chamou a atenção dos portugueses no descobrimento?", o: ["Leão", "Elefante", "Papagaio / Arara", "Canguru"], c: 2, e: "Papagaios e araras coloridas chamaram a atenção dos portugueses pela beleza." },
            { q: "Tiradentes lutou pela liberdade do povo de qual estado brasileiro?", o: ["Rio de Janeiro", "Bahia", "Minas Gerais", "São Paulo"], c: 2, e: "Tiradentes foi um dos líderes da Inconfidência Mineira, em Minas Gerais." },
            { q: "O grito da Independência aconteceu perto de qual riacho famoso?", o: ["Rio Amazonas", "Riacho do Ipiranga", "Rio São Francisco", "Rio Tietê"], c: 1, e: "O Grito do Ipiranga aconteceu às margens do riacho do Ipiranga, em São Paulo." }
        ],
        media: [
            { q: "O que é comemorado no dia 7 de Setembro?", o: ["Descobrimento do Brasil", "Dia do Índio", "Independência do Brasil", "Proclamação da República"], c: 2, e: "7 de setembro é o Dia da Independência do Brasil, quando o país deixou de ser colônia de Portugal." },
            { q: "Qual foi a PRIMEIRA capital do Brasil?", o: ["Rio de Janeiro", "Salvador", "Brasília", "São Paulo"], c: 1, e: "Salvador, na Bahia, foi a primeira capital do Brasil durante o período colonial." },
            { q: "Qual era o principal produto que os portugueses levavam do Brasil no início?", o: ["Ouro", "Café", "Pau-Brasil", "Açúcar"], c: 2, e: "No início da colonização, o pau-brasil foi o principal produto explorado pelos portugueses." },
            { q: "Quem foi a Princesa que assinou a lei que libertou os escravizados?", o: ["Princesa Diana", "Princesa Isabel", "Princesa Carlota", "Princesa Maria"], c: 1, e: "A Princesa Isabel assinou a Lei Áurea em 1888, que aboliu a escravatura no Brasil." },
            { q: "Qual o nome do herói da Inconfidência Mineira que era dentista?", o: ["Dom Pedro II", "Tiradentes", "Zumbi dos Palmares", "Duque de Caxias"], c: 1, e: "Tiradentes era dentista e líder da Inconfidência Mineira, um movimento contra os impostos portugueses." },
            { q: "Por que o dia 22 de Abril é lembrado na nossa história?", o: ["Independência", "Chegada dos Portugueses", "Dia da Bandeira", "Natal"], c: 1, e: "22 de abril de 1500 é a data da chegada dos portugueses ao Brasil, liderados por Pedro Álvares Cabral." },
            { q: "O que os portugueses construíram no início para produzir açúcar?", o: ["Fábricas", "Engenhos", "Shopping", "Prédios"], c: 1, e: "Os engenhos de açúcar eram grandes propriedades onde se produzia açúcar com trabalho escravo." },
            { q: "Qual o nome do líder guerreiro do Quilombo dos Palmares?", o: ["Tiradentes", "Zumbi", "Dom Pedro", "Cabral"], c: 1, e: "Zumbi dos Palmares foi um importante líder de resistência contra a escravidão no Quilombo dos Palmares." },
            { q: "Quem governou o Brasil por quase 50 anos como o segundo Imperador?", o: ["Dom Pedro I", "Dom Pedro II", "Getúlio Vargas", "Lula"], c: 1, e: "Dom Pedro II foi o segundo imperador do Brasil e governou por cerca de 49 anos." },
            { q: "De qual país o Brasil ficou independente em 1822?", o: ["Espanha", "Estados Unidos", "Portugal", "França"], c: 2, e: "O Brasil conquistou a independência de Portugal em 1822." }
        ],
        dificil: [
            { q: "Em qual ano os portugueses chegaram oficialmente ao Brasil?", o: ["1492", "1500", "1624", "1822"], c: 1, e: "Os portugueses chegaram ao Brasil em 22 de abril de 1500." },
            { q: "Quem se tornou o primeiro Imperador/Rei do Brasil após a independência?", o: ["Dom João VI", "Dom Pedro I", "Marechal Deodoro", "Dom Pedro II"], c: 1, e: "Dom Pedro I se tornou o primeiro imperador do Brasil após a Independência." },
            { q: "Como ficou conhecida a lei de 1888 que acabou com a escravidão?", o: ["Lei do Ventre Livre", "Lei Áurea", "Lei dos Sexagenários", "Constituição"], c: 1, e: "A Lei Áurea, assinada em 1888, aboliu a escravidão no Brasil." },
            { q: "Em qual ano foi declarada a Independência do Brasil?", o: ["1500", "1808", "1822", "1889"], c: 2, e: "A Independência do Brasil foi proclamada em 7 de setembro de 1822." },
            { q: "Qual cidade foi a SEGUNDA capital do Brasil, antes de Brasília?", o: ["Salvador", "São Paulo", "Rio de Janeiro", "Belo Horizonte"], c: 2, e: "Rio de Janeiro foi a segunda capital do Brasil, antes de Brasília se tornar capital em 1960." },
            { q: "Em que ano a Família Real Portuguesa chegou ao Brasil fugindo da Europa?", o: ["1500", "1808", "1822", "1889"], c: 1, e: "A Família Real chegou ao Brasil em 1808, fugindo das invasões napoleônicas em Portugal." },
            { q: "Quem escreveu a famosa carta contando ao Rei de Portugal sobre o Brasil?", o: ["Pero Vaz de Caminha", "Pedro Álvares Cabral", "Tiradentes", "Princesa Isabel"], c: 0, e: "Pero Vaz de Caminha escreveu a carta que descreveu ao rei de Portugal a chegada ao Brasil." },
            { q: "Antes de se chamar Brasil, qual foi um dos primeiros nomes dados pelas caravelas?", o: ["Pindorama", "Terra de Santa Cruz", "Nova Portugal", "América do Sul"], c: 1, e: "Os portugueses chamaram o território de Terra de Santa Cruz antes de adotar o nome Brasil." },
            { q: "Quem foi o primeiro Presidente do Brasil, após o fim do império?", o: ["Getúlio Vargas", "Dom Pedro II", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"], c: 2, e: "Deodoro da Fonseca foi o primeiro presidente do Brasil, após a Proclamação da República em 1889." },
            { q: "Quem eram os Bandeirantes na história do Brasil?", o: ["Exploradores que entravam nas matas", "Soldados do Rei", "Índios guerreiros", "Piratas do mar"], c: 0, e: "Os bandeirantes eram grupos de exploradores que entravam no interior do Brasil em busca de riquezas e indígenas." }
        ]
    },
    Biologia: {
        facil: [
            { q: "Qual sentido usamos para ver as cores e as formas?", o: ["Audição", "Olfato", "Visão", "Paladar"], c: 2, e: "A visão é o sentido que nos permite ver cores, formas e tamanhos dos objetos." },
            { q: "Onde fica guardado o nosso cérebro?", o: ["Na barriga", "No peito", "Na cabeça", "Nas costas"], c: 2, e: "O cérebro fica dentro do crânio, na cabeça, e controla nossas ações e pensamentos." },
            { q: "Qual órgão do corpo usamos para respirar o ar?", o: ["Coração", "Estômago", "Pulmão", "Fígado"], c: 2, e: "Os pulmões são os órgãos responsáveis por trocar o oxigênio do ar com o nosso corpo." },
            { q: "Bater o dente e mastigar serve para iniciar a:", o: ["Respiração", "Digestão dos alimentos", "Circulação", "Visão"], c: 1, e: "Mastigar é o primeiro passo da digestão, quando os dentes quebram os alimentos em pedaços menores." },
            { q: "Qual sentido nos permite sentir o gosto de um sorvete?", o: ["Tato", "Olfato", "Paladar", "Audição"], c: 2, e: "O paladar é o sentido do gosto, localizado principalmente na língua." },
            { q: "Quantos corações tem um ser humano?", o: ["1", "2", "3", "0"], c: 0, e: "Os seres humanos têm um coração, que bombeia o sangue para todo o corpo." },
            { q: "O que ajuda a cobrir e proteger todo o nosso corpo por fora?", o: ["Os ossos", "Os músculos", "A pele", "O sangue"], c: 2, e: "A pele cobre e protege nosso corpo, além de nos ajudar a sentir calor, frio e toque." },
            { q: "Para que servem os nossos ouvidos?", o: ["Olhar", "Ouvir sons", "Cheirar", "Tocar"], c: 1, e: "Os ouvidos captam os sons do ambiente, permitindo que a gente ouça." },
            { q: "Qual órgão bate forte dentro do peito quando corremos?", o: ["Estômago", "Coração", "Rim", "Cérebro"], c: 1, e: "O coração bate mais forte quando corremos porque precisa bombear mais sangue para os músculos." },
            { q: "O que usamos na boca para cortar e triturar os alimentos?", o: ["Língua", "Dentes", "Lábios", "Bochecha"], c: 1, e: "Os dentes cortam e trituram os alimentos, facilitando a digestão." }
        ],
        media: [
            { q: "O que faz o sangue circular e viajar por todo o nosso corpo?", o: ["O pulmão", "O estômago", "O coração", "O cérebro"], c: 2, e: "O coração funciona como uma bomba, empurrando o sangue por todo o corpo." },
            { q: "O conjunto de todos os ossos do nosso corpo forma o:", o: ["Esqueleto", "Músculo", "Sistema Nervoso", "Estômago"], c: 0, e: "O esqueleto é o conjunto de todos os ossos do corpo. Ele dá sustentação e protege órgãos." },
            { q: "Qual órgão engole e começa a desmanchar a comida na nossa barriga?", o: ["Coração", "Fígado", "Estômago", "Intestino"], c: 2, e: "O estômago recebe a comida, a mistura com sucos e começa a desmanchá-la." },
            { q: "O que trabalha junto com os ossos para fazer a gente correr e pular?", o: ["A pele", "Os músculos", "Os cabelos", "As unhas"], c: 1, e: "Os músculos se ligam aos ossos e se contraem para produzir movimentos." },
            { q: "O esqueleto de uma criança serve principalmente para:", o: ["Pensar", "Sustentar o corpo e proteger órgãos", "Respirar o ar", "Digerir doces"], c: 1, e: "O esqueleto sustenta o corpo, protege órgãos importantes e ajuda nos movimentos." },
            { q: "Quantos ossos aproximadamente tem um corpo adulto?", o: ["50", "100", "206", "500"], c: 2, e: "Um adulto tem cerca de 206 ossos. Bebês nascem com mais ossos, que se unem com o tempo." },
            { q: "Qual o nome do líquido vermelho que transporta oxigênio pelo corpo?", o: ["Saliva", "Suor", "Sangue", "Água"], c: 2, e: "O sangue transporta oxigênio e nutrientes para todas as partes do corpo." },
            { q: "Qual órgão limpa o sangue e produz a urina (xixi)?", o: ["Estômago", "Rins", "Coração", "Pulmão"], c: 1, e: "Os rins filtram o sangue, retiram substâncias que não servem e formam a urina." },
            { q: "O ar entra pelo nariz e vai direto para quais órgãos?", o: ["Olhos", "Pulmões", "Rins", "Intestinos"], c: 1, e: "O ar entra pelo nariz, passa pela traqueia e chega aos pulmões." },
            { q: "Qual a função principal do sistema nervoso e do cérebro?", o: ["Fazer a digestão", "Controlar e mandar comandos para o corpo", "Bombear sangue", "Filtrar água"], c: 1, e: "O sistema nervoso, comandado pelo cérebro, envia mensagens para controlar nossos movimentos e sensações." }
        ],
        dificil: [
            { q: "Qual é o maior órgão de todo o corpo humano?", o: ["O fígado", "O intestino", "A pele", "O fêmur"], c: 2, e: "A pele é o maior órgão do corpo humano. Ela cobre toda a superfície do corpo." },
            { q: "Qual é o nome do osso mais longo do corpo humano, localizado na coxa?", o: ["Crânio", "Costela", "Fêmur", "Rádio"], c: 2, e: "O fêmur é o osso mais longo e forte do corpo, localizado na coxa." },
            { q: "Qual a função dos glóbulos vermelhos presentes no nosso sangue?", o: ["Defender de doenças", "Transportar oxigênio", "Fazer o sangue parar de escorrer", "Criar energia"], c: 1, e: "Os glóbulos vermelhos transportam oxigênio dos pulmões para todas as células do corpo." },
            { q: "Como são chamadas as menores partes vivas que formam nosso corpo?", o: ["Células", "Bactérias", "Ossos", "Átomos"], c: 0, e: "As células são as menores unidades vivas do nosso corpo. Todos os órgãos são formados por elas." },
            { q: "Onde termina a maior parte da digestão e absorção dos nutrientes?", o: ["No esôfago", "No estômago", "No intestino delgado", "Na boca"], c: 2, e: "O intestino delgado é onde a maior parte dos nutrientes é absorvida pelo corpo." },
            { q: "Qual órgão produz uma substância chamada insulina para controlar o açúcar?", o: ["Fígado", "Pâncreas", "Rins", "Cérebro"], c: 1, e: "O pâncreas produz a insulina, hormônio que ajuda a controlar o açúcar no sangue." },
            { q: "Qual tipo de célula no sangue trabalha como soldadinho defendendo contra vírus?", o: ["Glóbulos vermelhos", "Plaquetas", "Glóbulos brancos (Leucócitos)", "Neurônios"], c: 2, e: "Os glóbulos brancos, ou leucócitos, defendem o corpo contra vírus, bactérias e outras doenças." },
            { q: "Como se chamam os caninhos finos por onde o sangue corre pelo corpo?", o: ["Ossos", "Músculos", "Vasos sanguíneos (artérias/veias)", "Nervos"], c: 2, e: "Os vasos sanguíneos, como artérias e veias, são canais por onde o sangue circula." },
            { q: "Qual osso protege o nosso cérebro contra batidas?", o: ["Costela", "Fêmur", "Crânio", "Coluna"], c: 2, e: "O crânio é o osso da cabeça que envolve e protege o cérebro." },
            { q: "Como chamamos as células especiais do cérebro que transmitem pensamentos?", o: ["Células da pele", "Neurônios", "Músculos", "Glóbulos"], c: 1, e: "Os neurônios são células do sistema nervoso que transmitem informações, permitindo pensar e sentir." }
        ]
    }
};
