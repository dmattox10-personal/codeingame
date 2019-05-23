/**
 * Constants
 */

const width = 12;
const height = 12;

const HQ_TYPE = 0;

const unitCosts = [{},
    {train: 10, upkeep: 1},
    {train: 20, upkeep: 4},
    {train: 30, upkeep: 20},
]

const ME = 0
const OPPONENT = 1
const NO_ONE = -1

/**
 * Parsing functions
 */

const parseTile = (x, y, input, mineSpots) => {
    if (input === '#') return null;

    return {
        x, y,
        owner: input.toLowerCase() === 'o'
            ? ME
            : input.toLowerCase() === 'x'
                ? OPPONENT
                : NO_ONE,
        active: input === input.toUpperCase(),
        mineSpot: mineSpots[x][y]
    }
}

const parseBuilding = (line) => {
    const inputs = line.split(' ');
    const owner = parseInt(inputs[0]);
    const type = parseInt(inputs[1]);
    const x = parseInt(inputs[2]);
    const y = parseInt(inputs[3]);

    return {x, y, owner, type}
}

const parseUnit = (line) => {
    const inputs = line.split(' ');
    const owner = parseInt(inputs[0]);
    const id = parseInt(inputs[1]);
    const level = parseInt(inputs[2]);
    const x = parseInt(inputs[3]);
    const y = parseInt(inputs[4]);

    return {id, x, y, owner, level}
}

/**
 * Utility functions
 */
const key = ({x, y}) => {

    return x + "," + y
}
const dist = (a, b) => {

    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
}
const findNearby = ({x, y}, map) => {

    let indexes = [{x: x + 1, y}, {x: x - 1, y}, {x, y: y + 1}, {x, y: y - 1}]
    return indexes.map(pos => map[key(pos)]).filter(tile => tile != null)
}
const closestToTile = (towards) => {

    return (t1, t2) => dist(t1, towards) - dist(t2, towards)
}
const findDirection = (from, map, towards) => {

    if (from.x === towards.x && from.y === towards.y) return
    const nearby = findNearby(from, map).sort(closestToTile(towards))
    return nearby.find(tile => !tile.occupiedBy) || nearby[0]
}

let getUpkeep = (myUnits) => {
    let totalUpkeep = 0
    myUnits.forEach(unit => {
        let upkeep = unitCosts[unit.level]
        let cost = upkeep.upkeep
        totalUpkeep += cost
        console.error(totalUpkeep)
    })
    return totalUpkeep
}

/**
 * Init
 */

// not useful in Wood 3
const numberMineSpots = parseInt(readline());
const mineSpots = new Array(height).fill(0).map(() => new Array(width).fill(false));
for (let i = 0; i < numberMineSpots; i++) {
    const inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    mineSpots[x][y] = true;
}

/**
 * Game loop
 */
while (true) {
    // Gold
    let gold = parseInt(readline())
    let goldIncome = parseInt(readline())
    const goldOpponent = parseInt(readline()) // I don't care but this has to stay here!
    const goldOpponentIncome = parseInt(readline()) // I don't care but this has to stay here!

    // Map
    const map = {}
    for (let y = 0; y < height; y++) {
        const line = readline();
        for (let x = 0; x < width; x++) {
            const tile = parseTile(x, y, line[x], mineSpots)

            if (tile === null) continue;

            map[key(tile)] = tile
        }
    }

    // Buildings
    const myBuildings = {};
    const enemyBuildings = {};
    const buildingCount = parseInt(readline());
    for (let i = 0; i < buildingCount; i++) {
        const building = parseBuilding(readline())

        const buildList = building.owner === ME ? myBuildings : enemyBuildings

        if (!buildList[building.type]) buildList[building.type] = []

        buildList[building.type].push(building)

        map[key(building)].occupiedBy = building
    }

    // Units
    const unitCount = parseInt(readline());
    const myUnits = [];
    const enemyUnits = [];
    for (let i = 0; i < unitCount; i++) {
        const unit = parseUnit(readline())

        const unitList = unit.owner === ME ? myUnits : enemyUnits

        unitList.push(unit)

        map[key(unit)].occupiedBy = unit
    }

    // Orders

    const orders = []

    // Total Upkeep

    const upkeep = getUpkeep(myUnits)

    // Train
    if (myUnits.length < 1) { // Make the explorer
        const emptyNearbyHQ = findNearby(myBuildings[HQ_TYPE][0], map).find(tile => !tile.occupiedBy)
        if (emptyNearbyHQ != null) {
            console.error('found tile to train on ')
            const level = 1
            const unitCost = unitCosts[level]
            
            if (gold >= unitCost.train / 60 && goldIncome >= upkeep / 60) {
            // if (gold >= unitCost.train / 60 && goldIncome >= unitCost.upkeep / 60) { // WTF? EDIT ME!
            // if (gold >= unitCost.train * 3 && goldIncome >= unitCost.upkeep * 3 ) {

                
                const train = "TRAIN " + level + " " + emptyNearbyHQ.x + " " + emptyNearbyHQ.y
                orders.push(train)
                
            //purchaseOrder(myUnits, )
            }
        }
    }
    else if (myUnits.length < 6) { // Make more, move to the side
        const leader = myUnits[0]
        if (emptyNearbyHQ != null) {
            console.error('found tile to train on ')
            if (myUnits.length % 10 === 0) {
                const level = 3
                const train = "TRAIN " + level + " " + emptyNearbyHQ.x + " " + emptyNearbyHQ.y
                orders.push(train)
            }
            else {
            const level = 1
            const unitCost = unitCosts[level]
            if (gold / 3 >= unitCost.train && goldIncome / 3 >= upkeep) {
            // if (gold >= unitCost.train / 60 && goldIncome >= unitCost.upkeep / 60) { // WTF? EDIT ME!
            // if (gold >= unitCost.train * 3 && goldIncome >= unitCost.upkeep * 3 ) {

                
                const train = "TRAIN " + level + " " + emptyNearbyHQ.x + " " + emptyNearbyHQ.y
                orders.push(train)
                
            //purchaseOrder(myUnits, )
            }
            }
        }
    }
    else if (myUnits < 7) {

    }

    // Move
    const mapCenter = {x: 5, y: 5}
    myUnits.forEach(unit => {
        let tile = findDirection(unit, map, mapCenter)
        if (!tile) return;

        const move = "MOVE " + unit.id + " " + tile.x + " " + tile.y
        orders.push(move)
        console.error(unit)
    })

    orders.push("WAIT")
    console.log(orders.join(';'));
}