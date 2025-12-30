let alpha_pos = null; // alpha pos = 1 achieves the same result
let alpha_keypos = 0;
let alpha_dpos = 0;

let current_alpha_audio = 0;
let current_battle_alpha_audio = 0;

let current_doorway = 0;
let current_path_loc = "forest";
let path_alpha_lim = 10;

const pointerWindow = document.getElementById("alpha-window");
const pointer = document.getElementById("pointer");

const alphaBatOptions = document.getElementById("alpha-bat-options");
const alphaBatName = document.getElementById("alpha-bat-name");
const alphaBatStatus = document.getElementById("alpha-bat-status");

let battleMenuOption_alpha = 0;
const alphaBatAtk = document.getElementById("alpha-bat-atk");
const alphaBatHeal = document.getElementById("alpha-bat-heal");
const alphaBatEsc = document.getElementById("alpha-bat-esc");
const alphaHp = document.getElementById("alpha-hp");

let alpha_hp = 30;
let max_alpha_hp = 30;
let alpha_atk_range = 5;

let drawEnemy = "";
let drawEnemy_src = "";
let battleFrame = "";
let enemyAtkRange = 0;
let enemyHp = 0;
let alphaPrize = "";

let healItems_alpha = 0;

const firstSaveCheck = localStorage.getItem("alpha_firstsave");
function saveGame_alpha () {
  localStorage.setItem("alpha_firstsave", current_path_loc + "||" + alpha_hp + "||" + max_alpha_hp + "||" + alpha_atk_range + "||" + healItems_alpha + "||" + path_alpha_lim);
}

function loadGame_alpha () {
  let saveData_alpha = String(localStorage.getItem("alpha_firstsave"));
  saveData_alpha = saveData_alpha.split("||");

  current_path_loc = saveData_alpha[0];
  alpha_hp = parseInt(saveData_alpha[1]);
  alphaHp.innerText = parseInt(alpha_hp);
  max_alpha_hp = parseInt(saveData_alpha[2]);
  alpha_atk_range = parseInt(saveData_alpha[3]);
  healItems_alpha = parseInt(saveData_alpha[4]);
  path_alpha_lim = parseInt(saveData_alpha[5]);

  alphaHealingItems.innerText = healItems_alpha;
}

function resetDoorways () {
  path_alpha_lim -= 1;
  
  if (path_alpha_lim < 1) {
    alpha_pos = null;
    switch (current_path_loc) {
      case "forest":
        jaydenEncounter2_a1();
        break;
      case "road":
        jaydenEncounter3_a1();
        break;
      case "lake":
        policeStationScene_a1();
        break;
      case "tunnels":
        junkyardDialogue_a1();
        break;
      case "junkyard":
        junkyardDialogue_a4();
        break;
    }
    return false;
  }

  setTimeout(function () {
    clearWindow();
    pointerWindow.style.display = "block";

    switch (current_path_loc) {
      case "forest":
        drawImageLeft("../Visigoth/prequel/forest.jpg", 800, 500);
        break;
      case "road":
        drawImageLeft("../Visigoth/prequel/road.jpg", 800, 500);
        break;
      case "lake":
        drawImageLeft("../Visigoth/prequel/lake.jpg", 800, 500);
        break;
      case "tunnels":
        drawImageLeft("../Visigoth/prequel/tunnels.jpg", 800, 500);
        break;
      case "junkyard":
        drawImageLeft("../Visigoth/prequel/junkyard.jpg", 800, 500);
        break;
    }

    $(gameWindow).slideDown(2000);
    setTimeout(function () {
      drawCenterImage("../Visigoth/prequel/doors1.png", 556, 186);
      pointer.style.display = "block";
      playAudio("../Visigoth/assets/audio/sfx/coin7.wav");
      alpha_pos = 3;
      createWindow("battleMessage", "Select the pathway you wish to travel down.", 0, 0);
    }, 2000);
  }, 2000);
}

function doorwayBoobytrapInit () {
  alpha_pos = null;
  setTimeout(function () {
    clearWindow();
    clearAllWindows();

    switch (current_path_loc) {
      case "forest":
        battleFrame = "../Visigoth/prequel/frame6.jpg";
        break;
      case "road":
        battleFrame = "../Visigoth/prequel/frame12.jpg";
        break;
      case "lake":
        battleFrame = "../Visigoth/prequel/frame17.jpg";
        break;
      case "tunnels":
        battleFrame = "../Visigoth/prequel/frame21.jpg";
        break;
      case "junkyard":
        battleFrame = "../Visigoth/prequel/frame23.jpg";
        break;
    }

    drawImageLeft(battleFrame, 800, 500);

    $(gameWindow).slideDown(2000);

    setTimeout(function () {
      drawCenterImage("../Visigoth/prequel/chest.png", 254, 254);

      createWindow("battleMessage", "Press 'E' to open the chest.", 0, 0);
      alpha_pos = 6;
    }, 2000);
  }, 2000);
}

function boobyTreasure_alpha () {
  let tres_chance = Math.floor(Math.random() * 3);
  clearAllWindows();
  let tres_dialogue;

  alpha_pos = null;

  function moveOn_dialogue () {
    createWindow("dialogue", tres_dialogue, 0, 0);
    setTimeout(function () {
      alpha_pos = 2;
      alpha_dpos = 13;
    }, getWaitTextTime(tres_dialogue));
  }

  if (tres_chance == 0) {
    tres_dialogue = "The chest is empty.";
  }

  else {
    switch (current_path_loc) {
      case "road":
        switch (tres_chance) {
          case 1:
            tres_dialogue = "Found some strange blood. Max HP increased by 5!";
            max_alpha_hp += 5;
            alpha_hp += 5;

            moveOn_dialogue();
            return false;
        }
        break;
    }

    tres_dialogue = "It's a boobytrap! Lost 30% of your HP.";
    perc_booby = Math.floor(0.3 * alpha_hp);
    alpha_hp -= perc_booby;

    if (alpha_hp - perc_booby < 5) {
      alpha_hp = 5;
    }

    alphaHp.innerText = alpha_hp;
    playAudio("../Visigoth/battle/dsskeatk.wav");
  }

  moveOn_dialogue();
}

function doorwayTreasureInit () {
  alpha_pos = null;
  setTimeout(function () {
    clearWindow();
    clearAllWindows();

    switch (current_path_loc) {
      case "forest":
        battleFrame = "../Visigoth/prequel/frame6.jpg";
        break;
      case "road":
        battleFrame = "../Visigoth/prequel/frame12.jpg";
        break;
      case "lake":
        battleFrame = "../Visigoth/prequel/frame17.jpg";
        break;
      case "tunnels":
        battleFrame = "../Visigoth/prequel/frame21.jpg";
        break;
      case "junkyard":
        battleFrame = "../Visigoth/prequel/frame23.jpg";
        break;
    }

    drawImageLeft(battleFrame, 800, 500);

    $(gameWindow).slideDown(2000);

    setTimeout(function () {
      drawCenterImage("../Visigoth/prequel/chest.png", 254, 254);

      createWindow("battleMessage", "Press 'E' to open the chest.", 0, 0);
      alpha_pos = 5;
    }, 2000);
  }, 2000);
}

