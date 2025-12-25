const textWindow = document.getElementById("text-window");
const battleWindow = document.getElementById("battle-window");

const characterRoster = document.getElementById("character-roster");
const battleRoster = document.getElementById("battle-roster");
const itemRoster = document.getElementById("item-roster");

const yesOrNoWindow = document.getElementById("yes-or-no");
const yesCursor = document.getElementById("yes-cursor");
const noCursor = document.getElementById("no-cursor");

let yesOrNoEnabled = 0;
let yesOrNoPosition = 0; // left. 1 is right
let yesOrNoFunction; // function to be executed (when yes)
let yesOrNoFunction_TWO; // function to be executed (when no)

const cw1 = document.getElementById("cw1");
const cw2 = document.getElementById("cw2");
const cw3 = document.getElementById("cw3");
const cw4 = document.getElementById("cw1");

// function delayedWrite (text, elementId, speed) {
//   let i = 0;
//   const targetElement = $(elementId);
//   targetElement.innerHTML = ''; 

//   function type() {
//     if (i < text.length) {
//       targetElement.innerHTML += text.charAt(i);
//       i++;
//       setTimeout(type, speed);
//     }
//   }
//   type();
// }

function clearAllWindows () {
  textWindow.innerHTML = "";
}

function delayedWrite(text, element, delay) {
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, delay);
    }
  }

  typeChar();
}

function createWindow (windowType, windowText, x, y) {
  const newWindowElement = document.createElement("div");
//   newWindowElement.textContent = windowText;
  newWindowElement.classList.add("window");
 
  newWindowElement.style.position = "absolute";
  newWindowElement.style.left = x;
  newWindowElement.style.top = y;

  switch (windowType) {
    default:
      delayedWrite(windowText, newWindowElement, 25);
      setTimeout(function () {
        // newWindowElement.innerHTML += "<p>▼</p>";
      }, (windowText.length * 25) + 200);
      break;
    case "battleMessage":
      newWindowElement.textContent = windowText;
      break;
  }

  switch (windowType) {
    case "dialogue":
    //   newWindowElement.innerHTML += "<p>▼</p>";
      newWindowElement.classList.add("dialogue");
      break;
    case "battleMessage":
      newWindowElement.style.textAlign = "center";
      newWindowElement.style.margin = "auto";
      newWindowElement.style.left = "50%";
      newWindowElement.style.transform = "translateX(-50%)";
      newWindowElement.style.width = "700px";
      break;
  }

  textWindow.appendChild(newWindowElement);
  return newWindowElement;
}

// function createCharacterWindow (characterDataArray) {
//   const characterWindowContainerTwo = document.createElement("div");
//   const characterWindowContainerOne = document.createElement("div");

//   characterWindowContainerOne.classList.add("character-container-one");
//   textWindow.appendChild(characterWindowContainerOne);
//   for (let i = 0; i < 2; i++) {
//     const characterWindow = document.createElement("div");
//     characterWindow.classList.add("window");
//     characterWindow.classList.add("character-window");

//     characterWindow.innerHTML = `

//     `;
//   }
//   if (characterDataArray.length > 2) {
//     characterWindowContainerTwo.classList.add("character-container-two");
//   }
// }

function populateCharacterWindows (characterDataArray) {
  battleWindow.style.display = "block";

  cw1.style.display = "none";
  cw2.style.display = "none";
  cw3.style.display = "none";
  cw4.style.display = "none";

  for (let i = 0; i < characterDataArray.length; i++) {
    let characterWindowElement;
    let characterHealthElement;
    let characterData = characterDataArray[i];
    switch (i) {
      case 0:
        characterWindowElement = cw1;
        characterHealthElement = heroPartyOneHP;
        break;
      case 1:
        characterWindowElement = cw2;
        characterHealthElement = heroPartyTwoHP;
        break;
      case 2:
        characterWindowElement = cw3;
        characterHealthElement = heroPartyThreeHP;
        break;
      case 3:
        characterWindowElement = cw4;
        characterHealthElement = heroPartyFourHP;
        break;
    }

    characterWindowElement.style.display = "block";
    document.getElementById("cw" + (i + 1) + "-name").innerText = characterData.heroName;
    document.getElementById("cw" + (i + 1) + "-hp").innerText = characterData.heroHealth;
    // switch () {}

    switch (true) {
      case (characterHealthElement == undefined):
      case (characterHealthElement == null):
      case (characterHealthElement == ""):
        break;
      default:
        document.getElementById("cw" + (i + 1) + "-hp").innerText = String(characterHealthElement);
        break;
    }

    switch (hasFilledHPs) {
      case 1:
        document.getElementById("cw" + (i + 1) + "-hp").innerText = String(characterHealthElement);
        break;
    }

    document.getElementById("cw" + (i + 1) + "-pp").innerText = characterData.mentalEnergy;
  }
}

let selectedBattleOption = "attack";
let battleOptionsEnabled = 0;

const attackCursor = document.getElementById("attack-cursor");
const defendCursor = document.getElementById("defend-cursor");
const itemCursor = document.getElementById("item-cursor");
const powerCursor = document.getElementById("power-cursor");
const retreatCursor = document.getElementById("retreat-cursor");

function populateBattleCursor (selectedItem) {
  attackCursor.innerText = "";
  defendCursor.innerText = "";
  itemCursor.innerText = "";
  powerCursor.innerText = "";
  retreatCursor.innerText = "";

  document.getElementById(selectedItem + "-cursor").innerText = "►";
}

function moveYesOrNoCursor (whichDirection) {
  switch (whichDirection) {
    case "left":
      switch (yesOrNoPosition) {
        case 1:
          yesOrNoPosition = 0;
          noCursor.innerText = "";
          yesCursor.innerText = "►";
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          break;
      }
      break;
    case "right":
      switch (yesOrNoPosition) {
        case 0:
          yesOrNoPosition = 1;
          noCursor.innerText = "►";
          yesCursor.innerText = "";
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          break;
      }
      break;
  }
}

function selectYesOrNo () {
  switch (yesOrNoPosition) {
    case 0:
      eval(yesOrNoFunction);
      break;
    case 1:
      eval(yesOrNoFunction_TWO);
      break;
  }
  playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
  // eval(yesOrNoFunction);
  closeYesOrNo();
}

function openYesOrNo () {
  yesOrNoPosition = 0;
  noCursor.innerText = "";
  yesCursor.innerText = "►";
  yesOrNoWindow.style.display = "block";
}

function closeYesOrNo () {
  yesOrNoWindow.style.display = "none";
}