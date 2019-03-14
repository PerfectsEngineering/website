//Main website javascript code here
document.addEventListener('DOMContentLoaded', function () {
    document
        .querySelector('.mode-toggle')
        .addEventListener('click', function(event) {
            event.preventDefault();
        });
})

function toggleDarkLight() {
    const body = document.querySelector('body');
    const currentClass = body.className;
    body.className = currentClass === 'pe-dark' ? 'pe-light' : 'pe-dark';

    localStorage.setItem('background', body.className);
}

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('background') != null) {
        document.body.className = localStorage.background;
    }
})

// Set current year to footer
document.getElementById("year").innerHTML = new Date().getFullYear();
