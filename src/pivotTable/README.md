# Requirements

jQuery https://jquery.com/

# Exemple

```
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="jquery-3.2.1.js"></script>
	<script type="text/javascript" src="pivot-table.js"></script>
</head>
<body>	
<div class="w3-row w3-margin">
	<div class="w3-col">
		<table class="pivot-table">
				<thead>
                    <tr>
                        <th>Id</th>
                        <th>Name and last name</th>
                        <th>E-mail</th>
                    </tr>
				</thead>
				<tr>
                    <td>1</td>
                    <td>Jon Doe</td>
                    <td>jon@company.com</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Gina Frost</td>
                    <td>gina@company.com</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Julius Black</td>
                    <td>julius@company.com</td>
                </tr>
			</table>
		</div>
	</div>
</body>
</html>
```
<table>
	<thead>
		<tr>
			<th>Id</th>
			<th>Name and last name</th>
			<th>E-mail</th>
		</tr>
	</thead>
	<tr>
		<td>1</td>
		<td>Jon Doe</td>
		<td>jon@company.com</td>
	</tr>
	<tr>
		<td>2</td>
		<td>Gina Frost</td>
		<td>gina@company.com</td>
	</tr>
	<tr>
		<td>3</td>
		<td>Julius Black</td>
		<td>julius@company.com</td>
	</tr>
</table>

After screen width limit achieved, the pivot table is activated. The limit screen is 600px by default, you can change this value directly in pivot-table.js in line `var minWindowSize = 600;`

<table>
	<tr>
		<th>Id</th>
		<td>valor 1</td>
	</tr>
	<tr>
		<th>Name and last name</th>
		<td>valor 2</td>
	</tr>
	<tr>
		<th>E-mail</th>
		<td>valor 3</td>
	</tr>
</table>

<table>
	<tr>
		<th>Id</th>
		<td>valor 1</td>
	</tr>
	<tr>
		<th>Name and last name</th>
		<td>valor 2</td>
	</tr>
	<tr>
		<th>E-mail</th>
		<td>valor 3</td>
	</tr>
</table>

<table>
	<tr>
		<th>Id</th>
		<td>valor 1</td>
  	</tr>
	<tr>
		<th>Name and last name</th>
		<td>valor 2</td>
	</tr>
	<tr>
		<th>E-mail</th>
		<td>valor 3</td>
	</tr>
</table>
