const form = document.querySelector('form');
const newGab = document.querySelector('textarea');
const errMsgs = document.createElement('ul');
const remaining = document.querySelector('.remaining');

form.addEventListener('keyup', function(e) {
  let numLeft = 140 - newGab.value.length;
  remaining.innerText = numLeft + " Characters remaining";
  errMsgs.innerHTML = "";
  if (newGab.value.length > 140) {
    let newErr = document.createElement("li");
    newErr.innerText = "Gabs may be at most 140 character";
    errMsgs.appendChild(newErr);
    document.body.appendChild(errMsgs);
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errMsgs.innerHTML = "";
  if (newGab.value.length === 0) {
    let newErr = document.createElement("li");
    newErr.innerText = "Please enter something";
    errMsgs.appendChild(newErr);
  } else if (newGab.value.length > 140) {
    let newErr = document.createElement("li");
    newErr.innerText = "Gabs may be at most 140 character";
    errMsgs.appendChild(newErr);
    document.body.appendChild(errMsgs);
  } else {
    form.submit();
  }
  document.body.appendChild(errMsgs);
});