function openTreasure_alpha () {
  let tres_chance = Math.floor(Math.random() * 3);
  clearAllWindows();
  let tres_dialogue;

  alpha_pos = null;

  if (tres_chance == 0) {
    tres_dialogue = "The chest is empty.";
  }

  else {
    tres_dialogue = "Found " + tres_chance + " healing items.";
    healItems_alpha += tres_chance;
  }

  createWindow("dialogue", tres_dialogue, 0, 0);
  setTimeout(function () {
    alpha_pos = 2;
    alpha_dpos = 12;
  }, getWaitTextTime(tres_dialogue));
}

let isFightingBoss = 0;
function doorwayBattleInit () {
  current_alpha_audio.pause();
  switch (isFightingBoss) {
    case 1:
      current_battle_alpha_audio = playLoopedAudio("../Visigoth/battle/music/final.mp3");
      break;
    case 2:
      current_battle_alpha_audio = playLoopedAudio("../Visigoth/battle/music/boss_fight.mp3");
      break;
    default:
      current_battle_alpha_audio = playLoopedAudio("../Visigoth/battle/music/alpha.mp3");
      break;
  }

  setTimeout(function () {
    clearWindow();
    clearAllWindows();

    alphaBatAtk.innerText = "> Attack";
    alphaBatHeal.innerText = "Heal";
    alphaBatEsc.innerText = "Escape";
    battleMenuOption_alpha = 0;

    switch (current_path_loc) {
      case "forest":
        battleFrame = "../Visigoth/prequel/frame6.jpg";
        drawEnemy = "Rabid Fox";
        drawEnemy_src = "../Visigoth/prequel/rabidfox.png";
        enemyAtkRange = 3;
        enemyHp = 10;
        break;
      case "road":
        battleFrame = "../Visigoth/prequel/frame12.jpg";
        drawEnemy = "Zombie Deer";
        drawEnemy_src = "../Visigoth/prequel/zombiedeer.png";
        enemyAtkRange = 5;
        enemyHp = 12;
        break;
      case "lake":
        battleFrame = "../Visigoth/prequel/frame17.jpg";
        drawEnemy = "Feral Catfish";
        drawEnemy_src = "../Visigoth/prequel/feralcatfish.png";
        enemyAtkRange = 7;
        enemyHp = 15;
        break;
      case "tunnels":
        battleFrame = "../Visigoth/prequel/frame21.jpg";
        drawEnemy = "Giant Worm";
        drawEnemy_src = "../Visigoth/prequel/giantworm.png";
        enemyAtkRange = 9;
        enemyHp = 18;
        break;
      case "junkyard":
        battleFrame = "../Visigoth/prequel/frame23.jpg";
        drawEnemy = "Lure Cat";
        drawEnemy_src = "../Visigoth/prequel/lurecat.png";
        enemyAtkRange = 11;
        enemyHp = 21;
        break;
      case "jayden":
        battleFrame = "../Visigoth/prequel/frame24.jpg";
        drawEnemy = "Jayden";
        drawEnemy_src = "../Visigoth/battle/enemy_sprites/jayden/jayden1.png";
        enemyAtkRange = 12;
        enemyHp = 115;
        break;
      case "jayden2":
        battleFrame = "../Visigoth/prequel/frame24.jpg";
        drawEnemy = "J A Y D E N";
        drawEnemy_src = "../Visigoth/prequel/jayden.png";
        enemyAtkRange = 15;
        enemyHp = 210;
        break;
    }
    drawImageLeft(battleFrame, 800, 500);
    
    setTimeout(function () {
      switch (isFightingBoss) {
        case 1:
          createWindow("battleMessage", drawEnemy + " appears!", 0, 0);
          drawCenterImage(drawEnemy_src, 149, 356);
          break;
        default:
          createWindow("battleMessage", "A " + drawEnemy + " appears!", 0, 0);
          drawCenterImage(drawEnemy_src, 341, 341);
          break;
        case 2:
          createWindow("battleMessage", drawEnemy + " appears!", 0, 0);
          drawCenterImage(drawEnemy_src, 341, 341);
          break;
      }

      pointerWindow.style.display = "block";
      alphaBatOptions.style.display = "block";
      alphaBatStatus.style.display = "block";

      playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
    }, 1000);

    $(gameWindow).slideDown(2000);

    setTimeout(function () {
      alpha_pos = 4;
    }, 2000);
  }, 2000);
}

function enemyAttack_alpha () {
  alpha_pos = null;
  alphaBatOptions.style.display = "none";
  let gameOver = 0;

  setTimeout(function () {
    playClonedAudio("../Visigoth/battle/dsskepch.wav");
    gameWindow.classList.add("shake");
    let enemyDealtDMG = Math.floor(Math.random() * enemyAtkRange);
    alpha_hp -= enemyDealtDMG;

    if (alpha_hp < 1) {
      gameOver_alpha();
      alphaHp.innerText = "0";
      alpha_pos = null;
      gameOver = 1;
      createWindow("battleMessage", "Game over...", 0, 0);
      gameWindow.classList.remove("shake");
      return false;
    }

    clearAllWindows();
    createWindow("battleMessage", "The " + drawEnemy + " dealt " + enemyDealtDMG + " DMG.", 0, 0);
    switch (isFightingBoss) {
      case 1:
      case 2:
        clearAllWindows();
        createWindow("battleMessage", drawEnemy + " dealt " + enemyDealtDMG + " DMG.", 0, 0);
        break;
    }

    setTimeout(function () {
      gameWindow.classList.remove("shake");
      if (alpha_hp < 1) {
        gameOver_alpha();
        alphaHp.innerText = "0";
        alpha_pos = null;
        return false;
      }
      alphaHp.innerText = alpha_hp;
    }, 100);
  }, 1000);

  setTimeout(function () {
    switch (gameOver) {
      case 0:
        alphaBatOptions.style.display = "block";
        alpha_pos = 4;
        break;
    }
  }, 1400);
}

function attackSelect_alpha () {
  alpha_pos = null;
  const attackAnim_interval = setInterval(function () {
    drawImageLeft(battleFrame, 800, 500);
    setTimeout(function () {
      switch (isFightingBoss) {
        default:
        case 0:
          drawCenterImage(drawEnemy_src, 341, 341);
          break;
        case 1:
          drawCenterImage(drawEnemy_src, 149, 356);
          break;
      }
    }, 125);
  }, 150);
  
  let enemyLostHP = Math.floor(Math.random() * alpha_atk_range);
  enemyHp -= enemyLostHP;
  clearAllWindows();
  createWindow("battleMessage", "Dealt " + enemyLostHP + " DMG.", 0, 0);

  setTimeout(function () {
    clearInterval(attackAnim_interval);

    if (enemyHp < 1) {
      clearWindow();
      drawImageLeft(battleFrame, 800, 500);
      endBattle_alpha();
      return false;
    }

    playClonedAudio("../Visigoth/battle/dspistol.wav");
    enemyAttack_alpha();
  }, 300);
}

