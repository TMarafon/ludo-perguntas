// --- SISTEMA DE HISTÓRICO E RELATÓRIO ---
// Reason: Salva o histórico de respostas no localStorage para o jogador poder consultar depois
function saveGameHistoryToCache() {
    const gameRecord = {
        dataHora: new Date().toISOString(),
        modoPool: poolMode,
        reabastecimentoTurnos: refillTurns,
        jogadores: players.map(p => ({
            id: p.id,
            nome: p.name,
            cor: p.color,
            posicaoFinal: p.position,
            respostas: p.answerHistory
        }))
    };

    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        const allHistory = stored ? JSON.parse(stored) : [];
        allHistory.push(gameRecord);
        // Mantém apenas os últimos 20 jogos para não estourar o espaço do localStorage
        while (allHistory.length > 20) {
            allHistory.shift();
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allHistory));
    } catch (e) {
        console.warn("Não foi possível salvar o histórico no localStorage:", e);
    }
}

function formatMsToSeconds(ms) {
    return (ms / 1000).toFixed(2);
}

function calculatePlayerStats(player) {
    const respostas = player.answerHistory;
    const total = respostas.length;
    const acertos = respostas.filter(r => r.acertou).length;
    const erros = total - acertos;
    const bonusVelocidade = respostas.filter(r => r.bonusVelocidade).length;
    const tempoTotal = respostas.reduce((sum, r) => sum + r.tempoMs, 0);
    const tempoMedio = total > 0 ? tempoTotal / total : 0;

    // Agrupa por disciplina
    const porDisciplina = {};
    respostas.forEach(r => {
        if (!porDisciplina[r.categoria]) {
            porDisciplina[r.categoria] = { total: 0, acertos: 0, erros: 0 };
        }
        porDisciplina[r.categoria].total += 1;
        if (r.acertou) {
            porDisciplina[r.categoria].acertos += 1;
        } else {
            porDisciplina[r.categoria].erros += 1;
        }
    });

    // Agrupa por dificuldade
    const porDificuldade = { facil: 0, media: 0, dificil: 0 };
    respostas.forEach(r => {
        porDificuldade[r.dificuldade] = (porDificuldade[r.dificuldade] || 0) + 1;
    });

    return { total, acertos, erros, bonusVelocidade, tempoTotal, tempoMedio, porDisciplina, porDificuldade };
}

// --- SISTEMA DE RANKING HISTÓRICO ---
// Reason: Lista cada jogador individualmente, pois o tempo total e os acertos são métricas pessoais
function loadGameHistoryFromCache() {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.warn("Não foi possível carregar o histórico do localStorage:", e);
        return [];
    }
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function showHistoryRanking() {
    const screen = document.getElementById('history-ranking-screen');
    renderHistoryRanking();
    screen.classList.remove('hidden');
}

function hideHistoryRanking() {
    document.getElementById('history-ranking-screen').classList.add('hidden');
}

function getHistoryRankingEntries() {
    const history = loadGameHistoryFromCache();
    const entries = [];

    history.forEach((game, gameIndex) => {
        game.jogadores.forEach((jogador, playerIndex) => {
            // Reason: O cache salva o histórico como 'respostas', então normalizamos para 'answerHistory'
            const playerObj = { answerHistory: jogador.respostas || [] };
            const stats = calculatePlayerStats(playerObj);
            const accuracy = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;
            entries.push({
                gameIndex,
                playerIndex,
                dataHora: game.dataHora,
                nome: jogador.nome,
                cor: jogador.cor,
                totalTimeMs: stats.tempoTotal,
                accuracy,
                totalQuestions: stats.total,
                totalCorrect: stats.acertos,
                respostasRapidas: stats.bonusVelocidade
            });
        });
    });

    // Ordenação: menor tempo total primeiro; em caso de empate, maior percentual de acertos
    entries.sort((a, b) => {
        if (a.totalTimeMs !== b.totalTimeMs) {
            return a.totalTimeMs - b.totalTimeMs;
        }
        return b.accuracy - a.accuracy;
    });

    return entries;
}

function renderHistoryRanking() {
    const container = document.getElementById('history-ranking-container');
    container.innerHTML = "";

    const entries = getHistoryRankingEntries();
    if (entries.length === 0) {
        container.innerHTML = `<div class="history-ranking-empty">Nenhum resultado histórico salvo ainda.<br>Jogue uma partida para aparecer aqui!</div>`;
        return;
    }

    entries.forEach((entry, rank) => {
        const dateStr = formatDateTime(entry.dataHora);
        const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : '🏅';

        container.innerHTML += `
            <div class="history-ranking-item" onclick="showHistoryDetail(${entry.gameIndex}, ${entry.playerIndex})" style="border-left-color: ${entry.cor}">
                <div class="history-ranking-info">
                    <div class="history-ranking-title">${medal} ${entry.nome} <span class="history-ranking-badge">${rank + 1}º</span></div>
                    <div class="history-ranking-meta">${dateStr}</div>
                </div>
                <div class="history-ranking-stats">
                    <div class="history-ranking-stat">⏱️ ${formatMsToSeconds(entry.totalTimeMs)}s</div>
                    <div class="history-ranking-stat" style="color:#06d6a0; font-size:0.85rem;">✅ ${entry.accuracy}% acertos</div>
                    <div class="history-ranking-stat" style="color:#ffd166; font-size:0.85rem;">⚡ ${entry.respostasRapidas} rápidas</div>
                </div>
            </div>
        `;
    });
}

function showHistoryDetail(gameIndex, playerIndex) {
    const history = loadGameHistoryFromCache();
    const game = history[gameIndex];
    if (!game || !game.jogadores[playerIndex]) return;

    const jogador = game.jogadores[playerIndex];
    currentHistoryDetail = { gameIndex, playerIndex };
    const subtitle = document.getElementById('history-detail-subtitle');
    const container = document.getElementById('history-detail-container');

    const playerObj = {
        id: playerIndex,
        name: jogador.nome,
        color: jogador.cor,
        answerHistory: jogador.respostas || []
    };
    const stats = calculatePlayerStats(playerObj);

    subtitle.innerHTML = `
        <strong>${jogador.nome}</strong> •
        ${formatDateTime(game.dataHora)} •
        ⏱️ ${formatMsToSeconds(stats.tempoTotal)}s •
        ✅ ${stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0}% acertos
    `;
    container.innerHTML = "";

    renderPlayerReport(playerObj, container, `history-report-questions-${playerIndex}`);

    document.getElementById('history-ranking-screen').classList.add('hidden');
    document.getElementById('history-detail-screen').classList.remove('hidden');
}

function deleteHistoryGame() {
    if (!currentHistoryDetail) return;

    const history = loadGameHistoryFromCache();
    const game = history[currentHistoryDetail.gameIndex];
    if (!game) return;

    const confirmMessage = `Tem certeza que deseja excluir o registro deste jogo de ${formatDateTime(game.dataHora)}?\nTodos os jogadores desta partida serão removidos do ranking histórico.`;
    if (!confirm(confirmMessage)) return;

    try {
        history.splice(currentHistoryDetail.gameIndex, 1);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
        currentHistoryDetail = null;
        hideHistoryDetail();
        renderHistoryRanking();
    } catch (e) {
        console.warn("Não foi possível excluir o registro do histórico:", e);
    }
}

function hideHistoryDetail() {
    document.getElementById('history-detail-screen').classList.add('hidden');
    document.getElementById('history-ranking-screen').classList.remove('hidden');
}
