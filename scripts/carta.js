let naoCliques = 0;
const mensagensNao = [
  "Tem certeza? 🥺",
  "Pensa bem… 💭",
  "Última chance… 🌹",
];

function aceitou() {
  document.getElementById('sim-overlay').classList.add('active');
  spawnCoracoes();
  spawnPetals();
}

function recusou() {
  naoCliques++;
  const btn = document.getElementById('btnNao');
  const msg = document.getElementById('naoMsg');

  if (naoCliques <= 3) {
    msg.textContent = mensagensNao[naoCliques - 1];
    moveNaoBtn();
  } else {
    btn.style.display = 'none';
    msg.style.color = '#6a4050';
    msg.style.fontSize = '.95rem';
    msg.textContent = 'Tudo bem, já entendi que não sou eu quem você espera para ser seu namorado. Esse foi o último pedido. Desculpe por insistir tanto.';
  }
}

function moveNaoBtn() {
  const btn = document.getElementById('btnNao');
  const maxX = window.innerWidth  - 160;
  const maxY = window.innerHeight - 80;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btn.style.position  = 'fixed';
  btn.style.left      = x + 'px';
  btn.style.top       = y + 'px';
  btn.style.zIndex    = '999';
  btn.style.transition = 'left .2s, top .2s';
}

function spawnCoracoes() {
  const container = document.getElementById('corações');
  const emojis = ['💖', '💕', '🌹', '✨', '💗', '💝', '🌸'];
  for (let i = 0; i < 30; i++) {
    const h = document.createElement('div');
    h.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}vw;
      top: -40px;
      font-size: ${1 + Math.random() * 1.5}rem;
      animation: petalFall ${4 + Math.random() * 6}s ${Math.random() * 3}s linear forwards;
      pointer-events: none;
    `;
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(h);
    setTimeout(() => h.remove(), 10000);
  }
}

function spawnPetals() {
  const container = document.getElementById('petals');
  const emojis = ['🌸', '🌹', '💖', '✨', '💐'];
  setInterval(() => {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    const dur = 5 + Math.random() * 7;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = '0s';
    p.style.fontSize = (.8 + Math.random() * .8) + 'rem';
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + 2) * 1000);
  }, 1200);
}

document.addEventListener('DOMContentLoaded', spawnPetals);