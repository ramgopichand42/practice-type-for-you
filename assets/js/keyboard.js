// Keyboard visualizer for tutorials and practice
const keyboardDiagram = document.getElementById('keyboard-diagram');
const layoutSelect = document.getElementById('layout');
const langSelect = document.getElementById('lang');

function renderKeyboard(layout, lang) {
  // Load SVG for keyboard layout
  let src = '';
  if (layout === 'qwerty') src = 'assets/images/keyboard-qwerty.svg';
  else if (layout === 'inscript') src = 'assets/images/keyboard-inscript.svg';
  else src = 'assets/images/keyboard-remington.svg';

  // Render SVG and color keys by finger
  keyboardDiagram.innerHTML = `<img src="${src}" alt="${layout} keyboard" style="max-width:100%;height:auto;">`;
}
if (keyboardDiagram && layoutSelect && langSelect) {
  renderKeyboard(layoutSelect.value, langSelect.value);
  layoutSelect.onchange = () => renderKeyboard(layoutSelect.value, langSelect.value);
  langSelect.onchange = () => renderKeyboard(layoutSelect.value, langSelect.value);
}

// Highlight keys when pressed (used in practice.js as well)
export function highlightKey(key) {
  // Optionally, you can color specific key SVG elements by ID/class
}
