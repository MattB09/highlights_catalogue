export function binaryFind(searchElement, arr) {
  'use strict';

  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0; // Binary hack. Faster than Math.floor
    currentElement = arr[currentIndex];

    if (currentElement < searchElement) {
      minIndex = currentIndex + 1;
    }
    else if (currentElement > searchElement) {
      maxIndex = currentIndex - 1;
    }
  }
  return currentIndex;
}

export function addSorted(element, arr) {
  var result = binaryFind(element);
  arr.splice(result, 0, element);
}