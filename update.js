/*
    Hold sich die Daten
        - welches lied gerade gespielt wird
        - ob überhaubt was gespielt wird
    Updated des Sound
        - ändert das Lied
        - pausiert/stop das Lied
*/
async function getUpdate() {
    try {
        const res = await (await fetch("http://" + window.location.host + ":3000/getSong")).json();
        if (res.currentSong == undefined || res.playing == undefined) {
            console.log("currentSong or playing is missing");
            return;
        }

        let currentSong = res.currentSong;
        let audio = document.getElementById("source");

        if (res.playing) {        

            if (audio.src.replace(window.location.href + "music/", "") != currentSong) {
                stop();
                audio.src = "music/" + currentSong;
                
                console.log(audio.src.replace(window.location.href + "music/", ""));
                console.log(currentSong);
            } 
            
            run();
        } else
            stop();
        
    } catch(e) {
        console.log(e);
    }
}

setInterval(getUpdate, 1000);
    
