const musicName   = "Evidências";
const musicArtist = "Chitãozinho & Xororó";
const youtubeId   = "uzHJFYsf1-Y";


let ytPlayer;
let playing = false;
let naoCliques = 0;

const mensagensNao = [
  "Tem certeza? 🥺",
  "Pensa bem… 💭",
  "Última chance… 🌹",
];

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: youtubeId,
    playerVars: { autoplay: 0, loop: 1, playlist: youtubeId },
    events: {
      onReady: function () {
        if (sessionStorage.getItem('musicPlaying') === 'true') {
          ytPlayer.playVideo();
          playing = true;
        }
      }
    }
  });
};

function aceitou() {
  document.getElementById('sim-overlay').classList.add('active');
  spawnCoracoes();
  spawnPetalsOverlay();
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
  btn.style.position   = 'fixed';
  btn.style.left       = Math.random() * maxX + 'px';
  btn.style.top        = Math.random() * maxY + 'px';
  btn.style.zIndex     = '999';
  btn.style.transition = 'left .2s, top .2s';
}

function spawnCoracoes() {
  const container = document.getElementById('coracoes');
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

function spawnPetalsOverlay() {
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

document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('petals');
  const petalEmojis = ['🌸', '🌹', '🌺', '💐', '✿', '❀'];
  function spawnPetal() {
    const p = document.createElement('div');
    p.className   = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    p.style.left  = Math.random() * 100 + 'vw';
    const dur = 6 + Math.random() * 8;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay   = Math.random() * 5 + 's';
    p.style.fontSize = (.7 + Math.random() * .8) + 'rem';
    p.style.opacity  = .4 + Math.random() * .4;
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + 5) * 1000);
  }
  setInterval(spawnPetal, 1200);
  for (let i = 0; i < 4; i++) spawnPetal();
});