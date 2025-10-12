function turnEncountersOff () {
  setInterval(function () {
    encounters = "OFF";
  }, 500);
}

let relevantItems = ["Graveyard Key"];
function giveAllRelevantItems () {
  for (let i = 0; i < relevantItems.length; i++) {
    currentInventory.push(relevantItems[i]);
  }
}