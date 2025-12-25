let alpha_pos = null; // alpha pos = 1 achieves the same result
let alpha_keypos = 0;
let alpha_dpos = 0;

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

function loadInIntro () {
  playClonedAudio("../Visigoth/assets/audio/sfx/coin7.wav");

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

function getWaitTextTime (text) {
  return (text.length * 25 + 250);
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
              break;
          }
          break;
      }
      break;
  }
});