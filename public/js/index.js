const delBtns = document.querySelectorAll('.delBtn');
const createdBy = document.querySelectorAll('.createdBy');
const forms = document.querySelectorAll('.likeBtnForm');
for (let i = 0; i < createdBy.length; i++) {
  if (createdBy[i].innerText === localStorage.username) {
    delBtns[i].style.display = 'block';
  } else {
    delBtns[i].parentNode.parentNode.removeChild(delBtns[i].parentNode);
  }
}

const likeList = document.querySelectorAll('.likes');
for (var i = 0; i < likeList.length; i++) {
  let likeNum = parseInt(likeList[i].innerText);
  if (likeNum === 0) {
    likeList[i].innerText = "No likes yet.";
  } else if (likeNum === 1) {
    likeList[i].innerText = likeNum + " like";
  } else {
    likeList[i].innerText = likeNum + " likes";
  }
}
