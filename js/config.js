// --- VARIÁVEIS GLOBAIS DE CONTROLE DO JOGO ---
let players = [];
let activePlayersIndices = []; // Índices dos que ainda não terminaram
let finishedPlayers = []; // Ordem de chegada [{name, color}]
let currentPlayerIdx = 0;
let boardSpiralPositions = []; // Mapeamento casa -> {x, z, y} (y = altura de escalada)

// Instâncias do Three.js
let scene, camera, renderer, boardGroup;
let playerMeshes = {};

// Controle da câmera com o mouse (orbita manual)
let cameraControls = {
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    theta: 0,       // Ângulo horizontal em torno do centro
    phi: 0,         // Ângulo vertical em torno do centro
    radius: 0,      // Distância do centro
    target: null    // Será definido após inicialização
};

// Estado do turno atual
let selectedCategory = "";
let currentQuestionObj = null;
let currentQuestionDifficulty = "facil"; // Dificuldade da pergunta atual
let currentQuestionStartTime = 0; // Timestamp de início da pergunta atual
let quickBonusTimerInterval = null; // Referência do setInterval do contador regressivo

// Armazena o movimento do peão calculado ao responder, aguardando o fechamento do feedback
let pendingMovement = null;

// Chave do localStorage para persistir o histórico de respostas
const LOCAL_STORAGE_KEY = "jornada_conhecimento_historico";

// Controle de depleção do pool de perguntas
let poolMode = "per-player"; // "per-player" ou "shared"
let activeQuestionPools = {}; // No modo "per-player": { playerId: { categoria: { dificuldade: [objetos] } } }; no modo "shared": { categoria: { dificuldade: [objetos] } }
let sharedTanks = null; // Tanques compartilhados no modo "shared"
let sharedHistory = null; // Histórico compartilhado no modo "shared"
let refillTurns = 0; // Número de turnos sem uso para reabastecer uma disciplina (0 = desativado)

// --- SISTEMA DE BÔNUS ROTATIVO ---
// Reason: A cada rodada, uma disciplina aleatória ganha +3 casas de bônus no acerto,
// incentivando os jogadores a variar de disciplina em vez de sempre escolher a mais fácil.
let bonusCategory = null;
const BONUS_STEPS = 3;

// --- SISTEMA DE BÔNUS DE RESPOSTA RÁPIDA ---
// Reason: O tempo para ganhar o bônus varia conforme a dificuldade da pergunta:
// fácil = 5s, média = 8s, difícil = 10s. Perguntas mais difíceis dão mais tempo.
const QUICK_ANSWER_BONUS = 1;
const QUICK_ANSWER_MS_BY_DIFFICULTY = {
    facil: 5000,
    media: 8000,
    dificil: 10000
};

// --- SISTEMA DE CASAS SURPRESA ---
// Reason: 16 casas distribuídas a partir da casa 10, espaçadas a cada ~9 casas
const SURPRISE_TILES = [10, 19, 28, 37, 46, 55, 64, 73, 82, 91, 100, 109, 118, 127, 136, 142];
let surpriseTileMeshes = {}; // { tileIndex: { tileMesh, iconMesh } } referências visuais das casas surpresa
let pendingSurpriseAfterMovement = false; // Flag para ativar surpresa após animação de movimento

// Variável para armazenar a carta surpresa sorteada em execução
let currentSurpriseCard = null;

// Variável para o detalhe do histórico
let currentHistoryDetail = null;

// --- CONSTANTES DO TABULEIRO ---
const BOARD_SIZE = 12; // 12x12
const TOTAL_TILES = BOARD_SIZE * BOARD_SIZE; // 144
const CLIMB_HEIGHT = 1; // Elevação total do efeito de escalada (centro = topo da montanha)

// --- FUNÇÕES DE AJUDA ---

function getDifficultyForTank(tankVal) {
    if (tankVal <= 3) return "dificil";
    if (tankVal <= 7) return "media";
    return "facil";
}

function getQuickAnswerMsForDifficulty(difficulty) {
    return QUICK_ANSWER_MS_BY_DIFFICULTY[difficulty] || QUICK_ANSWER_MS_BY_DIFFICULTY.facil;
}

function getRewardForTank(tankVal) {
    // Reason: Inverte a curva de recompensa — perguntas difíceis (tank baixo) valem mais casas,
    // evitando que o final do jogo fique arrastado e frustrante.
    if (tankVal <= 3) return 8;   // difícil vale mais
    if (tankVal <= 7) return 5;   // médio vale médio
    return 3;                      // fácil vale menos
}

function cloneQuestionPool() {
    const clone = {};
    for (const cat in questionPool) {
        clone[cat] = {};
        for (const diff in questionPool[cat]) {
            // Copia os objetos de pergunta para permitir depleção sem afetar o original
            clone[cat][diff] = questionPool[cat][diff].map(q => ({ ...q }));
        }
    }
    return clone;
}

// --- CONTROLE DE TELA CHEIA ---
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}

function updateFullscreenButtonIcon() {
    const btn = document.getElementById('fullscreen-btn');
    if (btn) {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        btn.textContent = isFullscreen ? '⛶' : '⛶';
        btn.title = isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia';
    }
}

document.addEventListener('fullscreenchange', updateFullscreenButtonIcon);
document.addEventListener('webkitfullscreenchange', updateFullscreenButtonIcon);
document.addEventListener('mozfullscreenchange', updateFullscreenButtonIcon);
document.addEventListener('MSFullscreenChange', updateFullscreenButtonIcon);
