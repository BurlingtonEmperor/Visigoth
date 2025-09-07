let letterMap = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R"],
  ["R", "S", "T", "U", "V", "W"],
  ["X", "Y", "Z", "'", ".", " "],
  ["a", "b", "c", "d", "e", "f"],
  ["g", "h", "i", "j", "k", "l"],
  ["m", "n", "o", "p", "q", "r"],
  ["s", "t", "u", "v", "w", "x"],
  ["y", "z", "-", "[CLEAR]", "[BACK]", "[SELECT]"]
];
let isChoosingCharacterName = 0;
let characterLargePicCache;

let nameMap = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];

function getFullNameMap () {
  let fullNameMap = "";
  for (let i = 0; i < nameMap.length; i++) {
    let nameMapSpace = " ";
    switch (i) {
      case 0:
        nameMapSpace = "";
        break;
    }

    fullNameMap += nameMapSpace + nameMap[i];
  }

  return fullNameMap;
}

function returnSelectedCharacter (selectedValue_og, row_og) {
  letterMap = [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["R", "S", "T", "U", "V", "W"],
    ["X", "Y", "Z", "'", ".", " "],
    ["a", "b", "c", "d", "e", "f"],
    ["g", "h", "i", "j", "k", "l"],
    ["m", "n", "o", "p", "q", "r"],
    ["s", "t", "u", "v", "w", "x"],
    ["y", "z", "-", "[CLEAR]", "[BACK]", "[SELECT]"]
  ];

  letterMap[row_og][selectedValue_og] = "►" + letterMap[row_og][selectedValue_og];
  return letterMap;
}

function checkSelectedCharacter () {
  for (let i = 0; i < letterMap.length; i++) {
    for (let x = 0; x < letterMap[i].length; x++) {
      switch (true) {
        case (letterMap[i][x].includes("►")):
          return [i, x];
      }
    }
  }
}

function bringUpCharacterNameChooser (JSONPointer, selectedValue, row) {
  const maxCharAmount = 12; // max number of characters. 
  clearWindow();

  renderImage(JSONPointer.largePic, 0, 0);
  characterLargePicCache = JSONPointer;

  const largePicImage = new Image();
  largePicImage.src = JSONPointer.largePic;

  largePicImage.onload = () => {
    // const imageHeight = largePicImage.height;
    // const imageCanvasY = (rect.height / 2) - (imageHeight / 2); 
    // const imageMiddleY = imageCanvasY + (imageHeight / 2);

    windowContext.font = "20px FSEX300";
    windowContext.textAlign = "left";
    windowContext.textBaseline = "middle";
    windowContext.fillStyle = "white";
    
    windowContext.fillText(getFullNameMap(), 140, 50);

    let currentLetterArr = returnSelectedCharacter(selectedValue, row);

    let row_1 = "";
    let row_2 = "";
    let row_3 = "";
    let row_4 = "";
    let row_5 = "";
    let row_6 = "";
    let row_7 = "";
    let row_8 = "";
    let row_9 = "";
    let row_10 = "";

    for (let i = 0; i < currentLetterArr[0].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_1 += rowSpacer + currentLetterArr[0][i];
    }

    for (let i = 0; i < currentLetterArr[1].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_2 += rowSpacer + currentLetterArr[1][i];
    }

    for (let i = 0; i < currentLetterArr[2].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_3 += rowSpacer + currentLetterArr[2][i];
    }

    for (let i = 0; i < currentLetterArr[3].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_4 += rowSpacer + currentLetterArr[3][i];
    }

    for (let i = 0; i < currentLetterArr[4].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_5 += rowSpacer + currentLetterArr[4][i];
    }

    for (let i = 0; i < currentLetterArr[5].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_6 += rowSpacer + currentLetterArr[5][i];
    }

    for (let i = 0; i < currentLetterArr[6].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_7 += rowSpacer + currentLetterArr[6][i];
    }

    for (let i = 0; i < currentLetterArr[7].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_8 += rowSpacer + currentLetterArr[7][i];
    }

    for (let i = 0; i < currentLetterArr[8].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_9 += rowSpacer + currentLetterArr[8][i];
    }

    for (let i = 0; i < currentLetterArr[9].length; i++) {
      let rowSpacer = " ";
      switch (i) {
        case 0:
          rowSpacer = "";
          break;
      }

      row_10 += rowSpacer + currentLetterArr[9][i];
    }

    windowContext.fillText(row_1 + " " + row_2, 140, 120);
    windowContext.fillText(row_3 + " " + row_4, 140, 140);
    windowContext.fillText(row_5 + " " + row_6, 140, 160);
    windowContext.fillText(row_7 + " " + row_8, 140, 180);
    windowContext.fillText(row_9 + " " + row_10, 140, 200);
  }
}

function checkIsNameSelected () {
  let hasAtLeastOneLetterSelected;
  for (let i = 0; i < nameMap.length; i++) {
    switch (false) {
      case (nameMap[i] === "_"):
        hasAtLeastOneLetterSelected = 1;
        break;
    }
  }

  switch (hasAtLeastOneLetterSelected) {
    case 1:
      return 1;
  }
}

function moveCursorForNaming (whichDirection) {
  let getCurrentCursor = checkSelectedCharacter();
  switch (whichDirection) {
    case "up":
      if (getCurrentCursor[0] == 0 || getCurrentCursor[0] == 1) {
        return false;
      }

      else {
        // if (getCurrentCursor[0] == 2 || getCurrentCursor[0] == 4 || getCurrentCursor[0] == 6 || getCurrentCursor[0] == 8) {
        //   let upValueCursor = getCurrentCursor[0] - 2;
        //   bringUpCharacterNameChooser(characterLargePicCache, getCurrentCursor[1], upValueCursor);
        // }

        // else if (getCurrentCursor[0] == ) {}

        let upValueCursor = getCurrentCursor[0] - 2;
        bringUpCharacterNameChooser(characterLargePicCache, getCurrentCursor[1], upValueCursor);
      }
      break;
    case "down":
      if (getCurrentCursor[0] == 8 || getCurrentCursor[0] == 9) {
        return false;
      }

      else {
        let downValueCursor = getCurrentCursor[0] + 2;
        bringUpCharacterNameChooser(characterLargePicCache, getCurrentCursor[1], downValueCursor);
      }
      break;
  }
}

$(document).on("keydown", function (event) {
  switch (isChoosingCharacterName) {
    case 1:
      switch (event.which) {
        case 39:
        case 38:
        case 37:
        case 40:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          break;
        case 13:
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          break;
      }
      
      let currentSelectedChar = checkSelectedCharacter();
      break;
  }
});