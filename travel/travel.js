let currentTown = "pinehurst";
let isTraveling = 0;

let currentSrc;
let frameWidth;
let frameHeight;
let frameX = 0;

let currentFrame = 0;
let encounters = "OFF";

const stickman = document.getElementById("stickman");
let memoryDataBank = 0;

const travelFrameObject = new Image();

function setStage (travelFrame) {
  stickman.style.display = "block";
  switch (travelFrame) {
    case 0:
      currentTown = "pinehurst";
      frameX = 0;
    //   drawImageLeft("../Visigoth/travel/frames/pinehurst/pinehurst.webp", 1601, 487);
      currentSrc = "../Visigoth/travel/frames/pinehurst/pinehurst.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1701;
      frameHeight = 487;
      
      console.log("rendered image");
    //   renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);
    //   renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);
      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
      break;
    case 1:
      currentTown = "pinehurst";
      frameX = 0;
      currentSrc = "../Visigoth/travel/frames/pinehurst/pinehurst2.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1801;
      frameHeight = 487;

      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
      break;
  }
}

function switchFrame (travelFrame, whichDirection) {
  $(gameWindow).fadeOut(1000);
  isTraveling = 0;

  setTimeout(function () {
    setStage(travelFrame);

    switch (whichDirection) {
      case "right":
        break;
      case "left":
        clearWindow();
        frameX = -800;
        renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
        break;
    }

    $(gameWindow).fadeIn(1000);
    setTimeout(function () {
      isTraveling = 1;
    }, 1000);
  }, 1000);
}

function drawFrame (whichDirection) {
  switch (whichDirection) {
    case "right":
      frameX -= 2.5;
    //   memoryDataBank = 1;

      if (frameX < -795) {
        frameX += 2.5;
        switch (currentFrame) {
          case 0:
            currentFrame = 1;
            switchFrame(1, "right");
            break;
        }
        return false;
      }
      break;
    case "left":
      frameX += 2.5;
    //   memoryDataBank = 1;

      if (frameX > -5) {
        frameX -= 2.5;
        switch (currentFrame) {
          case 1:
            currentFrame = 0;
            switchFrame(0, "left");
            break;
        }
        return false;
      }
      break;
    default:
      console.log("Chose to refresh.");
      break;
  }
  
  clearWindow();
  renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);
}

const stickmanRight = document.getElementById("stickman-right");
const stickmanLeft = document.getElementById("stickman-left");

$(document).on("keydown", function (event) {
  switch (isTraveling) {
    case 1:
      switch (event.which) {
        case 39:
          drawFrame("right");
          stickmanRight.style.display = "block";
          break;
        case 37:
          drawFrame("left");
          stickmanLeft.style.display = "block";
          break;
      }
      break;
  }
});

document.addEventListener('keyup', function () {
  stickmanRight.style.display = "none";
  stickmanLeft.style.display = "none";

//   switch (memoryDataBank) {
//     case 1:
//       clearWindow();
//       drawFrame("refresh");
//       memoryDataBank = 0;
//       break;
//   }
});