const professores = [
  { nome: "Davi", img: "img/davi.png", premio: "Você ganhou uma hilux!!!!", peso: 4 },
  { nome: "Elias", img: "img/elias.png", premio: "Parabéns, está tudo errado!!!!", peso: 3 },
  { nome: "Karan", img: "img/karan.png", premio: "Parabéns, você ganhou 10 postos extra!!!!", peso: 2 },
  { nome: "Reinaldo", img: "img/reinaldo.png", premio: "Você concluiu o curso, receba seu diploma!!!!", jackpot: true, peso: 1 }
];

function girar() {
  const resultado = document.getElementById("resultado");
  resultado.textContent = "";
  resultado.style.color = "white";

  // 🎵 Música: toca no clique
  const musica = document.getElementById("bg-music");
  if (musica.paused) {
    musica.volume = 0.5;
    musica.play().catch((e) => {
      console.log("Autoplay bloqueado até o usuário interagir.");
    });
  }

  let tempoTotal = 5000;
  let intervalo = 100;
  let tempo = 0;

  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");

  let final1, final2, final3;

  const animar = setInterval(() => {
    if (tempo <= tempoTotal) {
      if (tempo <= tempoTotal - 3000) {
        final1 = getRandomProf();
        slot1.innerHTML = `<img src="${final1.img}" class="face" />`;
      }

      if (tempo >= 1000 && tempo <= tempoTotal - 2000) {
        final2 = getRandomProf();
        slot2.innerHTML = `<img src="${final2.img}" class="face" />`;
      }

      if (tempo >= 2000 && tempo <= tempoTotal - 1000) {
        final3 = getRandomProf();
        slot3.innerHTML = `<img src="${final3.img}" class="face" />`;
      }

      tempo += intervalo;
    } else {
      clearInterval(animar);

      if (final1.nome === final2.nome && final2.nome === final3.nome) {
        resultado.textContent = final1.premio;
        resultado.style.color = final1.jackpot ? "green" : "yellow";
      } else {
        resultado.textContent = "Tente de novo!";
        resultado.style.color = "white";
      }
    }
  }, intervalo);
}

function getRandomProf() {
  const pool = [];

  professores.forEach(prof => {
    for (let i = 0; i < (prof.peso || 1); i++) {
      pool.push(prof);
    }
  });

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
