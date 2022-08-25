function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
  
function partition(arr, low, high, animate) {
  
    // pivot
    let pivot = arr[high];
    animate.push(createComparingObject(high, low, false, false, false, false, true));
    animate.push(createComparingObject(high, high, false, false, true));
    
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
  
        // If current element is smaller 
        // than the pivot
        if (arr[j] < pivot) {
            // Increment index of 
            // smaller element
            i++;
            swap(arr, i, j);
            animate.push(createComparingObject(high, j, false, true, false));
            animate.push(createComparingObject(j, i, true, false, false));
        }
    }
    swap(arr, i + 1, high);
    animate.push(createComparingObject(high, i+1, true, false, false, true));
    return (i + 1);
}

function recursiveQuickSort(arr, low, high, animate) {
    if (low < high) {
        let pi = partition(arr, low, high, animate);

        recursiveQuickSort(arr, low, pi - 1, animate); // Recursive call left
        recursiveQuickSort(arr, pi + 1, high, animate); // Recursive call right
    }
}
export function quickSort(arr) {
    const animate = [];
    let end = arr.length-1;
    let start = 0;
    recursiveQuickSort(arr, start, end, animate);
    return animate;
}
  
function createComparingObject(
    currElm,
    compareElm,
    isSwap,
    isCompare = false,
    isSetCurr = false,
    isSwapMiddle = false,
    firstElm = false
) {
    return {
        currElm,
        compareElm,
        isSwap,
        isCompare,
        isSetCurr,
        isSwapMiddle,
        firstElm
    };
}