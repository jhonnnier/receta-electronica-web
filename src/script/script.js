function isMobile() {
    if (navigator.userAgent.match(/Android/i)) {
        return true;
    } else {
        return false;
    }
}

function passwordShow() {
  const password = document.getElementById('password').value;

  if (password.length > 0) {
    const span = document.querySelector('#passwordShow');
    const type = document.querySelector('#password').getAttribute('type') === 'password' ? 'text' : 'password';
    span.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    document.querySelector('#password').setAttribute('type', type);
  }
}
