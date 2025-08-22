import { highlightKey } from './keyboard.js';

const practiceInput = document.getElementById('practice-input');
const modeSelect = document.getElementById('mode');
const langSelect = document.getElementById('lang');
const layoutSelect = document.getElementById('layout');
const wpmSpan = document.getElementById('wpm');
const accuracySpan = document.getElementById('accuracy');
const adTip = document.getElementById('ad-tip');
const soundToggle = document.getElementById('sound-toggle');

let texts = {
  words: ['type', 'learn', 'speed', 'accuracy', 'practice'],
  sentences: ['Typing fast is a valuable skill.', 'Practice makes perfect.', 'Stay focused and improve every day.'],
  paragraphs: ['Touch typing boosts productivity. Consistency and correct posture will help you master typing quickly.'],
};
let currentText = '';
let startTime, typedChars = 0, mistakes = 0;
let typingSound = new Audio('assets/sounds/type.mp3');

function getRandomText() {
  let arr = texts[modeSelect.value];
  return arr[Math.floor(Math.random() * arr.length)];
}

function showNewText() {
  currentText = getRandomText();
  practiceInput.value = '';
  practiceInput.setAttribute('placeholder', currentText);
  startTime = null;
  typedChars = 0;
  mistakes = 0;
  wpmSpan.textContent = 'WPM: --';
  accuracySpan.textContent = 'Accuracy: --%';
}

function showAdOrTip() {
  // Ads or motivational tips
  const tips = [
    'Well done! Keep going!',
    'Tip: Practice daily for fast improvement.',
    'Ad: Try our advanced typing test!',
    'Tip: Maintain good posture for speed.',
  ];
  adTip.textContent = tips[Math.floor(Math.random() * tips.length)];
  adTip.classList.remove('hidden');
  setTimeout(() => adTip.classList.add('hidden'), 2000);
}

practiceInput.addEventListener('input', (e) => {
  if (!startTime) startTime = Date.now();
  typedChars++;
  if (soundToggle.checked && typingSound) typingSound.play();

  // Real-time feedback
  let val = practiceInput.value;
  let target = currentText;
  let correct = 0;
  for (let i = 0; i < val.length; i++) {
    if (val[i] === target[i]) correct++;
    else mistakes++;
  }
  let elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
  let wpm = Math.round((typedChars / 5) / (elapsed || 1));
  let accuracy = Math.max(0, Math.round((correct / typedChars) * 100));
  wpmSpan.textContent = `WPM: ${wpm}`;
  accuracySpan.textContent = `Accuracy: ${accuracy}%`;

  // Keyboard visualizer
  let lastChar = val[val.length - 1];
  if (lastChar) highlightKey(lastChar);

  // Auto-next logic
  if (val === target) {
    showAdOrTip();
    setTimeout(showNewText, 2000);
  }
});

// Change mode/language/layout
modeSelect.onchange = showNewText;
langSelect.onchange = showNewText;
layoutSelect.onchange = () => {
  renderKeyboard(layoutSelect.value, langSelect.value);
  showNewText();
};
soundToggle.onchange = () => { typingSound.muted = !soundToggle.checked; };

// Initial load
showNewText();
