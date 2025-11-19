let jokers = [];
let checkedJokers = new Set();

// Load checked jokers from localStorage
const savedChecked = localStorage.getItem('checkedJokers');
if (savedChecked) {
    checkedJokers = new Set(JSON.parse(savedChecked));
}

// Fetch jokers data
fetch('/api/jokers')
    .then(res => res.json())
    .then(data => {
        jokers = data;
        renderTable(jokers);
        updateCompletion(); // initial total completion
    });

// Render table
function renderTable(list) {
    const tbody = document.querySelector('#jokerTable tbody');
    tbody.innerHTML = '';

    // Separate unchecked and checked
    const unchecked = list.filter(j => !checkedJokers.has(j.Nr));
    const checked = list.filter(j => checkedJokers.has(j.Nr));

    const combined = [...unchecked, ...checked];

    combined.forEach(joker => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td data-label="#">${joker.Nr}</td>
            <td data-label="Name">${joker.Name}</td>
            <td data-label="Effect">${joker.Effect}</td>
            <td data-label="Cost">${joker.Cost}</td>
            <td data-label="Rarity">${joker.Rarity}</td>
            <td data-label="Type">${joker.Type}</td>
            <td data-label="Act">${joker.Act}</td>
            <td data-label="Gold Stake"><input type="checkbox" ${checkedJokers.has(joker.Nr) ? 'checked' : ''} data-nr="${joker.Nr}"></td>
        `;

        // checked class for sorting / styling
        tr.classList.toggle('checked', checkedJokers.has(joker.Nr));

        tbody.appendChild(tr);
    });

    // checkbox event listeners
    document.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const nr = parseInt(e.target.dataset.nr);
            if (e.target.checked) checkedJokers.add(nr);
            else checkedJokers.delete(nr);

            localStorage.setItem('checkedJokers', JSON.stringify([...checkedJokers]));
            renderTable(list);
            updateCompletion();
        });
    });
}

// Search functionality
document.querySelector('#search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = jokers.filter(j => j.Name.toLowerCase().includes(query));
    renderTable(filtered);
});

// Select All / Deselect All
document.querySelector('#selectAll').addEventListener('click', () => {
    jokers.forEach(j => checkedJokers.add(j.Nr));
    localStorage.setItem('checkedJokers', JSON.stringify([...checkedJokers]));
    renderTable(jokers);
    updateCompletion();
});

document.querySelector('#deselectAll').addEventListener('click', () => {
    checkedJokers.clear();
    localStorage.setItem('checkedJokers', JSON.stringify([...checkedJokers]));
    renderTable(jokers);
    updateCompletion();
});

// Update total completion counter
function updateCompletion() {
    const total = jokers.length;
    const checked = checkedJokers.size;
    const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
    document.getElementById('completion').textContent =
        `Total Completion: ${checked} / ${total} (${percent}%)`;
}
