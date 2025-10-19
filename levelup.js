function levelUp (characterNumber) {
  let characterLevel;
  let characterExp;

  function checkExpLevels (level_char, level_exp) {
    for (let i = 0; i < levelUpExp.length; i++) {
      switch (false) {
        case (level_exp > levelUpExp[i]):
          if (characterExp == levelUpExp[i]) {
            level_char = (i + 2);
          }

          else {
            level_char = (i + 1);
          }
          break;
      }
    }
  }

  switch (characterNumber) {
    default:
      return "forbidden";
    case 1:
      characterLevel = heroLevel_1;
      characterExp = heroExp_1;
      break;
  }

  checkExpLevels(characterLevel, characterExp);
}