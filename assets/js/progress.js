const progressDiv = document.getElementById('progress-report');
const badgesDiv = document.getElementById('badges');
const comparisonDiv = document.getElementById('comparison');
const saveBtn = document.getElementById('save-progress');
const loginBtn = document.getElementById('login-btn');

function renderProgress() {
  let scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  if (scores.length === 0) {
    progressDiv.textContent = "No progress yet. Start practicing!";
    return;
  }
  let wpmList = scores.map(s => s.wpm);
  let accuracyList = scores.map(s => s.accuracy);
  let avgWpm = Math.round(wpmList.reduce((a,b)=>a+b,0)/wpmList.length);
  let avgAcc = Math.round(accuracyList.reduce((a,b)=>a+b,0)/accuracyList.length);

  progressDiv.innerHTML = `
    <h3>Average WPM: ${avgWpm}</h3>
    <h3>Average Accuracy: ${avgAcc}%</h3>
    <canvas id="wpm-graph" width="300" height="100"></canvas>
    <div>Mistyped letters/words: ${wpmList.length}</div>
  `;
  renderWpmGraph(wpmList);
  // Achievements
  let badges = [];
  if (avgWpm > 80) badges.push('Speedster');
  if (avgAcc > 95) badges.push('Precision Master');
  badgesDiv.textContent = badges.length ? badges.join(', ') : 'No badges yet.';
  // Global comparison (dummy for now)
  let percentile = avgWpm > 70 ? 70 : avgWpm > 40 ? 50 : 30;
  comparisonDiv.textContent = `You performed better than ${percentile}% of users globally.`;
}

function renderWpmGraph(wpmList) {
  let canvas = document.getElementById('wpm-graph');
  if (!canvas) return;
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = 'var(--primary)';
  ctx.beginPath();
  wpmList.forEach((wpm, i) => {
    let x = i * (canvas.width / wpmList.length);
    let y = canvas.height - wpm * (canvas.height / 120);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

saveBtn.onclick = () => {
  alert('Progress saved locally!');
};
loginBtn.onclick = () => {
  alert('Login coming soon!');
};

renderProgress();
