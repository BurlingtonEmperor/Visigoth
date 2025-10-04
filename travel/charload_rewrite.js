// I have to rewrite the original load and save functions for character sprite Xs for Random Encounters.

/*
Not sure why I didn't do this before, but here are the frame numbers and their corresponding locations.
0 -- Pinehurst Frame 1 
1 -- Pinehurst Frame 2 (Construction)
2 -- The Park
3 -- FW Road
4 -- Cambridge Street
*/

let charSAVEDATA = [];
let savedFRAMEX;

function REWRITE_SAVE_CHAR_DATA () {
  charSAVEDATA = [];

  charSAVEDATA.push(travelCharacterObject_1_x);
  charSAVEDATA.push(travelCharacterObject_2_x);
  charSAVEDATA.push(travelCharacterObject_3_x);
  charSAVEDATA.push(travelCharacterObject_4_x);
}

function REWRITE_LOAD_CHAR_DATA () {
  travelCharacterObject_1_x = charSAVEDATA[0];
  travelCharacterObject_2_x = charSAVEDATA[1];
  travelCharacterObject_3_x = charSAVEDATA[2];
  travelCharacterObject_4_x = charSAVEDATA[3];
}

function REWRITE_LONGTERM_DATA (saveOrLoad) {}

function SAVE_FRAME_X () {
  savedFRAMEX = frameX;
}

function LOAD_FRAME_X () {
  frameX = savedFRAMEX;
}

// function SET_CURRENT_SPRITE_ARR () {}