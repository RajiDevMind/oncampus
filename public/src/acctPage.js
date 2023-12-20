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
const remove = document.querySelector(".fa-times");
remove.addEventListener("click", () => {
  displayForm.classList.toggle("show");
});

// change love color while user click
const love = document.querySelector(".fa-heart");
love.addEventListener("click", () => {
  love.classList.toggle("color");
});

const sbtBtn = document.querySelector(".sbtBtn");
let load = document.querySelector(".loading");

sbtBtn.addEventListener("click", () => {
  load.style.display = "block";
  // Simulate a task that takes 2 seconds to complete
  setTimeout(function () {
    load.style.display = "none";
  }, 2000);
});

// send post to server
const form = document.querySelector(".form");

form.addEventListener("click", (e) => {
  e.preventDefault();
});
