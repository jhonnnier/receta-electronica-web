function isMobile(){return!!navigator.userAgent.match(/Android/i)}function passwordShow(){if(document.getElementById("password").value.length>0){const t=document.querySelector("#passwordShow"),e="password"===document.querySelector("#password").getAttribute("type")?"text":"password";t.textContent="password"===e?"Mostrar":"Ocultar",document.querySelector("#password").setAttribute("type",e)}}