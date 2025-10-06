const gameWindow = document.getElementById("game-window");
const windowContext = gameWindow.getContext("2d");
const outerShell = document.getElementById("jerry-lee-lewis");

// fix resolution issues
const dpr = window.devicePixelRatio || 1;
const rect = gameWindow.getBoundingClientRect();

gameWindow.width = rect.width * dpr;
gameWindow.height = rect.height * dpr;
gameWindow.style.width = rect.width + "px";
gameWindow.style.height = rect.height + "px";
windowContext.scale(dpr, dpr);

const centerX = rect.width / 2;
const centerY = rect.height / 2;

function clearWindow () {
  windowContext.clearRect(0, 0, rect.width, rect.height);
}

// text functions start

function writeCenterText (textContent, textColor, textFont, textSize) {
  document.fonts.load(String(textSize) + "px " + textFont).then(() => {
    windowContext.textAlign = "center";
    windowContext.textBaseline = "middle";
    windowContext.font = String(textSize) + "px " + textFont;
    windowContext.fillStyle = textColor;
    windowContext.fillText(textContent, centerX, centerY);
  });
}

function writeManualCenterParagraph (ctx, text, lineHeight, font, color) {
  const rect = ctx.canvas.getBoundingClientRect();

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const lines = text.split("\n");
  const blockHeight = lines.length * lineHeight;
  let y = (rect.height - blockHeight) / 2;

  lines.forEach((line) => {
    ctx.fillText(line, rect.width / 2, y);
    y += lineHeight;
  });
}

// function writeDelayedCenterParagraph (ctx, text, lineHeight, font, color) {
//   const rect = ctx.canvas.getBoundingClientRect();

//   ctx.font = font;
//   ctx.fillStyle = color;
//   ctx.textAlign = "center";
//   ctx.textBaseline = "top";

//   const lines = text.split("\n");
//   const blockHeight = lines.length * lineHeight;
//   let y = (rect.height - blockHeight) / 2;
  
//   let storedLine;
//   let isStored = 0;
//   lines.forEach((line) => {
//     let i = 0;
//     let storedChars = "";
    
//     function typeChar () {
//       if (i < line.length) {
//         switch (isStored) {
//           case 0:
//             ctx.fillText(storedChars + line.charAt(i), rect.width / 2, y);
//             storedChars = line.substring(0, i);
//             break;
//           case 1:
//             ctx.fillText(storedLine + "\n" + storedChars + line.charAt(i), rect.width / 2, y);
//             storedChars = line.substring(0, i);
//             break;
//         }

//         i++;
//         if (i === line.length && isStored === 0) {
//           storedLine = line;
//           isStored = 1;
//           storedChars = "";
//         }
//         setTimeout(typeChar, 25);
//       }
//     }

//     typeChar();
//   });
// }

function writeDelayedCenterParagraph(ctx, text, lineHeight, font, color) {
  const canvas = ctx.canvas;
  const rect = canvas.getBoundingClientRect();

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const lines = text.split("\n");
  const blockHeight = lines.length * lineHeight;
  const startY = (rect.height - blockHeight) / 2;
  const centerX = rect.width / 2;

  let lineIndex = 0;
  let charIndex = 0; 

  function typeChar () {
    if (lineIndex >= lines.length) {
      return ((lines[0].length + lines[1].length) * 25);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < lineIndex; i++) {
      const y = startY + i * lineHeight;
      ctx.fillText(lines[i], centerX, y);
    }

    const currentLine = lines[lineIndex];
    const typedPortion = currentLine.substring(0, charIndex + 1);
    const currentY = startY + lineIndex * lineHeight;
    ctx.fillText(typedPortion, centerX, currentY);
    charIndex++;

    if (charIndex >= currentLine.length) {
      charIndex = 0;
      lineIndex++;
    }

    setTimeout(typeChar, 25);
  }
  typeChar();
}

// text functions end

// image functions start

function renderImage (imgSrc, targetX, targetY, targetWidth, targetHeight) {
  const newImage = new Image();
  newImage.src = imgSrc;

  newImage.onload = () => {
    const width = targetWidth || newImage.width;
    const height = targetHeight || newImage.height;

    const x = targetX;
    const y = targetY;

    windowContext.drawImage(newImage, x, y, width, height);
  }
}

function renderPreloadedImage(img, targetX, targetY, targetWidth, targetHeight) {
  if (!img.complete) return; 

  const width = targetWidth || img.width;
  const height = targetHeight || img.height;

  windowContext.drawImage(img, targetX, targetY, width, height);
}

function drawCenterImage (imgSrc, targetWidth, targetHeight) {
  const newImage = new Image();
  newImage.src = imgSrc;

  newImage.onload = () => {
    const width = targetWidth || newImage.width;
    const height = targetHeight || newImage.height;

    const x = (rect.width - width) / 2;
    const y = (rect.height - height) / 2;

    windowContext.drawImage(newImage, x, y, width, height);
  }
}

