document.addEventListener('DOMContentLoaded', () => {
    // Código existente para os cards
    const contentSets = {
        default: [
            {
                title: "Conheça o Projeto (1/3)",
                text: "Rastro Certo é uma plataforma inteligente criada para facilitar o reencontro entre pessoas e seus animais perdidos — sejam eles cães, gatos, periquitos, mini pigs ou mesmo espécies mais exóticas."
            },
            {
                title: "Conheça o Projeto (2/3)",
                text: "Diferente das abordagens tradicionais, como panfletos ou grupos em redes sociais, usamos tecnologia, empatia e acessibilidade para ampliar as chances de reencontro de forma ágil e eficaz."
            },
            {
                title: "Conheça o Projeto (3/3)",
                text: "A IA analisa imagens, compara visualmente e cruza dados como aparência e região. Tudo direto do celular, em poucos cliques."
            }
        ],
        alternative: [
            {
                title: "Resultados Esperados (1/2)",
                text: "Além de promover reencontros, a plataforma contribui com a saúde pública, evitando problemas como doenças, mordidas e contaminação urbana."
            },
            {
                title: "Resultados Esperados (2/2)",
                text: "Mais eficaz que panfletos e mais funcional que redes sociais: a IA organiza, filtra e sugere coincidências reais de forma prática."
            },
            {
                title: "Tecnologia a Favor da Vida",
                text: "A proposta é transformar um gesto simples — tirar uma foto — em uma chance concreta de reconexão. Uma plataforma dedicada à vida, à dignidade animal e à tranquilidade de quem perdeu ou encontrou um bichinho."
            }
        ]
    };

    const button = document.querySelector('.cards__button');
    const articles = document.querySelectorAll('[data-content="default"]');
    const techCard = document.querySelector('.cards__item[data-content="default"]');

    let currentContent = 'default';

    function updateContent() {
        const newContent = currentContent === 'default' ? 'alternative' : 'default';

        articles.forEach((article, index) => {
            const content = contentSets[newContent][index];
            if (content) {
                article.querySelector('.cards__title').textContent = content.title;
                article.querySelector('.cards__text').textContent = content.text;
            }
        });

        button.textContent = currentContent === 'default' ? 'Voltar' : 'Saiba Mais';
        currentContent = newContent;
    }

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateContent();
    });

    // Controle de animação ao focar
    document.querySelectorAll('.cards__item').forEach(item => {
        item.addEventListener('focus', function () {
            this.style.transform = this.style.transform;
        });
    });

    // ==== DRAW CANVAS ====
    const canvas = document.getElementById("draw-canvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mouseout", () => drawing = false);

    canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    // ==== COLOR PALETTE ====
    let currentColor = "#000";

    document.querySelectorAll("#color-buttons button").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.color) {
                currentColor = btn.dataset.color;
                document.querySelectorAll("#color-buttons button").forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                // Lógica da borracha: limpar o canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.querySelectorAll("#color-buttons button").forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });    

    // Removi as chamadas a setupCardDrag e as variáveis leftCards, rightCards, discardedCards, resetBtn    

    // ==== MENU HAMBÚRGUER ====
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});