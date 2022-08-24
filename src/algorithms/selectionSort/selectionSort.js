export function selectionSort(array) {
  let n = array.length;
  const animate = [];
  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    animate.push(
      createComparingObject(i, i, min, false, false, -1, true, false, false)
    );
    for (let j = i + 1; j < n; j++) {
      animate.push(
        createComparingObject(i, j, min, false, false, -1, false, false, false)
      );
      if (array[j] < array[min]) {
        min = j;
        animate.push(
          createComparingObject(i, j, min, false, false, -1, false, true, false)
        );
      }
    }

    animate.push(
      createComparingObject(i, i, min, false, false, i, false, false, true)
    );
    if (min != i) {
      // Swapping the elements
      animate.push(
        createComparingObject(min, i, min, true, false, -1, false, false, false)
      );
      // [array[i], array[min]] = [array[min], array[i]];  alternative
      let tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
    }
    animate.push(
      createComparingObject(i, i, i, false, true, i, false, false, false)
    );
  }

  return animate;
}

function createComparingObject(
  currElm,
  compareElm,
  minIndex,
  isSwap,
  isFinalElm,
  finalElm,
  isOutJLoop,
  isChangeMin,
  isCompareIandMin
) {
  return {
    currElm,
    compareElm,
    minIndex,
    isSwap,
    isFinalElm,
    finalElm,
    isOutJLoop,
    isChangeMin,
    isCompareIandMin,
  };
}
