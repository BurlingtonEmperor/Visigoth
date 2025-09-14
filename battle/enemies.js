const jaydenData = {
  enemyName : "Jayden",
  maxHealth : 350,
  attackForce : 25,
  defenseForce : 25,
  mentalEnergy : 30,
  summonArr : ["minivan"],
  sprite : "../Visigoth/battle/enemy_sprites/jayden/jayden1.png",
  specialY : 62,
  status : "boss",
  specialAttacks : ["Bad Gas", "Pond Jump", "Crapshoot"]
}

const jaydenFinalData = {
  enemyName : "Awakened Jayden",
  maxHealth : 100000,
  attackForce : 200,
  defenseForce : 25,
  mentalEnergy : 100,
  summonArr : [],
  sprite : "../Visigoth/battle/enemy_sprites/jayden/jayden2.png",
  specialY : 33,
  status : "final"
}

const rohitData = {
  enemyName : "Rohit",
  maxHealth : 550,
  attackForce : 33,
  defenseForce : 25,
  mentalEnergy : 50,
  summonArr : ["bateman", "oldai"],
  sprite : "../Visigoth/battle/enemy_sprites/rohit/rohit.png",
  specialY : 65,
  status : "boss",
  specialAttacks : ["Psychic"]
}

const beckettData = {
  enemyName : "Beckett",
  maxHealth : 600,
  attackForce : 50,
  defenseForce : 12,
  mentalEnergy : 50,
  summonArr : [],
  sprite : "../Visigoth/battle/enemy_sprites/beckett/beckett.webp",
  specialY : 50,
  status : "jenova"
}

// end boss data
// begin generic data

// pinehurst
const hauntedDoll = {
  enemyName : "the Haunted Doll",
  maxHealth : 18,
  attackForce : 2,
  defenseForce : 1,
  mentalEnergy : 0,
  summonArr : [],
  sprite : "../Visigoth/battle/enemy_sprites/pinehurst/doll.png",
  specialY : 125,
  status : "generic",
  specialAttacks : ["Psychic"],
  expYield : 5,
  droppedItems : []
}