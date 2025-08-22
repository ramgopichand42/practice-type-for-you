// Utility functions for data, localStorage, etc.
// Add more helpers as needed.
export function saveScore(type, score) {
  let scores = JSON.parse(localStorage.getItem(type) || '[]');
  scores.push(score);
  localStorage.setItem(type, JSON.stringify(scores));
}

export function getScores(type) {
  return JSON.parse(localStorage.getItem(type) || '[]');
}
