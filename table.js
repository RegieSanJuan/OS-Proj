function generateTable() {
    // Get user input
    var numRows = document.getElementById('rows').value;
  
    // Create a table element
    var table = document.createElement('table');
  
    // Fixed number of columns
    var numColumns = 4;
  
    // Create table header with column names
    var headerRow = table.insertRow();
    for (var i = 0; i < numColumns; i++) {
      var headerCell = headerRow.insertCell();
      headerCell.textContent = 'Column ' + (i + 1);
    }
  
    // Create table rows and cells based on user input
    for (var i = 0; i < numRows; i++) {
      var row = table.insertRow();
  
      for (var j = 0; j < numColumns; j++) {
        var cell = row.insertCell();
        cell.textContent = 'Row ' + (i + 1) + ', Col ' + (j + 1);
      }
    }
  
    // Display the table in the body
    document.body.innerHTML = '';
    document.body.appendChild(table);
  }
  