const testArea = document.getElementById('test-area');
const startTestBtn = document.getElementById('start-test');
const leaderboardDiv = document.getElementById('leaderboard');
const gameArea = document.getElementById('game-area');
const gameFallingBtn = document.getElementById('game-falling');
const gameRaceBtn = document.getElementById('game-race');

let testText = "The quick brown fox jumps over the lazy dog.";
let timer, timeLeft = 60, wpm = 0, accuracy = 100, score = 0;

startTestBtn.onclick = () => {
  testArea.innerHTML = `
    <p>${testText}</p>
    <textarea id="test-input" rows="3"></textarea>
    <div>Time Left: <span id="time-left">${timeLeft}</span>s</div>
    <div id="test-feedback"></div>
  `;
  let testInput = document.getElementById('test-input');
  let timeLeftSpan = document.getElementById('time-left');
  let testFeedback = document.getElementById('test-feedback');
  let startTime = Date.now();
  let interval = setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    timeLeftSpan.textContent = Math.max(0, timeLeft - elapsed);
    if (elapsed >= timeLeft) {
      clearInterval(interval);
      let val = testInput.value;
      let chars = val.length;
      let mistakes = 0;
      for (let i = 0; i < val.length; i++)
        if (val[i] !== testText[i]) mistakes++;
      wpm = Math.round((chars / 5) / (timeLeft / 60));
      accuracy = Math.round(((chars - mistakes) / chars) * 100);
      testFeedback.innerHTML = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
      updateLeaderboard(wpm, accuracy);
    }
  }, 1000);
};

function updateLeaderboard(wpm, accuracy) {
  let scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  scores.push({ date: new Date().toISOString(), wpm, accuracy });
  scores = scores.slice(-20);
  localStorage.setItem('leaderboard', JSON.stringify(scores));
  renderLeaderboard();
}
function renderLeaderboard() {
  let scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  let sorted = scores.sort((a,b) => b.wpm - a.wpm);
  leaderboardDiv.innerHTML = '<ol>' + sorted.map(s =>
    `<li>${new Date(s.date).toLocaleDateString()} — WPM: ${s.wpm}, Accuracy: ${s.accuracy}%</li>`).join('') + '</ol>';
}
renderLeaderboard();

// Simple falling words game
gameFallingBtn.onclick = () => {
  gameArea.innerHTML = '<canvas id="falling-canvas" width="360" height="400"></canvas>';
  // Game logic here...
};

// Simple speed race game
gameRaceBtn.onclick = () => {
  gameArea.innerHTML = '<div>Speed race coming soon!</div>';
};
