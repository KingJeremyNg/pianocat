const Midi = require('midi');

const input = new Midi.Input();
input.openPort(0);
input.on('message', (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
    keySelector(message, deltaTime);
})

var keys = [];
function keySelector(message, deltaTime) {
    if (message[0] == 144) {
        keys.push(message[1]);
    }
    else {
        keys.pop(keys.indexOf(message[1]));
    }
    keys.sort();
    // console.log(keys);
    // console.log(keys.length);
    selectPair(keys);
}

var left = 0;
var right = 0;
function selectPair(array) {

}

// TODO - GROUP THE THE KEYS WITHIN A TIME WINDOW AND SELECT A PAIR
// eg. key 21, 25, 29, 70, 75 result in left hand on 25 and right hand on 72/73
// keys range from 21-108