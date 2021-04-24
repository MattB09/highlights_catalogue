export function binaryFind(searchElement, arr, prop=undefined) {

  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var currentElement;

  if (prop === undefined) {
    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0; // Binary hack. Faster than Math.floor
      currentElement = arr[currentIndex];
  
      if (currentElement.toUpperCase() < searchElement.toUpperCase()) {
        minIndex = currentIndex + 1;
      }
      else if (currentElement.toUpperCase() > searchElement.toUpperCase()) {
        maxIndex = currentIndex - 1;
      }
      else {
        return currentIndex;
      }
    }
    if (currentIndex === arr.length - 1 && (searchElement.toUpperCase() > currentElement.toUpperCase())) {
      currentIndex++;
    }
  } else {
    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0; // Binary hack. Faster than Math.floor
      currentElement = arr[currentIndex];

      if (currentElement[prop].toUpperCase() < searchElement[prop].toUpperCase()) {
        minIndex = currentIndex + 1;
      }
      else if (currentElement[prop].toUpperCase() > searchElement[prop].toUpperCase()) {
        maxIndex = currentIndex - 1;
      } 
      else {
        return currentIndex;
      }
    }
    if (currentIndex === arr.length - 1 && (searchElement[prop].toUpperCase() > currentElement[prop].toUpperCase())) {
      currentIndex++;
    }
  }

  return currentIndex;
}

export function addSorted(element, arr, prop) {
  var result = binaryFind(element, arr, prop);
  arr.splice(result, 0, element);
}