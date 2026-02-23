/* =========================
   AUTH SYSTEM (SESSION FIXED)
   ========================= */

function isValidEmail(email){
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isValidPhone(phone){
  const pattern = /^[0-9]{10}$/;
  return pattern.test(phone);
}

/* ---------- SIGNUP ---------- */
function signupUser(){

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("signupRole").value;
  const msg = document.getElementById("signupMsg");

  msg.innerText="";

  if(!name || !email || !phone || !password){
    msg.style.color="red";
    msg.innerText="Fill all fields.";
    return;
  }

  if(!isValidEmail(email)){
    msg.style.color="red";
    msg.innerText="Invalid email format.";
    return;
  }

  if(!isValidPhone(phone)){
    msg.style.color="red";
    msg.innerText="Phone must be exactly 10 digits.";
    return;
  }

  if(password.length < 6){
    msg.style.color="red";
    msg.innerText="Password must be at least 6 characters.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if(users.find(u => u.email === email)){
    msg.style.color="red";
    msg.innerText="Account already exists.";
    return;
  }

  const newUser = { name, email, phone, password, role };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // ✅ SESSION STORED PER TAB
  sessionStorage.setItem("currentUserEmail", email);
  sessionStorage.setItem("activeSession", role);

  setTimeout(()=>{
    role === "admin"
      ? window.location.href="../admin.html"
      : window.location.href="../user-dashboard.html";
  },500);
}

/* ---------- LOGIN ---------- */
function loginUser(){

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg");

  msg.innerText="";

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(u => u.email === email && u.password === password);

  if(!user){
    msg.style.color="red";
    msg.innerText="Invalid email or password.";
    return;
  }

  // ✅ SESSION PER TAB
  sessionStorage.setItem("currentUserEmail", user.email);
  sessionStorage.setItem("activeSession", user.role);

  setTimeout(()=>{
    user.role === "admin"
      ? window.location.href="../admin.html"
      : window.location.href="../user-dashboard.html";
  },500);
}