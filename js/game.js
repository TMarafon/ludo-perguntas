// --- SISTEMA DE INICIALIZAÇÃO DE UI ---
function setupPlayerInputs() {
    const count = parseInt(document.getElementById('player-count-select').value);
    const container = document.getElementById('players-config-container');
    container.innerHTML = "";
    const defaultColors = ["#ef476f", "#118ab2", "#06d6a0", "#ffd166", "#7209b7", "#f77f00"];
    
    for(let i=0; i<count; i++) {
        container.innerHTML += `
            <div class="player-row">
                <strong style="color:#555">#${i+1}</strong>
                <input type="text" id="p-name-${i}" value="Explorador ${i+1}" placeholder="Nome do Jogador">
                <select id="p-color-${i}">
                    <option value="${defaultColors[i % 6]}" selected>Cor Padrão</option>
                    <option value="#ef476f" style="background:#ef476f;color:white">Rosa Chiclete</option>
                    <option value="#118ab2" style="background:#118ab2;color:white">Azul Marinho</option>
                    <option value="#06d6a0" style="background:#06d6a0;color:white">Verde Água</option>
                    <option value="#ffd166" style="background:#ffd166;color:#333">Amarelo Sol</option>
                    <option value="#7209b7" style="background:#7209b7;color:white">Roxo Mágico</option>
                    <option value="#f77f00" style="background:#f77f00;color:white">Laranja Fogo</option>
                </select>
            </div>
        `;
    }
}
setupPlayerInputs();

function startGame() {
    const count = parseInt(document.getElementById('player-count-select').value);
    poolMode = document.getElementById('pool-mode-select').value || "per-player";
    refillTurns = parseInt(document.getElementById('refill-turns-select').value) || 0;
    players = [];
    activePlayersIndices = [];
    finishedPlayers = [];
    currentPlayerIdx = 0;
    activeQuestionPools = {};

    init3DSpace();

    // Inicializa os pools de perguntas conforme o modo escolhido
    if (poolMode === "shared") {
        activeQuestionPools = cloneQuestionPool();
        sharedTanks = { Matematica: 10, Ingles: 10, Portugues: 10, Geografia: 10, Historia_do_Brasil: 10, Biologia: 10 };
        sharedHistory = { Matematica: 0, Ingles: 0, Portugues: 0, Geografia: 0, Historia_do_Brasil: 0, Biologia: 0 };
    } else {
        sharedTanks = null;
        sharedHistory = null;
        for (let i = 0; i < count; i++) {
            activeQuestionPools[i] = cloneQuestionPool();
        }
    }

    for(let i=0; i<count; i++) {
        let name = document.getElementById(`p-name-${i}`).value.trim();
        if(!name) name = `Explorador ${i+1}`;
        let color = document.getElementById(`p-color-${i}`).value;

        players.push({
            id: i,
            name: name,
            color: color,
            position: 0,
            history: poolMode === "shared" ? sharedHistory : { Matematica: 0, Ingles: 0, Portugues: 0, Geografia: 0, Historia_do_Brasil: 0, Biologia: 0 },
            tanks: poolMode === "shared" ? sharedTanks : { Matematica: 10, Ingles: 10, Portugues: 10, Geografia: 10, Historia_do_Brasil: 10, Biologia: 10 },
            answerHistory: [] // Histórico de respostas do jogador
        });

        activePlayersIndices.push(i);
        createPlayerToken3D(i, color);
    }

    document.getElementById('setup-screen').classList.add('hidden');
    rollBonusCategory();
    updateHUDAndPanel();
}

// Reason: Sorteia uma disciplina aleatória para receber bônus de casas nesta rodada
function rollBonusCategory() {
    const cats = Object.keys(questionPool);
    bonusCategory = cats[Math.floor(Math.random() * cats.length)];
}

