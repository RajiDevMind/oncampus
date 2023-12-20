const profile = document.querySelector(".profile-container");
const btn = document.querySelector(".viewProfile");
// display profile tab when click
btn.addEventListener("click", () => {
  profile.classList.toggle("show");
});

// display form onclick create post
const postBtn = document.querySelector(".postBtn");
const displayForm = document.querySelector(".displayForm");
postBtn.addEventListener("click", () => {
  displayForm.classList.toggle("show");
});

// change love color while user click
const love = document.querySelector(".fa-heart");
love.addEventListener("click", () => {
  love.classList.toggle("color");
});
