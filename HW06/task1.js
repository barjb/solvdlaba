const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website",
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web",
    },
};

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localize = (
    template,
    field,
    translationObject = translations,
    lang = language
) => {
    const str1 = template[0];
    const str2 = template.slice(1).join(" ");
    return `${str1}${translationObject[lang][field]}${str2}`;
};

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")
// console.log(localize(`${0}`, "greet", translations, "en"));
