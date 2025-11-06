var user = JSON.parse(localStorage.getItem("loggedInUser"));
var welcomeText = document.getElementById("welcomeText");
var logoutBtn = document.getElementById("logoutBtn");

// لو مش متسجل دخول، يرجع Login
if (!user) {
  window.location.href = "index.html";
} else if (welcomeText) {
  welcomeText.innerHTML = "Welcome " + user.name;
}

// Logout
if (logoutBtn) {
  logoutBtn.onclick = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  };
}