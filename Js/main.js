//varible
var loginForm = document.getElementById("loginForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var message = document.getElementById("loginMessage");

// حدث submit للفورم
loginForm.addEventListener("submit", function(e) {
  e.preventDefault(); // يمنع إعادة تحميل الصفحة

  var email = emailInput.value.trim().toLowerCase();
  var password = passwordInput.value.trim();

  // التحقق من الحقول الفارغة
  if (email === "" || password === "") {
    message.textContent = "All fields are required";
    message.style.color = "orange";
    return;
  }

  // جلب المستخدمين من localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var user = users.find(function(u) {
    return u.email === email && u.password === password;
  });

  if (user) {
    // حفظ المستخدم الحالي وتوجيهه للصفحة الرئيسية
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "home.html";
  } else {
    
    message.textContent = "Invalid email or password";
    message.style.color = "red";
    
  }
});
