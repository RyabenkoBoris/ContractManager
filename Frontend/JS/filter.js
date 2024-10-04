function filterTable() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("contractTable");
  const tr = table.getElementsByTagName("tr");
  
  for (let i = 1; i < tr.length; i++) {
    let isMatch = false;

    const tds = tr[i].getElementsByTagName("td");

    for (let j = 0; j < tds.length; j++) {
      let txtValue;
      if (tds[j]) {
        if (j === 2) {
          const isChecked = tds[j].querySelector("input").checked;
          txtValue = isChecked ? "YES" : "NO";
        } else {
          txtValue = tds[j].querySelector("input") ? tds[j].querySelector("input").value : tds[j].textContent;
        }

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          isMatch = true;
          break;
        }
      }
    }

    tr[i].style.display = isMatch ? "" : "none";
  }
}