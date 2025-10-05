document.addEventListener('DOMContentLoaded', () => {

    const titleElement = document.getElementById('main-title');
    const subtitleElement = document.getElementById('main-subtitle');
    const buttonWrapper = document.getElementById('button-wrapper');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const body = document.body;

    const titleText = "UMA SESSÃO NOS AGUARDA...";
    const subtitleText = "Luzes se apagam, a tela se ilumina. Você aceita o convite para o cinema?";

    // --- FUNÇÕES DE ANIMAÇÃO DE TEXTO ---

    // Função que simula a digitação
    const typewriter = (element, text, speed = 80) => {
        return new Promise(resolve => {
            let i = 0;
            element.classList.add('typing-cursor');
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    element.classList.remove('typing-cursor');
                    resolve();
                }
            }, speed);
        });
    };

    // Função que simula o efeito de backspace
    const backspace = (element, speed = 50) => {
        return new Promise(resolve => {
            element.classList.add('typing-cursor');
            const interval = setInterval(() => {
                if (element.innerHTML.length > 0) {
                    element.innerHTML = element.innerHTML.slice(0, -1);
                } else {
                    clearInterval(interval);
                    element.classList.remove('typing-cursor');
                    resolve();
                }
            }, speed);
        });
    };
    
    // --- SEQUÊNCIA INICIAL ---
    const startAnimationSequence = async () => {
        await typewriter(titleElement, titleText, 100);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typewriter(subtitleElement, subtitleText, 60);
        await new Promise(resolve => setTimeout(resolve, 700));
        buttonWrapper.classList.add('visible');
    };

    startAnimationSequence();


    // --- LÓGICA DO CLIQUE NO BOTÃO "SIM" ---
    const handleYesClick = async () => {
        // Desativa os botões para evitar múltiplos cliques
        yesButton.style.pointerEvents = 'none';
        noButton.style.display = 'none';

        // 1. Esconde os botões
        buttonWrapper.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));

        // 2. Apaga a pergunta (VELOCIDADE AUMENTADA)
        await backspace(subtitleElement, 25); // Era 40
        await new Promise(resolve => setTimeout(resolve, 300));

        // 3. Apaga o título (VELOCIDADE AUMENTADA)
        await backspace(titleElement, 40); // Era 70
        await new Promise(resolve => setTimeout(resolve, 500));

        // 4. Reescreve a mensagem final
        await typewriter(titleElement, "Excelente escolha.", 120);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 5. Redireciona
        window.location.href = 'spotify:track:2p8IUWQDrpjuFltbdgLOag?si=7b1b46eda088425b';
    };

    yesButton.addEventListener('click', handleYesClick);


    // --- LÓGICA DO BOTÃO "NÃO" FUJÃO (Mantida) ---
    const moveButton = () => {
        const bodyRect = document.body.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();
        const maxX = bodyRect.width - buttonRect.width;
        const maxY = bodyRect.height - buttonRect.height;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    };

    noButton.addEventListener('mouseover', moveButton);
    noButton.addEventListener('click', moveButton);


    // --- LÓGICA DO EFEITO SPOTLIGHT (Mantida) ---
    const updateSpotlight = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        body.style.setProperty('--mouse-x', `${x}px`);
        body.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', updateSpotlight);
    window.addEventListener('touchmove', updateSpotlight);

});