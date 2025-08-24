let gameEventLocation = 0;

/*
disabled: denies user interaction
0 is the very, very beginning of the game. (Loading screen)
1 is the title screen select menu
*/

// the very start
writeCenterText("Loading assets", "white", "FSEX300", 25);
setTimeout(function () {
  clearWindow();
  writeCenterText("Press any key to continue", "powderblue", "FSEX300", 25);
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
        drawCenterImage("../Visigoth/assets/start/frame1.webp");

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
        drawCenterImage("../Visigoth/assets/start/frame2.webp");
        flickerStartFramePosition = 1;
        break;
      case 1:
        clearWindow();
        drawCenterImage("../Visigoth/assets/start/frame1.webp");
        flickerStartFramePosition = 0;
        break;
    }
  }, 50);
  
  setTimeout(function () {
    clearInterval(flickerInterval);
    clearWindow();
    drawCenterImage("../Visigoth/assets/start/frame1.webp");

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

let userTitleMenuSelectPosition = 0; // Start new game
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
          gameEventLocation = 0;

          $(gameWindow).fadeOut(1000);
          break;
      }
      break;
  }
});