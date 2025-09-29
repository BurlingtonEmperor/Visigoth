/*
disabled: denies user interaction
0 is the very, very beginning of the game. (Loading screen)
1 is the title screen select menu
2 is pre-blackout dialogue
*/

// the very start

const systemText = [
  ""
];
function checkAllSystems () {
  function audioTest () {
    const testAudio = new Audio();
    switch (true) {
      case (testAudio.canPlayType("audio/mpeg") && testAudio.canPlayType("audio/ogg") && testAudio.canPlayType("audio/wav")):
        return 1;
      default:
        return 0;
    }
  }

  function videoTest () {
    const videoTestElement = document.createElement("video");
    const mp4Support = videoElement.canPlayType("video/mp4");

    switch (mp4Support) {
      case "probably":
        return 2; // works
      case "maybe":
        return 1; // could work (with some issues)
      default: 
        return 0;
    }
  }
  // writeDelayedCenterParagraph();
}

// writeCenterText("Loading assets", "white", "FSEX300", 25);
setTimeout(function () {
  clearWindow();
  writeCenterText("Press any key to continue", "powderblue", "FSEX300", 25);
  gameEventLocation = 0;
}, 3000);

function secondLoadingScreen () {
  $(gameWindow).fadeOut(2000);

  gameEventLocation = "disabled";
  setTimeout(function () {
    clearWindow();
    writeCenterText("Programmed by Alexander Chang", "white", "FSEX300", 25);

    $(gameWindow).fadeIn(2000);

    setTimeout(function () {
      $(gameWindow).fadeOut(2000);

      setTimeout(function () {
        clearWindow();
        // writeCenterText("Test", "white", "FSEX300", 25);
        writeCenterText("Pinewood Chapel: A Burlington Story", "white", "FSEX300", 25);

        $(gameWindow).fadeIn(2000);

        setTimeout(function () {
          flickerStartFrames();
        }, 2000);
      }, 2000);
    }, 4000);
  }, 2000);
}

let titleMusicVariable;
function flickerStartFrames () {
  let flickerStartFramePosition = 0;
  const flickerInterval = setInterval(function () {
    switch (flickerStartFramePosition) {
      case 0:
        clearWindow();
        writeCenterText("Pinewood Chapel: A Burlington Story", "white", "FSEX300", 25);
        flickerStartFramePosition = 1;
        break;
      case 1:
        clearWindow();
        writeCenterText("Pinewood Chapel: A Burlington Story", "red", "FSEX300", 25);
        flickerStartFramePosition = 0;
        break;
    }
  }, 50);
  
  setTimeout(function () {
    clearInterval(flickerInterval);
    clearWindow();
    writeCenterText("Pinewood Chapel: A Burlington Story", "white", "FSEX300", 25);

    $(gameWindow).fadeOut(1000);

    setTimeout(function () {
      clearWindow();
      gameEventLocation = 1;

      $(gameWindow).fadeIn(1000);
      titleMusicVariable = playAudio("../Visigoth/assets/audio/title_menu.mp3");

      setTimeout(function () {
        loadMenuItems(0);
      }, 1);
    }, 1000);
  }, 1500);
}

function loadMenuItems (arrowWhich) {
  switch (arrowWhich) {
    case 0:
      writeManualCenterParagraph(
        windowContext, 
        "►Start a new game.\nContinue.",
        30,
        "24px FSEX300",
        "white"
      );
      break;
    case 1:
      writeManualCenterParagraph(
        windowContext, 
        "Start a new game.\n►Continue.",
        30,
        "24px FSEX300",
        "white"
      );
      break;
  }
}

// Pre-blackout dialogue begin
let currentBlackoutDialogue = "disabled";
let dialogueTimeout;

const dialogueOne = [
  windowContext,
  `Beckett\n"I think it's time."`,
  30,
  "24px FSEX300",
  "white"
];

const dialogueTwo = [
  windowContext,
  `Ann\n"You're too funny Beckett. Really?"`,
  30,
  "24px FSEX300",
  "white"
];

const dialogueThree = [
  windowContext,
  `Jayden\n"It'll work. Beckett...MASTER Beckett, I mean...\nHe'll do it."`,
  30,
  "24px FSEX300",
  "white"
];

const dialogueFour = [
  windowContext, 
  `Beckett\n"Enough talking."`,
  30,
  "24px FSEX300",
  "white"
];

const selfDialogueOne = [
  windowContext,
  `The power went out.\n`,
  30,
  "24px FSEX300",
  "white"
];

const selfDialogueTwo = [
  windowContext,
  `Maybe it was a fallen tree.\n`,
  30,
  "24px FSEX300",
  "white"
];

function preBlackoutDialogue (dialogueOptions) { // dialogue that happens before the blackout.
  const delayedTextFunction = writeDelayedCenterParagraph(dialogueOptions[0], dialogueOptions[1], dialogueOptions[2], dialogueOptions[3], dialogueOptions[4]);
  return delayedTextFunction;
}

