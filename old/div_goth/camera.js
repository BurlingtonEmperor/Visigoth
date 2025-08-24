let layerOffset = 0;
let secondLayerOffset;
let whichTown = 0; // check codes.txt

// pinehurst layers
const pinehurstHouses = document.getElementById("pinehurst-houses");
const pinehurstHouses_secondLayer = document.getElementById("pinehurst-houses2");
pinehurstHouses_secondLayer.style.left = "101%";

// function determineSecondLayerOffset () {
//   switch (whichTown) {
//     case 0:
//       secondLayerOffset = pinehurstHouses_secondLayer.style.left;
//       break;
//   }
// }

function setMotion (cameraDirection) {
  let offsetAmount = 5;
//   switch (layerType) {
//     case 0:
//       offsetAmount = 5;
//       break;
//     case 1:
//       offsetAmount = 7;
//       break;
//   }

  let layerOne;
  let layerTwo;

  switch (whichTown) {
    case 0:
      layerOne = pinehurstHouses;
      layerTwo = pinehurstHouses_secondLayer;
      break;
  }

  switch (cameraDirection) {
    case "left":
      layerOffset -= offsetAmount;
      secondLayerOffset = layerOffset / 2;

      layerOne.style.left = layerOffset + "px";
      layerTwo.style.left = secondLayerOffset + "px";
      break;
    case "right":
      layerOffset += offsetAmount;
      secondLayerOffset = layerOffset * 2;

      layerOne.style.left = layerOffset + "px";
      layerTwo.style.left = secondLayerOffset + "px";
      break;
  }
}

$(document).on("keydown", function (e) {
  if (e.key === "ArrowRight") {
    setMotion("right");
  } else if (e.key === "ArrowLeft") {
    setMotion("left");
  }
});