function healSelect_alpha () {
  alpha_pos = null;
  if (healItems_alpha < 1) {
    clearAllWindows();
    createWindow("battleMessage", "You have no healing items.", 0, 0);

    alpha_pos = 4;
  }

  else {
    let perc_alpha_heal = Math.floor(0.30 * max_alpha_hp);
    alpha_hp = perc_alpha_heal + alpha_hp;

    if (alpha_hp > max_alpha_hp) {
      alpha_hp = max_alpha_hp;
    }

    alphaHp.innerText = alpha_hp;
    clearAllWindows();
    createWindow("battleMessage", "Restored " + perc_alpha_heal + " HP.", 0, 0);

    enemyAttack_alpha();
  }
}

function endBattle_alpha () {
  clearAllWindows();
  alphaBatOptions.style.display = "none";
  alphaBatStatus.style.display = "none";
  pointerWindow.style.display = "none";

  switch (isFightingBoss) {
    case 1:
      junkyardDialogue_a14();
      return false;
    case 2:
      junkyardDialogue_a22();
      return false;
  }

  $(gameWindow).slideUp(2000);
  resetDoorways();

  alpha_pos = null;
  current_battle_alpha_audio.pause();
  current_alpha_audio.play();
}

let escapeChances = 10;
function escapeSelect_alpha () {
  alpha_pos = null;  
  let did_escape = Math.floor(Math.random() * escapeChances);

  switch (isFightingBoss) {
    case 1:
    case 2:
      did_escape = 100;
      break;
  }

  if (did_escape == 0) {
    endBattle_alpha();
  }

  else {
    enemyAttack_alpha();
    clearAllWindows();
    createWindow("battleMessage", "Failed to escape.");
  }
}

function gameOver_alpha () {
  $(gameWindow).fadeOut(2000);
  switch (false) {
    case (current_battle_alpha_audio == 0):
      current_battle_alpha_audio.pause();
      break;
  }
  current_battle_alpha_audio = playLoopedAudio("../Visigoth/battle/music/gameover.mp3");

  setTimeout(function () {
    clearWindow();
    writeCenterText("> Try again? || Quit", "black", "FSEX300", 25);

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      alpha_pos = 7;
    }, 2000);
  }, 2000);
}

let gameOver_alpha_option = 0;
function loadGameOverMenuAlpha () {
  playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
  switch (gameOver_alpha_option) {
    case 0:
      clearWindow();
      writeCenterText("Try again? || > Quit", "black", "FSEX300", 25);
      gameOver_alpha_option = 1;
      break;
    case 1:
      clearWindow();
      writeCenterText("> Try again? || Quit", "black", "FSEX300", 25);
      gameOver_alpha_option = 0;
      break;
  }
}

function doorwaySelect () {
  $(gameWindow).slideUp(2000);
  alpha_pos = null;
  pointerWindow.style.display = "none";

  pointer.style.display = "none";
  pointer.style.left = "180px";

  let railwaySpike = Math.floor(Math.random() * 3);

  switch (railwaySpike) {
    case 0:
      doorwayBattleInit();
      break;
    case 1:
      doorwayTreasureInit();
      break;
    case 2:
      doorwayBoobytrapInit();
      break;
  }
}

setTimeout(function () {
  menuItemColors = "black";
  gameWindow.style.display = "none";
  gameWindow.style.backgroundColor = "white";

  writeCenterText("Visigoth 1: Programmed by Alexander Chang", "black", "FSEX300", 25);
  $(gameWindow).fadeIn(3000);

  setTimeout(function () {
    $(gameWindow).fadeOut(3000);
    setTimeout(function () {
      clearWindow();
      userTitleMenuSelectPosition = 1;
      loadAlphaMenu(0);

      $(gameWindow).fadeIn(3000);

      setTimeout(function () {
        alpha_pos = 0;
        firstTime = 0;
      }, 3000);
    }, 3000);
  }, 4500);
}, 1000);

function loadAlphaMenu (menPos) {
  clearWindow();
  switch (firstTime) {
    case 0:
      playAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
      break;
    case 1:
      playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
      break;
  }

  switch (menPos) {
    case 0:
      writeCenterText("> Start a new game. ||| Continue", "black", "FSEX300", 25);
      break;
    case 1:
      writeCenterText("Start a new game. ||| > Continue", "black", "FSEX300", 25);
      break;
  }
}

// begin intro

function loadInIntro () {
  playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
  current_alpha_audio = playLoopedAudio("../Visigoth/assets/audio/fw4.mp3");

  $(gameWindow).fadeOut(1500);
  alpha_pos = 1;
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame1.jpg", 800, 500);
    $(gameWindow).fadeIn(1500);
    setTimeout(function () {
      createWindow("dialogue", "This is the story of a little town in upstate New York.", 0, 0);

      setTimeout(function () {
        alpha_pos = 2;
      }, getWaitTextTime("This is the story of a little town in upstate New York."));
    }, 1500);
  }, 1500);
}

function introText_a1 () {
  clearAllWindows();
  alpha_dpos = null;
  createWindow("dialogue", "Or rather, it's the story of its death.", 0, 0);

  setTimeout(function () {
    alpha_dpos = 1;
  }, getWaitTextTime("Or rather, it's the story of its death."));
}

function introText_a2 () {
  clearAllWindows();
  alpha_dpos = null;
  createWindow("dialogue", "It died at the last town meeting it ever had...");

  setTimeout(function () {
    alpha_dpos = 2;
  }, getWaitTextTime("It died at the last town meeting it ever had..."));
}

// end intro

// begin town meeting

function townMeeting_a1 () {
  $(gameWindow).fadeOut(2000);
  alpha_dpos = null;

  setTimeout(function () {
    clearAllWindows();

    drawImageLeft("../Visigoth/prequel/frame2.jpg", 800, 500);
    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Jack: "They called this meeting because *someone* is buying up all the houses in this town."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 3;
      }, getWaitTextTime(`Jack: "They called this meeting because *someone* is buying up all the houses in this town."`));
    }, 2000);
  }, 2000);
}

function townMeeting_a2 () {
  alpha_dpos = null;
  clearAllWindows();
  drawImageLeft("../Visigoth/prequel/frame3.jpg", 800, 500);
  createWindow("dialogue", `Anthony: "I heard it's some guy with the name 'Lamoretti'. It sounds kind of familiar..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 4;
  }, getWaitTextTime(`Anthony: "I heard it's some guy with the name 'Lamoretti'. It sounds kind of familiar..."`));
}

function townMeeting_a3 () {
  alpha_dpos = null;
  clearAllWindows();
  drawImageLeft("../Visigoth/prequel/frame2.jpg", 800, 500);
  createWindow("dialogue", `Jack: "Whoever this guy is, he's killing the town. Families are leaving. A school had to close last year!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 5;
  }, getWaitTextTime(`Jack: "Whoever this guy is, he's killing the town. Families are leaving. A school had to close last year!"`));
}

