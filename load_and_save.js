const saveFiles = localStorage.getItem("visigoth_savefiles");
let seperatorVar = "//**))/_seperator";

function readSaveFile () {
  let savefileRead = String(saveFiles);
  switch (true) {
    case (saveFiles == undefined):
    case (saveFiles == null):
    case (saveFiles == ""):
      return "no_saves";
  }

  savefileRead = savefileRead.split(seperatorVar);

  switch (true) {
    case (savefileRead.length < 2):
      return "length_error";s
  }
}