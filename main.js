let total_process = 4,
  count = 0,
  p_number = 0,
  arrival_time = 0,
  burst_time = 0,
  priority_num = 0;

//const
//ONCLICK ANIMATIONS

//MAIN.HTML
function decrease_process()
{
  if(total_process > 4){
  total_process-=1;
  document.getElementById("process").innerHTML = total_process;
  }
}
function increase_process()
{
  if(total_process < 8){
    total_process+=1;
    document.getElementById("process").innerHTML = total_process;
  }
}
function table()
{ 
  total_process = Number(total_process);
  window.open("process.html","_self");
  console.log("proceed ", total_process); 
}

//PROCESS.HTML
count = total_process;
function back()
{
  window.open("main.html","_self");
}
function proceed()
{
  window.open("compute.html", "_self");
}