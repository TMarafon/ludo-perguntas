// --- ALGORITMO DE CARACOL QUADRADO (FORA PARA DENTRO) ---
function generateSquareSpiralMap() {
    // Usa -1 para marcar células vazias, evitando conflito com o índice 0
    let matrix = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(-1));
    let x = 0, z = 0, dx = 1, dz = 0;
    let positions = new Array(TOTAL_TILES);
    
    for (let i = 0; i < TOTAL_TILES; i++) {
        // Reason: Y aumenta gradativamente do início (fora) até o centro (topo), criando efeito de escalada
        positions[i] = { x: x, z: z, y: (i / (TOTAL_TILES - 1)) * CLIMB_HEIGHT };
        matrix[z][x] = i;
        
        // Verifica colisão com as bordas ou células já preenchidas para rotacionar 90 graus para dentro
        if (x + dx >= BOARD_SIZE || x + dx < 0 || z + dz >= BOARD_SIZE || z + dz < 0 || matrix[z + dz][x + dx] !== -1) {
            // Rotaciona vetor de direção: (1,0) -> (0,1) -> (-1,0) -> (0,-1)
            let temp = dx;
            dx = -dz;
            dz = temp;
        }
        x += dx;
        z += dz;
    }
    return positions;
}

boardSpiralPositions = generateSquareSpiralMap();

// --- CONTROLE DE CÂMERA COM O MOUSE ---
// Reason: Converte a posição esférica (theta, phi, radius) em coordenadas cartesianas
// e aponta a câmera para o centro do tabuleiro, permitindo rotacionar a vista com o mouse.
function updateCameraFromControls() {
    const r = cameraControls.radius;
    const theta = cameraControls.theta;
    const phi = cameraControls.phi;

    const x = cameraControls.target.x + r * Math.sin(phi) * Math.sin(theta);
    const y = cameraControls.target.y + r * Math.cos(phi);
    const z = cameraControls.target.z + r * Math.sin(phi) * Math.cos(theta);

    camera.position.set(x, y, z);
    camera.lookAt(cameraControls.target);
}

function initCameraControls(canvas) {
    // Converte a posição inicial da câmera para coordenadas esféricas
    const dx = camera.position.x - cameraControls.target.x;
    const dy = camera.position.y - cameraControls.target.y;
    const dz = camera.position.z - cameraControls.target.z;
    cameraControls.radius = Math.sqrt(dx * dx + dy * dy + dz * dz);
    cameraControls.theta = Math.atan2(dx, dz);
    cameraControls.phi = Math.acos(Math.max(-1, Math.min(1, dy / cameraControls.radius)));

    canvas.addEventListener('pointerdown', (e) => {
        cameraControls.isDragging = true;
        cameraControls.lastMouseX = e.clientX;
        cameraControls.lastMouseY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!cameraControls.isDragging) return;
        const deltaX = e.clientX - cameraControls.lastMouseX;
        const deltaY = e.clientY - cameraControls.lastMouseY;
        cameraControls.lastMouseX = e.clientX;
        cameraControls.lastMouseY = e.clientY;

        // Sensibilidade de rotação
        cameraControls.theta -= deltaX * 0.005;
        cameraControls.phi -= deltaY * 0.005;
        // Limita o ângulo vertical para não passar pelos polos
        cameraControls.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraControls.phi));

        updateCameraFromControls();
    });

    function stopDragging(e) {
        if (cameraControls.isDragging) {
            cameraControls.isDragging = false;
            canvas.releasePointerCapture(e.pointerId);
            canvas.style.cursor = 'grab';
        }
    }

    canvas.addEventListener('pointerup', stopDragging);
    canvas.addEventListener('pointerleave', stopDragging);

    // Zoom com a roda do mouse
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.001;
        cameraControls.radius += e.deltaY * zoomSpeed * cameraControls.radius;
        cameraControls.radius = Math.max(2, Math.min(60, cameraControls.radius));
        updateCameraFromControls();
    }, { passive: false });

    canvas.style.cursor = 'grab';
}

