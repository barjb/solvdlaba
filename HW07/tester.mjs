import bubbleSort from "./bubble.mjs";
import mergeSort from "./merge.mjs";
import quickSort from "./quick.mjs";

import { markdownTable } from "markdown-table";

import { writeFileSync } from "fs";

let table = [["size", "type", "bubbleSort", "mergeSort", "quickSort"]];

function createArray(type, len) {
    if (type === "ascending") {
        return Array.from({ length: len }, (_, i) => i);
    }
    if (type === "descending") {
        return Array.from({ length: len }, (_, i) => len - i - 1);
    }
    if (type === "random") {
        return Array.from({ length: len }, (_, i) => i).sort(
            () => Math.random() - 0.5
        );
    }
    return [];
}

function timeSort(fns, arr) {
    let result = [];
    fns.forEach((fn) => {
        const start = performance.now();
        fn(arr);
        const end = performance.now();
        result.push((end - start).toFixed(4));
    });
    return result;
}

function writer(data) {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now
        .toISOString()
        .split("T")[1]
        .substring(0, 8)
        .replace(/:/g, "");
    const fileName = `test${date}-${time}.md`;
    writeFileSync(fileName, data, "utf-8");
}

const functions = [bubbleSort, mergeSort, quickSort];
const ascendingSizes = [
    2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 10240, 102400, 1024000,
];
ascendingSizes.forEach((size) => {
    const array = createArray("ascending", size);
    let sortResult = timeSort(functions, array);
    const row = [size, "ascending", ...sortResult];
    table.push(row);
});

const descendingSizes = [
    2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8196,
];

descendingSizes.forEach((size) => {
    const array = createArray("descending", size);
    let sortResult = timeSort(functions, array);
    const row = [size, "descending", ...sortResult];
    table.push(row);
});
const randomSizes = [
    2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8196,
];

randomSizes.forEach((size) => {
    const array = createArray("random", size);
    let sortResult = timeSort(functions, array);
    const row = [size, "random", ...sortResult];
    table.push(row);
});

console.log(markdownTable(table));

writer("# Testing results\n\n".concat(markdownTable(table)));
