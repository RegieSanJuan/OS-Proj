let total_process = 4,
  count = 0,
  p_number = 0,
  arrival_time = 0,
  burst_time = 0,
  priority_num = 0;

//const
//ONCLICK ANIMATIONS

//MAIN.HTML

document.getElementById("increase").onclick = function () {
  if (total_process < 8) {
    total_process += 1;
    document.getElementById("process").innerHTML = total_process;
  }
};
document.getElementById("decrease").onclick = function () {
  if (total_process > 4) {
    total_process -= 1;
    document.getElementById("process").innerHTML = total_process;
  }
};

document.getElementById("button1").onclick = function () {
  /*total_process = document.getElementById("process").value;*/
  total_process = Number(total_process);
  window.open("process.html", "_self");
  console.log("proceed ", total_process);
};
//PROCESS.HTML
count = total_process;
document.getElementById("add_process").onclick = function () {};
