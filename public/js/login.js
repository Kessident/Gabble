const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  localStorage.setItem("username", document.querySelector('input').value);
});

const errorMessages = document.querySelector('.errorMessages');
if (errorMessages.innerText === "") {
  errorMessages.parentNode.removeChild(errorMessages);
}
