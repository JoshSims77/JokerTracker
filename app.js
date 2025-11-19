

let jokersList = [];
let filteredList = [];
const tableBody = document.querySelector("#jokerTable tbody");
const searchInput = document.getElementById("search");
const completionSpan = document.getElementById("completion");

const LOCAL_KEY = "jokerCompletion";

// Load JSON
fetch("jokers.json")
    .then(res => res.json())
    .then(data => {
        jokersList = Object.entries(data.Jokers).map(([name, obj]) => ({ name, ...obj }));
        jokersList.sort((a, b) => a.Nr - b.Nr);
        loadLocalStorage();
        renderTable(jokersList);
    });

// Load saved checkboxes from localStorage
function loadLocalStorage() {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
    jokersList.forEach(j => j.checked = saved[j.name] || false);
}

// Save checkboxes to localStorage
function saveLocalStorage() {
    const obj = {};
    jokersList.forEach(j => { obj[j.name] = j.checked; });
    localStorage.setItem(LOCAL_KEY, JSON.stringify(obj));
}

// Render table
function renderTable(list) {
    tableBody.innerHTML = "";
    list.forEach(joker => {
        const tr = document.createElement("tr");
        if (joker.checked) tr.classList.add("checked");

        tr.innerHTML = `
            <td>${joker.Nr}</td>
            <td>${joker.name}</td>
            <td>${joker.Effect}</td>
            <td>${joker.Cost}</td>
            <td>${joker.Rarity}</td>
            <td>${joker.Type}</td>
            <td>${joker.Act}</td>
            <td><input type="checkbox" ${joker.checked ? "checked" : ""}></td>
        `;

        // Checkbox toggle
        tr.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
            joker.checked = e.target.checked;
            saveLocalStorage();
            renderTable(jokersList);
        });

        tableBody.appendChild(tr);
    });

    updateCompletion();
}

// Update completion %
function updateCompletion() {
    const checked = jokersList.filter(j => j.checked).length;
    const total = jokersList.length;
    const percent = Math.round((checked / total) * 100);
    completionSpan.textContent = `Total Completion: ${checked} / ${total} (${percent}%)`;
}

// Search
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    filteredList = jokersList.filter(j => j.name.toLowerCase().includes(term));
    renderTable(filteredList.length ? filteredList : jokersList);
});

// Select / Deselect All
document.getElementById("selectAll").addEventListener("click", () => {
    jokersList.forEach(j => j.checked = true);
    saveLocalStorage();
    renderTable(jokersList);
});

document.getElementById("deselectAll").addEventListener("click", () => {
    jokersList.forEach(j => j.checked = false);
    saveLocalStorage();
    renderTable(jokersList);
});

document.getElementById("jkrUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
        const raw = await parseJkrFile(file);
        alert("Loaded. Check console for RAW LUA.");
    }
    catch (err) {
        console.error(err);
        alert("Failed to read .jkr file.");
    }
});



document.getElementById("jkrUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Use JokerFilter to extract order table
        const orderTable = JokerFilter.getJokerOrderTable(uint8Array, jkr.decompress);
        console.log('Order table:', orderTable);

        alert("Joker order table extracted. Check console.");
    } catch (err) {
        console.error(err);
        alert("Failed to read .jkr file.");
    }
});