function townMeeting_a4 () {
  alpha_dpos = null;
  clearAllWindows();
  drawImageLeft("../Visigoth/prequel/frame3.jpg", 800, 500);
  createWindow("dialogue", `Anthony: "I wonder what his end game is. And the families that did leave...I haven't heard a peep from any of them."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 6;
  }, getWaitTextTime(`Anthony: "I wonder what his end game is. And the families that did leave...I haven't heard a peep from any of them."`));
}

function townMeeting_a5 () {
  alpha_dpos = null;
  clearAllWindows();
  createWindow("dialogue", `Anthony: "Wait, there's someone at the front entrance! Isn't it a bit late too come now?"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 7;
  }, getWaitTextTime(`Anthony: "Wait, there's someone at the front entrance! Isn't it a bit late too come now?"`));
}

// end town meeting

// start jayden encounter

function jaydenEncounter_a1 () {
  $(gameWindow).fadeOut(2000);
  alpha_dpos = null;

  setTimeout(function () {
    clearAllWindows();
    clearWindow();

    drawImageLeft("../Visigoth/prequel/frame4.jpg", 800, 500);
    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      createWindow("dialogue", `Jack: "That's strange--there's nobody out here."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 8;
      }, getWaitTextTime(`Jack: "That's strange--there's nobody out here."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter_a2 () {
  playAudio("../Visigoth/prequel/crowd.mp3");
  alpha_dpos = null;
  clearAllWindows();
  setTimeout(function () {
    createWindow("dialogue", `Anthony: "Ther-there's a monster inside! We have to get out of here!"`, 0, 0);

    setTimeout(function () {
      alpha_dpos = 9;
    }, getWaitTextTime(`Anthony: "Ther-there's a monster inside! We have to get out of here!"`));
  }, 2000);
}

// end jayden encounter

// start forest

function forestDialogue_a1 () {
  $(gameWindow).fadeOut(2000);
  clearAllWindows();
  alpha_dpos = null;

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/forest.jpg", 800, 500);

    $(gameWindow).slideDown(2000);

    setTimeout(function () {
      drawCenterImage("../Visigoth/prequel/doors1.png", 556, 186);

      setTimeout(function () {
        createWindow("dialogue", `Jack: "We came to the meeting in your car. It's at the edge of this forest."`, 0, 0);

        setTimeout(function () {
          alpha_dpos = 10;
        }, getWaitTextTime(`Jack: "We came to the meeting in your car. It's at the edge of this forest."`));
      }, 300)
    }, 2000);
  }, 2000);
}

function forestDialogue_a2 () {
  alpha_dpos = null;
  clearAllWindows();
  createWindow("dialogue", `Jack: "Anthony and I will see if there's anybody at town hall that we can help. You get the car and drive back here!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 11;
  }, getWaitTextTime(`Jack: "Anthony and I will see if there's anybody at town hall that we can help. You get the car and drive back here!"`));
}

function forestDialogue_a3 () {
  alpha_dpos = null;
  clearAllWindows();
  createWindow("battleMessage", "Select the pathway you wish to travel down.", 0, 0);

  pointerWindow.style.display = "block";
  pointer.style.display = "block";

  pointer.style.left = "180px";
  pointer.style.bottom = "100px";
  playAudio("../Visigoth/assets/audio/sfx/coin7.wav");
  alpha_pos = 3;
}

// end forest

// start jayden encounter 2

function jaydenEncounter2_a1 () {
  alpha_pos = null;
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame7.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
  
    setTimeout(function () {
      createWindow("dialogue", `"There's my car. Time to get back to Jack and Anthony."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 14;
        alpha_pos = 2;
      }, getWaitTextTime(`"There's my car. Time to get back to Jack and Anthony."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter2_a2 () {
  alpha_pos = null;
  clearAllWindows();

  playAudio("../Visigoth/prequel/scare.mp3");

  $(gameWindow).fadeOut(500);
  setTimeout(function () {
    drawImageLeft("../Visigoth/prequel/frame8.jpg", 800, 500);
    $(gameWindow).fadeIn(500);

    setTimeout(function () {
      createWindow("dialogue", `"Who's there?! Crap...I gotta get in the car..."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 15;
        alpha_pos = 2;
      }, getWaitTextTime(`"Who's there?! Crap...I gotta get in the car..."`));
    }, 1000);

    // setTimeout(function () {
    //   playAudio("../Visigoth/prequel/scare.mp3");
    // }, 350);
  }, 500);
}

function jaydenEncounter2_a3 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Pale Crawler: "Hello, Colin. We meet again. HAAHAHHAHAHAHAHAH!!!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 16;
    alpha_pos = 2;
  }, getWaitTextTime(`Pale Crawler: "Hello, Colin. We meet again. HAAHAHHAHAHAHAHAH!!!"`));
}

function jaydenEncounter2_a4 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "You...know who I am? And who are you? WHAT the hell are you?"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 17;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "You...know who I am? And who are you? WHAT the hell are you?"`));
}

function jaydenEncounter2_a5 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Pale Crawler: "You very well know who I am. I'm from your past. I was there 10 years ago when-"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 18;
    alpha_pos = 2;
  }, getWaitTextTime(`Pale Crawler: "You very well know who I am. I'm from your past. I was there 10 years ago when-"`));
}

function jaydenEncounter2_a6 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Pale Crawler: "When all your peers and mine tried to break me down best they could."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 19;
    alpha_pos = 2;
  }, getWaitTextTime(`Pale Crawler: "When all your peers and mine tried to break me down best they could."`));
}

function jaydenEncounter2_a7 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Pale Crawler: "That awful day in Woburn. I have come back for my revenge. I will see you soon, Colin."`, 0, 0);
  
  setTimeout(function () {
    alpha_dpos = 20;
    alpha_pos = 2;
  }, getWaitTextTime(`Pale Crawler: "That awful day in Woburn. I have come back for my revenge. I will see you soon, Colin."`));
}

function jaydenEncounter2_a8 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "You're...you're....Jayden. Jayden Lamoretti..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 21;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "You're...you're....Jayden. Jayden Lamoretti..."`));
}

function jaydenEncounter2_a9 () {
  alpha_pos = null;
  
  playAudio("../Visigoth/prequel/scare.mp3");
  $(gameWindow).fadeOut(500);
  setTimeout(function () {
    drawImageLeft("../Visigoth/prequel/frame7.jpg", 800, 500);

    $(gameWindow).fadeIn(500);
  }, 500);

  setTimeout(function () {
    clearAllWindows();

    setTimeout(function () {
      $(gameWindow).fadeOut(2000);
      playAudio("../Visigoth/prequel/car.mp3");

      setTimeout(function () {
        clearWindow();
        fadeOutAudio(current_alpha_audio, 500);

        setTimeout(function () {
          current_alpha_audio = playLoopedAudio("../Visigoth/prequel/castle.mp3");
        }, 500);

        pointerWindow.style.backgroundImage = "url('../Visigoth/prequel/nightride.gif')";
        pointerWindow.style.backgroundSize = "cover";

        $(pointerWindow).fadeIn(2000);

        setTimeout(function () {
          colinSelftalk_a1();
        }, 2000);
      }, 2000);
    }, 600);
  }, 1200);
}

