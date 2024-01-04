let total_process = 4,
  process_count = 0,
  p_number = 0,
  arrival_time = 0,
  burst_time = 0,
  priority_num = 0;

var data = [];
var table_data = [];
//const
//ONCLICK ANIMATIONS
generate_table();
//compute_data()

//MAIN.HTML
function decrease_process() {
  if (total_process > 4) {
    total_process -= 1;
    document.getElementById("process").innerHTML = total_process;
  }
}
function increase_process() {
  if (total_process < 8) {
    total_process += 1;
    document.getElementById("process").innerHTML = total_process;
  }
}
function table() {
  total_process = document.getElementById("process").textContent;
  process_count = Number(total_process);
  window.sessionStorage.setItem("processes", process_count);
  window.open("process.html", "_self");
}

function generate_table() {
  process_count = sessionStorage.getItem("processes");
  var Table = document.getElementById("tables");
  var count = process_count;
  //count = Number(count);
  //Table.innerHTML = "";
  if (count == 5) {
    document.getElementById("box3").id = "box3_5";
  }
  if (count == 6) {
    document.getElementById("box3").id = "box3_6";
  }
  if (count == 7) {
    document.getElementById("box3").id = "box3_7";
  }
  if (count == 8) {
    document.getElementById("box3").id = "box3_8";
  }
  for (var i = 1; i <= count; i++) {
    var tr = document.createElement("tr");

    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");

    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var input3 = document.createElement("input");

    tr.id = "row" + i.toString();

    cell1.className = "font_color";
    cell1.id = "p" + i.toString();

    input1.id = "AT" + i.toString();
    input1.type = "number";
    input1.className = "cell";
    input1.placeholder = "0";
    input1.min = "0";

    input2.id = "BT" + i.toString();
    input2.type = "number";
    input2.className = "cell";
    input2.placeholder = "1";
    input2.min = "1";

    input3.id = "PRIO" + i.toString();
    input3.type = "number";
    input3.className = "cell";
    input3.placeholder = "0";
    input3.min = "0";

    cell1.innerHTML = "P" + i.toString();
    cell2.appendChild(input1);
    cell3.appendChild(input2);
    cell4.appendChild(input3);
    tr.appendChild(cell1);
    tr.appendChild(cell2);
    tr.appendChild(cell3);
    tr.appendChild(cell4);
    Table.appendChild(tr);
  }
}

//PROCESS.HTML
function back() {
  window.open("main.html", "_self");
}

function proceed() {
  var count = sessionStorage.getItem("processes");
  //var table = document.getElementById("tables");
  //var count = process_count;

  var table_data = [];

  for (var i = 1; i <= count; i++) {
    var row_data = {};

    for (var j = 0; j <= 3; j++) {
      var cell1 = document.getElementById("p" + i.toString()).textContent;
      var cell2 = document.getElementById("AT" + i.toString()).value;
      var cell3 = document.getElementById("BT" + i.toString()).value;
      var cell4 = document.getElementById("PRIO" + i.toString()).value;

      row_data["Process"] = cell1;
      row_data["Arrival"] = +cell2;
      row_data["Burst"] = +cell3;
      row_data["Prio"] = +cell4;
    }
    table_data.push(row_data);
  }
  //sessionStorage.setItem("tableData", JSON.stringify(table_data));
  var processes_arrival_burst_prio = [];
  for (var i = 0; i < table_data.length; i++) {
    var process = table_data[i]["Process"];
    var arrival = table_data[i]["Arrival"];
    var burst = table_data[i]["Burst"];
    var prio = table_data[i]["Prio"];

    processes_arrival_burst_prio.push([process, arrival, burst, prio]);
  }

  window.sessionStorage.setItem("table_data", JSON.stringify(table_data));
  calculatePriorityValues(table_data);
  //window.open("compute.html", "_self");
}

function calculatePriorityValues(table_data) {
  var processes = JSON.parse(sessionStorage.getItem("table_data"));
  var n = processes.length;
  
  
}

function compute_data() {
  // Get process data from session storage
  var process_data = JSON.parse(sessionStorage.getItem("processes_data"));

  // Sort process data based on arrival time, burst time, and priority
  process_data.sort(function (a, b) {
    return a.Arrival - b.Arrival || a.Burst - b.Burst || a.Prio - b.Prio;
  });

  //gantt chart generation depending on the number of processes
  //sort by arrival time
  //using queue print and pop the data of index 0 in the array
  //sort by priority number
  //print the data in gantt chart
  //make the width of every cell in gantt chart depend on the burst time of every process

  // Compute waiting time and turnaround time for each process
  var current_time = 0;
  for (var i = 0; i < process_data.length; i++) {
    var process = process_data[i];
    current_time += process.Arrival;
    process.Waiting = current_time - process.Arrival;
    process.Turnaround = process.Waiting + process.Burst;
    current_time += process.Burst;
  }

  // Store computed process data in session storage
  sessionStorage.setItem("processes_data", JSON.stringify(process_data));
}