function calculateBlackoutDialogue (dialogueOptions) {
  return dialogueOptions[1].length * 30 + 100;
}

// Pre-blackout dialogue end

let userTitleMenuSelectPosition = 0; // Start new game
let variableMusic;
$(document).on("keydown", function (event) {
  switch (gameEventLocation) {
    case 0:
      secondLoadingScreen();
      break;
    case 1:
      switch (userTitleMenuSelectPosition) {
        case 0:
          switch (event.which) {
            case 39:
            case 40:
              clearWindow();
              userTitleMenuSelectPosition = 1;
              loadMenuItems(1);
              playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
              break;
          }
          break;
        case 1:
          switch (event.which) {
            case 38:
            case 37:
              clearWindow();
              userTitleMenuSelectPosition = 0;
              loadMenuItems(0);
              playClonedAudio("../Visigoth/assets/audio/sfx/vgmenuselect.ogg");
              break;
          }
          break;
      }

      switch (event.which) {
        case 13:
        case 88:
          playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");
          fadeOutAudio(titleMusicVariable, 1000);
          gameEventLocation = "disabled";

          $(gameWindow).fadeOut(1000);

          switch (userTitleMenuSelectPosition) {
            case 0:
              setTimeout(function () {
                $(gameWindow).fadeIn(1000);
                variableMusic = playLoopedAudio("../Visigoth/assets/audio/endless_void.mp3");
                clearWindow();

                setTimeout(function () {
                  dialogueTimeout = preBlackoutDialogue(dialogueOne);

                  setTimeout(function () {
                    currentBlackoutDialogue = 0;
                    gameEventLocation = 2;
                  }, calculateBlackoutDialogue(dialogueOne));
                }, 1000);
              }, 1000);
              break;
          }
          break;
      }
      break;
    case 2:
      switch (event.which) {
        case 13:
          switch (currentBlackoutDialogue) {
            case "disabled":
              return false;
              break;
            case 0:
              currentBlackoutDialogue = "disabled";
              clearWindow();
              dialogueTimeout = preBlackoutDialogue(dialogueTwo);

              setTimeout(function () {
                currentBlackoutDialogue = 1;
              }, calculateBlackoutDialogue(dialogueTwo));
              break;
            case 1:
              currentBlackoutDialogue = "disabled";
              clearWindow();
              dialogueTimeout = preBlackoutDialogue(dialogueThree);

              setTimeout(function () {
                currentBlackoutDialogue = 2;
              }, calculateBlackoutDialogue(dialogueThree));
              break;
            case 2:
              currentBlackoutDialogue = "disabled";
              clearWindow();
              dialogueTimeout = preBlackoutDialogue(dialogueFour);

              setTimeout(function () {
                currentBlackoutDialogue = 3;
              }, calculateBlackoutDialogue(dialogueFour));
              break;
            case 3:
              clearWindow();
              currentBlackoutDialogue = "disabled";
              cutScenes.style.display = "block";
              gameEventLocation = "disabled";

              const cutSceneTimeout = displayCutscene("../Visigoth/cutscenes/power_outage.mp4");
              setTimeout(function () {
                playAudio("../Visigoth/assets/audio/sfx/dsbarexp.wav");
              }, 1000);

              setTimeout(function () {
                $(gameWindow).fadeOut(2000);

                setTimeout(function () {
                  $(gameWindow).fadeIn(2000);
                  clearTheatre();
                  cutScenes.style.display = "none";
                  setTimeout(function () {
                    preBlackoutDialogue(selfDialogueOne);

                    setTimeout(function () {
                      currentBlackoutDialogue = 0;
                      gameEventLocation = 3;
                    }, calculateBlackoutDialogue(selfDialogueOne));
                  }, 1500);
                }, 2000);
              }, cutSceneTimeout + 1000);
              break;
          }
          break;
      }
      break;
    case 3:
      switch (event.which) {
        case 13:
          switch (currentBlackoutDialogue) {
            case 0:
              currentBlackoutDialogue = "disabled";
              clearWindow();
              preBlackoutDialogue(selfDialogueTwo);

              setTimeout(function () {
                currentBlackoutDialogue = 1;
              }, calculateBlackoutDialogue(selfDialogueTwo));
              break;
            case 1:
              currentBlackoutDialogue = "disabled";
              clearWindow();
              gameWindow.style.display = "none";
              setStage(0);

              $(gameWindow).fadeIn(2000);
              gameEventLocation = "disabled";

              setTimeout(function () {
                isTraveling = 1;
                fadeOutAudio(variableMusic, 1000);
                townieMusic = playLoopedAudio("../Visigoth/assets/audio/step.mp3");
              }, 2000);
              break;
          }
          break;
      }
      break;
  }
});