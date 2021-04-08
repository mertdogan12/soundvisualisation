function start() {
    document.getElementById("pic").style.visibility = "visible";

    let canvas = document.getElementById("audio_visual");
    let ctx = canvas.getContext("2d");

    let audioElement = document.getElementById("source");

    let audioCtx = new AudioContext();
    let analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    let source = audioCtx.createMediaElementSource(audioElement);

    source.connect(analyser);

    //this connects our music back to the default output, such as your speakers 
    source.connect(audioCtx.destination);

    let data = new Uint8Array(analyser.frequencyBinCount);

    requestAnimationFrame(loopingFunction);

    function loopingFunction() {
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);
        draw(data);
    }

    function draw(data) {
        data = [...data];
        data = data.slice(300, 600);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "White";
        let space = canvas.width / data.length;


        data.forEach((value, i) => {
            ctx.beginPath();

            ctx.moveTo(space * i, canvas.height); //x,y
            ctx.lineTo(space * i, canvas.height - value * 3); //x,y
            ctx.stroke();
        })
    }

    document.getElementById("clickMe").style.display = "none";
}

async function run() {
    let conf = {};
    await $.getJSON("confs/conf.json", (data) => conf = data);
    let audioElement = document.getElementById("source");
    audioElement.crossOrigin = "anonymous"
    audioElement.play();

    audioElement.onended = () => { fetch(conf.api + "skipSong") }
}

function stop() {
    let audioElement = document.getElementById("source");
    audioElement.pause();
    audioElement.currentTime = 0;
}