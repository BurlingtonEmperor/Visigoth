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

const pinehurstCharData_3 = { // park
  sprite : "../Visigoth/travel/characters/chance.png",
  name : "Chance",
  ogX : 900,
  ogY : 200,
  specialCondition : 0,
  dialogue: chanceDialogue,
  altDialogue : chanceDialogue2
}

const pinehurstCharData_4 = {
  sprite : "../Visigoth/travel/characters/worker.webp",
  name : "Construction Worker",
  ogX : 600,
  ogY : 222,
  specialCondition : 0,
  dialogue : workerDialogue_1
}

const fwCharData_1 = {
  sprite : "../Visigoth/travel/characters/peckham.png",
  name : "Farmer Peckham",
  ogX : 500,
  ogY : 60,
  specialCondition : 0,
  dialogue : peckhamDialogue
}

// end sprites and dialogue

// begin character setup functions
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

let pinehurst1_xDATA = [];
let pinehurst2_xDATA = [];
let pinehurst3_xDATA = []; // the park

let fw1_xDATA = [];

let travelCharacterObject_1_x = 0;
let travelCharacterObject_2_x = 0;
let travelCharacterObject_3_x = 0;
let travelCharacterObject_4_x = 0;

let CURRENT_SPRITE_ARR;

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

function reRenderCharacters (dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    let new_char_x;
    let new_char_y;

    switch (dataArray[i].specialCondition) {
      case 0:
        switch (i) {
          case 0:
            travelCharacterObject_1.src = dataArray[i].sprite;
            break;
          case 1:
            travelCharacterObject_2.src = dataArray[i].sprite;
            break;
          case 2:
            travelCharacterObject_3.src = dataArray[i].sprite;
            break;
          case 3:
            travelCharacterObject_4.src = dataArray[i].sprite;
            break;
        }
        new_char_y = dataArray[i].ogY;
        renderImage(dataArray[i].sprite, new_char_x, new_char_y);
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
const pinehurstSprite_arr2 = [pinehurstCharData_4];
const pinehurstSprite_arr3 = [pinehurstCharData_3];

const fwSprite_arr = [fwCharData_1];

function checkCharacters (travelFrame, whichDirection) {
  switch (isUsingCharacters) {
    case 0:
      return false;
  }

  let arrToUse;
  switch (travelFrame) {
    case 0:
      arrToUse = pinehurstSprite_arr;
      break;
    case 1:
      arrToUse = pinehurstSprite_arr2;
      break;
    case 2:
      arrToUse = pinehurstSprite_arr3;
      break;
    case 5:
      arrToUse = fwSprite_arr;
      break;
    default:
      return false; // this seems redundant, but it's to prevent crashes
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

function saveCharacterLastX (whichFrame) {
  let dataArr_LOADCHARLASTX;
  switch (whichFrame) {
    case 0:
      dataArr_LOADCHARLASTX = pinehurstSprite_arr;
      break;
    case 1:
      dataArr_LOADCHARLASTX = pinehurstSprite_arr2;
      break;
    case 2:
      dataArr_LOADCHARLASTX = pinehurstSprite_arr3;
      break;
    case 5:
      dataArr_LOADCHARLASTX = fwSprite_arr;
      break;
    default:
      return false; // prevent a crash from happening
  }

  function tackleDATACHARLASTX (numArrLength) {
    switch (numArrLength) {
      case 1:
        switch (whichFrame) {
          case 0:
            pinehurst1_xDATA = [];
            pinehurst1_xDATA.push(travelCharacterObject_1_x);
            break;
          case 1:
            pinehurst2_xDATA = [];
            pinehurst2_xDATA.push(travelCharacterObject_1_x);
            break;
          case 2:
            pinehurst3_xDATA = [];
            pinehurst3_xDATA.push(travelCharacterObject_1_x);
            break;
          case 5:
            fw1_xDATA = [];
            fw1_xDATA.push(travelCharacterObject_1_x);
            break;
        }
        break;
      case 2:
        switch (whichFrame) {
          case 0:
            pinehurst1_xDATA = [];
            pinehurst1_xDATA.push(travelCharacterObject_1_x);
            pinehurst1_xDATA.push(travelCharacterObject_2_x);
            break;
          case 1:
            pinehurst2_xDATA = [];
            pinehurst2_xDATA.push(travelCharacterObject_1_x);
            pinehurst2_xDATA.push(travelCharacterObject_2_x);
            break;
        }
        break;
      case 3:
        switch (whichFrame) {
          case 0:
            pinehurst1_xDATA = [];
            pinehurst1_xDATA.push(travelCharacterObject_1_x);
            pinehurst1_xDATA.push(travelCharacterObject_2_x);
            pinehurst1_xDATA.push(travelCharacterObject_3_x);
            break;
          case 1:
            pinehurst2_xDATA = [];
            pinehurst2_xDATA.push(travelCharacterObject_1_x);
            pinehurst2_xDATA.push(travelCharacterObject_2_x);
            pinehurst2_xDATA.push(travelCharacterObject_3_x);
            break;
        }
        break;
      case 4:
        switch (whichFrame) {
          case 0:
            pinehurst1_xDATA = [];
            pinehurst1_xDATA.push(travelCharacterObject_1_x);
            pinehurst1_xDATA.push(travelCharacterObject_2_x);
            pinehurst1_xDATA.push(travelCharacterObject_3_x);
            pinehurst1_xDATA.push(travelCharacterObject_4_x);
            break;
          case 1:
            pinehurst2_xDATA = [];
            pinehurst2_xDATA.push(travelCharacterObject_1_x);
            pinehurst2_xDATA.push(travelCharacterObject_2_x);
            pinehurst2_xDATA.push(travelCharacterObject_3_x);
            pinehurst2_xDATA.push(travelCharacterObject_4_x);
            break;
        }
        break;
      // case 5:
      //   switch (whichFrame) {
          
      //   }
      //   break;
    }
  }

  switch (isUsingCharacters) {
    case 1:
      tackleDATACHARLASTX(dataArr_LOADCHARLASTX.length);
      break;
  }
}

function loadCharacterLastX (whichFrame) { // take data from each last x array and set it to default
  let dataArr_LOADCHARLASTX;
  let dataArray;

  switch (whichFrame) {
    case 0:
      dataArr_LOADCHARLASTX = pinehurst1_xDATA;
      dataArray = pinehurstSprite_arr;
      break;
    case 1:
      dataArr_LOADCHARLASTX = pinehurst2_xDATA;
      dataArray = pinehurstSprite_arr2;
      break;
    case 2:
      dataArr_LOADCHARLASTX = pinehurst3_xDATA;
      dataArray = pinehurstSprite_arr3;
      break;
    case 5:
      dataArr_LOADCHARLASTX = fw1_xDATA;
      dataArray = fwSprite_arr;
      break;
  }

  function tackleDATACHARLASTX (numArrLength) {
    switch (numArrLength) {
      case 1:
        travelCharacterObject_1_x = dataArr_LOADCHARLASTX[0];

        travelCharacterObject_1.src = dataArray[0].sprite;
        break;
      case 2:
        travelCharacterObject_1_x = dataArr_LOADCHARLASTX[0];
        travelCharacterObject_2_x = dataArr_LOADCHARLASTX[1];

        travelCharacterObject_1.src = dataArray[0].sprite;
        travelCharacterObject_2.src = dataArray[1].sprite;
        break;
      case 3:
        travelCharacterObject_1_x = dataArr_LOADCHARLASTX[0];
        travelCharacterObject_2_x = dataArr_LOADCHARLASTX[1];
        travelCharacterObject_3_x = dataArr_LOADCHARLASTX[2];

        travelCharacterObject_1.src = dataArray[0].sprite;
        travelCharacterObject_2.src = dataArray[1].sprite;
        travelCharacterObject_3.src = dataArray[2].sprite;
        break;
      case 4:
        travelCharacterObject_1_x = dataArr_LOADCHARLASTX[0];
        travelCharacterObject_2_x = dataArr_LOADCHARLASTX[1];
        travelCharacterObject_3_x = dataArr_LOADCHARLASTX[2];
        travelCharacterObject_4_x = dataArr_LOADCHARLASTX[3];

        travelCharacterObject_1.src = dataArray[0].sprite;
        travelCharacterObject_2.src = dataArray[1].sprite;
        travelCharacterObject_3.src = dataArray[2].sprite;
        travelCharacterObject_4.src = dataArray[3].sprite;
        break;
    }
  }

  tackleDATACHARLASTX(dataArr_LOADCHARLASTX.length);
}

function RESET_X () {
  travelCharacterObject_1_x = 0;
  travelCharacterObject_2_x = 0;
  travelCharacterObject_3_x = 0;
  travelCharacterObject_4_x = 0;
}

function RESET_IMG_DATA () {
  travelCharacterObject_1.src = "";
  travelCharacterObject_2.src = "";
  travelCharacterObject_3.src = "";
  travelCharacterObject_4.src = "";
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

function fillSPRITE_ARR (whichFrame) {
  switch (whichFrame) {
    case 0:
      CURRENT_SPRITE_ARR = pinehurstSprite_arr;
      break;
    case 1:
      CURRENT_SPRITE_ARR = pinehurstSprite_arr2;
      break;
    case 2:
      CURRENT_SPRITE_ARR = pinehurstSprite_arr3;
      break;
    case 5:
      CURRENT_SPRITE_ARR = fwSprite_arr;
      break;
    default:
      CURRENT_SPRITE_ARR = [];
      break;
  }
}

// end character setup functions

// begin gateway checking functions

/*
Gateway numbering
0 - The Park (Pinehurst)
1 - FW Road
2 - Peckham Farm (FW Road)
*/
let currentGateway;
function checkForGateways (whichFrame) {
  switch (whichFrame) {
    case 0:
      switch (true) {
        case (frameX < -700):
          currentGateway = 0;
          createWindow("battleMessage", "Press 'E' to enter the Park", 0, 0);
          return true;
      }
      break;
    case 3:
      switch (true) {
        case (frameX < -1172.5 && frameX > -1372.5):
          currentGateway = 2;
          createWindow("battleMessage", "Press 'E' to enter Peckham Farm", 0, 0);
          break;
      }
      break;
    case 4:
      switch (true) {
        case (frameX > -100):
          currentGateway = 1;
          console.log("gateway fw detected");
          createWindow("battleMessage", "Press 'E' to enter FW Road", 0, 0);
          return true;
        default:
          return false;
      }
      break;
  }
}

let specialGatewayEvents = 0;
/*
Special Gateway Event numbers
0 - disabled
1 - fw road fog
*/
function enterGateway (whichFrame) {
  switch (whichFrame) {
    case 0:
      switch (currentGateway) {
        case 0:
          switchFrame(2, "right");
          break;
      }
      break;
    case 3:
      switch (currentGateway) {
        case 2:

          break;
      }
      break;
    case 4:
      switch (currentGateway) {
        case 1:
          switchFrame(3, "right");
          console.log("test");
          
          let fogText = "A thick fog rolls in. No turning back now...";
          createWindow("dialogue", fogText, 0, 0);
          setTimeout(function () {
            isTraveling = 0;
          }, 300);

          setTimeout(function () {
            specialGatewayEvents = 1;
          }, fogText.length * 25 + 200);
          break;
      }
      break;
  }
}

// end gateway checking functions

// begin sleep functions

function restoreHealthAndME () {}

function goToBed () {
  isTraveling = 0;
  townieMusic.pause();
  playAudio("../Visigoth/audio/sfx/glitter.mp3");
  $(gameWindow).fadeOut(3000);

  setTimeout(function () {
    $(gameWindow).fadeIn(3000);
    setTimeout(function () {
      isTraveling = 1;
      townieMusic.play();
    }, 3000);
  }, 3000);
}

// end sleep functions

// begin character dialogue functions

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
    case 1:
      CHECK_CHAR_D(pinehurstSprite_arr2);
      break;
    case 2:
      CHECK_CHAR_D(pinehurstSprite_arr3);
      break;
    case 5:
      CHECK_CHAR_D(fwSprite_arr);
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

let chanceDialogueX = 0; // keep this in mind

function loadCharacterDialogue (whichFrame, whichData) {
  let currDataBank;
  switch (whichFrame) {
    case 0:
      currDataBank = pinehurstSprite_arr;
      break;
    case 1:
      currDataBank = pinehurstSprite_arr2;
      break;
    case 2:
      currDataBank = pinehurstSprite_arr3;
      break;
    case 5:
      currDataBank = fwSprite_arr;
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

      switch (currentFrame) {
        case 2:
          if (chanceDialogueX == 0) {
            isTraveling = 0;
            townieMusic.pause();
            initiateBattle("../Visigoth/battle/backdrops/park.jpg", hauntedDoll);
            specialDialogueCommands = "chance";
            encounters = "ON";
            clearAllWindows();
            pinehurstCharData_3.dialogue = pinehurstCharData_3.altDialogue;
            saveCharacterLastX(currentFrame);
            chanceDialogueX = travelCharacterObject_1_x;
            // pinehurstSprite_arr3 = [pinehurstCharData_3];
            resetDialogue();
          }
          break;
        case 5:
          isTraveling = 0;
          openYesOrNo();
          yesOrNoFunction = "goToBed()";
          yesOrNoFunction_TWO = "isTraveling = 1";
          break;
      }
      break;
    default:
      createWindow("dialogue", currDataBank[whichData].name + `: "` + currDataBank[whichData].dialogue[current_DA] + `"`, 0, 0);

      setTimeout(function () {
        isFinishedTalking = 1;
        current_DA += 1;
      }, (currDataBank[whichData].dialogue[current_DA].length * 25) + 500);
      break;
  }
}

// end character dialogue functions
// end character functions

// begin random enemy encounter functions
let encounterOdds = 350;
function initiateRandomEncounter () {
  let encounterChance = Math.floor(Math.random () * encounterOdds);

  switch (encounters) {
    case "OFF":
      return false;
  }

  REWRITE_SAVE_CHAR_DATA();

  switch (isUsingCharacters) {
    case 0:
      specialDialogueCommands = "not_using_characters";
      break;
    case 1:
      saveCharacterLastX(currentFrame);
      specialDialogueCommands = "using_characters";
      break;
  }
  
  let randomEnemiesList = [];
  let backdropToUseFor_RANDOM_ENCOUNTER;
  switch (currentTown) {
    case "pinehurst":
      randomEnemiesList = [hauntedDoll, willOWisp, shadowMan, movingPicture, magicMirror];
      backdropToUseFor_RANDOM_ENCOUNTER = "../Visigoth/battle/backdrops/pinehurst.jpg";

      // switch (currentFrame) {
      //   case 2:
      //     backdropToUseFor_RANDOM_ENCOUNTER = "../Visigoth/battle/backdrops/park.jpg";
      //     break;
      // }
      break;
  }

  let randomEnemyIndex = Math.floor(Math.random() * randomEnemiesList.length);
  fillSPRITE_ARR(currentFrame);
  saveCharacterLastX(currentFrame);

  switch (encounterChance) {
    case 0:
      console.log("enemy encountered");
      isTraveling = 0;
      switch (false) {
        case (townieMusic == undefined):
          townieMusic.pause();
          break;
      }
      isTraveling = 0;
      initiateBattle(backdropToUseFor_RANDOM_ENCOUNTER, randomEnemiesList[randomEnemyIndex]);
      break;
  }
}

// end random enemy encounter functions

function setStage (travelFrame) {
  stickman.style.display = "block";
  fillSPRITE_ARR(travelFrame);

  // switch (currentTown) {
  //   case "pinehurst":
  //     townieMusic = playLoopedAudio("../Visigoth/assets/audio/step.mp3");
  //     break;
  //   case "fw":
  //     break;
  // }

  switch (travelFrame) {
    case 0:
      currentTown = "pinehurst";
      // fillSPRITE_ARR(0);
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
          RESET_X();
          RESET_IMG_DATA();
          reRenderCharacters(pinehurstSprite_arr);
          loadCharacterLastX(travelFrame);
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
          loadCharacterLastX(travelFrame);
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
      // fillSPRITE_ARR(1);
      frameX = 0;
      isUsingCharacters = 1;
      currentSrc = "../Visigoth/travel/frames/pinehurst/pinehurst2.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1801;
      frameHeight = 487;

      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);

      switch (pinehurstCharData_4.specialCondition) {
        case 1:
          encounters = "ON";
          break;
      }

      switch (hasSwitchedFrame) {
        case 1:
          firstRenderCharacters(pinehurstSprite_arr2);
          loadCharacters(pinehurstSprite_arr2);
          // saveCharacterLastX(currentFrame);
          checkCharacterLastX(currentFrame);
          break;
      }

      // switch (hasSwitchedFrame) {
      //   case 0:
      //     firstRenderCharacters(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2); 
      //     firstRenderCharacters(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2); // double render -- sometimes the characters don't load at all!
      //     break;
      //   case 1:
      //     checkCharacterLastX(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2);
      //     checkCharacterLastX(pinehurstSprite_arr2);
      //     // loadCharacters(pinehurstSprite_arr);
      //     // loadCharacters(pinehurstSprite_arr);
      //     // loadCharacters(pinehurstSprite_arr);
      //     // drawFrame("left");

      //     setTimeout(function () {
      //       loadCharacters(pinehurstSprite_arr2);
      //     }, 0.1);
      //     break;
      //   case 2:
      //     checkCharacterLastX(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2);
      //     checkCharacterLastX(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2);
      //     loadCharacters(pinehurstSprite_arr2);
      //     drawFrame("right");
      //     break;
      // }
      break;
    case 2:
      currentTown = "pinehurst";
      frameX = 0;
      isUsingCharacters = 1;
      currentSrc = "../Visigoth/travel/frames/pinehurst/park.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1237;
      frameHeight = 368;

      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);

      switch (hasSwitchedFrame) {
        case 1:
          firstRenderCharacters(pinehurstSprite_arr3);
          loadCharacters(pinehurstSprite_arr3);
          break;
      }
      break;
    case 3:
      currentTown = "fw";
      frameX = 0;
      isUsingCharacters = 0; 
      currentSrc = "../Visigoth/travel/frames/fw_road/fw_road.png";
      travelFrameObject.src = currentSrc;
      frameWidth = 10264;
      frameHeight = 488;
      // drawFrame();

      townieMusic.pause();
      townieMusic = playLoopedAudio("../Visigoth/assets/audio/fw2.mp3");

      switch (pinehurstCharData_4.specialCondition) {
        case 1:
          encounters = "ON";
          break;
      }

      switch (hasSwitchedFrame) {
        case 2: // coming from the left
          frameX = -2500;
          break;
      }

      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
      break;
    case 4:
      currentTown = "cambridge";
      frameX = 0;
      isUsingCharacters = 0;
      currentSrc = "../Visigoth/travel/frames/cambridge/cambridge.webp";
      travelFrameObject.src = currentSrc;
      frameWidth = 1237;
      frameHeight = 368;
      encounters = "OFF";
      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);
      break;
    case 5:
      currentTown = "fw";
      frameX = 0;
      isUsingCharacters = 1;
      frameWidth = 1474;
      frameHeight = 400;
      currentSrc = "../Visigoth/travel/frames/fw_road/farm1.jpg";
      travelFrameObject.src = currentSrc;
      encounters = "OFF";
      renderImage(currentSrc, frameX, 0, frameWidth, frameHeight);

      firstRenderCharacters(fwSprite_arr);
      loadCharacters(fwSprite_arr);
      break;
  }
}

function switchFrame (travelFrame, whichDirection) {
  $(gameWindow).fadeOut(1000);
  isTraveling = 0;
  hasSwitchedFrame = 1;
  clearAllWindows();
  // saveCharacterLastX(currentFrame);

  setTimeout(function () {
    clearWindow();
    currentFrame = travelFrame;
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

/*
Frame 3 FW Road gate x locations
-1355 : Peckham Farm
-3057 : Abandoned Farm
-6830 : Abandoned Farmhouse
-7898 : Abandoned Car (Christine)
*/

function drawFrame (whichDirection) {
  let enemyEncounterREADY = 0;
  switch (whichDirection) {
    case "right":
      frameX -= 2.5;
    //   memoryDataBank = 1;

      if (frameX < -795) {
        switch (currentFrame) {
          default:
            return false;
          case 0:
            frameX += 2.5;
            currentFrame = 1;
            switchFrame(1, "right");
            enemyEncounterREADY = 1;
            break;
          case 1:
            switch (pinehurstCharData_4.specialCondition) {
              case 1:
                frameX += 2.5;
                currentFrame = 3;
                switchFrame(4, "right");
                enemyEncounterREADY = 1;
                break;
            }
            break;
          case 3:
            switch (true) {
              case (frameX < -9450):
                // we'll do something here later.
                frameX += 2.5;
                return false;
            }
            break;
          case 4:
          case 5:
            frameX += 2.5;
            return false;
        }
      }

      else if (frameX < -550) {
        switch (currentFrame) {
          case 2:
            frameX += 2.5;
            return false;
          case 1:
            switch (pinehurstCharData_4.specialCondition) {
              case 1:
                break;
              default:
                frameX += 2.5;
                return false;
            }
            break;
        }
      }

      // switch (true) {
      //   case (frameX < -700):
      //     switch (currentFrame) {
      //       case 0:
      //         break;
      //     }
      //     break;
      // }
      enemyEncounterREADY = 1;
      break;
    case "left":
      frameX += 2.5;
    //   memoryDataBank = 1;

      if (frameX > -5) {
        frameX -= 2.5;
        switch (currentFrame) {
          case 2:
          case 1:
            currentFrame = 0;
            switchFrame(0, "left");
            enemyEncounterREADY = 1;
            break;
          // case 2:
          //   currentFrame = 0;
          //   switchFrame(0, "left");
          //   break;
          case 4:
            currentFrame = 1;
            switchFrame(1, "left");
            enemyEncounterREADY = 1;
            break;
        }
        return false;
      }
      enemyEncounterREADY = 1;
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
    case 1:
      loadCharacters(pinehurstSprite_arr2);
      break;
    case 2:
      loadCharacters(pinehurstSprite_arr3);
      break;
    case 5:
      loadCharacters(fwSprite_arr);
      break;
  }
  saveCharacterLastX(currentFrame);

  // switch (true) {
  //   case (checkForGateways(currentFrame)):
  //     enterGateway(currentFrame);
  //     break;
  // }

  let GATEWAY_CHECK_VAR = checkForGateways(currentFrame);

  switch (isUsingCharacters) {
    case 0:
      switch (false) {
        case (GATEWAY_CHECK_VAR):
          clearAllWindows();
          break;
      }
      break;
  }

  switch (enemyEncounterREADY) {
    case 1:
      switch (currentFrame) {
        case 2:
          return false;
      }
      
      switch (isUsingCharacters) {
        case 0:
          specialDialogueCommands = "not_using_characters";
          break;
        case 1:
          specialDialogueCommands = "using_characters";
          break
      }

      initiateRandomEncounter();
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
          console.log("player interaction");
          switch (hasMarkedValueCHARD) {
            case 1:
              isTraveling = 0;
              resetDialogue();
              isTalking = 1;
              loadCharacterDialogue(currentFrame, markedValueCHARD);
              break;
            default:
              switch (true) {
                case (checkForGateways(currentFrame)):
                  enterGateway(currentFrame);
                  break;
              }
              break;
          }
          break;
        case 49:
          // switch (hasOpenedMenu) {
          //   case 1:
          //     closeMenu();
          //     isTraveling = 1;
          //     // playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          //     break;
          //   case 0:
          //     openMenu();
          //     isTraveling = 0;
          //     // playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          //     break;
          // }
          openMenu();
          isTraveling = 0;
          hasOpenedMenu = 1;
          console.log("opened menu");
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          return;
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
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              loadCharacterDialogue(currentFrame, markedValueCHARD);
              break;
          }
          break;
      }
      break;
  }

  switch (hasOpenedMenu) {
    case 1:
      switch (event.which) {
        case 49:
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          closeMenu();
          isTraveling = 1;
          hasOpenedMenu = 0;
          break;
        case 38:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          moveUpMenu();
          break;
        case 40:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          moveDownMenu();
          break;
      }
      break;
  }

  switch (specialGatewayEvents) {
    case 1:
      switch (event.which) {
        case 13:
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          clearAllWindows();
          isTraveling = 1;
          specialGatewayEvents = 0;
          break;
      }
      break;
  }

  switch (yesOrNoEnabled) {
    case 1:
      switch (event.which) {
        case 39:
          moveYesOrNoCursor("right");
          break;
        case 37:
          moveYesOrNoCursor("left");
          break;
        case 13:
          console.log("SELECTED");
          selectYesOrNo();
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