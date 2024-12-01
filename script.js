// Load existing records from localStorage on page load
window.onload = loadFromLocalStorage;

// Add event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('id').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (validateInputs(name, id, email, contact)) {
        addRecord(name, id, email, contact);
        clearForm();
    }
});

// Validate input fields
function validateInputs(name, id, email, contact) {
    if (!name.match(/^[a-zA-Z\s]+$/)) {
        alert("Name must contain only letters and spaces.");
        return false;
    }
    if (!id.match(/^\d+$/)) {
        alert("ID must be a number.");
        return false;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        alert("Invalid email format.");
        return false;
    }
    if (!contact.match(/^\d{10}$/)) {
        alert("Contact number must be 10 digits.");
        return false;
    }
    return true;
}

// Add a new record to the table and localStorage
function addRecord(name, id, email, contact) {
    const table = document.getElementById('recordTable');
    const row = table.insertRow();

    row.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button onclick="editRecord(this)">Edit</button>
            <button onclick="deleteRecord(this)">Delete</button>
        </td>
    `;
    saveToLocalStorage();
}

// Edit an existing record
function editRecord(btn) {
    const row = btn.parentElement.parentElement;
    document.getElementById('name').value = row.cells[0].innerText;
    document.getElementById('id').value = row.cells[1].innerText;
    document.getElementById('email').value = row.cells[2].innerText;
    document.getElementById('contact').value = row.cells[3].innerText;
    row.remove();
    saveToLocalStorage();
}

// Delete a record
function deleteRecord(btn) {
    btn.parentElement.parentElement.remove();
    saveToLocalStorage();
}

// Save records to localStorage
function saveToLocalStorage() {
    const table = document.getElementById('recordTable');
    const data = [];
    for (let row of table.rows) {
        data.push({
            name: row.cells[0].innerText,
            id: row.cells[1].innerText,
            email: row.cells[2].innerText,
            contact: row.cells[3].innerText,
        });
    }
    localStorage.setItem('studentRecords', JSON.stringify(data));
}

// Load records from localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('studentRecords')) || [];
    data.forEach(record => addRecord(record.name, record.id, record.email, record.contact));
}

// Clear form inputs
function clearForm() {
    document.getElementById('registrationForm').reset();
}
