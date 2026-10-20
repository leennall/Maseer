
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

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirm) {
      showMessage("يرجى تعبئة جميع الحقول.", "error");
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
      "تم التحقق من البيانات. سيتم تفعيل إنشاء الحساب بعد ربط Firebase.",
      "success"
    );
  });
}

// تسجيل الدخول
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

    showMessage(
      "تم التحقق من الحقول. سيتم تفعيل تسجيل الدخول بعد ربط Firebase.",
      "success"
    );
  });
}
