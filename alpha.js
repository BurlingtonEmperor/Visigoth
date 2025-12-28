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

function resetDoorways () {
  path_alpha_lim -= 1;
  
  if (path_alpha_lim < 1) {
    alpha_pos = null;
    switch (current_path_loc) {
      case "forest":
        jaydenEncounter2_a1();
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

  if (tres_chance == 0) {
    tres_dialogue = "The chest is empty.";
  }

  else {
    tres_dialogue = "It's a boobytrap! Lost 30% of your HP.";
    perc_booby = Math.floor(0.3 * alpha_hp);
    alpha_hp -= perc_booby;

    if (alpha_hp - perc_booby < 5) {
      alpha_hp = 5;
    }

    alphaHp.innerText = alpha_hp;
    playAudio("../Visigoth/battle/dsskeatk.wav");
  }

  createWindow("dialogue", tres_dialogue, 0, 0);
  setTimeout(function () {
    alpha_pos = 2;
    alpha_dpos = 13;
  }, getWaitTextTime(tres_dialogue));
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

function doorwayBattleInit () {
  current_alpha_audio.pause();
  current_battle_alpha_audio = playLoopedAudio("../Visigoth/battle/music/alpha.mp3");

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
    }
    drawImageLeft(battleFrame, 800, 500);
    
    setTimeout(function () {
      createWindow("battleMessage", "A " + drawEnemy + " appears!", 0, 0);
      drawCenterImage(drawEnemy_src, 341, 341);

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

  setTimeout(function () {
    playClonedAudio("../Visigoth/battle/dsskepch.wav");
    gameWindow.classList.add("shake");
    let enemyDealtDMG = Math.floor(Math.random() * enemyAtkRange);
    alpha_hp -= enemyDealtDMG;

    clearAllWindows();
    createWindow("battleMessage", "The " + drawEnemy + " dealt " + enemyDealtDMG + " DMG.", 0, 0);

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
    alphaBatOptions.style.display = "block";
    alpha_pos = 4;
  }, 1400);
}

function attackSelect_alpha () {
  alpha_pos = null;
  const attackAnim_interval = setInterval(function () {
    drawImageLeft(battleFrame, 800, 500);
    setTimeout(function () {
      drawCenterImage(drawEnemy_src, 341, 341);
    }, 125);
  }, 150);
  
  let enemyLostHP = Math.floor(Math.random() * alpha_atk_range);
  enemyHp -= enemyLostHP;
  clearAllWindows();
  createWindow("battleMessage", "Dealt " + enemyLostHP + " DMG.", 0, 0);

  setTimeout(function () {
    clearInterval(attackAnim_interval);

    if (enemyHp < 1) {
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

  alpha_pos = null;
  current_battle_alpha_audio.pause();
  current_alpha_audio.play();

  $(gameWindow).slideUp(2000);
  resetDoorways();
}

let escapeChances = 10;
function escapeSelect_alpha () {
  alpha_pos = null;  
  let did_escape = Math.floor(Math.random() * escapeChances);

  if (did_escape == 0) {
    endBattle_alpha();
  }

  else {
    enemyAttack_alpha();
    clearAllWindows();
    createWindow("battleMessage", "Failed to escape.");
  }
}

function gameOver_alpha () {}

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

  writeCenterText("Programmed by Alexander Chang", "black", "FSEX300", 25)
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
  createWindow("dialogue", "More specifically, it's the story of its death.", 0, 0);

  setTimeout(function () {
    alpha_dpos = 1;
  }, getWaitTextTime("More specifically, it's the story of its death."));
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

  createWindow("dialogue", `Pale Crawler: "Hello again, Colin. We meet again. HAAHAHHAHAHAHAHAH!!!"`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 16;
    alpha_pos = 2;
  }, getWaitTextTime(`Pale Crawler: "Hello again, Colin. We meet again. HAAHAHHAHAHAHAHAH!!!"`));
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

// end colin monologue

function getWaitTextTime (text) {
  return (text.length * 50 - 1280);
}

$(document).on("keydown", function (event) {
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
      }
      break;
    case 37:
      switch (alpha_pos) {
        case 0:
          switch (alpha_keypos) {
            case 1:
              loadAlphaMenu(0);
              alpha_keypos = 0;
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
          loadInIntro();
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