var form = document.getElementById('registerForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passInput = document.getElementById('password');

var nameErr = document.getElementById('nameErr');
var emailErr = document.getElementById('emailErr');
var passErr = document.getElementById('passErr');
var alertBox = document.getElementById('alertBox');

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showErr(el, msg){
  el.textContent = msg;
  el.classList.remove('d-none');
}
function hideErr(el){
  el.textContent = '';
  if(!el.classList.contains('d-none')) el.classList.add('d-none');
}

function getUsers(){
  var raw = localStorage.getItem('users');
  if(!raw) return [];
  try{ return JSON.parse(raw); }catch(e){ return []; }
}
function saveUsers(arr){ localStorage.setItem('users', JSON.stringify(arr)); }

function emailExists(email){
  var users = getUsers();
  for(var i=0;i<users.length;i++){
    if(users[i].email === email.toLowerCase()){ return true; }
  }
  return false;
}

// real-time validation
emailInput.addEventListener('input', function(){
  if(!emailRegex.test(emailInput.value)){
    showErr(emailErr, 'Please enter a valid email address.');
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  } else if(emailExists(emailInput.value.toLowerCase())){
    showErr(emailErr, 'This email is already registered.');
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  } else {
    hideErr(emailErr);
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
  }
});

nameInput.addEventListener('input', function(){
  if(nameInput.value.trim().length === 0){
    showErr(nameErr, 'Name cannot be empty.');
    nameInput.classList.add('is-invalid');
    nameInput.classList.remove('is-valid');
  } else {
    hideErr(nameErr);
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
  }
});

passInput.addEventListener('input', function(){
  if(passInput.value.length < 6){
    showErr(passErr, 'Password must be at least 6 characters.');
    passInput.classList.add('is-invalid');
    passInput.classList.remove('is-valid');
  } else {
    hideErr(passErr);
    passInput.classList.remove('is-invalid');
    passInput.classList.add('is-valid');
  }
});

form.addEventListener('submit', function(e){
  e.preventDefault();
  alertBox.classList.add('d-none');
  alertBox.classList.remove('alert-success','alert-danger');

  var nameVal = nameInput.value.trim();
  var emailVal = emailInput.value.trim().toLowerCase();
  var passVal = passInput.value;
  var valid = true;

  if(nameVal.length === 0){
    showErr(nameErr, 'Name cannot be empty.'); valid = false;
  }
  if(!emailRegex.test(emailVal)){
    showErr(emailErr, 'Please enter a valid email address.'); valid = false;
  }
  if(emailExists(emailVal)){
    showErr(emailErr, 'This email is already registered.'); valid = false;
  }
  if(passVal.length < 6){
    showErr(passErr, 'Password must be at least 6 characters.'); valid = false;
  }

  if(!valid) return;

  var users = getUsers();
  users.push({ name: nameVal, email: emailVal, password: passVal });
  saveUsers(users);

  alertBox.textContent = 'Registration successful! Redirecting...';
  alertBox.classList.remove('d-none');
  alertBox.classList.add('alert-success');

  setTimeout(function(){
    window.location.href = 'index.html';
  }, 1200);
});