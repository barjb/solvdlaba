function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(arrayLeft, arrayRight) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < arrayLeft.length && rightIndex < arrayRight.length) {
        if (arrayLeft[leftIndex] < arrayRight[rightIndex])
            result.push(arrayLeft[leftIndex++]);
        else result.push(arrayRight[rightIndex++]);
    }
    return result
        .concat(arrayLeft.slice(leftIndex))
        .concat(arrayRight.slice(rightIndex));
}

export default mergeSort;
