let battleBackdropX;
let enemySpriteX;

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
    }, 800);
  }, 1000);
}