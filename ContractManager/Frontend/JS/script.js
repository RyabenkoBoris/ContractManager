document.getElementById('file-upload').addEventListener('change', function() {
    var fileName = this.value.split('\\').pop();
    document.getElementById('file-selected').innerHTML = fileName;
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-upload');
    const formData = new FormData();
    if (fileInput.files.length > 0) {
        formData.append('csvFile', fileInput.files[0]);
       
        fetch("https://localhost:7158/Contracts", {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return location.reload(true);
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please select a CSV file to upload.');
    }
});

const result = await fetch("https://localhost:7158/Contracts")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })

const tableElement = document.getElementById("contractTable");
console.log(result);
result.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.value = item.name;
    nameInput.classList = "input";
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    const dobCell = document.createElement("td");
    const dobInput = document.createElement("input");
    dobInput.type = "date";
    dobInput.classList = "input";
    dobInput.value = item.date;
    dobCell.appendChild(dobInput);
    row.appendChild(dobCell);

    const marriedCell = document.createElement("td");
    const marriedInput = document.createElement("input");
    marriedInput.type = "checkbox";
    marriedInput.classList = "input";
    marriedInput.checked = item.married;
    marriedCell.appendChild(marriedInput);
    row.appendChild(marriedCell);

    const phoneCell = document.createElement("td");
    const phoneInput = document.createElement("input");
    phoneInput.value = item.phone;
    phoneInput.classList = "input";
    phoneCell.appendChild(phoneInput);
    row.appendChild(phoneCell);

    const salaryCell = document.createElement("td");
    const salaryInput = document.createElement("input");
    salaryInput.type = "number";
    salaryInput.classList = "input";
    salaryInput.value = item.salary.toFixed(4);
    salaryCell.appendChild(salaryInput);
    row.appendChild(salaryCell);

    const editCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList = "edit-button";
    editButton.onclick = () => editRow(item.id, row);
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => deleteRow(item.id);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableElement.querySelector("tbody").appendChild(row);
});

function editRow(id, row){
    const name = row.cells[0].querySelector("input").value;
    const date = row.cells[1].querySelector("input").value;
    const married = row.cells[2].querySelector("input").checked;
    const phone = row.cells[3].querySelector("input").value;
    const salary = parseFloat(row.cells[4].querySelector("input").value);
    const updatedItem = { id, name, date, married, phone, salary };
    console.log(JSON.stringify(updatedItem));

    fetch(`https://localhost:7158/Contracts`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedItem)
    });
}

function deleteRow(id){
    fetch(`https://localhost:7158/Contracts/${id}`, {
        method: "DELETE",
    }).then(response => {
        if (response.ok) {
            return location.reload(true);
        }
        throw new Error('Network response was not ok.');
    });
}

