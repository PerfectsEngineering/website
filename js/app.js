//Main website javascript code here
document
    .querySelector('.mode-toggle')
    .addEventListener('click', function(event) {
        event.preventDefault();
    });

function toggleDarkLight() {
    const body = document.querySelector('body');
    const currentClass = body.className;
    body.className = currentClass === 'pe-dark' ? 'pe-light' : 'pe-dark';

    localStorage.setItem('background', body.className);
}

if (localStorage.getItem('background') != null) {
    document.body.className = localStorage.background;
}

