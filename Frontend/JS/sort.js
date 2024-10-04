function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    const table = document.getElementById("contractTable");
    const arrows = table.getElementsByClassName("sort-arrows");
    Array.from(arrows).forEach(arrow => arrow.innerHTML = "▲<br>▼");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        x = rows[i].getElementsByTagName("TD")[n].querySelector("input");
        y = rows[i + 1].getElementsByTagName("TD")[n].querySelector("input");
        shouldSwitch = false;
        if(n == 2){
            x = x.checked;
            y = y.checked;
        }
        else{
            x = x.value;
            y = y.value;
        }
        if (dir == "asc") {
          if (x > y) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x < y) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
    if(dir === "asc"){
        arrows[n].innerHTML="▲<br><span style='visibility: hidden'>▼</span>";
    }
    else{
        arrows[n].innerHTML="<span style='visibility: hidden'>▲</span><br>▼";
    }
}
