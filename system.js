/* ===============================
   APPOINTEASE CORE SYSTEM ENGINE
   =============================== */

/* ---------- APPOINTMENT ID GENERATOR ---------- */
function generateAppointmentID(){
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `AP-${year}-${random}`;
}


/* ---------- SLOT CONFLICT DETECTION ---------- */
function isSlotBooked(category, place, date, time){
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return bookings.some(b =>
    b.category === category &&
    b.place === place &&
    b.date === date &&
    b.time === time &&
    b.status !== "Rejected"
  );
}


/* ---------- NOTIFICATION SYSTEM ---------- */

function addNotification(email, message){

  let notifications = JSON.parse(localStorage.getItem("notifications") || "{}");

  if(!notifications[email]){
    notifications[email] = [];
  }

  notifications[email].push({
    message,
    time: new Date().toLocaleString(),
    read:false
  });

  localStorage.setItem("notifications", JSON.stringify(notifications));
}

function getUserNotifications(email){
  const notifications = JSON.parse(localStorage.getItem("notifications") || "{}");
  return notifications[email] || [];
}

function getUnreadCount(email){
  const list = getUserNotifications(email);
  return list.filter(n => !n.read).length;
}

function markNotificationsRead(email){
  let notifications = JSON.parse(localStorage.getItem("notifications") || "{}");

  if(notifications[email]){
    notifications[email] = notifications[email].map(n => ({...n, read:true}));
  }

  localStorage.setItem("notifications", JSON.stringify(notifications));
}


/* ---------- DARK MODE ---------- */
function toggleDarkMode(){
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

function loadDarkMode(){
  const saved = localStorage.getItem("darkMode");
  if(saved === "true"){
    document.body.classList.add("dark-mode");
  }
}