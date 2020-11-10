WebMidi.enable(function (err) {
    if (err) {
        console.log("WebMidi could not be enabled.", err);
    }
    else {
        var text = document.getElementById("text");
        var cat = document.getElementById("cat");
        var keys = [];
        var octaves = [];
        // console.log(element);
        // console.log(WebMidi.inputs);
        // console.log(WebMidi.outputs);

        WebMidi.addListener("connected", function (e) {
            console.log(e);
        });

        WebMidi.addListener("disconnected", function (e) {
            console.log(e);
        });

        // var output = WebMidi.getOutputByName("Digital Piano");
        var input = WebMidi.getInputByName("Digital Piano");

        input.addListener('noteon', "all", function (e) {
            // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            keys.push(`${e.note.name}${e.note.octave}`);
            octaves.push(`${e.note.octave}`);
            text.innerHTML = (`${keys}`);
            handPairs(octaves.sort);
            cat.innerHTML = (`<img src="../src/imgs/catDown.png">`)
            // console.log(keys);
            // console.log(octaves);
        });

        input.addListener('noteoff', "all", function (e) {
            // console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
            keys.splice(keys.indexOf(`${e.note.name}${e.note.octave}`), 1);
            octaves.splice(octaves.indexOf(`${e.note.octave}`), 1);
            text.innerHTML = (`${keys}`);
            handPairs(octaves.sort);
            cat.innerHTML = (`<img src="../src/imgs/catUp.png">`)
            // console.log(keys);
            // console.log(octaves);
        });
    }
});

function handPairs(octaves) {

}

function display(pair) {
    
}

// TODO - GROUP THE THE KEYS WITHIN A TIME WINDOW AND SELECT A PAIR
// eg. key 21, 25, 29, 70, 75 result in left hand on 25 and right hand on 72/73
// keys range from 21-108