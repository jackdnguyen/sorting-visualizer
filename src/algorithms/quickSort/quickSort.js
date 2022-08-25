export function runQuickSort(array) {
    const animate = [];
    quickSort(array, array, animate);
    return animate;
}

function quickSort(originalArray, array, animate) {
    if (array.length <= 1) {
        return animate;
    }

    var pivot = array[array.length-1];
    animate.push(createComparingObject(originalArray.indexOf(array[pivot]), originalArray.indexOf(array[pivot]), false));
    animate.push(createComparingObject(originalArray.indexOf(array[pivot]), originalArray.indexOf(array[pivot]), false, false, true));

    var left = [];
    var right = [];

    let count = 0;
    for (var i = 1; i < array.length; i++) {
        animate.push(createComparingObject(originalArray.indexOf(array[pivot]), originalArray.indexOf(array[i]), false, true, false));
        if (array[i] < pivot) {
            left.push(array[i]);
            animate.push(createComparingObject(originalArray.indexOf(array[count]), originalArray.indexOf(array[i]), true, false, false));
            count++;
        } else {
            right.push(array[i]);
        }
    }

    return quickSort(originalArray, left, animate).concat(pivot, quickSort(originalArray, right, animate));
}

function createComparingObject(
    currElm,
    compareElm,
    isSwap,
    isCompare = false,
    isSetCurr = false
) {
    return {
        currElm,
        compareElm,
        isSwap,
        isCompare,
        isSetCurr,
    };
}