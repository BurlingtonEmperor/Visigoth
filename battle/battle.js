let battleBackdropX;
let enemySpriteX;
let battleMessage;

let currentEnemyData;
let currentEnemyData_currentHP;
let currentBackdrop;

let playerTurn = 1;

let heroPartyOneHP;
let heroPartyTwoHP;
let heroPartyThreeHP;
let heroPartyFourHP;

let currentBattleMusic;

let diceRollFactor = 9; // the higher the number, the more random the damage will be. could result in misses.
let heroNumber = 1; // this is the hero whose turn it is. starts at 1. 

let enemyDefeated = 0;
let enemyDefeatOptions = 0;
let enemyRetreated = 0;
let postBattleD_num = 0;

let isSelectingItem = 0;

function initiateBattle (backdrop, enemyData) {
  $(gameWindow).fadeOut(1000);
  gameEventLocation = "disabled";
  playAudio("../Visigoth/battle/dstelept.wav");
  gameWindow.style.filter = "none";

//   const enemySprite = new Image();
//   enemySprite.src = enemyData.sprite;
  const enemySprite = enemyData.sprite;
  const specialY = enemyData.specialY;
  currentEnemyData = enemyData;
  currentEnemyData_currentHP = enemyData.maxHealth;

  currentBackdrop = backdrop;

  enemyDefeated = 0;
  enemyDefeatOptions = 0;
  enemyRetreated = 0;

  heroNumber = 1;
  postBattleD_num = 0;

  switch (enemyData.status) {
    case "boss":
      const bossMusic = playLoopedAudio("../Visigoth/battle/music/boss_fight.mp3");
      bossMusic.currentTime += 1.2;
      currentBattleMusic = bossMusic;
      break;
    case "final":
      const finalMusic = playLoopedAudio("../Visigoth/battle/music/final.mp3");
      finalMusic.currentTime += 1.2;
      currentBattleMusic = finalMusic;
      break;
    case "jenova":
      const jenovaMusic = playLoopedAudio("../Visigoth/battle/music/jenova.mp3");
      jenovaMusic.currentTime += 1.2;
      currentBattleMusic = jenovaMusic;
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
        setBattlePartyHP();
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
  switch (true) {
    case (dmgAmount < 1):
      dmgAmount = 0;
      return false;
  }

  gameWindow.classList.add("shake");
  battleWindow.classList.add("shake");
  textWindow.classList.add("shake");

  playClonedAudio("../Visigoth/battle/dsskepch.wav");

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
  }, 15);

  setTimeout(function () {
    gameWindow.classList.remove("shake");
    battleWindow.classList.remove("shake");
    textWindow.classList.remove("shake");

    clearInterval(animationRedInterval);
    document.getElementById("cw" + String(targetHero + 1) + "-hp").style.backgroundColor = "none";
  }, 100);
  
  let selectedHero;
  switch (targetHero) {
    case 0:
      heroPartyOneHP -= dmgAmount
      selectedHero = heroPartyOneHP;
      break;
    case 1:
      heroPartyTwoHP -= dmgAmount;
      selectedHero = heroPartyTwoHP;
      break;
    case 2:
      heroPartyThreeHP -= dmgAmount;
      selectedHero = heroPartyThreeHP;
      break;
    case 3:
      heroPartyFourHP -= dmgAmount;
      selectedHero = heroPartyFourHP;
      break;
  }
  
  document.getElementById("cw" + String(targetHero + 1) + "-hp").innerText = selectedHero;

  if (selectedHero < 1) {
    document.getElementById("cw" + String(targetHero + 1)).style.backgroundColor = "black";
    createWindow("battleMessage", heroParty[targetHero].heroName + " was slain!", 0, 0);

    setTimeout(function () {
      clearAllWindows();
    }, 2000);
  }
}

