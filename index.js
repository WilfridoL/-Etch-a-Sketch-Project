// DEFAULT VARIABLE
const COLORDEFAULT = '#000';
const SIZEDEFAULT = '16';
const MODEDEFAULT = 'color';

// DOM variable
const container = document.querySelector('.container');
const sizeValue = document.getElementById('sizeSlider');
const colorValue = document.getElementById('color');
const btnColor = document.getElementById('btnColor');
const btnEraser = document.getElementById('btnEraser');
const btnRandom = document.getElementById('randomColor');
const btnCls = document.getElementById('cls');
const sizeDOM = document.querySelector('.sizeValue');

// current variable
let currentSize = SIZEDEFAULT;
let currentColor = COLORDEFAULT;
let currentMode = MODEDEFAULT;


function setCurrentSizeValue(newSize) {
  currentSize = newSize
}

function setCurrentColorValue(newSize) {
  currentColor = newSize
}

colorValue.oninput = (e) => setCurrentColorValue(e.target.value);
sizeValue.onmousemove = (e) => updeteParameters(e.target.value);
sizeValue.onchange = (e) => updeteSize(e.target.value);

// DOM buttons
btnColor.addEventListener('click', () => {
  currentMode = 'color';
});

btnRandom.addEventListener('click', () => {
  currentMode = 'random';
});

btnEraser.addEventListener('click', () => {
  currentMode = 'eraser';
});

btnCls.addEventListener('click', () => {
  resetGrid()
});

function resetGrid() {
  clearGrid()
  createGrid(currentSize);
}

function clearGrid() {
  container.innerHTML = "";
}

function updeteParameters(value) {
  sizeDOM.innerHTML = `${value} x ${value}`
}

function updeteSize(e) {
  setCurrentSizeValue(e)
  updeteParameters(e)
  resetGrid()
}

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i <= size * size; i++) {
    const addDivs = document.createElement('div');
    addDivs.classList.add('grid');
    addDivs.addEventListener('mouseover', updateColor);
    container.appendChild(addDivs)
  }
}

function updateColor(e) {
  if (currentMode === 'color') {
    e.target.style.background = currentColor;
  } if (currentMode === 'random') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.background = `rgb(${randomR},${randomG},${randomB})`
  } if (currentMode === 'eraser') {
    e.target.style.background = 'transparent';
  }
}

window.onload = () => {
  createGrid(SIZEDEFAULT);
}