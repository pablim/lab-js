$(document).ready(function(){
  var windowWidth;
  var windowHeight;
  var minWindowSize = 600;

  var tables = $(".pv-pivot-table");

  function sizeOfThings(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  };

  sizeOfThings();
  if (windowWidth <= minWindowSize) {
    transposta();
  }

  function transposta() {
    if (windowWidth <= minWindowSize) {
      for (var w=0; w<tables.length;w++) {
        divJaCriado = document.getElementById("div-pivot"+(w+1));
        if (divJaCriado != null) {
          divJaCriado.style.display = "block";
          tables[w].style.display = "none";
          continue;
        }

        table = tables[w];
        headerRow = table.querySelector("thead > tr");
        rows = table.querySelectorAll("tbody > tr");
        divTable = document.createElement('div');

        divTable.id = "div-pivot"+(w+1);
        divTable.style.margin = "16px";
        for (var i=0; i<rows.length; i++) {
          pivotTable = document.createElement('table');
          pivotTable.className = table.className.replace("pv-pivot-table", "");
          pivotTable.style.marginBottom = "10px";

          contentCells = rows[i].cells;
          headerCells = headerRow.cells;
          for (var j=0; j<headerCells.length; j++) {
            newRow = document.createElement('tr');
            newRow.appendChild(headerCells[j].cloneNode(true));
            newRow.appendChild(contentCells[j].cloneNode(true));
            pivotTable.appendChild(newRow);
          }
          divTable.appendChild(pivotTable);
        }
        document.body.appendChild(divTable);
        tables[w].style.display = "none";
      }
    } else {
      for (var w=0; w<tables.length;w++) {
        divJaCriado = document.getElementById("div-pivot"+(w+1));
        if (divJaCriado != null)
          divJaCriado.style.display = "none";
        tables[w].style.display = "table";
      }
    }
  }
  window.addEventListener('resize', function(){
      sizeOfThings();
      transposta();
  });
});