function setBattlePartyHP () {
  switch (true) {
    case (heroParty.length < 2):
      heroPartyOneHP = heroParty[0].heroHealth;
      break;
    case (heroParty.length < 3):
      heroPartyOneHP = heroParty[0].heroHealth;
      heroPartyTwoHP = heroParty[1].heroHealth;
      break;
    case (heroParty.length < 4):
      heroPartyOneHP = heroParty[0].heroHealth;
      heroPartyTwoHP = heroParty[1].heroHealth;
      heroPartyThreeHP = heroParty[2].heroHealth;
      break;
    case (heroParty.length < 5):
      heroPartyOneHP = heroParty[0].heroHealth;
      heroPartyTwoHP = heroParty[1].heroHealth;
      heroPartyThreeHP = heroParty[2].heroHealth;
      heroPartyFourHP = heroParty[3].heroHealth;
      break;
  }
}

// start damage functions 

function calculateSpriteLocationForDamage (dmgAmount_gD) {
  const dmgElement = document.createElement("p");
  
  dmgElement.style.left = String(enemySpriteX + 550) + "px";
  dmgElement.style.top = String(100 + Math.floor(Math.random() * 100)) + "px";
  dmgElement.classList.add("damage-number");
  dmgElement.innerText = String(dmgAmount_gD);
  dmgElement.style.zIndex = 20;
  battleWindow.appendChild(dmgElement);

  setTimeout(function () {
    $(dmgElement).slideUp();
    setTimeout(function () {
      battleWindow.removeChild(dmgElement);
    }, 200);
  }, 100);
}

function giveDamage () {
  gameWindow.style.filter = "saturate(0) brightness(1.5)";
  playClonedAudio("../Visigoth/battle/dspistol.wav");
  setTimeout(function () {
    gameWindow.style.filter = "none";
  }, 70);
}

let attackBoost = 1; // future use for power attacks and crit rolls
function tryAttacking (hero_data) {
  let attackRoll = Math.floor(Math.random() * diceRollFactor);

  switch (attackRoll) {
    case 0:
      createWindow("battleMessage", hero_data.heroName + "'s attack missed!", 0, 0);
      playClonedAudio("../Visigoth/battle/dsskeswg.wav");
      break;
    case diceRollFactor - 1:
      attackRoll = attackRoll * 1.5 * attackBoost;
      attackRoll += (hero_data.attackForce - currentEnemyData.defenseForce);
      createWindow("battleMessage", "Critical hit! " + hero_data.heroName + " dealt " + attackRoll + " damage!", 0, 0);
      giveDamage(attackRoll);
      calculateSpriteLocationForDamage(attackRoll);

      currentEnemyData_currentHP -= attackRoll;
      checkForDeadEnemy();
      break;
    default:
      attackRoll += (hero_data.attackForce - currentEnemyData.defenseForce);
      createWindow("battleMessage", hero_data.heroName + " dealt " + attackRoll + " damage!", 0, 0);
      giveDamage(attackRoll);
      calculateSpriteLocationForDamage(attackRoll);

      currentEnemyData_currentHP -= attackRoll;
      checkForDeadEnemy();
      break;
  }

  // setTimeout(function () {
  //   clearAllWindows();
  // }, 1000);
}

function tryDefending (hero_data) {
  let defenseRoll = Math.floor(Math.random() * 5) + 1;
  defenseRoll += hero_data.defenseForce;
  defenseRoll = Math.floor(defenseRoll * 0.25);

  createWindow("battleMessage", hero_data.heroName + " defends.", 0, 0);

  // setTimeout(function () {
  //   clearAllWindows();
  // }, 1000);
}

function tryRetreating () {
  let retreatRoll = Math.floor(Math.random() * 9);

  switch (currentEnemyData.status) {
    case "boss":
    case "final":
    case "jenova":
      createWindow("battleMessage", "Retreat is not an option.", 0, 0);
      break;
    case "generic":
      switch (retreatRoll) {
        case 0:

          break;
      }
      break;
  }
}

// end damage functions

// summons

