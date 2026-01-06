async function login() {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "admin.html";
  } else {
    error.innerText = "Invalid username or password";
  }
}

/* 👁 SHOW / HIDE PASSWORD */
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}
