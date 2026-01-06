const API = "http://localhost:5000/api/papers/public";
let papers = [];

async function loadPapers() {
  const res = await fetch(API);
  papers = await res.json();
  render(papers);
}

function render(data) {
  const table = document.getElementById("paperList");
  const empty = document.getElementById("emptyMsg");
  table.innerHTML = "";

  if (!data.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.subject}</td>
        <td>${p.year}</td>
        <td>${p.semester}</td>
        <td>${p.type}</td>
        <td>
          <a href="http://localhost:5000${p.filePath}" target="_blank">View</a>
          |
          <a href="http://localhost:5000${p.filePath}" download>Download</a>
        </td>
      </tr>
    `;
  });
}

loadPapers();
