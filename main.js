let total_process = 4,
  process_count = 0,
  p_number = 0,
  arrival_time = 0,
  burst_time = 0,
  priority_num = 0,
  gantt = [];
var data = [];
var table_data = [];
var processes;
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
  var table_data = [];
  gantt=[];
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
      row_data["Round"] = 0;
      row_data["Start"] = 0;
      row_data["End"] = 0;
    }
    table_data.push(row_data);
  }
  
  window.sessionStorage.setItem("table_data", JSON.stringify(table_data));
  calculatePriorityValues(table_data);
  //window.open("compute.html", "_self");
}


function calculatePriorityValues(table_data) {
  processes = JSON.parse(sessionStorage.getItem("table_data"));
  var n = processes.length;
  
  processes.sort((a,b) => a.Arrival-b.Arrival)

  for(i = 1; i < n; i++)
    for( j =1; j< n; j++)
    {
      if(processes[i].Prio < processes[j].Prio)
      {
        var hold = processes[i];
        processes[i] = processes[j];
        processes [j] = hold;
      }
    
    }
    
  compute_data(table_data);
}

function compute_data() {
  var comp = 0, ms = 0;
  var n = processes.length;


  while ( comp  < n)
  {
    var index = -1; 
    for(i = 0; i < n; i++) //process execution
    {  
      if(processes[i].Arrival <= ms && processes[i].Round === 0)
      {
        index = i;
        break;
 
      } 
    }
    if(index != -1) //if no process is available to be executed
    {
      processes[index].Start = ms;
      ms += processes[index].Burst;
      processes[index].End = ms;
      gantt.push(processes[index]);
      processes[index].Round++;
      comp++;
    }
    else
    {
      gantt.push({Process: 0});
      ms++;
    }
  }
  window.sessionStorage.setItem("output", JSON.stringify(gantt));
  console.log(gantt);
 gantt_chart();
}

function gantt_chart()
{
  gantt = JSON.parse(sessionStorage.getItem("output"));
  var chart = document.getElementById("gantt_chart");
  var number = gantt.length;
  var chart_row = document.createElement("tr");
  
  for (var i = 0; i <= number; i++) {

    var gantt_cell = document.createElement("th");
      
    gantt_cell.id = "gantt_cell" + i.toString();
    gantt_cell.className = "cell";
    gantt_cell.innerHTML = gantt[i].Process;
  }
}


 