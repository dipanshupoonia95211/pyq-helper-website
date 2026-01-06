async function createAdmin() {
  const res = await fetch("http://localhost:5000/api/auth/create-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      secret: secret.value
    })
  });

  const data = await res.json();
  msg.innerText = data.message || "Error creating admin";
}
