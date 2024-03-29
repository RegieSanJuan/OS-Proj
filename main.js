let total_process = 4,
  process_count = 0,
  gantt = [];
var processes;
//const
//ONCLICK ANIMATIONS
generate_table();
//waitingtime();
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

//TABLE INPUT
function generate_table() {
  process_count = sessionStorage.getItem("processes");
  var Table = document.getElementById("tables");
  var count = process_count;
  if (count == 5) {
    document.getElementById("box3").style.height = "300px";
  }
  if (count == 6) {
    document.getElementById("box3").style.height = "330px";
  }
  if (count == 7) {
    document.getElementById("box3").style.height = "360px";
  }
  if (count == 8) {
    document.getElementById("box3").style.height = "390px";
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

function back() {
  window.open("index.html", "_self");
}

//PROCEEDING FOR COMPUTATION
function proceed() {
  document.getElementById("box5").style.display = "block";
  var count = sessionStorage.getItem("processes");
  var table_data = [];
  var bool;
  gantt = [];
  for (var i = 1; i <= count; i++) {
    var row_data = {};
    var cell1 = i;
    var cell2 = document.getElementById("AT" + i.toString()).value;
    var cell3 = document.getElementById("BT" + i.toString()).value;
    var cell4 = document.getElementById("PRIO" + i.toString()).value;

    if (cell2 != " " && cell3 != " " && cell4 != " " && cell3 != 0 && cell2 >= 0 && cell3 > 0 && cell4 >=0) {
      row_data["Process"] = +cell1;
      row_data["Arrival"] = +cell2;
      row_data["Burst"] = +cell3;
      row_data["Prio"] = +cell4;
      row_data["Round"] = 0;
      row_data["Start"] = 0;
      row_data["End"] = 0;
      table_data.push(row_data);
      bool = true;
    } else {
      bool = false;
      let popup = document.getElementById("popup");
      popup.style.visibility = "visible";
      popup.style.top = "50%";
      popup.style.transform = "translate(-50%,-50%)scale(1)";
      break;
    }
  }
  window.sessionStorage.setItem("table_data", JSON.stringify(table_data));
  window.sessionStorage.setItem("condition", JSON.stringify(bool));
  condition();
}

//VALIDATION
function condition() {
  let bool = JSON.parse(sessionStorage.getItem("condition"));
  if (bool === true) {
    calculatePriorityValues();
  } else {
    document.getElementById("box5").style.visibility = "hidden";
    proceed();
  }
}

//SORTING
function calculatePriorityValues() {
  processes = JSON.parse(sessionStorage.getItem("table_data"));
  var n = processes.length;

  processes.sort((a, b) => a.Arrival - b.Arrival);

  for (var i = 1; i < n; i++)
    for (var j = 1; j < n; j++) {
      if (processes[i].Prio < processes[j].Prio) {
        var hold = processes[i];
        processes[i] = processes[j];
        processes[j] = hold;
      }
    }
  compute_data();
}

//PROCESS EXECUTION
function compute_data() {
  var comp = 0,
    ms = 0;
  var n = processes.length;

  while (comp < n) {
    var index = -1;
    for (var i = 0; i < n; i++) {
      if (processes[i].Arrival <= ms && processes[i].Round === 0) {
        index = i;
        break;
      }
    }
    if (index != -1) {
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
  console.log(gantt);
  window.sessionStorage.setItem("output", JSON.stringify(gantt));
  gantt_chart();
}

//GANTT_CHART
function gantt_chart() {
  var div = document.getElementById("output");
  var number = gantt.length;
  var chart = document.createElement("table");
  var chart_row = document.createElement("tr");
  var timestamp_div = document.getElementById("time_stamp");
  let burst = 0;
  let width = 50;
  let margin_width = 50;
  div.innerHTML = "";
  timestamp_div.innerHTML = "";
  console.log(number);
  chart.id = "gantt_chart";

  for (var j = 0; j < 1; j++) {
    for (var i = 0; i < number; i++) {
      let process_num = gantt[i].Process;
      process_num.toString();
      var gantt_cell = document.createElement("th");
      gantt_cell.id = "gantt_cell" + i.toString();
      if (process_num === 0) {
        gantt_cell.innerHTML = "-";
      } else {
        gantt_cell.innerHTML = "P" + process_num.toString();
      }
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
      var idle = gantt[i].Process;
      if (idle === 0) {
        burst++;
      }
      for (j = 0; j < gantt[i].Burst; j++) {
        margin.id = "margin" + i.toString();
        width += 1.9;
        if (idle === 0) {
          margin_width = 45;
        }
        if (gantt[i].End < 10) {
          margin_width += 0.75;
        } else if (gantt[i].End > 35) {
          margin_width += 0.25;
        } else {
          margin_width += 0.75;
        }
        burst++;
      }
      width.toString();
      cell_width.style.width = width + "px";
      margin.style.width = margin_width + "px";
      timestamp_div.appendChild(margin);
    }
    margin_width = 49.25;
    width = 50;
  }
  tat_wt();
}

//TIME COMPUTATION
function tat_wt() {
  document.getElementById("box5").style.visibility = "visible";
  document.getElementById("process_tat").innerHTML = " ";
  document.getElementById("total_TAT").innerHTML = " ";
  document.getElementById("ave_TAT").innerHTML = " ";

  document.getElementById("process_wt").innerHTML = " ";
  document.getElementById("total_WT").innerHTML = " ";
  document.getElementById("ave_WT").innerHTML = " ";

  var gantt = JSON.parse(sessionStorage.getItem("output"));
  var total_tat = document.getElementById("total_TAT");
  var ave_tat = document.getElementById("ave_TAT");
  var ptat_div = document.getElementById("process_tat");

  var total_wt = document.getElementById("total_WT");
  var ave_wt = document.getElementById("ave_WT");
  var pwt_div = document.getElementById("process_wt");

  var num = 0;
  var turnaround_time = 0;
  var average_tat = 0;
  var waiting_time = 0;
  var average_wt = 0;

  var total_waitingtime = 0;
  var total_turnaroundtime = 0;
  var idle;

  let splice = 0;
  gantt.sort((a, b) => a.Process - b.Process);
  for (i = 0; i < gantt.length; i++) {
    idle = gantt[i].Process.toString();
    if (idle == "0") {
      splice++;
    }
  }
  gantt.splice(0, splice);

  var length = gantt.length;

  if (length == 5) {
    document.getElementById("box7_1").style.height = "270px";
    document.getElementById("box7_2").style.height = "270px";
  }
  if (length == 6) {
    document.getElementById("box7_1").style.height = "320px";
    document.getElementById("box7_2").style.height = "320px";
  }
  if (length == 7) {
    document.getElementById("box7_1").style.height = "340px";
    document.getElementById("box7_2").style.height = "340px";
  }
  if (length == 8) {
    document.getElementById("box7_1").style.height = "370px";
    document.getElementById("box7_2").style.height = "370px";
  }

  for (var i = 0; i < gantt.length; i++) {
    num++;
    var p_tat = document.createElement("p");
    var p_wt = document.createElement("p");

    turnaround_time = gantt[i].End - gantt[i].Arrival;
    waiting_time = gantt[i].Start - gantt[i].Arrival;

    p_tat.id = "ptat_" + num.toString();
    p_tat.className = "time_subcontent";
    p_wt.id = "pwt_" + num.toString();
    p_wt.className = "time_subcontent";

    p_tat.innerHTML =
      "P" +
      num.toString() +
      ": " +
      gantt[i].End +
      " - " +
      gantt[i].Arrival +
      " = " +
      turnaround_time;
    p_wt.innerHTML =
      "P" +
      num.toString() +
      ": " +
      gantt[i].Start +
      " - " +
      gantt[i].Arrival +
      " = " +
      waiting_time;
    ptat_div.appendChild(p_tat);
    pwt_div.appendChild(p_wt);

    total_turnaroundtime += turnaround_time;
    total_waitingtime += waiting_time;
  }
  average_tat = total_turnaroundtime / length;
  average_wt = total_waitingtime / length;

  total_tat.innerHTML = total_turnaroundtime + " ms";
  ave_tat.innerHTML = average_tat.toFixed(2) + " ms";
  total_wt.innerHTML = total_waitingtime + " ms";
  ave_wt.innerHTML = average_wt.toFixed(2) + " ms";
}

let popup = document.getElementById("popup");

function closepopup() {
  popup.style.visibility = "hidden";
  popup.style.top = "0%";
  popup.style.transform = "translate(-50%,-50%)scale(0.1)";
}