function updateHUDAndPanel() {
    if(activePlayersIndices.length === 0) {
        endGame();
        return;
    }

    const currentPlayer = players[activePlayersIndices[currentPlayerIdx]];
    
    // Atualiza indicador superior
    const turnInd = document.getElementById('turn-indicator');
    turnInd.innerText = currentPlayer.name;
    document.getElementById('hud').style.borderLeftColor = currentPlayer.color;

    // Renderiza painel de botões laterais com o nível atual dos tanques
    const panel = document.getElementById('discipline-panel');
    const panelTitle = poolMode === "shared"
        ? `<h3 style="text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 8px; color: #333;">📚 Escolha um assunto</h3>`
        : `<h3 style="text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 8px; color: #333;">📚 Escolha um assunto</h3>`;
    panel.innerHTML = panelTitle;

    const displayNames = {
        Matematica: "📐 Matemática",
        Ingles: "🇺🇸 Inglês",
        Portugues: "🇧🇷 Português",
        Geografia: "🌍 Geografia",
        Historia_do_Brasil: "📜 História do Brasil",
        Biologia: "🧬 Biologia"
    };

    Object.keys(currentPlayer.tanks).forEach(cat => {
        const val = currentPlayer.tanks[cat];
        let diffLabel = "Fácil";
        let colorBar = "#06d6a0"; // verde
        if (val <= 7 && val >= 4) { diffLabel = "Média"; colorBar = "#ffd166"; } // amarelo
        if (val <= 3) { diffLabel = "Difícil"; colorBar = "#ef476f"; } // vermelho

        const isBonus = (cat === bonusCategory);
        const reward = getRewardForTank(val) + (isBonus ? BONUS_STEPS : 0);
        const bonusBadge = isBonus ? ` ⭐ +${BONUS_STEPS}` : "";
        const cardBorder = isBonus ? "border: 3px solid #7209b7; box-shadow: 0 0 12px rgba(114,9,183,0.4);" : "";

        panel.innerHTML += `
            <div class="discipline-card" style="${cardBorder}" onclick="openQuestionModal('${cat}')">
                <div class="discipline-title">${displayNames[cat]}${bonusBadge}</div>
                <div class="tank-bar-container">
                    <div class="tank-bar" style="width: ${val * 10}%; background-color: ${colorBar}"></div>
                </div>
                <div class="tank-info">
                    <span>Anda: <strong>${reward} casas</strong></span>
                    <span style="font-weight:bold; color:${colorBar}">${diffLabel}</span>
                </div>
            </div>
        `;
    });

    // Destaca o rótulo do jogador corrente no tabuleiro
    updatePlayerLabelsHighlight();
}

// --- CONTADOR REGRESSIVO DO BÔNUS DE VELOCIDADE ---
// Reason: Mostra visualmente quanto tempo falta para ganhar o bônus de +1 casa,
// deixando a mecânica transparente e incentivando respostas rápidas.
function startQuickBonusTimer() {
    stopQuickBonusTimer();
    const label = document.getElementById('question-quick-bonus-label');
    const bar = document.getElementById('question-quick-bonus-bar');
    const timeLimitMs = getQuickAnswerMsForDifficulty(currentQuestionDifficulty);

    function update() {
        const elapsed = Date.now() - currentQuestionStartTime;
        const remaining = Math.max(0, timeLimitMs - elapsed);
        const pct = (remaining / timeLimitMs) * 100;

        bar.style.width = `${pct}%`;
        bar.classList.remove('fast', 'medium', 'slow', 'expired');
        label.classList.remove('expired');

        if (remaining <= 0) {
            bar.classList.add('expired');
            label.classList.add('expired');
            label.innerText = '⏰ Bônus de velocidade expirado';
            stopQuickBonusTimer();
        } else {
            const remainingSeconds = (remaining / 1000).toFixed(1);
            label.innerText = `⚡ Responda em até ${remainingSeconds}s para ganhar +${QUICK_ANSWER_BONUS} casa!`;
            if (remaining > timeLimitMs * 0.5) {
                bar.classList.add('fast');
            } else if (remaining > timeLimitMs * 0.2) {
                bar.classList.add('medium');
            } else {
                bar.classList.add('slow');
            }
        }
    }

    update();
    quickBonusTimerInterval = setInterval(update, 100);
}

function stopQuickBonusTimer() {
    if (quickBonusTimerInterval) {
        clearInterval(quickBonusTimerInterval);
        quickBonusTimerInterval = null;
    }
}

