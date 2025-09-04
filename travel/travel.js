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

// sprites and dialogue
const pinehurstCharData_1 = {
  sprite : "../Visigoth/travel/characters/douglas.webp",
  name : "Douglas",
  ogX : 400,
  ogY : 222,
  specialCondition : 0,
  dialogue : douglasDialogue
};

const pinehurstCharData_2 = {
  sprite : "../Visigoth/travel/characters/nick.png",
  name : "Nick",
  ogX : 900,
  ogY : 222,
  specialCondition : 0,
  dialogue : nickDialogue
}

// begin character functions
// are there better ways I could have done this without limiting the amount of 
// characters on each frame to 4 at a time? Yes.
// am I too lazy to do that? Also yes.
let isUsingCharacters = 0;
let hasSwitchedFrame = 0; // 0 is hasn't switched a frame.
// 1 is has switched a frame (from the right. Ex: going from pinehurst 0 to pinehurst 2.)
// 2 is has switched a frame (from the left. Ex: going from pinehurst 2 to pinehurst 0.)

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

function checkCharacterLastX (dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    switch (dataArray[i].specialCondition) {
      case 0:
        console.log("Character - LOADED!");
        switch (i) {
          case 0:
            new_char_x = travelCharacterObject_1_x;
            // console.log(charDataX);
            break;
          case 1:
            new_char_x = travelCharacterObject_2_x;
            break;
          case 2:
            new_char_x = travelCharacterObject_3_x;
            break;
          case 3:
            new_char_x = travelCharacterObject_4_x;
            break;
        }
        new_char_y = dataArray[i].ogY;
        renderImage(dataArray[i].sprite, new_char_x, new_char_y);
        console.log("character rendered");
        break;
    }
  }
}

function checkForCharacterDialogue (dataArray) {
  let checkedAllData = 0;
  for (let i = 0; i < dataArray.length; i++) {
    let charDataX;
    function checkCharDataX () {
      if (charDataX > 300 && charDataX < 380) {
        // console.log("Dialogue initiated");
        switch (i) {
          default:
            createWindow("battleMessage", "Press 'E' to interact.", 0, 0);
            break;
          // case 3:
          //   checkedAllData = 1;
          //   createWindow("battleMessage", "Press 'E' to interact.", 0, 0);
          //   break;
        }
      }

      else {
        switch (i) {
          case (dataArray.length - 1):
            checkedAllData = 1;
            break;
        }
      }
    }

    switch (dataArray[i].specialCondition) {
      case 0:
        switch (i) {
          case 0:
            charDataX = travelCharacterObject_1_x;
            // console.log(charDataX);
            checkCharDataX();
            break;
          case 1:
            charDataX = travelCharacterObject_2_x;
            checkCharDataX();
            break;
          case 2:
            charDataX = travelCharacterObject_3_x;
            checkCharDataX();
            break;
          case 3:
            charDataX = travelCharacterObject_4_x;
            checkCharDataX();
            break;
        }
        break;
    }

    switch (checkedAllData) {
      case 1:
        clearAllWindows();
        break;
    }
  }
}

let markedValueCHARD;
let hasMarkedValueCHARD = 0;
let isTalking = 0;

function CHECK_CHAR_D (dataArray) {
  const arrayMaxValue = dataArray.length;
  
  let isAnyD_checked = 0;
  for (let i = 0; i < arrayMaxValue; i++) {
    let usedX;
    switch (i) {
      case 0:
        usedX = travelCharacterObject_1_x;
        break;
      case 1:
        usedX = travelCharacterObject_2_x;
        break;
      case 2:
        usedX = travelCharacterObject_3_x;
        break;
      case 3:
        usedX = travelCharacterObject_4_x;
        break;
    }

    switch (true) {
      case (usedX > 300 && usedX < 380):
        isAnyD_checked = 1;
        createWindow("battleMessage", "Press 'E' to interact.", 0, 0);
        hasMarkedValueCHARD = 1;
        markedValueCHARD = i;
        break;
    }

    switch (isAnyD_checked) {
      case 0:
        clearAllWindows();
        hasMarkedValueCHARD = 0;
        break;
    }
  }
}

