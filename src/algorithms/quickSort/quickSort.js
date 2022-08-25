// A utility function to swap two elements
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
  
/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
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
  
/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
function recursiveQuickSort(arr, low, high, animate) {
    if (low < high) {
        // pi is partitioning index, arr[p]
        // is now at right place 
        let pi = partition(arr, low, high, animate);
        // Separately sort elements before
        // partition and after partition
        recursiveQuickSort(arr, low, pi - 1, animate);
        recursiveQuickSort(arr, pi + 1, high, animate);
    }
}
export function quickSort(arr) {
    const animate = [];
    let end = arr.length-1;
    let start = 0;
    recursiveQuickSort(arr, start, end, animate);
    return animate;
}
  
// Driver Code
  
// let arr = [10, 7, 8, 9, 1, 5];
// let n = arr.length;
// console.log(arr);
// quickSort(arr);
// console.log(arr);  

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