const musicName   = "Nome da Música";
const musicArtist = "Nome do Artista";
const photos = [
  {
    src: "fotos-dela/foto01.jpg",
    phrase: "O seu sorriso é o meu lugar favorito",
    caption: "O sorriso que me conquistou"
  },
  {
    src: "fotos-dela/foto02.jpg",
    phrase: "Com você, os dias simples viram os melhores dias.",
    caption: "Cada dia ao seu lado é especial"
  },
  {
    src: "fotos-dela/foto04.jpg",
    phrase: "Você tem a leveza das flores e a força de um jardim inteiro.",
    caption: "Sua força me inspira"
  },
  {
    src: "fotos-dela/foto05.jpg",
    phrase: "Olhar para você é sempre a melhor parte do meu dia.",
    caption: "A parte favorita do meu dia"
  },
  {
    src: "fotos-dela/foto06.jpg",
    phrase: "Você é a prova de que coisas bonitas existem de verdade.",
    caption: "Lindeza que existe de verdade"
  },
  {
    src: "fotos-dela/foto07.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto08.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto09.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto10.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto11.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto12.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto13.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto14.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
    {
    src: "fotos-dela/foto15.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
      {
    src: "fotos-dela/foto16.jpg",
    phrase: "Ao seu lado, até o silêncio é a minha música favorita.",
    caption: "Silêncios que eu guardo para sempre"
  },
];

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

function initMusicPlayer() {
  const audio     = document.getElementById('bgAudio');
  const playBtn   = document.getElementById('playBtn');
  const playIcon  = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const bars      = document.getElementById('bars');

  document.getElementById('musicTitle').textContent  = musicName;
  document.getElementById('musicArtist').textContent = '♪ ' + musicArtist;

  let playing = false;

  playBtn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      playIcon.style.display  = 'block';
      pauseIcon.style.display = 'none';
      bars.classList.add('paused');
    } else {
      audio.play().catch(() => {});
      playIcon.style.display  = 'none';
      pauseIcon.style.display = 'block';
      bars.classList.remove('paused');
    }
    playing = !playing;
  });
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
  initMusicPlayer();
  initCursor();
  initPetals();
});