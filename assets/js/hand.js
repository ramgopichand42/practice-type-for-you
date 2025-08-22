// Hand diagram visualizer
const handDiagram = document.getElementById('hand-diagram');
function renderHandDiagram() {
  handDiagram.innerHTML = `
    <img src="assets/images/hand-left.svg" alt="Left hand" style="max-width:45%;height:auto;">
    <img src="assets/images/hand-right.svg" alt="Right hand" style="max-width:45%;height:auto;">
  `;
}
if (handDiagram) renderHandDiagram();
