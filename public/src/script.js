const toggleCard = document.querySelectorAll("#toggleCard");
const btn = document.querySelector(".btn");
const displayCard = document.querySelector(".form-container");
const sbtBtn = document.querySelectorAll(".sbtBtn");

// display overlay of register page
btn.addEventListener("click", () => {
  if (displayCard.classList.contains("form-container")) {
    displayCard.classList.toggle("display-form");
  }
});

// flipping card to register or login pages
toggleCard.forEach((touch) => {
  touch.addEventListener("click", () => {
    const card = document.querySelector(".card");
    card.classList.toggle("flip");
  });
});

// show loading state(animation) when user click register or login btn
let load = document.querySelectorAll(".loading");

sbtBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    load.forEach((item) => {
      item.style.display = "block";
      // Simulate a task that takes 2 seconds to complete
      setTimeout(function () {
        item.style.display = "none";
      }, 2000);
    });
  });
});

// sending user inputs to the server
const registerValidateForm = document.querySelector("#registerValidateForm");
const loginValidateForm = document.querySelector("#loginValidateForm");

const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

registerValidateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:4000/oncampus/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.status === 200) {
    window.location.assign("acctPage.html");
    alert("Successfully Registered!");
    response.json().then((data) => console.log(data));
  } else {
    alert("Registration failed! Try again.");
    response.json().catch((error) => console.log(error));
    return;
  }

  username.value = "";
  email.value = "";
  password.value = "";
});

// const email = document.getElementById("logEmail").value;
// const password = document.getElementById("logPassword").value;

loginValidateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:4000/oncampus/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.ok) {
    window.location.assign("acctPage.html");
    response.json().then((data) => console.log(data));
  } else {
    response.json().catch((error) => console.log(error));
    alert("Invalid login details");
    return;
  }
  email.value = "";
  password.value = "";
});