// end jayden encounter 2

// start colin monologue

function colinSelftalk_a1 () {
  alpha_pos = null;
  createWindow("dialogue", `Colin: "What the hell was that...THING? Was it the 'monster' that Anthony saw?"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 22;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "What the hell was that...THING? Was it the 'monster' that Anthony saw?"`));
}

function colinSelftalk_a2 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Was that really...Jayden? No...it can't be..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 23;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Was that really...Jayden? No...it can't be..."`));
}

function colinSelftalk_a3 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Looks like I'm close to town hall."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 24;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Looks like I'm close to town hall."`));
}

function colinSelftalk_a4 () {
  alpha_pos = null;
  clearAllWindows();

  $(pointerWindow).fadeOut(2000);

  setTimeout(function () {
    pointerWindow.style.backgroundImage = "none";
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame9.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      createWindow("dialogue", `Colin: "I hope everyone's alright in there."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 25;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "I hope everyone's alright in there."`));
    }, 2300);
  }, 2000);
}

function colinSelftalk_a5 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame10.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Colin: "I'm going to be sick...my heart...I can't bear to see this!"`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 26;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "I'm going to be sick...my heart...I can't bear to see this!"`));
    }, 700);
  }, 2000);
}

function colinSelftalk_a6 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "He--Jayden, or whatever that thing is--he really killed everyone--"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 27;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "He--Jayden, or whatever that thing is--he really killed everyone--"`));
}

function colinSelftalk_a7 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "I don't see Anthony or Jack anywhere amongst the...carnage. They don't live too far from here...maybe they're at home."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 28;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I don't see Anthony or Jack anywhere amongst the...carnage. They don't live too far from here...maybe they're at home."`));
}

function colinSelftalk_a8 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame11.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Colin: "S*^&! Out of gas...I'll have to walk."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 29;
        alpha_pos = 2;

        current_path_loc = "road";
        alphaBatName.innerText = "Colin";
        path_alpha_lim = 13;

      }, getWaitTextTime(`Colin: "S*^&! Out of gas...I'll have to walk."`));
    }, 2000);
  }, 2000);
}

function colinSelftalk_a9 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "I should rest a little bit before that though."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 30;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I should rest a little bit before that though."`));
}

function colinSelftalk_a10 () {
  alpha_pos = null;
  clearAllWindows();

  alpha_hp = Math.floor(max_alpha_hp * 0.75) + alpha_hp;
  if (alpha_hp > 30) {
    alpha_hp = 30;
  }

  createWindow("dialogue", `Restored HP by 75 percent. Game data has been saved up to this point.`, 0, 0);

  saveGame_alpha();

  setTimeout(function () {
    alpha_dpos = 31;
    alpha_pos = 2;
  }, getWaitTextTime(`Restored HP by 75 percent. Game data has been saved up to this point.`));
}

function colinSelftalk_a11 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    resetDoorways();
  }, 2000);
}

// end colin monologue

// start jayden encounter 3

function jaydenEncounter3_a1 () {
  alpha_pos = null;
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame13.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
  
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Anthony's house. The lights are on, but why is the front door slightly ajar?"`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 32;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Anthony's house. The lights are on, but why is the front door slightly ajar?"`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter3_a2 () {
  alpha_pos = null;
  clearAllWindows();
  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame14.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      createWindow("dialogue", `Colin: "He really...he really killed Anthony's entire..."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 33;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "He really...he really killed Anthony's entire..."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter3_a3 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "For once, I'm glad that I don't have a family of my own."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 34;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "For once, I'm glad that I don't have a family of my own."`));
}

function jaydenEncounter3_a4 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame13.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      createWindow("dialogue", `Colin: "I won't even try to bother going into Jack's house."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 35;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "I won't even try to bother going into Jack's house."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter3_a5 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "I think I'll try to go to the police station instead."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 36;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I think I'll try to go to the police station instead."`));
}

function jaydenEncounter3_a6 () {
  alpha_pos = null;
  clearAllWindows();

  fadeOutAudio(current_alpha_audio, 1000);

  setTimeout(function () {
    current_alpha_audio = playLoopedAudio("../Visigoth/prequel/darker.mp3");
  }, 1000);

  $(gameWindow).fadeOut(2000);
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame16.jpg");

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Since it's on the other side of the lake, I'll have to use Anthony's fishing boat to get there...forgive me old friend."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 37;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Since it's on the other side of the lake, I'll have to use Anthony's fishing boat to get there...forgive me old friend."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter3_a7 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);
  setTimeout(function () {
    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Colin: "A hunting knife. I don't think it'll do me much good against that creature, but it's better than my bare hands."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 38;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "A hunting knife. I don't think it'll do me much good against that creature, but it's better than my bare hands."`));
    }, 2000);
  }, 2000);
}

function jaydenEncounter3_a8 () {
  alpha_pos = null;
  clearAllWindows();

  current_path_loc = "lake";
  path_alpha_lim = 16;

  alpha_atk_range = 8;
  saveGame_alpha();

  createWindow("dialogue", `Attack range has increased by 3! Game data has been saved up to this point."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 39;
    alpha_pos = 2;
  }, getWaitTextTime(`Attack range has increased by 3! Game data has been saved up to this point."`));
}

function jaydenEncounter3_a9 () {
  alpha_pos = null;
  clearAllWindows();

  current_path_loc = "lake";
  path_alpha_lim = 16;

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    resetDoorways();
  }, 2000);
}

// end jayden encounter 3

// start police station scenes

function policeStationScene_a1 () {
  alpha_pos = null;
  clearAllWindows();
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame18.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
  
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Finally, I'm here. I really hope that--thing--didn't get to them before I did.."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 40;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Finally, I'm here. I really hope that--thing--didn't get to them before I did.."`));
    }, 2000);
  }, 2000);
}

function policeStationScene_a2 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame19.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      createWindow("dialogue", `Colin: "Another massacre. Our entire town is screwed if this is what that creature did to the police force!"`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 41;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Another massacre. Our entire town is screwed if this is what that creature did to the police force!"`));
    }, 2000);
  }, 2000);
}

function policeStationScene_a3 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `A noise is coming from one of the backrooms of the police station...`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 42;
    alpha_pos = 2;
  }, getWaitTextTime(`A noise is coming from one of the backrooms of the police station...`));
}

function policeStationScene_a4 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame20.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Mihir: "AHHHHH--Oh, thank goodness, it's not the monster!"`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 43;
        alpha_pos = 2;
      }, getWaitTextTime(`Mihir: "AHHHHH--Oh, thank goodness, it's not the monster!"`));
    }, 2000);
  }, 2000);
}

function policeStationScene_a5 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "Maybe it's a good thing I ran out of ammo a while ago."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 44;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "Maybe it's a good thing I ran out of ammo a while ago."`));
}