// --- MOTOR DE PERGUNTAS E RESPOSTAS ---
function openQuestionModal(category) {
    selectedCategory = category;
    const player = players[activePlayersIndices[currentPlayerIdx]];
    const tankVal = player.tanks[category];

    const difficulty = getDifficultyForTank(tankVal);
    currentQuestionDifficulty = difficulty;

    // Seleciona o pool correto conforme o modo de jogo
    const activePool = poolMode === "shared" ? activeQuestionPools : activeQuestionPools[player.id];
    let list = activePool[category][difficulty];

    // Se o deck da dificuldade atual esgotou, recarrega do banco original
    if (!list || list.length === 0) {
        activePool[category][difficulty] = questionPool[category][difficulty].map(q => ({ ...q }));
        list = activePool[category][difficulty];
    }

    // Sorteia aleatoriamente e remove a pergunta do pool (depleção)
    const randomIdx = Math.floor(Math.random() * list.length);
    currentQuestionObj = list.splice(randomIdx, 1)[0];

    // Preenche modal
    document.getElementById('question-category').innerText = category.replace("_", " ");
    const isBonus = (selectedCategory === bonusCategory);
    const totalReward = getRewardForTank(tankVal) + (isBonus ? BONUS_STEPS : 0);
    const bonusText = isBonus ? ` ⭐ BÔNUS +${BONUS_STEPS}!` : "";
    document.getElementById('question-difficulty').innerText = `Nível: ${difficulty.toUpperCase()} (Vale ${totalReward} casas)${bonusText}`;
    document.getElementById('question-text').innerText = currentQuestionObj.q;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";
    currentQuestionObj.o.forEach((opt, idx) => {
        optionsContainer.innerHTML += `
            <button class="option-btn" onclick="submitAnswer(${idx})">${opt}</button>
        `;
    });

    currentQuestionStartTime = Date.now();
    document.getElementById('question-modal').classList.remove('hidden');
    startQuickBonusTimer();
}

function submitAnswer(chosenIdx) {
    document.getElementById('question-modal').classList.add('hidden');
    stopQuickBonusTimer();
    const player = players[activePlayersIndices[currentPlayerIdx]];
    const tankVal = player.tanks[selectedCategory];

    // Atualiza histórico de rodadas sem uso para os outros tanques
    Object.keys(player.history).forEach(cat => {
        if (cat === selectedCategory) {
            player.history[cat] = 0; // reset
        } else {
            player.history[cat] += 1; // adiciona turno ocioso
        }
    });

    const isCorrect = (chosenIdx === currentQuestionObj.c);
    const isBonus = (selectedCategory === bonusCategory);
    const rewardVal = getRewardForTank(tankVal) + (isBonus ? BONUS_STEPS : 0);
    let targetTilesMove = 0;

    const quickBonusTimeMs = getQuickAnswerMsForDifficulty(currentQuestionDifficulty);

    // Registra a resposta no histórico do jogador
    const responseTime = Date.now() - currentQuestionStartTime;
    const earnedQuickBonus = isCorrect && responseTime <= quickBonusTimeMs;
    player.answerHistory.push({
        pergunta: currentQuestionObj.q,
        categoria: selectedCategory,
        dificuldade: currentQuestionDifficulty,
        acertou: isCorrect,
        respostaDada: currentQuestionObj.o[chosenIdx],
        respostaCorreta: currentQuestionObj.o[currentQuestionObj.c],
        explicacao: currentQuestionObj.e || "",
        tempoMs: responseTime,
        bonusVelocidade: earnedQuickBonus,
        dataHora: new Date().toISOString()
    });

    const fTitle = document.getElementById('feedback-title');
    const fText = document.getElementById('feedback-text');
    const fExplanation = document.getElementById('feedback-explanation');
    const fCard = document.getElementById('feedback-card');
    const explanationText = currentQuestionObj.e || "";

    if (isCorrect) {
        targetTilesMove = rewardVal + (earnedQuickBonus ? QUICK_ANSWER_BONUS : 0);
        // Depleta o combustível
        player.tanks[selectedCategory] = Math.max(1, tankVal - 1);

        fTitle.innerText = "Correto! 🌟🎉";
        fTitle.style.color = "#06d6a0";
        const bonusNote = isBonus ? ` (incluindo +${BONUS_STEPS} de bônus da rodada!)` : "";
        const quickBonusNote = earnedQuickBonus ? ` ⚡ Resposta rápida! +${QUICK_ANSWER_BONUS} casa extra!` : "";
        fText.innerText = `Excelente trabalho! Você respondeu corretamente e andou ${targetTilesMove} casas para a frente${bonusNote}${quickBonusNote}`;
        fCard.style.borderTop = "8px solid #06d6a0";
    } else {
        // Reason: Recuo de apenas 1 casa no erro para reduzir a punição e manter o foco no aprendizado.
        targetTilesMove = -1;
        
        fTitle.innerText = "💡 Resposta correta:";
        fTitle.style.color = "#3f37c9";
        fText.innerText = `Vamos revisar: "${currentQuestionObj.q}". A resposta correta é "${currentQuestionObj.o[currentQuestionObj.c]}". Você recua 1 casa, mas agora já sabe mais!`;
        fCard.style.borderTop = "8px solid #3f37c9";
    }

    // Reason: Exibir a explicação após a resposta reforça o aprendizado, explicando o porquê da resposta.
    if (explanationText) {
        fExplanation.innerText = `💡 ${explanationText}`;
        fExplanation.classList.remove('hidden');
    } else {
        fExplanation.classList.add('hidden');
    }

    // Processa recarga/reabastecimento passivo conforme configuração
    if (refillTurns > 0) {
        Object.keys(player.history).forEach(cat => {
            if(player.history[cat] >= refillTurns && player.tanks[cat] < 10) {
                player.tanks[cat] = Math.min(10, player.tanks[cat] + 1);
                player.history[cat] = 0; // reseta contagem para os próximos turnos
            }
        });
    }

    // Exibe o feedback; a movimentação do peão fica pendente até o usuário fechar a mensagem
    pendingMovement = { player, tilesToMove: targetTilesMove };
    document.getElementById('feedback-modal').classList.remove('hidden');
}

