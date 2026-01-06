const API_URL = "http://localhost:5000/api/papers";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const tableBody = document.getElementById("papersTable");
const uploadForm = document.getElementById("uploadForm");
const logoutBtn = document.getElementById("logoutBtn");

/* =========================
   LOAD PAPERS (ADMIN)
========================= */
async function loadPapers() {
  tableBody.innerHTML = "";

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Unauthorized");

    const papers = await res.json();

    if (papers.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;">
            No papers uploaded yet
          </td>
        </tr>`;
      return;
    }

    papers.forEach(p => {
      tableBody.innerHTML += `
        <tr>
          <td>${p.subject}</td>
          <td>${p.year}</td>
          <td>${p.semester}</td>
          <td>${p.type}</td>
          <td>
            <a href="http://localhost:5000${p.filePath}" target="_blank">View</a> |
            <a href="http://localhost:5000${p.filePath}" download>Download</a> |
            <button class="delete-btn" data-id="${p._id}">Delete</button>
          </td>
        </tr>`;
    });

    attachDeleteEvents();

  } catch (err) {
    console.error(err);
    alert("Failed to load papers");
  }
}

/* =========================
   DELETE
========================= */
function attachDeleteEvents() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = async () => {
      if (!confirm("Delete this paper?")) return;

      const res = await fetch(`${API_URL}/${btn.dataset.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      alert(data.message);
      loadPapers();
    };
  });
}

/* =========================
   UPLOAD
========================= */
uploadForm.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(uploadForm);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Upload failed");
    return;
  }

  alert("Upload successful ✅");
  uploadForm.reset();
  loadPapers();
});

/* =========================
   LOGOUT
========================= */
logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

/* INIT */
loadPapers();
