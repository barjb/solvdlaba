const highlightKeywords = (template, keywords) => {
    const regex = /\${\d+}/g;
    return template.replace(regex, (matched) => {
        let index = +matched.replace(/[${}]/g, "");
        if (index !== index || index > keywords.length - 1 || index < 0) return;
        const currentKeyword = keywords[index];
        return `<span class='highlight'>${currentKeyword}</span>`;
    });
};

const keywords = ["JavaScript", "template", "tagged"];
const template =
    "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);

// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
