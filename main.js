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
waitingtime();
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
  document.getElementById("box5").style.display = "block";
  var count = sessionStorage.getItem("processes");
  var table_data = [];
  gantt = [];
  for (var i = 1; i <= count; i++) {
    var row_data = {};

    for (var j = 0; j <= 3; j++) {
      var cell1 = i;
      var cell2 = document.getElementById("AT" + i.toString()).value;
      var cell3 = document.getElementById("BT" + i.toString()).value;
      var cell4 = document.getElementById("PRIO" + i.toString()).value;

      //if(cell2 != ' ' && cell3 != ' ' && cell4 != ' ' && cell3 != 0){
      row_data["Process"] = +cell1;
      row_data["Arrival"] = +cell2;
      row_data["Burst"] = +cell3;
      row_data["Prio"] = +cell4;
      row_data["Round"] = 0;
      row_data["Start"] = 0;
      row_data["End"] = 0;
    } //else
    //{ alert("Tangina mo wala ka data ayusin mo")    }
    table_data.push(row_data);
  }
  // }
  window.sessionStorage.setItem("table_data", JSON.stringify(table_data));

  calculatePriorityValues(table_data);
}

function calculatePriorityValues(table_data) {
  processes = JSON.parse(sessionStorage.getItem("table_data"));
  var n = processes.length;

  processes.sort((a, b) => a.Arrival - b.Arrival);

  for (i = 1; i < n; i++)
    for (j = 1; j < n; j++) {
      if (processes[i].Prio < processes[j].Prio) {
        var hold = processes[i];
        processes[i] = processes[j];
        processes[j] = hold;
      }
    }

  compute_data(table_data);
}

function compute_data() {
  var comp = 0,
    ms = 0;
  var n = processes.length;

  while (comp < n) {
    var index = -1;
    for (i = 0; i < n; i++) {
      if (processes[i].Arrival <= ms && processes[i].Round === 0) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      //if no process is available to be executed
      processes[index].Start = ms;
      ms += processes[index].Burst;
      processes[index].End = ms;
      gantt.push(processes[index]);
      processes[index].Round++;
      comp++;
    } else {
      gantt.push({ Process: 0 });
      ms++;
    }
  }
  window.sessionStorage.setItem("output", JSON.stringify(gantt));
  //console.log("gantt");
  //console.log(gantt);
  gantt_chart();
}

function gantt_chart() {
  //var output = JSON.parse(sessionStorage.getItem("output"));
  var div = document.getElementById("output");
  var number = gantt.length;
  var chart = document.createElement("table");
  var chart_row = document.createElement("tr");
  var timestamp_div = document.getElementById("time_stamp");
  let burst = 0;
  let width = 65;
  let p = 1;
  chart.id = "gantt_chart";

  for (var j = 0; j < 1; j++) {
    for (var i = 0; i < number; i++) {
      let process_num = gantt[i].Process;
      process_num.toString();
      var gantt_cell = document.createElement("th");
      gantt_cell.id = "gantt_cell" + i.toString();
      gantt_cell.innerHTML = "P" + process_num.toString();
      chart_row.appendChild(gantt_cell);
    }
    chart.appendChild(chart_row);
    div.appendChild(chart);
  }

  for (i = 0; i <= number; i++) {
    var timestamp = document.createElement("label");
    timestamp.id = "time_label" + i.toString();
    timestamp.className = "timestamp";
    var margin = document.createElement("div");
    margin.id = "margin" + i.toString();

    timestamp.innerHTML = burst;
    timestamp_div.appendChild(timestamp);

    if (i < number) {
      var cell_width = document.getElementById("gantt_cell" + i.toString());
      for (j = 0; j < gantt[i].Burst; j++) {
        margin.id = "margin" + i.toString();
        width += 10;
        burst++;
      }

      width.toString();
      cell_width.style.width = width + "px";
      margin.style.width = width + "px";
      timestamp_div.appendChild(margin);
    }
    width = 65;
  }
  turnaroundtime();
}


function turnaroundtime() {
  var gantt = JSON.parse(sessionStorage.getItem("output"));
  var total_tat = document.getElementById("total_TAT");
  var ave_tat = document.getElementById("ave_TAT");
 
  var turnaround_time = 0;
  var average_tat = 0;
  var total_turnaroundtime = 0;
  var processes_tat = 0;
  gantt.sort((a, b) => a.Process - b.Process);
  console.log(gantt);
  for(var i = 0; i<= gantt.length; i++)
  {
    var end_time = 0
    end_time = gantt[i].End;
    turnaround_time = end_time - gantt[i].Arrival;
    total_turnaroundtime += turnaround_time;
    //processes_tat += turnaround_time + ', ';
    console.log(total_turnaroundtime);
    //console.log(processes_tat);
  }
  var turnaround;
  turnaround = total_turnaroundtime.toString();
  console.log(turnaround);
  total_tat.innerHTML = turnaround + "ms";
}
/*function waitingtime() {
  var total_wt = document.getElementById("total_WT");
  var ave_wt = document.getElementById("ave_WT");

  //waiting_time = start - arrival
  //average_wt = total_wt /no.of process

  //total_tat.innerHTML = ;
  //ave_tat.innerHTML = ;
}*/

//turnaround time, average turn around time, waiting time, avarage waiting time
// 1 time button for compute
// if no input alert
// after compute 2nd division
// color
