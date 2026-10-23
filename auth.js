
function showMessage(text, type) {
  const message = document.getElementById("message");
  if (!message) return;

  message.textContent = text;
  message.className = "message " + type;
}

// إظهار وإخفاء كلمة المرور
document.querySelectorAll(".toggle-password").forEach(button => {
  button.addEventListener("click", function () {
    const input = document.getElementById(this.dataset.target);

    if (input.type === "password") {
      input.type = "text";
      this.textContent = "إخفاء";
      this.setAttribute("aria-label", "إخفاء كلمة المرور");
    } else {
      input.type = "password";
      this.textContent = "إظهار";
      this.setAttribute("aria-label", "إظهار كلمة المرور");
    }
  });
});

// إنشاء حساب
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!firstName || !lastName || !email || !password || !confirm) {
  showMessage("يرجى تعبئة جميع الحقول.", "error");
  return;
}

if (firstName.length < 2 || lastName.length < 2) {
  showMessage("يجب أن يحتوي الاسم الأول واسم العائلة على حرفين على الأقل.", "error");
  return;
}

const namePattern = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
  showMessage("يرجى إدخال اسم صحيح باستخدام الحروف فقط.", "error");
  return;
}
    if (password.length < 8) {
      showMessage(
        "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
        "error"
      );
      return;
    }

    if (password !== confirm) {
      showMessage("كلمتا المرور غير متطابقتين.", "error");
      return;
    }

    showMessage(
       "تم التحقق من البيانات بنجاح. إنشاء الحساب تجريبي حاليًا.",
  "success"
    );
  });
}

// تسجيل الدخول

 // تسجيل الدخول - Frontend Demo
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      showMessage("يرجى إدخال البريد الإلكتروني وكلمة المرور.", "error");
      return;
    }

// Frontend Demo - distinguish admin from regular user
const adminEmail = "admin@maseer.com";

if (email.toLowerCase() === adminEmail)  {
  sessionStorage.setItem("maseerDemoAdmin", "true");
  window.location.href = "admin-quiz.html";
} else {
  sessionStorage.setItem("maseerDemoUser", "true");
  window.location.href = "index.html";
}
  });
}


// User Logout - Frontend Demo
function logoutUser() {
  sessionStorage.removeItem("maseerDemoUser");
  window.location.href = "index.html";
}