// --- ENGINE 3D (THREE.JS) ---
function init3DSpace() {
    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#101026');

    // Câmera isométrica inclinada
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(BOARD_SIZE / 2, 16, BOARD_SIZE * 1.2);
    camera.lookAt(BOARD_SIZE / 2, CLIMB_HEIGHT / 2, BOARD_SIZE / 2);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Construção Visual do Tabuleiro
    boardGroup = new THREE.Group();
    
    for(let i=0; i<TOTAL_TILES; i++) {
        const pos = boardSpiralPositions[i];
        // Gradiente de cores do arco-íris que mostra a direção do percurso (do início ao fim)
        const progress = i / (TOTAL_TILES - 1);
        // HSL: cicla através do espectro do arco-íris (0 a 360 graus)
        const hue = Math.round(progress * 300); // Vermelho (0) -> Magenta (300)
        let tileColor = `hsl(${hue}, 85%, 55%)`;
        
        let height = 0.4;
        let isSurpriseTile = SURPRISE_TILES.includes(i);
        // Destaca o centro (Pódio Final)
        if(i === TOTAL_TILES - 1) {
            tileColor = '#ffd166';
            height = 0.8;
        }
        // Destaca casas surpresa com roxo brilhante e altura maior
        if(isSurpriseTile) {
            tileColor = '#7209b7';
            height = 0.7;
        }

        const geometry = new THREE.BoxGeometry(0.9, height, 0.9);
        const material = new THREE.MeshStandardMaterial({ 
            color: tileColor, 
            roughness: 0.4,
            metalness: 0.1
        });
        
        const tileMesh = new THREE.Mesh(geometry, material);
        // Centraliza os blocos no espaço 3D
        tileMesh.position.set(pos.x, pos.y + height / 2, pos.z);
        tileMesh.receiveShadow = true;
        boardGroup.add(tileMesh);

        // Adiciona número da casa (sequência correta do espiral: 0 a 143)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        if(isSurpriseTile) {
            // Casas surpresa mostram "?" em vez do número
            ctx.fillStyle = '#ffd166';
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', 32, 32);
        } else {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i.toString(), 32, 32);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true,
            side: THREE.DoubleSide
        });
        const textGeometry = new THREE.PlaneGeometry(0.5, 0.5);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(pos.x, pos.y + height + 0.3, pos.z);
        textMesh.rotation.x = -Math.PI / 4;
        boardGroup.add(textMesh);

        // Registra referências das casas surpresa para desativar visualmente após uso
        if(isSurpriseTile) {
            surpriseTileMeshes[i] = { tileMesh, textMesh };
        }
    }
    scene.add(boardGroup);

    // Redimensionamento responsivo
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Inicializa o target dos controles de câmera após BOARD_SIZE e CLIMB_HEIGHT estarem definidos
    cameraControls.target = new THREE.Vector3(BOARD_SIZE / 2, CLIMB_HEIGHT / 2, BOARD_SIZE / 2);

    // Habilita rotação e zoom da câmera com o mouse
    initCameraControls(renderer.domElement);

    // Loop de renderização estático controlado por animações GSAP
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Criar os modelos 3D dos Peões
function createPlayerToken3D(id, colorHex) {
    const tokenGroup = new THREE.Group();
    
    // Corpo estilizado em formato de pião/cone macio
    const bodyGeo = new THREE.CylinderGeometry(0, 0.25, 0.7, 16);
    const headGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const tokenMat = new THREE.MeshStandardMaterial({ 
        color: colorHex, 
        roughness: 0.2, 
        metalness: 0.3 
    });

    const body = new THREE.Mesh(bodyGeo, tokenMat);
    body.position.y = 0.35;
    body.castShadow = true;

    const head = new THREE.Mesh(headGeo, tokenMat);
    head.position.y = 0.7;
    head.castShadow = true;

    tokenGroup.add(body, head);

    // Rótulo com o nome do jogador flutuando acima do peão
    const nameLabel = createPlayerNameLabel(players[id].name, colorHex);
    nameLabel.position.set(0, 1.25, 0);
    tokenGroup.add(nameLabel);
    tokenGroup.userData.nameLabel = nameLabel;
    
    // Posiciona na casa zero inicial com leve deslocamento incremental com base no ID para não sobrepor perfeitamente
    const startPos = boardSpiralPositions[0];
    const offset = (id * 0.08) - 0.2; 
    tokenGroup.position.set(startPos.x + offset, startPos.y + 0.4, startPos.z + offset);
    
    scene.add(tokenGroup);
    playerMeshes[id] = tokenGroup;
}