function closeFeedback() {
    document.getElementById('feedback-modal').classList.add('hidden');

    // Só executa a animação de movimentação após o fechamento do feedback
    if (pendingMovement) {
        executeTweenMovement(pendingMovement.player, pendingMovement.tilesToMove, () => {
            pendingMovement = null;
            checkSurpriseTile();
        });
    } else {
        checkSurpriseTile();
    }
}

// --- SISTEMA DE CASAS SURPRESA ---
// Reason: Verifica se o jogador parou numa casa surpresa não-usada após o movimento.
// Se sim, ativa o efeito; caso contrário, prossegue para a progressão de turno.
function checkSurpriseTile() {
    const player = players[activePlayersIndices[currentPlayerIdx]];
    const pos = player.position;

    // Verifica se é casa surpresa (qualquer jogador que cair recebe carta)
    if(SURPRISE_TILES.includes(pos)) {
        triggerSurpriseCard(player, pos);
    } else {
        checkTurnProgression();
    }
}

function triggerSurpriseCard(player, tileIdx) {
    // Sorteia uma das 4 cartas
    let possibleCards = ["avancar", "recuar", "trocar", "tanque"];

    // Se só há 1 jogador ativo, remove a carta de troca (não há adversários)
    if(activePlayersIndices.length <= 1) {
        possibleCards = possibleCards.filter(c => c !== "trocar");
    }

    const cardType = possibleCards[Math.floor(Math.random() * possibleCards.length)];

    // Prepara o conteúdo da carta
    const cardData = {
        type: cardType,
        player: player,
        tileIdx: tileIdx
    };

    if(cardType === "avancar") {
        const x = Math.floor(Math.random() * 5) + 2; // 2 a 6
        cardData.value = x;
        document.getElementById('surprise-icon').innerText = "🚀";
        document.getElementById('surprise-title').innerText = "Avançar Casas!";
        document.getElementById('surprise-description').innerText = `Sorte! Você avança ${x} casas para frente.`;
    } else if(cardType === "recuar") {
        const x = Math.floor(Math.random() * 5) + 2; // 2 a 6
        cardData.value = x;
        document.getElementById('surprise-icon').innerText = "⬅️";
        document.getElementById('surprise-title').innerText = "Recuar Casas!";
        document.getElementById('surprise-description').innerText = `Ops! Você recua ${x} casas para trás.`;
    } else if(cardType === "trocar") {
        document.getElementById('surprise-icon').innerText = "🔄";
        document.getElementById('surprise-title').innerText = "Trocar de Posição!";
        document.getElementById('surprise-description').innerText = "Escolha um adversário para trocar de posição com você.";
    } else if(cardType === "tanque") {
        document.getElementById('surprise-icon').innerText = "⛽";
        document.getElementById('surprise-title').innerText = "Encher Tanque!";
        document.getElementById('surprise-description').innerText = "Escolha uma disciplina para reabastecer completamente.";
    }

    currentSurpriseCard = cardData;
    document.getElementById('surprise-modal').classList.remove('hidden');
}

