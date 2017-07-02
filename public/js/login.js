const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  localStorage.setItem("username",document.querySelector('input').value);
});
