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

function writeCenterText (textContent, textColor, textFont, textSize) {
  document.fonts.load(String(textSize) + "px " + textFont).then(() => {
    windowContext.textAlign = "center";
    windowContext.textBaseline = "middle";
    windowContext.font = String(textSize) + "px " + textFont;
    windowContext.fillStyle = textColor;
    windowContext.fillText(textContent, centerX, centerY);
  });
}