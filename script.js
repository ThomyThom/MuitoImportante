document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE ANIMAÇÃO DE DIGITAÇÃO (TYPEWRITER) ---
    const titleElement = document.getElementById('main-title');
    const subtitleElement = document.getElementById('main-subtitle');
    const buttonWrapper = document.getElementById('button-wrapper');

    const titleText = "UMA SESSÃO NOS AGUARDA...";
    const subtitleText = "Luzes se apagam, a tela se ilumina. Você aceita o convite para o cinema?";

    // Função que simula a digitação
    const typewriter = (element, text, speed = 80) => {
        return new Promise(resolve => {
            let i = 0;
            element.classList.add('typing-cursor'); // Adiciona o cursor piscando
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    element.classList.remove('typing-cursor'); // Remove o cursor no final
                    resolve();
                }
            }, speed);
        });
    };

    // Função assíncrona para controlar a sequência da animação
    const startAnimationSequence = async () => {
        await typewriter(titleElement, titleText, 100);
        await new Promise(resolve => setTimeout(resolve, 500)); // Pequena pausa dramática
        await typewriter(subtitleElement, subtitleText, 60);
        await new Promise(resolve => setTimeout(resolve, 700)); // Pausa antes de mostrar botões
        buttonWrapper.classList.add('visible'); // Revela os botões
    };

    // Inicia a sequência de animação
    startAnimationSequence();


    // --- LÓGICA DO BOTÃO "NÃO" FUJÃO (Mantida) ---
    const noButton = document.getElementById('noButton');
    
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
    const body = document.body;

    const updateSpotlight = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        body.style.setProperty('--mouse-x', `${x}px`);
        body.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', updateSpotlight);
    window.addEventListener('touchmove', updateSpotlight);

});