function executeSurpriseEffect() {
    document.getElementById('surprise-modal').classList.add('hidden');
    const card = currentSurpriseCard;
    if(!card) { checkTurnProgression(); return; }

    if(card.type === "avancar") {
        executeTweenMovement(card.player, card.value, () => {
            currentSurpriseCard = null;
            checkTurnProgression();
        });
    } else if(card.type === "recuar") {
        executeTweenMovement(card.player, -card.value, () => {
            currentSurpriseCard = null;
            checkTurnProgression();
        });
    } else if(card.type === "trocar") {
        openSwapModal(card.player);
    } else if(card.type === "tanque") {
        openRefillModal(card.player);
    }
}

// --- TROCA DE POSIÇÃO ---
function openSwapModal(player) {
    const container = document.getElementById('swap-options');
    container.innerHTML = "";

    // Lista apenas jogadores ativos (não finalizados), exceto o próprio
    activePlayersIndices.forEach(idx => {
        if(idx === player.id) return;
        const other = players[idx];
        container.innerHTML += `
            <div class="select-item" onclick="executeSwap(${player.id}, ${idx})">
                <div class="select-color-dot" style="background: ${other.color}"></div>
                <div>
                    <strong>${other.name}</strong> — Casa ${other.position}
                </div>
            </div>
        `;
    });
    document.getElementById('swap-modal').classList.remove('hidden');
}

function executeSwap(playerId, otherId) {
    document.getElementById('swap-modal').classList.add('hidden');
    const p1 = players[playerId];
    const p2 = players[otherId];

    // Troca posições lógicas
    const tempPos = p1.position;
    p1.position = p2.position;
    p2.position = tempPos;

    // Anima teleport dos peões (fade out/in com GSAP)
    const mesh1 = playerMeshes[p1.id];
    const mesh2 = playerMeshes[p2.id];
    const offset1 = (p1.id * 0.08) - 0.2;
    const offset2 = (p2.id * 0.08) - 0.2;
    const coords1 = boardSpiralPositions[p1.position];
    const coords2 = boardSpiralPositions[p2.position];

    let swapDone1 = false, swapDone2 = false;
    function onSwapComplete() {
        if(swapDone1 && swapDone2) {
            currentSurpriseCard = null;
            checkTurnProgression();
        }
    }

    // Animação de teleport: sobe, move, desce
    gsap.timeline({ onComplete: () => { swapDone1 = true; onSwapComplete(); } })
        .to(mesh1.position, { y: coords1.y + 3, duration: 0.25, ease: "power2.out" })
        .to(mesh1.position, { x: coords1.x + offset1, z: coords1.z + offset1, duration: 0.3, ease: "power1.inOut" })
        .to(mesh1.position, { y: coords1.y + 0.4, duration: 0.25, ease: "power2.in" });

    gsap.timeline({ onComplete: () => { swapDone2 = true; onSwapComplete(); } })
        .to(mesh2.position, { y: coords2.y + 3, duration: 0.25, ease: "power2.out" })
        .to(mesh2.position, { x: coords2.x + offset2, z: coords2.z + offset2, duration: 0.3, ease: "power1.inOut" })
        .to(mesh2.position, { y: coords2.y + 0.4, duration: 0.25, ease: "power2.in" });
}

function cancelSwap() {
    document.getElementById('swap-modal').classList.add('hidden');
    currentSurpriseCard = null;
    checkTurnProgression();
}

