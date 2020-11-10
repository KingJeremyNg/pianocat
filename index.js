const Midi = require('midi');

const input = new Midi.Input();
input.openPort(0);
input.on('message', (deltaTime, message) => {
    console.log(`m: ${message} d: ${deltaTime}`);
})