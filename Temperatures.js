/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var n = parseInt(readline().split(' ')); // the number of temperatures to analyse
var temps = readline().split(' '); // the n temperatures expressed as integers ranging from -273 to 5526
// New Variables
var closest = 0;
var loop = false;
for (var i = 0; i < n; i++)
{
    printErr(temps[i]);
}
// To debug: printErr('Debug messages...');
for (var i = 0; i < n; i++){
  if (loop === false) {
    closest = Math.abs(temps[0]);
    loop = true;
  }
  if (n == 1){
    print(temps[0]);
  }
  if (closest > Math.abs(temps[i])){
    closest = temps[i];
  }
}

for (var i = 0; i < n; i++){
  for (var j = i + 1; j < n; j++){
    if (temps[j] < 0 && temps[i] < 0 && temps[j] == temps[i]){
      closest = temps[i];
    }
    else if (Math.abs(temps[j]) == Math.abs(temps[i])) {
      closest = Math.abs(temps[i]);
    }
  }
}
  for (var i = 0; i < n; i++)
  {
      printErr(temps[i]);
  }
  print(closest);