function drawImageLeft (imgSrc, targetWidth, targetHeight) {
  const newImage = new Image();
  newImage.src = imgSrc;

  newImage.onload = () => {
    const width = targetWidth || newImage.width;
    const height = targetHeight || newImage.height;

    windowContext.drawImage(newImage, 0, 0, width, height);
  }
}

function panCamera (imgSrc, imgDirection, cameraSpeed, panDuration, currentX, currentY) {
  let currentXChange = currentX;
  let currentYChange = currentY;

  const cameraPanInterval = setInterval(function () {
    switch (imgDirection) {
      case "left":
        currentXChange -= 1;
        break;
      case "right":
        currentXChange += 1;
        break;
    }
    // clearWindow();
    renderImage(imgSrc, currentXChange, currentYChange);
  }, cameraSpeed);

  setTimeout(function () {
    clearInterval(cameraPanInterval);
  }, panDuration);

  let changedX = (1 * cameraSpeed) * (panDuration / cameraSpeed);
  return changedX;
}

function panPreloadedCamera (preloadedImage, imgDirection, cameraSpeed, panDuration, currentX, currentY) {
  let currentXChange = currentX;
  let currentYChange = currentY;

  const cameraPanInterval = setInterval(function () {
    switch (imgDirection) {
      case "left":
        currentXChange -= 1;
        break;
      case "right":
        currentXChange += 1;
        break;
    }
    // renderImage(imgSrc, currentXChange, currentYChange);
    renderPreloadedImage(preloadedImage, currentXChange, currentYChange)
  }, cameraSpeed);

  setTimeout(function () {
    clearInterval(cameraPanInterval);
  }, panDuration);
}

// image functions end

// travel rendering
const bufferCanvas = document.createElement("canvas");
const bufferContext = bufferCanvas.getContext("2d");

bufferCanvas.width = rect.width;
bufferCanvas.height = rect.height;

// let sidewalkSrc;
// let sidewalkX_one;
// let sidewalkX_two;

let travelWidth;
let travelHeight;
let travelSrc;
let travelImage = new Image();

let travelX;
let travelY = 0;

function renderTravelImage (imageSrc, whichFrame, whichDirection) {
  switch (whichFrame) {
    case 0:
      travelWidth = 1501;
      travelHeight = 487;
      break;
  }
  travelImage.src = imageSrc;

  bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
  switch (whichDirection) {
    case "right":
      travelX -= 1;
      break;
    case "left":
      travelX += 1;
      break;
  }

  bufferContext.drawImage(travelImage, travelX, travelY, travelWidth, travelHeight);
  clearWindow();
  windowContext.drawImage(bufferCanvas, 0, 0);

  requestAnimationFrame(renderTravelImage(imageSrc, whichFrame, whichDirection));
}

// function moveTravelFrame (imageSrc_mvf, whichFrame_mvf, whichDirection_mvf) {
//   travelImage.onload = function () {
//     renderTravelImage(imageSrc_mvf, whichFrame_mvf, whichDirection_mvf);
//   }
// }

// end travel functions/rendering

// begin cutscenes
const cutScenes = document.getElementById("cutscenes");

function clearTheatre () {
  cutScenes.innerHTML = "";
  cutScenes.style.display = "none";
}

function displayCutscene (cutsceneSrc) {
  const cutsceneDisplay = document.createElement("video");
  cutScenes.style.display = "block";

  cutsceneDisplay.src = cutsceneSrc;
  cutsceneDisplay.style.width = "100%";
  cutScenes.appendChild(cutsceneDisplay);
  cutsceneDisplay.play();

  return cutsceneDisplay.duration;
}

function displaySlowCutscene (cutsceneSrc, speed) {
  const cutsceneDisplay = document.createElement("video");
  cutScenes.style.display = "block";

  cutsceneDisplay.src = cutsceneSrc;
  cutsceneDisplay.style.width = "100%";
  cutScenes.appendChild(cutsceneDisplay);
  cutsceneDisplay.playbackRate = speed;
  cutsceneDisplay.play();
} 
// end

// show an repeated animation
const animationWindow = document.getElementById("animation-window");

function clearAnimations () {
  animationWindow.innerHTML = "";
  animationWindow.style.display = "none";
}

function resetCanvasBG () {
  gameWindow.style.backgroundColor = "black";
}

function displayRepeatedAnimation (animationSrc) {
  const animationDisplay = document.createElement("img");
  animationWindow.style.display = "block";

  animationDisplay.src = animationSrc;
  animationDisplay.style.width = "100%";
  animationWindow.appendChild(animationDisplay);
}

// end