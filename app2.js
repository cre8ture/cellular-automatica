// Get the ASCII container element from the document
const container = document.getElementById("asciiContainer");
// const container = document.querySelector("body");
let animId;
const numSteps = 1000;
// Define the characters used for ASCII shading
// const density = "Ñ@#W$9876543210?!abc;:+=-,._";
// Define the characters used for ASCII shading
const density3 = "!abc;:+=-,._".split('')
const density2 = "Ñ@#W$9".split('')//  "█▓▓▒░ ".split('')
const density =  "█▓▓▒░ ".split('')

const startTime = Date.now();
// Set the number of rows and columns for the ASCII grid
const rows = 40;
const cols = 40;
const timeEl = document.getElementById('time')
const fpsEl = document.getElementById('fps')
const frameEl = document.getElementById('frame')
const aliveEl = document.getElementById('alive')
const matrixEl = document.getElementById('matrix')

// // Loop to initialize the ASCII grid with spans and line breaks
// for (let y = 0; y < rows; y++) {
//   for (let x = 0; x < cols; x++) {
//     // Create a new span element for each ASCII character
//     const span = document.createElement("span");
//     // Append the span to the container
//     // grid[y*cols + x] = false
//     // dirs[y*cols + x] = false
//     container.appendChild(span);
//   }
//   // After each row, append a line break to start a new line
//   container.appendChild(document.createElement("br"));
// }

// // Select all span elements in the container (representing each ASCII character)
// const chars = container.querySelectorAll("span");

// Initialize a frame counter for animation
let frame = 0;

// let cells = new Array(chars.length).fill(0)
// Initialize the cells
// cells[Math.floor(cols/2) * cols + rows/2] = 1;  // Start with one cell in the middle

// Function to compute the new state of a cell
// function newState(left, center, right) {
//   if ((left === 0 && center === 0 && right === 0) || (left === 1 && center === 1 && right === 1)) {
//     console.log("center", center)
//     return center;
//   } else {
//     console.log("center - 1", 1-center)
//     return 1 - center;
//   }
// }
chars = []
lines = []
function createSpan(result){
  const text = result.join('')
  container.textContent = '';
  for (let j = 0; j < result.length; j++) { 
    const lineDiv = document.createElement("div"); // Create a new div for each line
    lineDiv.classList.add("line");
    for (let k = 0; k < result[j].length; k++) {
      const span = document.createElement("span");
      if(result[j][k] === ' ') {
        span.textContent = "&nbsp;";
      }
      else {
        span.textContent = result[j][k];
      }
      chars.push(span)
      lineDiv.appendChild(span); // Append the span to the line div
    }
    lines.push(lineDiv)
    container.appendChild(lineDiv); // Append the line div to the container
  }
}
function newState(p, q, r) {
  return (1 + p + q + p * r) % 2;
}

i=0;
j=0;
// function nextGeneration(result) {
//   if(result[i][j] !== '.') {
//     // if(result.length * i + j < chars.length) {
//     //   chars[result.length * i + j].textContent = density[Math.floor(Math.random() * density.length)];
//     // }
//   }
//   if(result[i][j] === '#' ) {//|| result[i][j] === ) {
//     if(result.length * i + j < chars.length) {
//         chars[result.length * i + j].textContent = density[Math.floor(Math.random() * density.length)];
//       }}
//   // Increment i and j
//   j++;
//   if (j === result[0].length) {
//     j = 0;
//     i++;
//     if (i === result.length) {
//       i = 0;
//     }
//   }
// }

function nextGeneration2(line) {
  let text = line.textContent
  let stop = Math.random()
  if(stop > 0.5) {
  text.split('').forEach((char, i) => {
    if(char !== '.' && !density3.includes(char)) {
      if (char === '#' || density2.includes(char)) {
        line.textContent = text.substr(0, i) + density[Math.floor(Math.random() * density.length)] + text.substr(i + 1);
        text = line.textContent
      }
    }
  })
}
}

function nextGeneration3(line) {
  let text = line.textContent
  let stop = Math.random()
  if(stop > 0.5) {
  text.split('').forEach((char, i) => {
    if(char !== '.' && !density3.includes(char)){
      if (density.includes('▓')) {
        line.textContent = text.substr(0, i) + density2[Math.floor(Math.random() * density.length)] + text.substr(i + 1);
        text = line.textContent
      }
    }
  })
  mainAnim(line, frame)
}
}

