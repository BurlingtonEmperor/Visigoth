const levelUpExp = [10, 25, 45, 70, 100, 135, 175, 220, 270, 325, 385, 450, 520, 595, 675, 760, 850, 945, 1045, 1150, 1260, 1375, 1495, 1620, 1750, 1885, 2025, 2170, 2320, 2475, 2635, 2800];
let currentInventory = [];

let playerData = {
  heroName : "Roy",
  heroHealth : 45,
  attackForce : 5,
  defenseForce : 10,
  mentalEnergy : 5,
  summonArr : [],
  largePic : "",
  currentExp : 0,
  currentLevel : 1
}

let colinData = {
  heroName : "Colin",
  heroHealth : 56,
  attackForce : 8,
  defenseForce : 12,
  mentalEnergy : 3,
  summonArr : [],
  largePic : "../Visigoth/assets/largepics/colin.jpg",
  currentExp : 0,
  currentLevel : 1
}

let connorData = {
  heroName : "Connor",
  heroHealth : 68,
  attackForce : 12,
  defenseForce : 10,
  mentalEnergy : 10,
  summonArr : [],
  largePic : "",
  currentExp : 0,
  currentLevel : 1
}

let testData = {
  heroName : "Test",
  heroHealth : 10,
  attackForce : 1,
  defenseForce : 1,
  mentalEnergy : 1,
  summonArr : [],
  largePic : "../Visigoth/tests/100x100_logo.png"
}

let heroParty = [playerData];