function policeStationScene_a6 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Are you the only officer left on the force now?"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 45;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Are you the only officer left on the force now?"`));
}

function policeStationScene_a7 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "It looks like it, right now. This...d*@!3--pale white thing--came into the office and killed pretty much everyone here. I hid in this back office towards the end of it all."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 46;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "It looks like it, right now. This...d*@!3--pale white thing--came into the office and killed pretty much everyone here. I hid in this back office towards the end of it all."`));
}

function policeStationScene_a8 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "You said you ran out of bullets earlier. Don't tell me this thing is immune to gunfire!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 47;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "You said you ran out of bullets earlier. Don't tell me this thing is immune to gunfire!"`));
}

function policeStationScene_a9 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "Well that's the thing. I don't really know. It moved so fast that nobody could get a clean shot at it. Someone did clip it in the leg and it bled,"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 48;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "Well that's the thing. I don't really know. It moved so fast that nobody could get a clean shot at it. Someone did clip it in the leg and it bled,"`));
}

function policeStationScene_a10 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "...so I assume that bullets will at least hurt the thing. I think I do remember it slowing down after the round it took."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 49;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "...so I assume that bullets will at least hurt the thing. I think I do remember it slowing down after the round it took."`));
}

function policeStationScene_a11 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Is there any way that we can call for help? We need all the firepower we can get."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 50;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Is there any way that we can call for help? We need all the firepower we can get."`));
}

function policeStationScene_a12 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "The dang thing cut all our power lines, and the only broadband radio we had was destroyed during the chaos."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 51;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "The dang thing cut all our power lines, and the only broadband radio we had was destroyed during the chaos."`));
}

function policeStationScene_a13 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "Although...I do remember seeing a real old one in a camper at the junkyard. It's a far shot, but it may be the only one we have."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 52;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "Although...I do remember seeing a real old one in a camper at the junkyard. It's a far shot, but it may be the only one we have."`));
}

function policeStationScene_a14 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Then I'll go there. Is there any way I can get to the junkyard without being seen?"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 53;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Then I'll go there. Is there any way I can get to the junkyard without being seen?"`));
}

function policeStationScene_a15 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "There's a set of old tunnels underneath this town dating back to the Civil War. You might be able to get to the junkyard faster that way."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 54;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "There's a set of old tunnels underneath this town dating back to the Civil War. You might be able to get to the junkyard faster that way."`));
}

function policeStationScene_a16 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "The entrance is in the basement. Take one of the guns that are outside...I have a feeling you'll need it."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 55;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "The entrance is in the basement. Take one of the guns that are outside...I have a feeling you'll need it."`));
}

function policeStationScene_a17 () {
  alpha_pos = null;
  clearAllWindows();

  max_alpha_hp += 10;
  alpha_hp += 10;

  current_path_loc = "tunnels";
  path_alpha_lim = 21;

  saveGame_alpha();

  alphaHp.innerText = alpha_hp;

  createWindow("dialogue", "Attack range increased by 5! Maximum HP increased by 10! Game data has been saved up to this point.", 0, 0);

  setTimeout(function () {
    alpha_dpos = 56;
    alpha_pos = 2;
  }, getWaitTextTime("Attack range increased by 5! Maximum HP increased by 10! Game data has been saved up to this point."));
}

function policeStationScene_a18 () {
  alpha_pos = null;
  clearAllWindows();

  fadeOutAudio(current_alpha_audio, 1000);
  setTimeout(function () {
    current_alpha_audio = playLoopedAudio("../Visigoth/prequel/city.mp3");
  }, 1000);

  current_path_loc = "tunnels";
  path_alpha_lim = 21;

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    resetDoorways();
  }, 2000);
}

// end police station scenes

// start junkyard dialogue

function junkyardDialogue_a1 () {
  alpha_pos = null;
  clearAllWindows();
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame22.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
  
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Now, to find that camper van. Where could it be..."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 57;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Now, to find that camper van. Where could it be..."`));
    }, 2000);
  }, 2000);
}

function junkyardDialogue_a2 () {
  alpha_pos = null;
  clearAllWindows();

  max_alpha_hp += 10;
  alpha_hp += 10;

  current_path_loc = "junkyard";
  path_alpha_lim = 25;

  alphaHp.innerText = alpha_hp;
  saveGame_alpha();

  createWindow("dialogue", `Added 10 points to total HP! Game data has been saved up to this point.`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 58;
    alpha_pos = 2;
  }, getWaitTextTime(`Added 10 points to total HP! Game data has been saved up to this point.`));
}

function junkyardDialogue_a3 () {
  alpha_pos = null;
  clearAllWindows();
  
  fadeOutAudio(current_alpha_audio, 1000);
  setTimeout(function () {
    current_alpha_audio = playLoopedAudio("../Visigoth/prequel/punk.mp3");
  }, 1000);

  current_path_loc = "junkyard";
  path_alpha_lim = 25;

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    resetDoorways();
  }, 2000);
}

function junkyardDialogue_a4 () {
  alpha_pos = null;
  clearAllWindows();
  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame24.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
  
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Moment of truth...it better be there."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 59;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Moment of truth...it better be there."`));
    }, 2000);
  }, 2000);
}

function junkyardDialogue_a5 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);

  setTimeout(function () {
    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame25.jpg", 800, 500);

    $(gameWindow).fadeIn(2000);
    setTimeout(function () {
      createWindow("dialogue", `Colin: "Yes! It's here and it has POWER! I'll have to broadcast an SOS message on all channels."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 60;
        alpha_pos = 2;
      }, getWaitTextTime(`Colin: "Yes! It's here and it has POWER! I'll have to broadcast an SOS message on all channels."`));
    }, 2000);
  }, 2000);
}

function junkyardDialogue_a6 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Hello? Hello? This is the town of French Lake. We need immediate assistance. There is a possibly armed and dangerous man in our town."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 61;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Hello? Hello? This is the town of French Lake. We need immediate assistance. There is a possibly armed and dangerous man in our town."`));
}

function junkyardDialogue_a7 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Our police force is wiped out. Please send help!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 62;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Our police force is wiped out. Please send help!"`));
}

function junkyardDialogue_a8 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `..... .... ...... ...... ....... ......... ....... ........... ..... .......`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 63;
    alpha_pos = 2;
  }, getWaitTextTime(`...................................................................`));
}

function junkyardDialogue_a9 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `..... ...... ...... ...... ........ ....... ....... ....... ....... ........`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 64;
    alpha_pos = 2;
  }, getWaitTextTime(`...................................................................`));
}

function junkyardDialogue_a10 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `"..............We hear you loud and clear, French Lake. We're sending over a few patrol units now."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 65;
    alpha_pos = 2;
  }, getWaitTextTime(`"..............We hear you loud and clear, French Lake. We're sending over a few patrol units now."`));
}

function junkyardDialogue_a11 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Jayden: "Turn around, Colin."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 66;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Turn around, Colin."`));
}

