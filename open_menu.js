const menuOptions = document.getElementById("menu-options");
let currentMenuPosition = 0; // there are 5 menu positions total
let hasOpenedMenu = 0;

let spaceChar = "&nbsp;";
let arrowChar = "►";

const MENU_1_CURSOR = document.getElementById("menu_1_cursor"); // 0
const MENU_2_CURSOR = document.getElementById("menu_2_cursor"); // 1
const MENU_3_CURSOR = document.getElementById("menu_3_cursor"); // 2
const MENU_4_CURSOR = document.getElementById("menu_4_cursor"); // 3
const MENU_5_CURSOR = document.getElementById("menu_5_cursor"); // 4

const menuStatus = document.getElementById("menu-status");
let hasOpenedStatus = 0;

function openMenu () {
  menuOptions.style.display = "block";
  battleWindow.style.display = "block";

  characterRoster.style.display = "none";
  textWindow.style.zIndex = "0";
}

function closeMenu () {
  menuOptions.style.display = "none";
  battleWindow.style.display = "none";

  characterRoster.style.display = "block";
  textWindow.style.zIndex = "2";
}

function CLEAR_ALL_MENU_POSITIONS () {
  MENU_1_CURSOR.innerHTML = spaceChar;
  MENU_2_CURSOR.innerHTML = spaceChar;
  MENU_3_CURSOR.innerHTML = spaceChar;
  MENU_4_CURSOR.innerHTML = spaceChar;
  MENU_5_CURSOR.innerHTML = spaceChar;
}

function moveUpMenu () {
  switch (currentMenuPosition) {
    case 1:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_1_CURSOR.innerText = arrowChar;
      currentMenuPosition = 0;
      break;
    case 2:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_2_CURSOR.innerText = arrowChar;
      currentMenuPosition = 1;
      break;
    case 3:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_3_CURSOR.innerText = arrowChar;
      currentMenuPosition = 2;
      break;
    case 4:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_4_CURSOR.innerText = arrowChar;
      currentMenuPosition = 3;
      break;
  }
}

function moveDownMenu () {
  switch (currentMenuPosition) {
    case 0:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_2_CURSOR.innerText = arrowChar;
      currentMenuPosition = 1;
      break;
    case 1:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_3_CURSOR.innerText = arrowChar;
      currentMenuPosition = 2;
      break;
    case 2:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_4_CURSOR.innerText = arrowChar;
      currentMenuPosition = 3;
      break;
    case 3:
      CLEAR_ALL_MENU_POSITIONS();
      MENU_5_CURSOR.innerText = arrowChar;
      currentMenuPosition = 4;
      break;
  }
}

function openStatusMenu () {
  $(gameWindow).fadeOut(1000);
  $(battleWindow).fadeOut(1000);
  hasOpenedMenu = 0;

  setTimeout(function () {
    menuOptions.style.display = "none";
    menuStatus.style.display = "block";

    // $(gameWindow).fadeIn(1000);
    $(battleWindow).fadeIn(1000);

    setTimeout(function () {
      hasOpenedStatus = 1;
    }, 1000);
  }, 1000);
}

function selectMenuObject () {
  switch (currentMenuPosition) {
    case 0:
      break;
    case 1:
      break;
  }
}