// --- REABASTECIMENTO DE TANQUE ---
function openRefillModal(player) {
    const container = document.getElementById('refill-options');
    container.innerHTML = "";
    const displayNames = {
        Matematica: "📐 Matemática",
        Ingles: "🇺🇸 Inglês",
        Portugues: "🇧🇷 Português",
        Geografia: "🌍 Geografia",
        Historia_do_Brasil: "📜 História do Brasil",
        Biologia: "🧬 Biologia"
    };

    Object.keys(player.tanks).forEach(cat => {
        const val = player.tanks[cat];
        container.innerHTML += `
            <div class="select-item" onclick="executeRefill('${cat}')">
                <div style="flex: 1;">
                    <strong>${displayNames[cat]}</strong> — Tanque: ${val}/10
                </div>
                <div class="tank-bar-container" style="width: 60px;">
                    <div class="tank-bar" style="width: ${val * 10}%; background-color: ${val <= 3 ? '#ef476f' : val <= 7 ? '#ffd166' : '#06d6a0'}"></div>
                </div>
            </div>
        `;
    });
    document.getElementById('refill-modal').classList.remove('hidden');
}

function executeRefill(category) {
    document.getElementById('refill-modal').classList.add('hidden');
    const player = currentSurpriseCard.player;
    player.tanks[category] = 10;
    currentSurpriseCard = null;
    updateHUDAndPanel();
    checkTurnProgression();
}

function cancelRefill() {
    document.getElementById('refill-modal').classList.add('hidden');
    currentSurpriseCard = null;
    checkTurnProgression();
}

// --- PROGRESSÃO DE TURNOS E FIM DE JOGO ---
function checkTurnProgression() {
    const activeIdx = activePlayersIndices[currentPlayerIdx];
    const player = players[activeIdx];

    // Verifica se o jogador atual cruzou a linha de chegada no centro
    if(player.position >= TOTAL_TILES - 1) {
        finishedPlayers.push(player);
        activePlayersIndices.splice(currentPlayerIdx, 1);
        
        // Se removeu o jogador e a lista não ficou vazia, não avança o index pois o elemento seguinte assumiu a posição atual
        if(activePlayersIndices.length > 0) {
            currentPlayerIdx = currentPlayerIdx % activePlayersIndices.length;
        }
    } else {
        // Avança para o próximo da lista circular comum
        currentPlayerIdx = (currentPlayerIdx + 1) % activePlayersIndices.length;
    }

    rollBonusCategory();
    updateHUDAndPanel();
}