function junkyardDialogue_a12 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Jayden: "Perhaps you'll like this form better. HAAHAHAHAHAHAHAHHHHAAH!!!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 67;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Perhaps you'll like this form better. HAAHAHAHAHAHAHAHHHHAAH!!!"`));
}

function junkyardDialogue_a13 () {
  alpha_pos = null;
  $(gameWindow).slideUp(2000);
  current_path_loc = "jayden";
  isFightingBoss = 1;
  doorwayBattleInit();
}

function junkyardDialogue_a14 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Colin: "Jayden, stop this madness!"`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 68;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Jayden, stop this madness!"`));
}

function junkyardDialogue_a15 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Jayden: "What are you going to tell me? That I can be redeemed?"`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 69;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "What are you going to tell me? That I can be redeemed?"`));
}

function junkyardDialogue_a16 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Jayden: "Well I can't. I've killed at least 9 families so far."`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 70;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Well I can't. I've killed at least 9 families so far."`));
}

function junkyardDialogue_a17 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Jayden: "Those families that were paid to move? I killed them."`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 71;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Those families that were paid to move? I killed them."`));
}

function junkyardDialogue_a18 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Colin: "I knew it. But why? Why kill them?"`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 72;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I knew it. But why? Why kill them?"`));
}

function junkyardDialogue_a19 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Jayden: "Plain and simple. For one, revenge. But moreso because..."`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 73;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Plain and simple. For one, revenge. But moreso because..."`));
}

function junkyardDialogue_a20 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("battleMessage", `Jayden: "Because I find killing people fun."`, 0, 0);
  setTimeout(function () {
    alpha_dpos = 74;
    alpha_pos = 2;
  }, getWaitTextTime(`Jayden: "Because I find killing people fun."`));
}

function junkyardDialogue_a21 () {
  alpha_pos = null;
  $(gameWindow).slideUp(2000);
  current_path_loc = "jayden2";
  isFightingBoss = 2;
  current_battle_alpha_audio.pause();
  doorwayBattleInit();
}

function junkyardDialogue_a22 () {
  $(gameWindow).slideUp(2000);
  alpha_pos = null;
  fadeOutAudio(current_battle_alpha_audio, 1000);

  setTimeout(function () {
    current_alpha_audio = playLoopedAudio("../Visigoth/prequel/camping.mp3");
  }, 1000);

  setTimeout(function () {
    $(gameWindow).fadeIn(2000);

    clearWindow();
    drawImageLeft("../Visigoth/prequel/frame26.jpg", 800, 500);

    setTimeout(function () {
      createWindow("dialogue", `Mihir: "Well, I guess everything worked out in the end after all, mostly thanks to you, Colin."`, 0, 0);

      setTimeout(function () {
        alpha_dpos = 75;
        alpha_pos = 2;
      }, getWaitTextTime(`Mihir: "Well, I guess everything worked out in the end after all, mostly thanks to you, Colin."`));
    }, 2000);
  }, 2000);
}

function junkyardDialogue_a23 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "I can't believe someone would kill innocent families just for some vague notion of revenge..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 76;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I can't believe someone would kill innocent families just for some vague notion of revenge..."`));
}

function junkyardDialogue_a24 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "You knew 'Jayden', right? It turns out he was the one buying up homes AND killing the families that left!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 77;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "You knew 'Jayden', right? It turns out he was the one buying up homes AND killing the families that left!"`));
}

function junkyardDialogue_a25 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "It's cliche, but I guess you could say I always felt that something was wrong with him."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 78;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "It's cliche, but I guess you could say I always felt that something was wrong with him."`));
}

function junkyardDialogue_a26 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "He had a lot of problems...he was quick to anger, and seemed to be ridden with paranoia."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 79;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "He had a lot of problems...he was quick to anger, and seemed to be ridden with paranoia."`));
}

function junkyardDialogue_a27 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "A little after you left, I stopped by your friends' houses. About Anthony--I'm sorry..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 80;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "A little after you left, I stopped by your friends' houses. About Anthony--I'm sorry..."`));
}

function junkyardDialogue_a28 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "I know. He had a beautiful family--a wife and three kids. Taken by that monster."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 81;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "I know. He had a beautiful family--a wife and three kids. Taken by that monster."`));
}

function junkyardDialogue_a29 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "As for Jack and his family: they're safe and sound."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 82;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "As for Jack and his family: they're safe and sound."`));
}

function junkyardDialogue_a30 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Ah--I'm so happy that I could cry...I thought Jayden had gotten to them too so I didn't even bother to look..."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 83;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Ah--I'm so happy that I could cry...I thought Jayden had gotten to them too so I didn't even bother to look..."`));
}

function junkyardDialogue_a31 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "They were hiding in Jack's storm shelter. Jayden ransacked the house trying to find them, but I guess he gave up."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 84;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "They were hiding in Jack's storm shelter. Jayden ransacked the house trying to find them, but I guess he gave up."`));
}

function junkyardDialogue_a32 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Colin: "Heh, it's a real good thing that Jayden wasn't the sharpest tool in the shed, even back then."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 85;
    alpha_pos = 2;
  }, getWaitTextTime(`Colin: "Heh, it's a real good thing that Jayden wasn't the sharpest tool in the shed, even back then."`));
}

function junkyardDialogue_a33 () {
  alpha_pos = null;
  clearAllWindows();

  createWindow("dialogue", `Mihir: "You're a hero, Colin. When the state police arrive, I'm going to personally vouch for you."`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 86;
    alpha_pos = 2;
  }, getWaitTextTime(`Mihir: "You're a hero, Colin. When the state police arrive, I'm going to personally vouch for you."`));
}

function junkyardDialogue_a34 () {
  alpha_pos = null;
  clearAllWindows();

  $(gameWindow).fadeOut(2000);
  setTimeout(function () {
    clearWindow();
    writeCenterText("The End", "black", "FSEX300", 25);

    $(gameWindow).fadeIn(2000);
  }, 2000);
}

// end junkyard dialogue

function getWaitTextTime (text) {
  return (text.length * 50 - 1280);
}

