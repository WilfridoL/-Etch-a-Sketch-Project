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

function setCurrentModeValue(mode) {
  btnActive(mode)
  currentMode = mode;
}

colorValue.oninput = (e) => setCurrentColorValue(e.target.value);
sizeValue.onmousemove = (e) => updeteParameters(e.target.value);
sizeValue.onchange = (e) => updeteSize(e.target.value);

// DOM buttons
btnColor.addEventListener('click', () => {
  setCurrentModeValue('color')

});

btnRandom.addEventListener('click', () => {
  setCurrentModeValue('random')
});

btnEraser.addEventListener('click', () => {
  setCurrentModeValue('eraser')

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

let mouseActive = false;
document.body.onmousedown = () => {mouseActive = true}
document.body.onmouseup = () => {mouseActive = false}

function updateColor(e) {
  if(e.type === 'mouseover' && !mouseActive) return
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

function btnActive(mode) {
  if(currentMode === 'color'){
    btnColor.classList.remove('active');
  }else if(currentMode === 'random'){
    btnRandom.classList.remove('active');
  }else if(currentMode === 'eraser'){
    btnEraser.classList.remove('active');
  }
  if(mode === 'color'){
    btnColor.classList.add('active');
  }else if(mode === 'random'){
    btnRandom.classList.add('active');
  }else if(mode === 'eraser'){
    btnEraser.classList.add('active');
  }
}

window.onload = () => {
  createGrid(SIZEDEFAULT);
}