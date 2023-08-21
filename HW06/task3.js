const multiline = (template) => {
    let lines = template[0].split("\n");
    let index = 1;
    return lines
        .map((element) => {
            if (element.length > 0) {
                element = index + " " + element;
                index++;
            } else return null;
            return element;
        })
        .join("\n");
};

const code = multiline`
function add(a, b) {
    return a + b;
}
`;

console.log(code);
// Expected:
// "1 function add(a, b) {
// 2    return a + b;
// 3 }"
