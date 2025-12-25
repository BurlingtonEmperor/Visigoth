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

// begin intro

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
  createWindow("dialogue", `Anthony: Wait, there's someone at the front entrance! Isn't it a bit late too come now?`, 0, 0);

  setTimeout(function () {
    alpha_dpos = 7;
  }, getWaitTextTime(`Anthony: Wait, there's someone at the front entrance! Isn't it a bit late too come now?`));
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
  playAudio("../Visigoth/prequel/crowd.mp3", 800, 500);
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

function getWaitTextTime (text) {
  return (text.length * 50 - 480);
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
          }
          break;
      }
      break;
  }
});