function summonBeing (summonName) {
  // let summonDuration;
  switch (summonName) {
    case "enterprise":
      displayCutscene("../Visigoth/battle/summons/enterprise.mp4");

      setTimeout(function () {
        clearTheatre();
      }, 7000);
      break;
  }

  // setTimeout(function () {
  //   clearTheatre();
  // }, summonDuration + 100);
}

// end summons

// start turn functions

let playerActionLog = [];
function useTurn (playerAction) {
  switch (playerAction) {
    case "attack":
      playerActionLog.push("attack");
      break;
    case "defend":
      playerActionLog.push("defend");
      break;
  }

  switch (heroNumber) {
    case (heroParty.length):
      heroNumber = 1;
      battleOptionsEnabled = 0;
      battleRoster.style.display = "none";
      executePlayerActions(playerActionLog);
      playerActionLog = [];
      
      setTimeout(function () {
        enemyTurn();
      }, 700);
      break;
    default:
      heroNumber += 1;
      break;
  }
}

// check for dead characters/enemies

function checkForDeadPlayers () {
  function gameOverAnimation () {
    createWindow("battleMessage", "Game Over...", 0, 0);
    currentBattleMusic.pause();
    currentBattleMusic = playAudio("../Visigoth/battle/music/gameover.mp3");
    playerTurn = 0;
    battleWindow.style.display = "none";
    battleOptionsEnabled = 0;
    $(gameWindow).fadeOut(3000);

    setTimeout(function () {
      
    }, 3000);
  }

  switch (true) {
    case (heroPartyOneHP < 0 && heroParty.length < 2):
      gameOverAnimation();
      break;
  }
}

function checkForDeadEnemy () {
  if (currentEnemyData_currentHP < 1) {
    killEnemyAnimation(currentBackdrop);
    battleOptionsEnabled = 0;
    battleRoster.style.display = "none";
    createWindow("battleMessage", "Defeated " + currentEnemyData.enemyName + "!", 0, 0);
    enemyDefeated = 1;

    return false;
  }
}

// done checking for dead characters/enemies

function executePlayerActions (actionDATA) {
  // a very bad way to do this.
  // but i have no other choice 
  // will this cause a memory leak? probably. Do I care? no.

  switch (enemyDefeated) {
    case 1:
      return false;
  }

  let playerACTION_LOG = actionDATA;

  function executeNextAction (i) {
    setTimeout(function () {
      switch (playerACTION_LOG[i]) {
        case "attack":
          tryAttacking(heroParty[i]);
          break;
        case "defend":
          tryDefending(heroParty[i]);
          break;
        case "item":
          break;
        case "power":
          break;
        case "retreat":
          switch (i) {
            case 0:
              break;
            default:
              createWindow("battleMessage", heroParty[i].heroName + " is not giving orders.", 0, 0);

              setTimeout(function () {
                clearAllWindows();
              }, 1000);
              break;
          }
          break;
      }
    }, i * 1000);
  }

  for (let i = 0; i < playerACTION_LOG.length; i++) {
    executeNextAction(i);
  }

  setTimeout(function () {
    clearAllWindows();
  }, (1000 * playerACTION_LOG.length) + 1000);
}