function mainAnim(line, frame){
  let divChars = line.querySelectorAll("span");
  if (!divChars.length) {
    console.log('No span elements found in line. Commencing line animation instead');
    textAnim(line, frame)
    return;
  }


  divChars.forEach((span, i) => {
    const char = span.textContent;
    if(char !== '.') {
      const sign = (i % 2) * 2 - 1;
      const index = (i * sign + frame) % density3.length;

      if (index < 0 || index >= density3.length) {
        console.error(`Index ${index} out of bounds`);
        return;
      }

      if(span && span.textContent) {
      span.textContent = density3[index] // text.join('').slice(0,i) + density3[index] + text.join('').slice(i+1);
    }
  }
});
}
const textAnim = (line, frame) => {
  let text = line.textContent.split('');
  let textCopy = text.slice(0);

  textCopy.forEach((char, i) => {
    if(char === '.') { // Changed condition here
      const sign = (i % 2) * 2 - 1;
      const index = (i * sign + frame) % density3.length;

      if (index < 0 || index >= density3.length) {
        console.error(`Index ${index} out of bounds`);
        return;
      }

      line.textContent =  text.join('').slice(0,i) + density3[index] + text.join('').slice(i+1);
      text = line.textContent.split('');
      console.log("into the woods" ,density3[index])
    }
  });
}

const alive = '#';
const dead = '.';

// ------------------------------------------------------------[ Bit banging ]--
const setBitAt = (val, idx) => BigInt(val) | (1n << BigInt(idx));
const clearBitAt = (val, idx) => BigInt(val) & ~(1n << BigInt(idx));
const getBitAt = val => idx => (BigInt(val) >> BigInt(idx)) & 1n;
const hasBitAt = val => idx => ((BigInt(val) >> BigInt(idx)) & 1n) === 1n;
// ----------------------------------------------------------------[ Utility ]--
const makeArr = n => Array(n).fill(0);
const reverse = x => Array.from(x).reduce((p, c) => [c, ...p], []);
const numToLine = width => int => {
  const test = hasBitAt(int);
  const looper = makeArr(width);
  return reverse(looper.map((_, i) => test(i) ? alive : dead)).join('');
}

// -------------------------------------------------------------------[ Main ]--
const displayCA = (rule, width, lines, startIndex) => {
  const result = [];
  const ruleTest = hasBitAt(rule);
  const lineLoop = makeArr(lines);
  const looper = makeArr(width);
  const pLine = numToLine(width);

  let nTarget = setBitAt(0n, startIndex);
  result.push(pLine(nTarget));
  lineLoop.forEach(() => {
    const bitTest = getBitAt(nTarget);
    looper.forEach((e, i) => {
      const l = bitTest(i === 0 ? width - 1 : i - 1);
      const m = bitTest(i);
      const r = bitTest(i === width - 1 ? 0 : i + 1);
      nTarget = ruleTest(
          parseInt([l, m, r].join(''), 2))
          ? setBitAt(nTarget, i)
          : clearBitAt(nTarget, i);
    });
    result.push(pLine(nTarget));
    // for(let i = 0; i < result; i++) {
    //   console.log("result", result[i])
    //   container.textContent = container.textContent + result[i];
    // }
  });

    // Clear the container
    container.textContent = '';

    // Iterate through the result and append each line to the container
    // for(let i = 0; i < result.length; i++) {
      // container.textContent += result[i] + '\n';
    // Clear the container
// container.innerHTML = '';
console.log(result)
// Iterate through the result and append each line to the container
// container.innerHTML = result.join('<br>');
    // } 
    createSpan(result)
  updateFrame(result)
  return result.join('\n');
}

displayCA(90, 57, 31, 28);

// let k = 0;

// Function to update each frame of the animation
function updateFrame(result) {
  updateStats() // Update stats
  // updateMatrixDisplay() // Update matrix display
  //  nextGeneration(result)
  if(i >= lines.length) {
    i = 0
  }
  nextGeneration2(lines[i++])
  nextGeneration3(lines[lines.length - i])
 // Initialize the next state of the game
  // console.log("updateFRAME")
  // console.log(cells.join(' '));


    // main(antX, antY, currentState)
  // Increment the frame counter
  frame++;
  // Request the next frame of the animation
 animId = requestAnimationFrame(() => updateFrame(result));
}


// Function to update stats
function updateStats() {
  // Calculate the number of alive cells
  // let aliveCells = currentState.flat().filter(x => x).length;

  // Get the current time
  let currentTime = new Date().toLocaleTimeString();

  // Calculate FPS (frames per second)
  let fps = frame / ((Date.now() - startTime) / 1000);

  // Update the content of the respective elements
timeEl.textContent = `Time: ${currentTime}`;
fpsEl.textContent   = `FPS: ${fps.toFixed(2)}`;
frameEl.textContent = `Frame: ${frame}`;
// aliveEl.textContent  = `Alive Cells: ${aliveCells}`;
}

// Function to update matrix display
function updateMatrixDisplay() {
  // Convert the matrix to a string
  let matrixString = currentState.map(row => row.map(cell => cell ? '1' : '0').join(' ')).join('\n');
  // Update the content of the matrix element
  matrixEl.textContent = matrixString;
}

// Initialize a start time for FPS calculation
// let startTime = Date.now();

// Call the updateStats function whenever the game state changes
// For example, you might call it in your main game loop


// Start the animation
// updateFrame();
// updateWorm(wormX, wormY, grid, dirs)