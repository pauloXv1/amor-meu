const CARD_ITEMS = [
  { type: 'emoji', val: '🌹' },
  { type: 'emoji', val: '💌' },
  { type: 'emoji', val: '✨' },
  { type: 'emoji', val: '🌸' },
  { type: 'emoji', val: '💖' },
  { type: 'emoji', val: '🦋' },
  { type: 'emoji', val: '🌙' },
  { type: 'emoji', val: '💐' },
];

let cards = [], flipped = [], matched = 0, moves = 0, seconds = 0, timerInterval;

function shuffle(arr) {
  const a = [...arr, ...arr].map((item, i) => ({ ...item, id: i }));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('game-screen').classList.add('active');
  buildGrid();
  startTimer();
}

function buildGrid() {
  cards = shuffle(CARD_ITEMS);
  flipped = []; matched = 0; moves = 0;
  updateStats();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  cards.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.val = item.val;
    card.dataset.index = i;
    card.style.animation = `cardAppear .4s ${i * .04}s both`;

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const front = document.createElement('div');
    front.className = 'card-front';
    front.textContent = '💝';

    const back = document.createElement('div');
    back.className = 'card-back';

    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.val;
      img.alt = 'carta';
      back.appendChild(img);
    } else {
      back.textContent = item.val;
    }

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (flipped.length === 2) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    updateStats();
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = flipped;
  if (a.dataset.val === b.dataset.val) {
    a.classList.add('matched');
    b.classList.add('matched');
    matched++;
    updateStats();
    flipped = [];
    if (matched === CARD_ITEMS.length) setTimeout(showWin, 600);
  } else {
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flipped = [];
    }, 900);
  }
}

function updateStats() {
  document.getElementById('moves').textContent = moves;
  document.getElementById('pairs').textContent = `${matched}/${CARD_ITEMS.length}`;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById('timer').textContent = '0s';
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById('timer').textContent = seconds + 's';
  }, 1000);
}

function showWin() {
  clearInterval(timerInterval);
  document.getElementById('final-moves').textContent = moves;
  document.getElementById('final-time').textContent = seconds + 's';
  document.getElementById('win-overlay').classList.add('active');
  spawnWinPetals();
}

function replayGame() {
  document.getElementById('win-overlay').classList.remove('active');
  buildGrid();
  startTimer();
}

function spawnWinPetals() {
  const container = document.getElementById('petals');
  const emojis = ['🌸', '🌹', '💖', '✨', '💐', '🌺'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    const dur = 4 + Math.random() * 6;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = Math.random() * 3 + 's';
    p.style.fontSize = (.8 + Math.random() * 1) + 'rem';
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + 4) * 1000);
  }
}