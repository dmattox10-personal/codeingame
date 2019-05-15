/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

//const curLON = degToRad(readline().replace(',', '.').valueOf()) // US formatted Current Longitude
//const curLAT = degToRad(readline().replace(',', '.').valueOf()) // US formatted Current Lattitude
const curLON = parseFloat(readline().replace(',', '.'))
const curLAT = parseFloat(readline().replace(',', '.'))
const N = parseInt(readline()); // Number of defibrilators available
let defibs = [] // Array to hold the data on all defibs
let distances = [] // Array to hold the distances between the current position and each defib
let answer = ''
for (let i = 0; i < N; i++) {
    const DEFIB = readline();
    results = DEFIB.split(';')
    data = {
        number: results[0], 
        name: results[1],
        address: results[2],
        //lattitude: degToRad(results[4].replace(',', '.').valueOf()),
        //longitude: degToRad(results[5].replace(',', '.').valueOf()),
        longitude: parseFloat(results[4].replace(',', '.')),
        lattitude: parseFloat(results[5].replace(',', '.')),
    }
    defibs.push(data)
}

for (let i = 0; i < defibs.length; i++) {
  let distance = getDistance(defibs[i].lattitude, defibs[i].longitude)
  distances.push(distance)
  defibs[i].distance = distance
}

let min = Math.min.apply(null, distances)

for (let i = 0; i < defibs.length; i++) {
    if (defibs[i].distance == min) {
        answer = defibs[i].name
    }
}

console.log(answer)

function degToRad(deg) {
 return deg * (Math.PI/180)
}

function getDistance(lat, long) { // The orders of the variables in x and y may need reversed!
    let x = (long - curLON) * Math.cos((curLAT + lat)/2) 
    let y = (lat - curLAT)
    let d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371
    return d
}