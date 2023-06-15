const list = document.querySelector(".list");
const listContent = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const regExp = new RegExp(/^(a |an |the)/i);
const sortedListContent = listContent.sort((a, b) => a.replace(regExp, "").trim() > b.replace(regExp, "").trim() ? 1 : -1);

list.innerHTML = sortedListContent.map((item) => `<li>${item}</li>`).join("");