function enemyTurn () {
  let enemyDiceRoll = Math.floor(Math.random () * 5);
  switch (enemyDefeated) {
    case 1:
      return false;
  }

  /*
  Dice Roll Outcomes
  0 - Attack
  1 - Defend
  3 - Summon (If available)
  2 - Special Attack (If available)
  4 - Power (If available) actually, i'm getting rid of this
  */

  let isLowHealth = currentEnemyData.enemyHealth * 0.5;
  if (currentEnemyData_currentHP < isLowHealth) {
    retreatAttempt = Math.floor(Math.random() * 9);
    switch (enemyData.status) {
      case "generic":
        switch (retreatAttempt) {
          case 0:
            createWindow("battleMessage", currentEnemyData.enemyName + " fled the battle!", 0, 0);
            setTimeout(function () {
              enemyRetreatAnimation(currentBackdrop);
            }, 1000);
            return false;
        }
        break;
    }
  }

  switch (true) {
    case (currentEnemyData.summonArr.length < 1):
      enemyDiceRoll = Math.floor(Math.random() * 3);
      break;
  }
  
  let hero_TARGET = Math.floor(Math.random() * heroParty.length);
  let enemyAttackRoll = Math.floor(Math.random() * 2) + currentEnemyData.attackForce;
  
  console.log("Targeting hero " + String(hero_TARGET + 1));
  console.log("Attack roll: " + String(enemyAttackRoll));

  switch (enemyDiceRoll) {
    case 0:
      createWindow("battleMessage", currentEnemyData.enemyName + " attacks!", 0, 0);
      setTimeout(function () {
        takeDamage(enemyAttackRoll, hero_TARGET);
        createWindow("battleMessage", currentEnemyData.enemyName + " dealt " + enemyAttackRoll + " damage!", 0, 0);

        setTimeout(function () {
          clearAllWindows();
          battleOptionsEnabled = 1;
          battleRoster.style.display = "block";
        }, 1000);
      }, 1000);
      break;
    case 1:
      createWindow("battleMessage", currentEnemyData.enemyName + " defends.", 0, 0);

      setTimeout(function () {
        clearAllWindows();
        battleOptionsEnabled = 1;
        battleRoster.style.display = "block";
      }, 1000);

      // setTimeout(function () {
      //   clearAllWindows();
      // }, 1000);
      break;
    // case 2:
    //   break;
    case 2:
      let randomSpecialAttack = Math.floor(Math.random() * currentEnemyData.specialAttacks.length);
      createWindow("battleMessage", currentEnemyData.specialAttacks[randomSpecialAttack], 0, 0);

      switch (currentEnemyData.specialAttacks[randomSpecialAttack]) {
        case "Psychic":
          outerShell.style.filter = "saturate(0) brightness(1.5)";
          playAudio("../Visigoth/battle/dsvilsit.wav");
          takeDamage(Math.floor(enemyAttackRoll * 1.3), hero_TARGET);

          setTimeout(function () {
            outerShell.style.filter = "none";
            setTimeout(function () {
              battleOptionsEnabled = 1;
              battleRoster.style.display = "block";
            }, 500);
          }, 500);
          break;
        case "Dazzle":
          setTimeout(function () {
            battleOptionsEnabled = 1;
            battleRoster.style.display = "block";
          }, 500);
          break;
        case "Strangle":
          let currentDegree = 0;
          playAudio("../Visigoth/battle/dsskeatk.wav");
          takeDamage(Math.floor(enemyAttackRoll * 2), hero_TARGET);

          const strangleAnimation = setInterval(function () {
            currentDegree += 10;
            rotate_3D_XAXIS(currentDegree, outerShell);
          }, 10);

          setTimeout(function () {
            clearInterval(strangleAnimation);
            outerShell.style.transform = "none";
            battleOptionsEnabled = 1;
            battleRoster.style.display = "block";
          }, 500);
          break;
        case "Gangstalk":
          setTimeout(function () {
            battleOptionsEnabled = 1;
            battleRoster.style.display = "block";
          }, 500);
          break;
        case "Reality Shift":
          setTimeout(function () {
            battleOptionsEnabled = 1;
            battleRoster.style.display = "block";
          }, 500);
          break;
      }
      break;
    case 3:
      // summons
      break;
  }
}

// end turn functions

// enemy defeat functions

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

    setTimeout(function () {
      bringUpPostBattleOptions();
    }, 3000);
  }, 3000);
}

function enemyRetreatAnimation (backdropSrc) {
  $(gameWindow).fadeOut(3000);
  currentBattleMusic.pause();
  currentBattleMusic = playLoopedAudio("../Visigoth/battle/music/victory.mp3");
  battleRoster.style.display = "none";

  setTimeout(function () {
    clearWindow();
    renderImage(backdropSrc, -100, 0);

    $(gameWindow).fadeIn(3000);

    setTimeout(function () {
      bringUpPostBattleOptions();
    }, 3000);
  }, 3000);
}

