let battleBackdropX;
let enemySpriteX;
let battleMessage;

let playerTurn = 1;

let heroPartyOneHP;
let heroPartyTwoHP;
let heroPartyThreeHP;
let heroPartyFourHP;

let currentBattleMusic;

function initiateBattle (backdrop, enemyData) {
  $(gameWindow).fadeOut(1000);
  gameEventLocation = "disabled";
  playAudio("../Visigoth/battle/dstelept.wav");
  gameWindow.style.filter = "none";

//   const enemySprite = new Image();
//   enemySprite.src = enemyData.sprite;
  const enemySprite = enemyData.sprite;
  const specialY = enemyData.specialY;

  switch (enemyData.status) {
    case "boss":
      const bossMusic = playLoopedAudio("../Visigoth/battle/music/boss_fight.mp3");
      bossMusic.currentTime += 1.2;
      currentBattleMusic = bossMusic;
      break;
    case "generic":
      currentBattleMusic = playLoopedAudio("../Visigoth/battle/music/generic.mp3");
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
            playAudio("../Visigoth/assets/audio/sfx/coin7.wav");
            break;
        }

        setTimeout(function () {
          battleMessage.style.display = "none";
          clearAllWindows();
        }, 2000);
      }, 700);
    }, 800);
  }, 1000);
}

function takeDamage (dmgAmount, targetHero) {
  gameWindow.classList.add("shake");
  battleWindow.classList.add("shake");
  textWindow.classList.add("shake");

  document.getElementById("cw" + String(targetHero + 1) + "-hp").style.backgroundColor = "red";
  let redDmgBGPos = 1;
  
  const animationRedInterval = setInterval(function () {
    switch (redDmgBGPos) {
      case 0:
        document.getElementById("cw" + String(targetHero + 1) + "-hp").style.backgroundColor = "none";
        redDmgBGPos = 1;
        break;
      case 1:
        document.getElementById("cw" + String(targetHero + 1) + "-hp").style.backgroundColor = "red";
        redDmgBGPos = 0;
        break;
    }
  }, 25);

  setTimeout(function () {
    gameWindow.classList.remove("shake");
    battleWindow.classList.remove("shake");
    textWindow.classList.remove("shake");

    clearInterval(animationRedInterval);
    document.getElementById("cw" + String(targetHero + 1) + "-hp").style.backgroundColor = "none";
  }, 300);
  
  let selectedHero;
  switch (targetHero) {
    case 0:
      selectedHero = heroPartyOneHP;
      break;
    case 1:
      selectedHero = heroPartyTwoHP;
      break;
    case 2:
      selectedHero = heroPartyThreeHP;
      break;
    case 3:
      selectedHero = heroPartyFourHP;
      break;
  }

  selectedHero -= dmgAmount; // there's an issue here with NaN. Retarded 
  document.getElementById("cw" + String(targetHero + 1) + "-hp").innerText = selectedHero;

  if (selectedHero < 1) {
    document.getElementById("cw" + String(targetHero + 1)).style.backgroundColor = "black";
    createWindow("battleMessage", heroParty[targetHero].heroName + " was slain!", 0, 0);

    setTimeout(function () {
      clearAllWindows();
    }, 2000);
  }
}

function killEnemyAnimation (backdropSrc) {
  gameWindow.style.filter = "grayscale(100%) sepia(100%) hue-rotate(350deg) saturate(300%) contrast(150%) brightness(50%)";
  gameWindow.classList.add("shake");
  let deathSound = playAudio("../Visigoth/battle/enemy_death.mp3");
  deathSound.currentTime += 0.5;
  battleOptionsEnabled = 0;

  $(gameWindow).fadeOut(3000);
  currentBattleMusic.pause();
  currentBattleMusic = playLoopedAudio("../Visigoth/battle/music/victory.mp3");
  battleRoster.style.display = "none";

  setTimeout(function () {
    clearWindow();
    renderImage(backdropSrc, -100, 0);

    $(gameWindow).fadeIn(3000);
    gameWindow.style.filter = "none";
    gameWindow.classList.remove("shake");
  }, 3000);
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