// Desenha um retângulo com cantos arredondados em um canvas 2D
function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// Cria um sprite 3D com o nome do jogador usando CanvasTexture
function createPlayerNameLabel(name, colorHex, highlighted = false) {
    const texture = createPlayerNameLabelTexture(name, colorHex, highlighted);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    const aspect = texture.image.width / texture.image.height;
    const baseHeight = highlighted ? 0.65 : 0.55;
    sprite.scale.set(baseHeight * aspect, baseHeight, 1);
    return sprite;
}

// Gera a textura do rótulo do jogador; a flag highlighted destaca o jogador corrente
function createPlayerNameLabelTexture(name, colorHex, highlighted = false) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 32;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    const textMetrics = ctx.measureText(name);
    const padding = 16;
    const width = Math.ceil(textMetrics.width + padding * 2);
    const height = Math.ceil(fontSize + padding);
    canvas.width = width;
    canvas.height = height;

    // Fundo arredondado: amarelo claro quando ativo, branco quando inativo
    ctx.fillStyle = highlighted ? 'rgba(255, 234, 167, 0.95)' : 'rgba(255, 255, 255, 0.92)';
    ctx.strokeStyle = highlighted ? '#333' : colorHex;
    ctx.lineWidth = highlighted ? 6 : 4;
    roundRect(ctx, 0, 0, width, height, 10);
    ctx.fill();
    ctx.stroke();

    // Texto centralizado
    ctx.fillStyle = '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillText(name, width / 2, height / 2 + 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
}

// Atualiza o destaque dos rótulos conforme o jogador corrente
function updatePlayerLabelsHighlight() {
    players.forEach(p => {
        const mesh = playerMeshes[p.id];
        if (!mesh || !mesh.userData.nameLabel) return;
        const isCurrent = activePlayersIndices.length > 0 && activePlayersIndices[currentPlayerIdx] === p.id;
        const label = mesh.userData.nameLabel;
        const newTexture = createPlayerNameLabelTexture(p.name, p.color, isCurrent);
        label.material.map = newTexture;
        label.material.needsUpdate = true;
        const aspect = newTexture.image.width / newTexture.image.height;
        const baseHeight = isCurrent ? 0.65 : 0.55;
        label.scale.set(baseHeight * aspect, baseHeight, 1);
    });
}

// --- SISTEMA DE ANIMAÇÃO COM CARICATURA 3D (GSAP) ---
function executeTweenMovement(player, tilesToMove, onComplete) {
    const mesh = playerMeshes[player.id];
    const startPos = player.position;
    let endPos = startPos + tilesToMove;
    
    // Clampa limites do tabuleiro
    if(endPos < 0) endPos = 0;
    if(endPos >= TOTAL_TILES - 1) endPos = TOTAL_TILES - 1;

    player.position = endPos;

    // Cria uma timeline do GSAP para animar passo a passo (casa por casa) em curva parabólica
    let tl = gsap.timeline({
        onComplete: onComplete ? onComplete : undefined
    });
    let stepDirection = tilesToMove >= 0 ? 1 : -1;
    let totalSteps = Math.abs(endPos - startPos);

    // Se não houver deslocamento, executa o callback de imediato
    if (totalSteps === 0) {
        if (onComplete) onComplete();
        return;
    }

    let currentTrackedPos = startPos;
    const offset = (player.id * 0.08) - 0.2;

    for(let s = 0; s < totalSteps; s++) {
        currentTrackedPos += stepDirection;
        const nextCoords = boardSpiralPositions[currentTrackedPos];

        // Salto parabólico (Eixo Y simula altura do pulo, X/Z o deslocamento plano)
        tl.to(mesh.position, {
            x: nextCoords.x + offset,
            y: nextCoords.y + 0.4,
            z: nextCoords.z + offset,
            duration: 0.22,
            ease: "power1.inOut"
        });
        
        // Efeito Squash & Stretch na escala do Peão integrado ao pulo
        tl.to(mesh.scale, { y: 1.3, x: 0.8, z: 0.8, duration: 0.1, yoyo: true, repeat: 1 }, "<");
        tl.to(mesh.scale, { y: 0.7, x: 1.2, z: 1.2, duration: 0.08, yoyo: true, repeat: 1 }, ">-0.08");
    }
}
