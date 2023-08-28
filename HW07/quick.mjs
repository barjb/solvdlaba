function quickSort(array) {
    if (array.length <= 1) return array;
    const arrayLeft = [];
    const arrayRight = [];
    const pivot = Math.floor(Math.random() * array.length);
    for (let i = 0; i < array.length; i++) {
        if (array[i] < array[pivot]) arrayLeft.push(array[i]);
        else if (array[i] >= array[pivot] && i != pivot)
            arrayRight.push(array[i]);
    }
    return [...quickSort(arrayLeft), array[pivot], ...quickSort(arrayRight)];
}

export default quickSort;
