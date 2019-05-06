var Theme = {
  Light: 'pe-light',
  Dark: 'pe-dark'
};

document.addEventListener('DOMContentLoaded', function() {
  document
    .querySelector('.mode-toggle')
    .addEventListener('click', function(event) {
      event.preventDefault();
    });
});

function toggleDarkLight() {
  const body = document.querySelector('body');
  const currentClass = body.className;
  body.className = currentClass === Theme.Dark ? Theme.Light : Theme.Dark;
  setThemeColorMeta(body.className);
  localStorage.setItem('background', body.className);
}

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('background') != null) {
    document.body.className = localStorage.background;
    setThemeColorMeta(document.body.className);
  }
});

function setThemeColorMeta(theme) {
  if (theme === Theme.Light) {
    document
      .querySelector(`meta[name='theme-color']`)
      .setAttribute('content', '#ffffff');
  } else if (theme === Theme.Dark) {
    document
      .querySelector(`meta[name='theme-color']`)
      .setAttribute('content', '#021316');
  }
}

// Set current year to footer
document.getElementById('year').innerHTML = new Date().getFullYear();

// validateE
function subscribeForNewsletter() {
  const userEmail = document.getElementById('mce-EMAIL');
  const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  if (validateEmail.test(userEmail.value)) {
    document.getElementById('subscribe-form').submit();
  } else {
    document.getElementById('subscribe-form').classList.add('error');
  }
}