function cleanUpCharacterData (whichFrame) { // only for dialogue!
  switch (whichFrame) {
    case 0:
      // checkForCharacterDialogue(pinehurstSprite_arr);
      CHECK_CHAR_D(pinehurstSprite_arr);
      break;
  }
}

let dialogueAmountDATA = 1;
let current_DA = 0;
let isFinishedTalking = 0;
function resetDialogue () {
  dialogueAmountDATA = 1;
  current_DA = 0;
  isFinishedTalking = 0;
}

function loadCharacterDialogue (whichFrame, whichData) {
  let currDataBank;
  switch (whichFrame) {
    case 0:
      currDataBank = pinehurstSprite_arr;
      break;
  }
  
  // current_DA++;
  dialogueAmountDATA = currDataBank[whichData].dialogue.length;
  clearAllWindows();
  isFinishedTalking = 0;
  isTraveling = 0;

  switch (true) {
    case (current_DA > dialogueAmountDATA || current_DA === dialogueAmountDATA):
      resetDialogue();
      isTraveling = 1;
      cleanUpCharacterData(whichFrame);
      isTalking = 0;
      break;
    default:
      createWindow("dialogue", currDataBank[whichData].dialogue[current_DA], 0, 0);

      setTimeout(function () {
        isFinishedTalking = 1;
        current_DA++;
      }, (currDataBank[whichData].dialogue.length * 25) + 200);
      break;
  }
}

// end character functions

function setStage (travelFrame) {
  stickman.style.display = "block";
  switch (travelFrame) {
    case 0:
      currentTown = "pinehurst";
      frameX = 0;
      isUsingCharacters = 1;
    //   drawImageLeft("../Visigoth/travel/frames/pinehurst/pinehurst.webp", 1601, 487);
      currentSrc = "../Visigoth/travel/frames/pinehurst/pinehurst.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1701;
      frameHeight = 487;
      
      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
      console.log("rendered image");
    //   renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);
    //   renderPreloadedImage(travelFrameObject, frameX, 0, frameWidth, frameHeight);
      switch (hasSwitchedFrame) {
        case 0:
          firstRenderCharacters(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr); 
          firstRenderCharacters(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr); // double render -- sometimes the characters don't load at all!
          break;
        case 1:
          checkCharacterLastX(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr);
          checkCharacterLastX(pinehurstSprite_arr);
          // loadCharacters(pinehurstSprite_arr);
          // loadCharacters(pinehurstSprite_arr);
          // loadCharacters(pinehurstSprite_arr);
          // drawFrame("left");

          setTimeout(function () {
            loadCharacters(pinehurstSprite_arr);
          }, 0.1);
          break;
        case 2:
          checkCharacterLastX(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr);
          checkCharacterLastX(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr);
          loadCharacters(pinehurstSprite_arr);
          drawFrame("right");
          break;
      }
      break;
    case 1:
      currentTown = "pinehurst";
      frameX = 0;
      isUsingCharacters = 0;
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
  hasSwitchedFrame = 1;

  setTimeout(function () {
    clearWindow();
    setStage(travelFrame);

    switch (whichDirection) {
      case "right":
        break;
      case "left":
        clearWindow();
        clearWindow();
        frameX = -800;
        renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);

        switch (travelFrame) {
          case 0:
            loadCharacters(pinehurstSprite_arr);
            break;
        }
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
  switch (isUsingCharacters) {
    case 1:
      checkCharacters(currentFrame, whichDirection);
      cleanUpCharacterData(currentFrame);
      break;
  }
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
        case 69:
          switch (hasMarkedValueCHARD) {
            case 1:
              isTraveling = 0;
              resetDialogue();
              isTalking = 1;
              loadCharacterDialogue(currentFrame, markedValueCHARD);
              break;
          }
          break;
      }
      break;
  }

  switch (isTalking) {
    case 1:
      switch (event.which) {
        case 13:
          switch (isFinishedTalking) {
            case 1:
              loadCharacterDialogue(currentFrame, markedValueCHARD);
              break;
          }
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