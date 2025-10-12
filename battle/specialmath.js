function removeFromArray (givenArray, itemToRemove) {
  let isInArray = 0;

  let itemToRemovePosition; // former position 

  for (let i = 0; i < givenArray.length; i++) {
    switch (true) {
      case (givenArray[i] == itemToRemove):
        isInArray = 1;
        itemToRemovePosition = i;
        break;
    }
  }

  switch (isInArray) {
    case 0:
      return false;
    case 1:
      let currentArrayStorage = givenArray[givenArray.length - 1];

      givenArray[givenArray.length - 1] = givenArray[itemToRemovePosition];
      givenArray[itemToRemovePosition] = currentArrayStorage;
      givenArray.pop();
      
      return givenArray;
  }
}