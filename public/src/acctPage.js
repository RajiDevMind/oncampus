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

// const preview = document.querySelector(".file");

// preview.addEventListener("onchange", (e) => {
//   const fileInput = e.target;
//   const file = fileInput.files[0];

//   if (file) {
//     const imagePreview = document.querySelector(".image-preview");
//     imagePreview.innerHTML = `<p>Selected File: ${file.src}</p>`;
//   }
// });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const files = [];
  const formData = new FormData(e.currentTarget);

  const getFiles = document.querySelectorAll(".input[type='file']");
  getFiles.forEach((inputFile) => {
    const file = inputFile.files[0];
    files.push(file);
    formData.append(inputFile.name, file);
  });

  const values = [...formData.values()];

  if (values.some((value) => value === "")) {
    displayAlert("Empty input is unacceptable!", "danger");
    return;
  } else {
    displayAlert("Loading...", "success");
  }
  console.log(values);

  try {
    const response = await fetch("http://localhost:4000/oncampus/post", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!response.ok) {
      displayAlert("Something went wrong, Try again!", "danger");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    window.location.assign("./src/acctPage.html");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }

  e.currentTarget.reset();
});

// display alert functionality
const alert = document.querySelector(".alert");

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
