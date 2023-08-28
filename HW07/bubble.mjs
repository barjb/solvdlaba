function bubbleSort(array) {
    let arrayCopy = [...array];
    let swapped = false;
    for (let i = 0; i < arrayCopy.length - 1; i++) {
        swapped = false;
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
            if (arrayCopy[j] > arrayCopy[j + 1]) {
                [arrayCopy[j], arrayCopy[j + 1]] = [
                    arrayCopy[j + 1],
                    arrayCopy[j],
                ];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arrayCopy;
}
export default bubbleSort;
