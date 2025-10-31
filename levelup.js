function giveRandomAttributesRoll () {
  return Math.floor(Math.random() * 5) + 1;
}

function giveRandomHealthRoll (levelNum) {
  switch (true) {
    case (levelNum % 2 == 0):
      return Math.floor(Math.random() * 3) + 10;
    default:
      return Math.floor(Math.random() * 2) + 5;
  }
}

function giveRandomMERoll (levelNum) {
  switch (false) {
    case (levelNum % 2 == 0):
      return Math.floor(Math.random() * 3) + 3;
    default:
      return Math.floor(Math.random() * 2) + 1;
  }
}

function giveRandomAtrributes (characterNumber_u, current_lev) {
  let attributeRollHistory = [];
  for (let i = 0; i < 4; i++) {
    switch (i) {
      case 0:
        attributeRollHistory.push(giveRandomHealthRoll(current_lev));
        break;
      case 1:
        attributeRollHistory.push(giveRandomMERoll(current_lev));
        break;
      default:
        attributeRollHistory.push(giveRandomAttributesRoll());
        break;
    }
  }

  switch (characterNumber_u) {
    case 1:
      playerData.heroHealth += attributeRollHistory[0];
      playerData.mentalEnergy += attributeRollHistory[1];
      playerData.attackForce += attributeRollHistory[2];
      playerData.defenseForce += attributeRollHistory[3];
      break;
  }
}

function levelUp (characterNumber) {
  let characterLevel;
  let characterExp;

  function checkExpLevels (level_char, level_exp) {
    for (let i = 0; i < levelUpExp.length; i++) {
      switch (false) {
        case (level_exp > levelUpExp[i]):
          if (characterExp == levelUpExp[i]) {
            console.log("Player level is equivalent to desired level");
            level_char = (i + 2);
            characterLevel = level_char;
            giveRandomAtrributes(characterNumber, characterLevel);
          }

        //   else {
        //     level_char = (i + 1);
        //     characterLevel = level_char;
        //   }
          break;
        default:
          console.log("Player's current level is greater than level slot");
          break;
      }

      switch (true) {
        case (level_exp > levelUpExp[i]):
          level_char = i + 2;
          characterLevel = level_char;
          console.log("Gave player level greater than previous");
          giveRandomAtrributes(characterNumber, characterLevel);
          break;
      }
    }
  }

  switch (characterNumber) {
    default:
      return "forbidden";
    case 1:
      characterLevel = playerData.currentLevel;
      characterExp = playerData.currentExp;
      break;
  }

  checkExpLevels(characterLevel, characterExp);

  switch (characterNumber) {
    default:
      return "forbidden";
    case 1:
      playerData.currentLevel = characterLevel;
    //   giveRandomAtrributes(characterNumber, playerData.currentLevel);
      break;
  }
}

function distributeExp () {
  
}