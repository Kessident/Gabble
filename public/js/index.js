const delBtns = document.querySelectorAll('.delBtn');
const createdBy = document.querySelectorAll('.createdBy');
for (let i = 0; i < createdBy.length; i++){
  if (createdBy[i].innerText === localStorage.username){
    delBtns[i].style.display = 'block';
  } else {
    delBtns[i].parentNode.parentNode.removeChild(delBtns[i].parentNode);
  }
}

const numLikes = document.querySelectorAll('.likes');
for (var i = 0; i < numLikes.length; i++) {
  let likeNum = parseInt(numLikes[i].innerText);
  if (likeNum === 0){
    numLikes[i].innerText = "No likes yet.";
  } else if (likeNum === 1) {
    numLikes[i].innerText = likeNum + " like";
  } else {
    numLikes[i].innerText = likeNum + " likes";
  }
}
