const delBtns = document.querySelectorAll('.delBtn');
const createdBy = document.querySelectorAll('.createdBy');
for (let i = 0; i < createdBy.length; i++){
  if (createdBy[i].innerText === localStorage.username){
    delBtns[i].style.display = 'block';
  } else {
    delBtns[i].parentNode.removeChild(delBtns[i]);
  }
}

function deleteMsg() {
  let form = document.createElement('form');
  form.setAttribute('method','post');
  form.setAttribute('action','/delMsg');
  form.style.display = 'none';

  let msgId = document.createElement('input');
  msgId.setAttribute('name' ,'msgId');
  msgId.setAttribute('value', document.querySelector('.msgId').innerText);
  msgId.style.display = 'none';
  form.appendChild(msgId);

  document.body.appendChild(form);
  form.submit();
}
