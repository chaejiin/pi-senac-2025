document.addEventListener("DOMContentLoaded", () => {
  // --- MENU HAMBURGUER ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("active"));
  });

  // --- DADOS DE PETS ---
  const pets = [
    { nome: "ALVIN - ES", img: "assets/imagens/radar-de-pets/pet1.png", status: "achado" },
    { nome: "ALEMÃO - RS", img: "assets/imagens/radar-de-pets/pet2.png", status: "achado" },
    { nome: "ALFREDO - SP", img: "assets/imagens/radar-de-pets/pet3.png", status: "achado" },
    { nome: "AUGUSTO - RS", img: "assets/imagens/radar-de-pets/pet4.png", status: "achado" },
    { nome: "ALEMÃO - RS", img: "assets/imagens/radar-de-pets/pet5.png", status: "achado" },
    { nome: "ALVIM - RS", img: "assets/imagens/radar-de-pets/pet6.png", status: "achado" },

    { nome: "ALEX - MA", img: "assets/imagens/radar-de-pets/pet7.png", status: "perdido" },
    { nome: "ALANA - RS", img: "assets/imagens/radar-de-pets/pet8.png", status: "perdido" },
    { nome: "ALFREDO - BA", img: "assets/imagens/radar-de-pets/pet3.png", status: "perdido" },
    { nome: "AUGUSTO - RS", img: "assets/imagens/radar-de-pets/pet4.png", status: "perdido" },
    { nome: "ALEMÃO - RS", img: "assets/imagens/radar-de-pets/pet5.png", status: "perdido" },
    { nome: "ALVIM - RS", img: "assets/imagens/radar-de-pets/pet6.png", status: "perdido" }
  ];

  // --- FUNÇÕES DE CARDS ---
  function criarCardPet(pet) {
    const div = document.createElement("div");
    div.className = "pet-card";
    div.innerHTML = `<img src="${pet.img}" alt="${pet.nome}"><p>${pet.nome}</p>`;
    return div;
  }

  function carregarPets(status, containerId) {
    const container = document.getElementById(containerId);
    pets.forEach(p => {
      if (p.status === status) container.appendChild(criarCardPet(p));
    });
  }

  function animarImagens() {
    document.querySelectorAll(".pet-card img").forEach(img => {
      img.style.filter = "grayscale(100%)";
      img.style.transition = "filter 0.3s ease, transform 0.3s ease";
      img.addEventListener("mouseenter", () => {
        img.style.filter = "grayscale(0%)";
        img.style.transform = "scale(1.3)";
      });
      img.addEventListener("mouseleave", () => {
        img.style.filter = "grayscale(100%)";
        img.style.transform = "scale(1)";
      });
    });
  }

  // --- RENDERIZAÇÃO ---
  carregarPets("achado", "encontrados");
  carregarPets("perdido", "perdidos");
  animarImagens();

  // ======= ANIMAÇÃO DO GATO NO FOOTER =======
  const gato = document.getElementById("shimeji");
  const container = document.getElementById("shimeji-container");
  const somGatoRaivoso = new Audio("assets/audio/radar-de-pets/gato-raivoso.mp3");

  let posicao = 0;
  let indoDireita = true;
  let girando = false;

  // Função para liberar áudio após interação do usuário
  function desbloquearSom() {
    somGatoRaivoso.play().then(() => {
      somGatoRaivoso.pause();
      somGatoRaivoso.currentTime = 0;
    }).catch(() => {
      // Caso o áudio ainda esteja bloqueado, apenas ignore
    });
    // Remove os listeners para não chamar várias vezes
    window.removeEventListener('click', desbloquearSom);
    window.removeEventListener('touchstart', desbloquearSom);
  }
  window.addEventListener('click', desbloquearSom);
  window.addEventListener('touchstart', desbloquearSom);

  function girarGato(callback) {
    if (girando) return;
    girando = true;

    const duracao = 1000;
    const inicio = performance.now();

    somGatoRaivoso.currentTime = 0;
    somGatoRaivoso.play();

    function animar(agora) {
      const progresso = (agora - inicio) / duracao;
      const rotacao = -10000 * progresso;

      gato.style.transform = `scaleX(${indoDireita ? 1 : -1}) rotate(${rotacao}deg)`;

      if (progresso < 1) {
        requestAnimationFrame(animar);
      } else {
        gato.style.transform = `scaleX(${indoDireita ? 1 : -1}) rotate(0deg)`;
        girando = false;
        somGatoRaivoso.pause();
        callback();
      }
    }
    requestAnimationFrame(animar);
  }

  function moverGato() {
    if (girando) return requestAnimationFrame(moverGato);

    const limite = container.offsetWidth - gato.offsetWidth;
    const centro = limite / 2;

    posicao += indoDireita ? 2 : -2;
    gato.style.left = `${posicao}px`;

    if (Math.abs(posicao - centro) <= 1) {
      return girarGato(() => requestAnimationFrame(moverGato));
    }

    if (posicao >= limite) {
      indoDireita = false;
      gato.style.transform = "scaleX(1)";
    } else if (posicao <= 0) {
      indoDireita = true;
      gato.style.transform = "scaleX(-1)";
    }
    requestAnimationFrame(moverGato);
  }

  moverGato();
});
