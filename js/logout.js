const logoutBtn = document.querySelector(".logout_btn");

function clickLogout() {
  if (confirm("이름과 모든 Todo list 내용이 삭제됩니다.")) {
    localStorage.removeItem("username");
    localStorage.removeItem("todos");
    window.location.reload();
  }
}

logoutBtn.addEventListener("click", clickLogout);
