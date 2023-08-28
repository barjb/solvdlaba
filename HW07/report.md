# Report

## Implementations

### BubbleSort

```js
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
```

Copying is performed to get uniform results compared with other sorthing methods. Supplied array is not modified. This is an optimized version of Bubble Sort, which exits early if elements are in order.

### MergeSort

```js
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
```

### QuickSort

```js
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
```

### The process you followed to determine the lengths at which QuickSort and Merge Sort become faster than BubbleSort.

I wrote script 'tester.js' to run tests multiple times. Each time it's run it generates markdown table with the results of the sorts. I pasted below result of one calculation, but I made sure it is representative of other runs.

I started with arrays containing 2 elements. Size increment 2x each time until I find threshold size.

### A table or graph showing the array length and execution time for each sorting algorithm.

#### Asending

| size    | type      | bubbleSort | mergeSort | quickSort |
| ------- | --------- | ---------- | --------- | --------- |
| 2       | ascending | 0.0586     | 0.0798    | 0.0532    |
| 4       | ascending | 0.0018     | 0.0130    | 0.0070    |
| 8       | ascending | 0.0019     | 0.0235    | 0.1282    |
| 16      | ascending | 0.0027     | 0.0146    | 0.0168    |
| 32      | ascending | 0.0155     | 0.0405    | 0.0249    |
| 64      | ascending | 0.0029     | 0.0596    | 0.5769    |
| 128     | ascending | 0.0048     | 0.1264    | 0.1414    |
| 256     | ascending | 0.0111     | 0.2959    | 0.4845    |
| 512     | ascending | 0.0176     | 1.1700    | 0.4806    |
| 1024    | ascending | 0.0328     | 1.0049    | 1.3480    |
| 10240   | ascending | 0.3861     | 6.6279    | 2.1059    |
| 102400  | ascending | 0.6909     | 57.2991   | 36.4504   |
| 1024000 | ascending | 5.2850     | 568.1479  | 466.9677  |

#### Descending

| size | type       | bubbleSort | mergeSort | quickSort |
| ---- | ---------- | ---------- | --------- | --------- |
| 2    | descending | 0.1211     | 0.0448    | 0.0011    |
| 4    | descending | 0.0031     | 0.0395    | 0.0010    |
| 8    | descending | 0.0059     | 0.0063    | 0.0015    |
| 16   | descending | 0.0208     | 0.0139    | 0.0399    |
| 32   | descending | 0.1123     | 0.0254    | 0.0244    |
| 64   | descending | 5.9607     | 0.0522    | 0.0086    |
| 128  | descending | 2.4863     | 0.1306    | 0.0196    |
| 256  | descending | 2.9461     | 0.3906    | 0.0519    |
| 512  | descending | 0.8354     | 0.8853    | 0.1087    |
| 1024 | descending | 2.6569     | 1.3697    | 0.2292    |
| 2048 | descending | 7.9269     | 0.8464    | 0.2480    |
| 4096 | descending | 20.6060    | 1.7599    | 0.9557    |
| 8196 | descending | 83.6333    | 3.5266    | 1.1797    |

#### Random

| size | type   | bubbleSort | mergeSort | quickSort |
| ---- | ------ | ---------- | --------- | --------- |
| 2    | random | 0.0016     | 0.0023    | 0.0007    |
| 4    | random | 0.0006     | 0.0022    | 0.0007    |
| 8    | random | 0.0007     | 0.0038    | 0.0013    |
| 16   | random | 0.0011     | 0.0072    | 0.0018    |
| 32   | random | 0.0026     | 0.0151    | 0.0041    |
| 64   | random | 0.0063     | 0.0285    | 0.0073    |
| 128  | random | 0.0253     | 0.0664    | 0.0165    |
| 256  | random | 0.0888     | 0.1210    | 0.0353    |
| 512  | random | 0.2916     | 0.4586    | 0.0745    |
| 1024 | random | 1.2329     | 0.4917    | 0.1527    |
| 2048 | random | 4.8080     | 0.9985    | 0.3307    |
| 4096 | random | 21.2455    | 1.9840    | 0.7143    |
| 8196 | random | 126.8817   | 4.2798    | 1.9847    |

### Your conclusions and observations about the performance of the three sorting algorithms.

Bubble Sort outperforms Merge and Quick Sort on sorted arrays, because in only iterates through sorted array, while Merge and Quick Sort divide arrays and try to sort them.
On random data Bubble Sort is significantly slower.

On sorted data Merge and Quick Sort perform simmilarly.

On random data Quick Sort is faster than Merge.

#### Performance conclusions

1. On already sorted arrays bubbleSort outperforms mergeSort and quickSort.
2. On arrays sorted descendingly bubbleSort gets outperformed at 64 elements. I don't know why bubbleSort suprisingly does great at array lenght 512 consistently. I guess it has to do something with caching array of this size.
3. On random arrays bubbleSort starts to get outperformed at array of size 256. Again it does well on arrays having 512 elements.
4. In regards to input array size, execution of Bubble sort grows much faster compared to Merge and Quick Sorts.
