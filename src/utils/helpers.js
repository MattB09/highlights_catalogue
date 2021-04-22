export function binaryFind(searchElement, arr, prop) {

  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0; // Binary hack. Faster than Math.floor
    currentElement = arr[currentIndex];

    if (currentElement[prop].toUpperCase() < searchElement[prop].toUpperCase()) {
      minIndex = currentIndex + 1;
    }
    else if (currentElement[prop].toUpperCase() > searchElement[prop].toUpperCase()) {
      maxIndex = currentIndex - 1;
    }
  }
  if (currentIndex === arr.length - 1 && (searchElement[prop].toUpperCase() > currentElement[prop].toUpperCase())) {
    currentIndex++;
  }
  return currentIndex;
}

export function addSorted(element, arr, prop) {
  var result = binaryFind(element, arr, prop);
  arr.splice(result, 0, element);
}