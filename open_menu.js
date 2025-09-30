const menuOptions = document.getElementById("menu-options");
let currentMenuPosition = 0; // there are 5 menu positions total

let spaceChar = "&nbsp;";
let arrowChar = "►";

const MENU_1_CURSOR = document.getElementById("menu_1_cursor"); // 0
const MENU_2_CURSOR = document.getElementById("menu_2_cursor"); // 1
const MENU_3_CURSOR = document.getElementById("menu_3_cursor"); // 2
const MENU_4_CURSOR = document.getElementById("menu_4_cursor"); // 3
const MENU_5_CURSOR = document.getElementById("menu_5_cursor"); // 4

function openMenu () {
  menuOptions.style.display = "block";
  battleWindow.style.display = "block";

  characterRoster.style.display = "none";
}

function closeMenu () {
  menuOptions.style.display = "none";
  battleWindow.style.display = "none";

  characterRoster.style.display = "block";
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