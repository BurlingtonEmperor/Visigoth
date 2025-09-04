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

const pinehurstCharData_1 = {
  sprite : "../Visigoth/travel/characters/douglas.webp",
  name : "Douglas",
  ogX : 400,
  ogY : 222,
  specialCondition : 0
};

const pinehurstCharData_2 = {
  sprite : "../Visigoth/travel/characters/nick.png",
  name : "Nick",
  ogX : 900,
  ogY : 222,
  specialCondition : 0
}


// are there better ways I could have done this without limiting the amount of 
// characters on each frame to 4 at a time? Yes.
// am I too lazy to do that? Also yes.
const travelCharacterObject_1 = new Image();
const travelCharacterObject_2 = new Image();
const travelCharacterObject_3 = new Image();
const travelCharacterObject_4 = new Image();

let travelCharacterObject_1_x = 0;
let travelCharacterObject_2_x = 0;
let travelCharacterObject_3_x = 0;
let travelCharacterObject_4_x = 0;

function firstRenderCharacters (dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    let new_char_x;
    let new_char_y;

    switch (dataArray[i].specialCondition) {
      case 0:
        console.log("Character - LOADED!");
        switch (i) {
          case 0:
            travelCharacterObject_1_x = dataArray[i].ogX;
            new_char_x = travelCharacterObject_1_x;
            travelCharacterObject_1.src = dataArray[i].sprite;
            break;
          case 1:
            travelCharacterObject_2_x = dataArray[i].ogX;
            new_char_x = travelCharacterObject_2_x;
            travelCharacterObject_2.src = dataArray[i].sprite;
            break;
          case 2:
            travelCharacterObject_3_x = dataArray[i].ogX;
            new_char_x = travelCharacterObject_3_x;
            travelCharacterObject_3.src = dataArray[i].sprite;
            break;
          case 3:
            travelCharacterObject_4_x = dataArray[i].ogX;
            new_char_x = travelCharacterObject_4_x;
            travelCharacterObject_4.src = dataArray[i].sprite;
            break;
        }
        new_char_y = dataArray[i].ogY;
        renderImage(dataArray[i].sprite, new_char_x, new_char_y);
        console.log("character rendered");
        break;
    }
  }
}

function loadCharacters (dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    let new_char_x;
    let new_char_y;
    let new_char_obj;

    switch (dataArray[i].specialCondition) {
      case 0:
        switch (i) {
          case 0:
            new_char_obj = travelCharacterObject_1;
            new_char_x = travelCharacterObject_1_x;
            break;
          case 1:
            new_char_obj = travelCharacterObject_2;
            new_char_x = travelCharacterObject_2_x;
            break;
          case 2:
            new_char_obj = travelCharacterObject_3;
            new_char_x = travelCharacterObject_3_x;
            break;
          case 3:
            new_char_obj = travelCharacterObject_4;
            new_char_x = travelCharacterObject_4_x;
            break;
        }
        new_char_y = dataArray[i].ogY;
        renderPreloadedImage(new_char_obj, new_char_x, new_char_y);
        break;
    }
  }
}

const pinehurstSprite_arr = [pinehurstCharData_1, pinehurstCharData_2]; // keep data for characters for each frame

function checkCharacters (travelFrame, whichDirection) {
  let arrToUse;
  switch (travelFrame) {
    case 0:
      arrToUse = pinehurstSprite_arr;
      break;
  }
  
  let xChangeAmount;
  switch (whichDirection) {
    case "left":
      xChangeAmount = 2.5;
      break;
    case "right":
      xChangeAmount = -2.5;
      break;
  }

  for (let i = 0; i < arrToUse.length; i++) {
    switch (i) {
      case 0:
        travelCharacterObject_1_x += xChangeAmount;
        break;
      case 1:
        travelCharacterObject_2_x += xChangeAmount;
        break;
      case 2:
        travelCharacterObject_3_x += xChangeAmount;
        break;
      case 3:
        travelCharacterObject_4_x += xChangeAmount;
        break;
    }
  }
}

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
      firstRenderCharacters(pinehurstSprite_arr);
      loadCharacters(pinehurstSprite_arr); 
      firstRenderCharacters(pinehurstSprite_arr);
      loadCharacters(pinehurstSprite_arr); // double render -- sometimes the characters don't load at all!
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
  checkCharacters(currentFrame, whichDirection);
  renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);

  switch (currentFrame) {
    case 0:
      loadCharacters(pinehurstSprite_arr);
      break;
  }
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