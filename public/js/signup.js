const form = document.querySelector('form');
const userInput = document.querySelector('input[name=username]');
const passIn = document.querySelector('input[name=password]');
const passConf = document.querySelector('input[name=passwordConfirm]');
const errList = document.querySelector('ul');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errList.innerHTML = "";
  let err = false;

  //checking if values exist shouldn't be necessary as the form should prevent submission if empty, but being included for completeness
  if (!userInput.value){
    let newErr = document.createElement("li");
    newErr.innerText = "Please enter a username";
    errList.appendChild(newErr);
    err = true;
  }
  if (!passIn.value){
    let newErr = document.createElement("li");
    newErr.innerText = "Please enter a password";
    errList.appendChild(newErr);
    err = true;
  }

  if (userInput.value.length < 6){
    let newErr = document.createElement("li");
    newErr.innerText = "Usernames must be at least 6 characters long";
    errList.appendChild(newErr);
    err = true;
  }
  if (passIn.value.length < 8){
    let newErr = document.createElement("li");
    newErr.innerText = "Passwords must be at least 8 characters long";
    errList.appendChild(newErr);
    err = true;
  }
  if (passIn.value !== passConf.value){
    let newErr = document.createElement("li");
    newErr.innerText = "Paswords do not match";
    errList.appendChild(newErr);
    err = true;
  }

  if (!err){
    form.submit();
  }
});