function endGame() {
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('discipline-panel').classList.add('hidden');

    // Persiste o histórico da partida no cache do browser
    saveGameHistoryToCache();

    const container = document.getElementById('ranking-container');
    container.innerHTML = "";

    finishedPlayers.forEach((p, idx) => {
        let medal = "🏅";
        if(idx === 0) medal = "🥇 1º Lugar";
        else if(idx === 1) medal = "🥈 2º Lugar";
        else if(idx === 2) medal = "🥉 3º Lugar";
        else medal = `🏅 ${idx + 1}º Lugar`;

        container.innerHTML += `
            <div class="ranking-item" style="border-left: 6px solid ${p.color}">
                <span>${medal} - ${p.name}</span>
            </div>
        `;
    });

    renderFinalReport();
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function renderFinalReport() {
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = "";

    const allPlayers = finishedPlayers.concat(players.filter(p => p.position < TOTAL_TILES - 1));
    allPlayers.forEach(p => renderPlayerReport(p, reportContainer, `report-questions-${p.id}`));
}

// Reason: Renderiza o relatório individual de um jogador (reutilizado no final e no detalhe histórico)
function renderPlayerReport(player, reportContainer, questionListId) {
    const displayNames = {
        Matematica: "📐 Matemática",
        Ingles: "🇺🇸 Inglês",
        Portugues: "🇧🇷 Português",
        Geografia: "🌍 Geografia",
        Historia_do_Brasil: "📜 História do Brasil",
        Biologia: "🧬 Biologia"
    };

    const stats = calculatePlayerStats(player);
    const correctPct = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;
    const wrongPct = stats.total > 0 ? Math.round((stats.erros / stats.total) * 100) : 0;

    // Renderiza estatísticas por disciplina
    let disciplinesHtml = "";
    Object.keys(stats.porDisciplina).forEach(cat => {
        const d = stats.porDisciplina[cat];
        disciplinesHtml += `
            <div class="report-discipline">
                <span>${displayNames[cat] || cat}</span>
                <span>✅ ${d.acertos} | ❌ ${d.erros} (${d.total})</span>
            </div>
        `;
    });
    if (disciplinesHtml === "") disciplinesHtml = `<div class="report-discipline"><span>Nenhuma pergunta respondida</span></div>`;

    // Dificuldades escolhidas
    const difficultiesHtml = `
        <div class="report-discipline">
            <span>Fácil</span><span>${stats.porDificuldade.facil || 0}</span>
        </div>
        <div class="report-discipline">
            <span>Média</span><span>${stats.porDificuldade.media || 0}</span>
        </div>
        <div class="report-discipline">
            <span>Difícil</span><span>${stats.porDificuldade.dificil || 0}</span>
        </div>
    `;

    // Lista de perguntas detalhadas
    const questionsHtml = player.answerHistory.map((r, idx) => {
        const statusClass = r.acertou ? "report-question-correct" : "report-question-wrong";
        const statusText = r.acertou ? "✅ Acertou" : "❌ Errou";
        const quickBadge = r.bonusVelocidade ? " ⚡ +1" : "";
        const explanationLine = r.explicacao ? `<br><span style="color:#555; font-size:0.85rem;">💡 ${r.explicacao}</span>` : "";
        return `
            <div class="report-question">
                <strong>#${idx + 1}</strong> ${r.pergunta}<br>
                <span class="${statusClass}">${statusText}${quickBadge}</span>
                <span style="color:#888;"> • ${displayNames[r.categoria] || r.categoria} • ${r.dificuldade} • ${formatMsToSeconds(r.tempoMs)}s</span>
                ${explanationLine}
            </div>
        `;
    }).join("");

    reportContainer.innerHTML += `
        <div class="report-player" style="border-left-color: ${player.color}">
            <h3>📊 ${player.name}</h3>
            <div class="report-grid">
                <div class="report-stat">
                    <div class="report-stat-value">${stats.total}</div>
                    <div class="report-stat-label">Perguntas</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-value" style="color:#06d6a0">${stats.acertos}</div>
                    <div class="report-stat-label">Acertos</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-value" style="color:#ef476f">${stats.erros}</div>
                    <div class="report-stat-label">Erros</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-value" style="color:#ffd166">${stats.bonusVelocidade}</div>
                    <div class="report-stat-label">Respostas rápidas</div>
                </div>
                <div class="report-stat">
                    <div class="report-stat-value">${formatMsToSeconds(stats.tempoMedio)}s</div>
                    <div class="report-stat-label">Tempo médio</div>
                </div>
            </div>

            <div class="report-section">
                <div class="report-section-title">Taxa de acerto</div>
                <div class="report-bar">
                    <div class="report-bar-correct" style="width: ${correctPct}%"></div>
                    <div class="report-bar-wrong" style="width: ${wrongPct}%"></div>
                </div>
                <div style="font-size:0.8rem; color:#666; text-align:center;">${correctPct}% acerto • ${wrongPct}% erro</div>
            </div>

            <div class="report-section">
                <div class="report-section-title">Desempenho por disciplina</div>
                ${disciplinesHtml}
            </div>

            <div class="report-section">
                <div class="report-section-title">Dificuldades escolhidas</div>
                ${difficultiesHtml}
            </div>

            <div class="report-section">
                <div class="report-section-title">Tempo total de resposta</div>
                <div class="report-discipline">
                    <span>Total</span>
                    <span>${formatMsToSeconds(stats.tempoTotal)}s</span>
                </div>
            </div>

            ${questionsHtml ? `
            <div class="report-section">
                <button class="report-toggle" onclick="toggleReportSection('${questionListId}')">📋 Ver perguntas e respostas</button>
                <div id="${questionListId}" class="report-question-list" style="display:none; margin-top:8px;">
                    ${questionsHtml}
                </div>
            </div>
            ` : ""}
        </div>
    `;
}

function toggleReportSection(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.style.display = el.style.display === "none" ? "block" : "none";
    }
}
