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
        const res = await (await fetch("http://" + window.location.host + ":3000/getSong")).json();
        if (res.currentSong == undefined || res.playing == undefined || res.pic == undefined) {
            console.log("currentSong or playing or Picture is missing");
            return;
        }

        let currentSong = res.currentSong;
        let audio = document.getElementById("source");
        let currentPic = res.pic;
        let pic = document.getElementById("pic");

        if (res.playing) {        

            if (audio.src.replace(window.location.href + "music/", "") != currentSong) {
                stop();
                audio.src = "music/" + currentSong;
            } 

            console.log(pic.src.replace(window.location.href + "picture/", ""));
            console.log(currentPic)
            if (pic.src.replace(window.location.href + "picture/", "") != currentPic) {
                if (currentPic === "") {
                    pic.src = "picture/lilpeep.jpg";
                } else 
                    pic.src = "picture/" + currentPic;
            } 
            
            run();
        } else
            stop();
        
    } catch(e) {
        console.log(e);
    }
}