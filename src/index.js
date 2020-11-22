WebMidi.enable(function (err) {
    if (err) {
        console.log("WebMidi could not be enabled.", err);
    }
    else {
        var text = document.getElementById("text");
        var cat = document.getElementById("cat");
        var leftHand = document.getElementById("left");
        var rightHand = document.getElementById("right");
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

        // var input = WebMidi.getInputByName("Digital Piano");
        var input = WebMidi.inputs[0];
        console.log(input);

        input.addListener('noteon', "all", function (e) {
            // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            keys.push(`${e.note.name}${e.note.octave}`);
            octaves.push(`${e.note.octave}`);

            handPairs({ keys, octaves, text, cat, leftHand, rightHand });
            // cat.innerHTML = (`<img src="../src/imgs/catDown.png">`);
            // console.log(keys);
            // console.log(octaves);
        });

        input.addListener('noteoff', "all", function (e) {
            // console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ").");
            keys.splice(keys.indexOf(`${e.note.name}${e.note.octave}`), 1);
            octaves.splice(octaves.indexOf(`${e.note.octave}`), 1);

            handPairs({ keys, octaves, text, cat, leftHand, rightHand });
            // cat.innerHTML = (`<img src="../src/imgs/catUp.png">`);
            // console.log(keys);
            // console.log(octaves);
        });
    }
});

function handPairs(data) {
    var left, right;
    data.octaves.sort();
    data.octaves = data.octaves.filter((item, i, ar) => ar.indexOf(item) === i);
    // console.log(data.octaves);
    // console.log(octaves.length);
    if (data.octaves.length == 1) {
        if (data.octaves[0] >= 4) right = data.octaves[0];
        if (data.octaves[0] < 4) left = data.octaves[0];
        display(data, { left, right });
    }
    else if (data.octaves.length == 2 && data.octaves[0] == data.octaves[1] - 1 && data.keys.length < 5) {
        if (data.octaves[0] >= 4) right = data.octaves[0];
        else if (data.octaves[1] < 4) left = data.octaves[0];
        display(data, { left, right });
    }
    else {
        left = data.octaves[0];
        right = data.octaves[data.octaves.length - 1];
        display(data, { left, right });
    }
}

function display(data, pair) {
    // console.log("left " + pair.left);
    // console.log("right " + pair.right);
    data.text.innerHTML = (`${data.keys}`);
    data.cat.innerHTML = ("<img src='../src/imgs/catBody.png'>");

    if (pair.left || pair.right) {
        if (pair.left) data.leftHand.innerHTML = (`<img src="../src/imgs/catLeftDown${pair.left}.png">`);
        else data.leftHand.innerHTML = (`<img src="${json.leftUp}">`);
        if (pair.right) data.rightHand.innerHTML = (`<img src="../src/imgs/catRightDown${pair.right}.png">`);
        else data.rightHand.innerHTML = (`<img src="${json.rightUp}">`);
        // console.log(data.leftHand.innerHTML);
        // console.log(data.rightHand.innerHTML);
    }
    else {
        data.leftHand.innerHTML = (`<img src="${json.leftUp}">`);
        data.rightHand.innerHTML = (`<img src="${json.rightUp}">`);
        // console.log(data.cat.innerHTML);
    }
    // data.cat.innerHTML = (`<img src="${json.right + pair.right}">`);
}

// CURRENTLY USELESS
var json = {
    "catDown": "../src/imgs/catDown.png",
    "catUp": "../src/imgs/catUp.png",
    "rightUp": "../src/imgs/catRightUp.png",
    "right8": "../src/imgs/catRight7.png",
    "right7": "../src/imgs/catRight7.png",
    "right6": "../src/imgs/catRight6.png",
    "right5": "../src/imgs/catRight5.png",
    "right4": "../src/imgs/catRight4.png",
    "right3": "",
    "right2": "",
    "right1": "",
    "right0": "",
    "leftUp": "../src/imgs/catLeftUp.png",
    "left8": "",
    "left7": "",
    "left6": "",
    "left5": "",
    "left4": "",
    "left3": "../src/imgs/catLeft3.png",
    "left2": "../src/imgs/catLeft2.png",
    "left1": "../src/imgs/catLeft1.png",
    "left0": "../src/imgs/catLeft1.png"
}
