// Main website javascript code here
function toggleDarkLight() {
    const body = document.querySelector('body');
    const currentClass = body.className;
    body.className = currentClass === "pe-dark" ? "pe-light" : "pe-dark";
}