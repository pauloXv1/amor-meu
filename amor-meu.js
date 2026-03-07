const musicName   = "Evidências";
const musicArtist = "Chitãozinho & Xororó";
const youtubeId   = "uzHJFYsf1-Y";

const photos = [
  { src: "fotos-dela/foto17.jpg", phrase: "O seu sorriso é o meu lugar favorito", caption: "O sorriso que me conquistou" },
  { src: "fotos-dela/foto02.jpg", phrase: "Com você, os dias simples viram os melhores dias.", caption: "Cada dia ao seu lado é especial" },
  { src: "fotos-dela/foto04.jpg", phrase: "Você tem a leveza das flores e a força de um jardim inteiro.", caption: "Sua força me inspira" },
  { src: "fotos-dela/foto05.jpg", phrase: "No meio da noite, ela ainda consegue ser a coisa mais brilhante daqui..", caption: "A parte favorita do meu dia" },
  { src: "fotos-dela/foto06.jpg", phrase: "Você é a prova de que coisas bonitas existem de verdade.", caption: "Lindeza que existe de verdade" },
  { src: "fotos-dela/foto07.jpg", phrase: "Mesmo estando do lado errado da via, você ainda é o ser mais lindo e incrível que já vi.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto08.jpg", phrase: "Entre o mar e o sol… ela continua sendo a vista mais bonita.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto09.jpg", phrase: "Que Deus abençoe e nazinha interceda sempre esse sorriso que alegra meus dias", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto10.jpg", phrase: "Momentos simples, risadas sinceras e memórias que ficam.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto11.jpg", phrase: "Entre a fé, a gratidão e o felicidade dela, eu só consegui sentir uma coisa: muito orgulho da mulher que você é.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto12.jpg", phrase: "Enquanto ela admirava a história diante dos seus olhos, eu admirava a história que estou vivendo ao lado dela.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto15.jpg", phrase: "Em meio a folia, o melhor de tudo foi ter você ao meu lado.", caption: "Silêncios que eu guardo para sempre" },
  { src: "fotos-dela/foto16.jpg", phrase: "Entre passeios, risadas, fé, conquistas e momentos simples, fomos colecionando memórias que eu quero guardar para sempre. Cada foto desse dia carrega um pedaço da nossa história, e em todas elas existe algo que nunca muda: a felicidade de ter você ao meu lado.", caption: "Silêncios que eu guardo para sempre" },
];

let ytPlayer;
let playing = false;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: youtubeId,
    playerVars: { autoplay: 0, loop: 1, playlist: youtubeId },
    events: { onReady: onPlayerReady }
  });
};

function onPlayerReady() {
  const playBtn   = document.getElementById('playBtn');
  const playIcon  = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const bars      = document.getElementById('bars');

  document.getElementById('musicTitle').textContent  = musicName;
  document.getElementById('musicArtist').textContent = '♪ ' + musicArtist;

  playBtn.addEventListener('click', () => {
    if (playing) {
      ytPlayer.pauseVideo();
      playIcon.style.display  = 'block';
      pauseIcon.style.display = 'none';
      bars.classList.add('paused');
    } else {
      ytPlayer.playVideo();
      playIcon.style.display  = 'none';
      pauseIcon.style.display = 'block';
      bars.classList.remove('paused');
    }
    playing = !playing;
  });
}

function renderGallery() {
  const grid = document.getElementById('photoGrid');
  photos.forEach((p, i) => {
    grid.innerHTML += `
      <div class="photo-card" style="transition-delay:${i * .08}s">
        <div class="photo-wrap">
          <img src="${p.src}" alt="foto ${i + 1}" loading="lazy"/>
          <div class="photo-overlay">
            <p class="overlay-phrase">${p.phrase}</p>
          </div>
        </div>
        <div class="photo-caption">
          <p class="phrase">"${p.phrase}"</p>
          <span class="number">0${i + 1}</span>
        </div>
      </div>`;
  });
}

function initScrollReveal() {
  const cards = document.querySelectorAll('.photo-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .15 });
  cards.forEach(c => obs.observe(c));
}

function initCursor() {
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    cursor.style.width  = '22px';
    cursor.style.height = '22px';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
  });
}

function initPetals() {
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

  setInterval(spawnPetal, 900);
  for (let i = 0; i < 6; i++) spawnPetal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initScrollReveal();
  initCursor();
  initPetals();
});