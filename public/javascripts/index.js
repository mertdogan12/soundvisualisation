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

    audioElement.onended = async () => {
        let res
        let nextSong;
        let pos = 0;
        let songName = audioElement.src
        let path = ""

        if (songName.includes(window.location.href)) {
            songName = audioElement.src.replace(window.location.href + "music/", "");
            path = songName.split("/").slice(0, -1).join('/');
            songName = songName.replace(path, "").replace("/", "");
        }

        res = await (await fetch(conf.api + "getSongs?path=" + path)).json();

        res.forEach((r, i) => { if (songName == r.name) pos = i + 1 });

        if (pos >= res.length) pos = 0;

        console.log("Path: " + path);
        console.log("Src: " + audioElement.src);
        console.log("Position: " + pos);

        let wiederholungen = 0

        for (let i = pos; i < res.length; i++) {
            if (i = res.length - 1 && res[i].type == "dir" && wiederholungen == 0) {
                wiederholungen++;
                i = 0;
            }
            if (res[i].type == "dir") continue;

            nextSong = res[i].name;
            break;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fileName": path + "/" + nextSong,
            "picName": ""
        });

        console.log("song: " + nextSong)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(conf.api + "playSong", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

function stop() {
    let audioElement = document.getElementById("source");
    audioElement.pause();
    audioElement.currentTime = 0;
}