const delBtns = document.querySelectorAll('.delBtn');
const createdBy = document.querySelectorAll('.createdBy');
for (let i = 0; i < createdBy.length; i++){
  if (createdBy[i].innerText === localStorage.username){
    delBtns[i].style.display = 'block';
  } else {
    delBtns[i].parentNode.removeChild(delBtns[i]);
  }
}
