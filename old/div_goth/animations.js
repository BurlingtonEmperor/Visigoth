// animations
const viewScreen = document.getElementById("viewscreen");

// different screens
const loadingScreen = document.getElementById("loading-screen");
const pinehurst = document.getElementById("pinehurst");

function firstLoadAnimation () {
  $(viewScreen).fadeOut(2000);
}

function hideAll () {
  $(loadingScreen).hide();
  $(pinehurst).hide();
}

function setPinehurst () {
  hideAll();
  $(pinehurst).show();
  viewScreen.style.backgroundColor = "skyblue";
}