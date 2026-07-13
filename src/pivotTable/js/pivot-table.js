var minWindowSize = 600;

function pivot(tables) {
	for (var w=0; w<tables.length;w++) {
		pivotContainer = document.getElementById("pivot-container"+(w+1));
		if (pivotContainer != null) {
			$(pivotContainer).addClass("pivot-container-show")
			$(pivotContainer).removeClass("pivot-container-hide")
			$(tables[w]).addClass("pivot-table-hide")
			$(tables[w]).removeClass("pivot-table-show")
			continue;
		}

		table = tables[w];
		headerRow = table.querySelector("thead > tr");
		rows = table.querySelectorAll("tbody > tr");
		divTable = document.createElement('div');

		divTable.id = "pivot-container"+(w+1);
		for (var i=0; i<rows.length; i++) {
			pivotTable = document.createElement('table');
			pivotTable.classList.add("pivot-table-fragment")

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
		$(divTable).insertAfter(tables[w])
		$(tables[w]).addClass("pivot-table-hide")
		$(tables[w]).removeClass("pivot-table-show")
	}
}

function restore(tables) {
	for (var w=0; w < tables.length;w++) {
		pivotContainer = document.getElementById("pivot-container"+(w+1));
		if (pivotContainer != null) {
			$(pivotContainer).addClass("pivot-container-hide")
			$(pivotContainer).removeClass("pivot-container-show")
		}
		$(tables[w]).addClass("pivot-table-show")
		$(tables[w]).removeClass("pivot-table-hide")
	}
}

function pivoting() {
	var tables = $(".pivot-table");	
	if (window.innerWidth <= minWindowSize) {
		pivot(tables, minWindowSize)
	} else {
		restore(tables)
	}
	
	var tablesToPivot = $(".pivot-table.pivot");
	if (tablesToPivot.length > 0) {
		pivot($(".pivot-table.pivot"), minWindowSize)
	}
}

$(document).ready(function(){
	pivoting()
});

window.addEventListener('resize', function(){
	pivoting()
});
