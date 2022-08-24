export function bubbleSort(array) {
    let swapped;
    const animate = [];
    do {
        swapped = false;
        animate.push(createComparingObject(0, 1, false, true));
        for (let i = 0; i < array.length - 1; i++) {
            animate.push(createComparingObject(i, i + 1));
            if (array[i] > array[i + 1]) {
                animate.push(createComparingObject(i, i + 1, true));
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return animate;
}

function createComparingObject(
    leftElm,
    rightElm,
    isSwap = false,
    isOutLoop = false
) {
    return {
        leftElm,
        rightElm,
        isSwap,
        isOutLoop,
    };
}