function bringUpPostBattleOptions () {
  // enemyDefeatOptions = 1;
  
  let postBattleDialogue = "";
  let postBattleDialogue_len;

  enemyDefeatOptions = 0;
  clearAllWindows();

  switch (postBattleD_num) {
    case 0:
      switch (enemyRetreated) {
        case 1:
          postBattleDialogue = "No exp gained. The enemy fled.";
          break;
        default:
          postBattleDialogue = "Gained " + currentEnemyData.expYield + " exp."; 
          break;
      }
      postBattleDialogue_len = postBattleDialogue.length;
      break;
    case 1:
      switch (currentEnemyData.droppedItems.length) {
        case 0:
          postBattleDialogue = "No items were found.";
          break;
        default:
          postBattleDialogue = "Found a " + currentEnemyData.droppedItems[0] + ".";
          currentInventory.push(currentEnemyData.droppedItems[0]);
          break;
      }
      break;
    case 2:
      clearAllWindows();
      currentBattleMusic.pause();
      enemyDefeatOptions = 0;
      
      battleWindow.style.display = "none";
      $(gameWindow).fadeOut(2000);
      clearAllWindows();

      setTimeout(function () {
        $(gameWindow).fadeIn(2000);
        clearWindow();
        drawFrame();
        
        switch (specialDialogueCommands) {
          case "chance":
            specialDialogueCommands = "";
            clearAllWindows();
            firstRenderCharacters(pinehurstSprite_arr3);
            // loadCharacterLastX(); no idea why this function isn't working
            townieMusic.play();
            travelCharacterObject_1_x = chanceDialogueX;
            loadCharacters(pinehurstSprite_arr3);

            // resetDialogue();
            current_DA = 0;
            isTalking = 1;
            enemyDefeatOptions = 0;
            clearAllWindows();
            pinehurstCharData_4.specialCondition = 1; 
            loadCharacterDialogue(currentFrame, markedValueCHARD);
            return false;
          case "not_using_characters":
            specialDialogueCommands = "";
            clearAllWindows();
            townieMusic.play();
            isTraveling = 1;
            break;
          case "using_characters":
            specialDialogueCommands = "";
            clearAllWindows();
            townieMusic.play();
            REWRITE_LOAD_CHAR_DATA();
            reRenderCharacters(CURRENT_SPRITE_ARR);
            // // loadCharacters(CURRENT_SPRITE_ARR);
            fillSPRITE_ARR(currentFrame);
            // firstRenderCharacters(CURRENT_SPRITE_ARR);
            loadCharacters(CURRENT_SPRITE_ARR);
            isTraveling = 1;
            break;
        }
        // loadCharacterLastX();
        
        // townieMusic = playLoopedAudio();
      }, 2000);
      break;
  }

  postBattleD_num += 1;
  
  clearAllWindows();
  createWindow("dialogue", postBattleDialogue, 0, 0);

  setTimeout(function () {
    enemyDefeatOptions = 1;
  }, (100 * postBattleDialogue_len));
}

// end enemy defeat functions

// item select functions

const ITEM_ONE_SELECT = document.getElementById("item_1_select");
const ITEM_TWO_SELECT = document.getElementById("item_2_select");
const ITEM_THREE_SELECT = document.getElementById("item_3_select");
const ITEM_FOUR_SELECT = document.getElementById("item_4_select");

/*
Item selector calculations.  
*/

function MOVE_ITEM_CURSOR (whichDirection) {
  
}

// end item select functions

$(document).on("keydown", function (event) {
  switch (battleOptionsEnabled) {
    case 1: // case 2, then post battle options
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
          useTurn(selectedBattleOption);
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          break;
      }
      populateBattleCursor(selectedBattleOption);
      break;
  }

  switch (enemyDefeatOptions) {
    case 1:
      switch (event.which) {
        case 13:
          bringUpPostBattleOptions();
          break;
      }
      break;
  }

  switch (isSelectingItem) {
    case 1:
      break;
  }
});