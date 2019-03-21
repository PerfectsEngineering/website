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

// validateE
function subscribeForNewsletter() {
    const userEmail = document.getElementById('mce-EMAIL');
    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    if (validateEmail.test(userEmail.value)) {
        document.getElementById("subscribe-form").submit();
    } else {
        document.getElementById("subscribe-form").classList.add('error');
    }
}