$(document).on("keydown", function (event) {
  if (event.repeat) return;

  switch (event.which) {
    case 39:
      switch (alpha_pos) {
        case 0:
          switch (alpha_keypos) {
            case 0:
              loadAlphaMenu(1);
              alpha_keypos = 1;
              break;
          }
          break;
        case 3:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (current_doorway) {
            case 0:
              current_doorway = 1;
              pointer.style.left = "360px";
              break;
            case 1:
              current_doorway = 2;
              pointer.style.left = "560px";
              break;
            case 2:
              current_doorway = 0;
              pointer.style.left = "180px";
              break;
          }
          break;
        case 7:
          loadGameOverMenuAlpha();
          break;
      }
      break;
    case 37:
      switch (alpha_pos) {
        case 0:
          switch (alpha_keypos) {
            case 1:
              loadAlphaMenu(0);
              alpha_keypos = 0;
              clearAllWindows();
              break;
          }
          break;
        case 3:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (current_doorway) {
            case 0:
              current_doorway = 2;
              pointer.style.left = "560px";
              break;
            case 1:
              current_doorway = 0;
              pointer.style.left = "180px";
              break;
            case 2:
              current_doorway = 1;
              pointer.style.left = "360px";
              break;
          }
          break;
        case 7:
          loadGameOverMenuAlpha();
          break;
      }
      break;
    case 40:
      switch (alpha_pos) {
        case 4:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (battleMenuOption_alpha) {
            case 0:
              battleMenuOption_alpha = 1;
              alphaBatAtk.innerText = "Attack";
              alphaBatHeal.innerText = "> Heal";
              break;
            case 1:
              battleMenuOption_alpha = 2;
              alphaBatHeal.innerText = "Heal";
              alphaBatEsc.innerText = "> Escape";
              break;
            case 2:
              battleMenuOption_alpha = 0;
              alphaBatEsc.innerText = "Escape";
              alphaBatAtk.innerText = "> Attack";
              break;
          }
          break;
      }
      break;
    case 38:
      switch (alpha_pos) {
        case 4:
          playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
          switch (battleMenuOption_alpha) {
            case 0:
              battleMenuOption_alpha = 2;
              alphaBatAtk.innerText = "Attack";
              alphaBatEsc.innerText = "> Escape";
              break;
            case 1:
              battleMenuOption_alpha = 0;
              alphaBatHeal.innerText = "Heal";
              alphaBatAtk.innerText = "> Attack";
              break;
            case 2:
              battleMenuOption_alpha = 1;
              alphaBatEsc.innerText = "Escape";
              alphaBatHeal.innerText = "> Heal";
              break;
          }
          break;
      }
      break;
    case 13:
      switch (alpha_pos) {
        case 0:
          switch (alpha_keypos) {
            case 0:
              loadInIntro();
              break;
            case 1:
              if (firstSaveCheck == null || firstSaveCheck == undefined || firstSaveCheck == "") {
                createWindow("battleMessage", "No save data recorded.", 0, 0);
              }

              else {
                $(gameWindow).fadeOut(2000);
                alpha_pos = null;
                loadGame_alpha();
                resetDoorways();
              }
              break;
          }
          break;
        case 2:
          switch (alpha_dpos) {
            case 0:
              introText_a1();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 1:
              introText_a2();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 2:
              townMeeting_a1();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 3:
              townMeeting_a2();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 4:
              townMeeting_a3();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 5:
              townMeeting_a4();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 6:
              townMeeting_a5();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 7:
              jaydenEncounter_a1();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 8:
              jaydenEncounter_a2();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 9:
              forestDialogue_a1();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 10:
              forestDialogue_a2();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 11:
              forestDialogue_a3();
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              break;
            case 12:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              $(gameWindow).slideUp(2000);
              resetDoorways();
              clearAllWindows();
              break;
            case 13:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              $(gameWindow).slideUp(2000);
              resetDoorways();
              clearAllWindows();
              break;
            case 14:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a2();
              break;
            case 15:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a3();
              break;
            case 16:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a4();
              break;
            case 17:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a5();
              break;
            case 18:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a6();
              break;
            case 19:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a7();
              break;
            case 20:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a8();
              break;
            case 21:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter2_a9();
            case 22:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a2();
              break;
            case 23:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a3();
              break;
            case 24:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a4();
              break;
            case 25:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a5();
              break;
            case 26:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a6();
              break;
            case 27:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a7();
              break;
            case 28:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a8();
              break;
            case 29:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a9();
              break;
            case 30:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a10();
              break;
            case 31:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              colinSelftalk_a11();
              break;
            case 32:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a2();
              break;
            case 33:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a3();
              break;
            case 34:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a4();
              break;
            case 35:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a5();
              break;
            case 36:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a6();
              break;
            case 37:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a7();
              break;
            case 38:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              jaydenEncounter3_a8();
              break;
            case 39:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              pointer.style.bottom = "100px";
              jaydenEncounter3_a9();
              break;
            case 40:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a2();
              break;
            case 41:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a3();
              break;
            case 42:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a4();
              break;
            case 43:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a5();
              break;
            case 44:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a6();
              break;
            case 45:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a7();
              break;
            case 46:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a8();
              break;
            case 47:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a9();
              break;
            case 48:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a10();
              break;
            case 49:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a11();
              break;
            case 50:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a12();
              break;
            case 51:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a13();
              break;
            case 52:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a14();
              break;
            case 53:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a15();
              break;
            case 54:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a16();
              break;
            case 55:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a17();
              break;
            case 56:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              policeStationScene_a18();
              break;
            case 57:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a2();
              break;
            case 58:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a3();
              break;
            case 59:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a5();
              break;
            case 60:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a6();
              break;
            case 61:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a7();
              break;
            case 62:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a8();
              break;
            case 63:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a9();
              break;
            case 64:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a10();
              break;
            case 65:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a11();
              break;
            case 66:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a12();
              break;
            case 67:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a13();
              break;
            case 68:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a15();
              break;
            case 69:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a16();
              break;
            case 70:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a17();
              break;
            case 71:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a18();
              break;
            case 72:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a19();
              break;
            case 73:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a20();
              break;
            case 74:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a21();
              break;
            case 75:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a22();
              break;
            case 76:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a23();
              break;
            case 77:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a24();
              break;
            case 78:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a25();
              break;
            case 79:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a26();
              break;
            case 80:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a27();
              break;
            case 81:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a28();
              break;
            case 82:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a29();
              break;
            case 83:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a30();
              break;
            case 84:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a31();
              break;
            case 85:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a32();
              break;
            case 86:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a33();
              break;
            case 87:
              playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
              junkyardDialogue_a34();
              break;
          }
          break;
        case 3:
          doorwaySelect();
          break;
        case 4:
          switch (battleMenuOption_alpha) {
            case 0:
              attackSelect_alpha();
              break;
            case 1:
              healSelect_alpha();
              break;
            case 2:
              escapeSelect_alpha();
              break;
          }
          break;
        case 7:
          switch (gameOver_alpha_option) {
            case 0:
              fadeOutAudio(current_battle_alpha_audio, 1000);
              userTitleMenuSelectPosition = 1;

              $(gameWindow).fadeOut(2000);
              setTimeout(function () {
                loadAlphaMenu(0);
                $(gameWindow).fadeIn(2000);

                setTimeout(function () {
                  alpha_pos = 0;
                }, 2000);
              }, 2000);
              break;
            case 1:
              location = "";
              break;
          }
          break;
      }
      break;
    case 69:
      switch (alpha_pos) {
        case 5:
          openTreasure_alpha();
          break;
        case 6:
          boobyTreasure_alpha();
          break;
      }
      break;
  }
});

const alphaHealingItems = document.getElementById("alpha-hi");
setInterval(function () {
  alphaHealingItems.innerText = healItems_alpha;
}, 500);