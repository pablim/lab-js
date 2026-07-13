const minWindowSize = 600;

const split = (tables) => {

	for (const table of tables) {
		console.log(table);

		const headerRow = table.querySelector("thead > tr");
		const rows = table.querySelectorAll("tbody > tr");
		const responsiveClass = table.classList.contains("responsive-splited")
		const divTable = document.createElement('div');

		divTable.classList.add("splited-container");
		if (responsiveClass) divTable.classList.add("responsive-splited");

		for (const row of rows) {

			const splitedTable = document.createElement('table');
			splitedTable.classList.add("splited-table-fragment")

			const contentCells = row.cells;
			const headerCells = headerRow.cells;

			for (var j = 0; j < headerCells.length; j++) {
				const newRow = splitedTable.insertRow();
				newRow.append(headerCells[j].cloneNode(true));
				newRow.append(contentCells[j].cloneNode(true));
			}

			divTable.appendChild(splitedTable);
		}

		table.after(divTable)
	}
	
	Array.from(tables).forEach(table => table.remove())
}

const join = (splitedContainers) => {
	for (const container of splitedContainers) {
		const tables = container.querySelectorAll("table")
		const headers = tables[0].querySelectorAll("th")
		const table = document.createElement('table');
		table.classList.add("splited-table")
		table.classList.add("responsive-splited")

		const data = []
		
		for (const table of tables) {
			const tableData = table.querySelectorAll("td")
			data.push(tableData)
		}
		
		const tHead = table.createTHead()
		const tBody = table.createTBody()
		const rowHeader = table.insertRow()

		rowHeader.append(...headers)
		tHead.append(rowHeader)

		data.map((rowData) => {	
			const row = table.insertRow()
			row.append(...rowData)
			tBody.append(row)
		})

		container.after(table)
		container.remove()
	}
}

const spliting = () => {
	var tables = document
		.getElementsByClassName("splited-table responsive-splited");	
	var containers = document
		.getElementsByClassName("splited-container responsive-splited");	
	var tablesToSplit = document
		.getElementsByClassName("splited-table splited");
	
	if (window.innerWidth <= minWindowSize && tables.length) 
		split(tables, minWindowSize) 
	
	if (window.innerWidth > minWindowSize && containers.length) 
		join(containers) 
	
	if (tablesToSplit.length > 0) split(tablesToSplit, minWindowSize)	
}

export { split, join, spliting }