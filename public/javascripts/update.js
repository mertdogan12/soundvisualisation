setInterval(getUpdate, 1000);
  
/*
    Hold sich die Daten
        - welches lied gerade gespielt wird
        - ob überhaubt was gespielt wird
        - Bild
    Updated des Sound
        - ändert das Lied
        - pausiert/stop das Lied
        - ändert das Bild
*/
async function getUpdate() {
    try {
        let json = {};
        await $.getJSON("confs/conf.json", (data) => json = data);
        const res = await (await fetch(json.api + "getSong")).json();
        

        if (res.currentSong == undefined || res.playing == undefined || res.pic == undefined) {
            console.log("currentSong or playing or Picture is missing");
            return;
        }

        let currentSong = res.currentSong;
        let audio = document.getElementById("source");
        let currentPic = res.pic;
        let pic = document.getElementById("pic");

        if (res.playing) {        

            let aSrc = audio.src.includes(window.location.href) ? audio.src.replace(window.location.href + "music/", "") : audio.src;
            let pScr = pic.src.includes(window.location.href) ? pic.src.replace(window.location.href + "picture/", "") : pic.src;

            let cSong = currentSong.includes("http") ? currentSong : "music/" + currentSong;
            let cPic = currentPic.includes("http") ? currentPic : "picture/" + currentPic;
            
            if (aSrc != currentSong && currentSong.replace(" ", "") != "") {
                stop();
                audio.src = cSong;
            }

            if (pScr != currentPic && currentPic.replace(" ", "") != "") {
                pic.src = cPic;
            }      
            
            run();
        } else
            stop();
        
    } catch(e) {
        console.log(e);
    }
}