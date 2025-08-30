const gameWindow = document.getElementById("game-window");
const windowContext = gameWindow.getContext("2d");

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

function writeManualCenterParagraph(ctx, text, lineHeight, font, color) {
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