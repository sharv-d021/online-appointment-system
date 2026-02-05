// ---------- SIGNUP (ROLE DECIDED HERE) ----------
function signupUser(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("signupRole").value;

  if(!name || !email || !phone || !password){
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  const exists = users.find(u => u.email === email);

  if(exists){
    alert("You already have an account. Please login.");
    window.location.href = "login.html";
    return;
  }

  const newUser = { name, email, phone, password, role };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // create active session
  localStorage.setItem("user", JSON.stringify(newUser));
  localStorage.setItem("activeSession", role);

  window.location.href = "../user-dashboard.html";
}

// ---------- LOGIN (CHECK FROM USERS LIST) ----------
function loginUser(){
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  if(!email || !password){
    msg.style.color="red";
    msg.innerText = "Enter email and password";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const found = users.find(
    u => u.email === email && u.password === password
  );

  if(!found){
    msg.style.color="red";
    msg.innerText = "Invalid email or password.";
    return;
  }

  // create session
  localStorage.setItem("user", JSON.stringify(found));
  localStorage.setItem("activeSession", found.role);

  msg.style.color="green";
  msg.innerText = "Login successful!";

  setTimeout(()=>{
    if(found.role === "admin"){
      window.location.href="../admin.html";
    } else {
      window.location.href="../user-dashboard.html";
    }
  },1000);
}

// ---------- FORGOT PASSWORD (STATIC DEMO) ----------
function resetPassword(){
  const email = document.getElementById("resetEmail").value;
  const msg = document.getElementById("resetMsg");

  if(!email){
    msg.style.color="red";
    msg.innerText = "Enter your email first!";
    return;
  }

  msg.style.color="green";
  msg.innerText = "Reset link sent to your email (demo).";
}
