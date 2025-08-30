let battleBackdropX;
let enemySpriteX;
let battleMessage;

let playerTurn = 0;

function initiateBattle (backdrop, enemyData) {
  $(gameWindow).fadeOut(1000);
  gameEventLocation = "disabled";
  playAudio("../Visigoth/battle/dstelept.wav");

//   const enemySprite = new Image();
//   enemySprite.src = enemyData.sprite;
  const enemySprite = enemyData.sprite;
  const specialY = enemyData.specialY;

  switch (enemyData.status) {
    case "boss":
      const bossMusic = playLoopedAudio("../Visigoth/battle/music/boss_fight.mp3");
      bossMusic.currentTime += 1.2;
      playerTurn = 1;
      break;
  }

  setTimeout(function () {
    $(gameWindow).fadeIn(1000);
    
    clearWindow();
    drawImageLeft(backdrop);
    renderImage(enemySprite, 500, specialY);
    // renderPreloadedImage(enemySprite, 500, enemyData.specialY);
    
    setTimeout(function () {
      battleBackdropX = panCamera(backdrop, "left", 5, 950, 0, 0);
      enemySpriteX = panCamera(enemySprite, "left", 5, 950, 500, specialY);

      setTimeout(function () {
        battleMessage = createWindow("battleMessage", "Encountered " + enemyData.enemyName + ".", 0, 0);
        populateCharacterWindows(heroParty);

        switch (playerTurn) {
          case 1:
            battleRoster.style.display = "block";
            battleOptionsEnabled = 1;
            break;
        }

        setTimeout(function () {
          battleMessage.style.display = "none";
        }, 2000);
      }, 700);
    }, 800);
  }, 1000);
}

$(document).on("keydown", function (event) {
  switch (battleOptionsEnabled) {
    case 1:
      switch (event.which) {
        case 39:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (selectedBattleOption) {
            case "attack":
              selectedBattleOption = "defend";
              break;
            case "defend":
              selectedBattleOption = "item";
              break;
            case "item":
              selectedBattleOption = "power";
              break;
            case "power":
              selectedBattleOption = "retreat";
              break;
            case "retreat":
              selectedBattleOption = "attack";
              break;
          }
          break;
        case 37:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (selectedBattleOption) {
            case "attack":
              selectedBattleOption = "retreat";
              break;
            case "retreat":
              selectedBattleOption = "power";
              break;
            case "power":
              selectedBattleOption = "item";
              break;
            case "item":
              selectedBattleOption = "defend";
              break;
            case "defend":
              selectedBattleOption = "attack";
              break;
          }
          break;
        case 40:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (selectedBattleOption) {
            case "attack":
              selectedBattleOption = "item";
              break;
            case "item":
            case "power":
              selectedBattleOption = "retreat";
              break;
            case "retreat":
              selectedBattleOption = "attack";
              break;
            case "defend":
              selectedBattleOption = "power";
              break;
          }
          break;
        case 38:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (selectedBattleOption) {
            case "attack":
            case "defend":
              selectedBattleOption = "retreat";
              break;
            case "retreat":
              selectedBattleOption = "item";
              break;
            case "item":
              selectedBattleOption = "attack";
              break;
            case "power":
              selectedBattleOption = "defend";
              break;
          }
          break;
        // Select
        case 13:
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          break;
      }
      populateBattleCursor(selectedBattleOption);
      break;
  }
});