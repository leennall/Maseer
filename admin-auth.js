// Admin Logout - Frontend Demo

function logoutAdmin() {
  // Clear demo admin session
  sessionStorage.removeItem("maseerDemoAdmin");

  // Redirect to homepage
  window.location.href = "index.html";
}

// Connect logout button when available
const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener("click", logoutAdmin);
}