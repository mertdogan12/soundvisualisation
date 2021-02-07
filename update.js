import conf from "./conf.json";

async function getUpdate() {
    try {
        const res = (await fetch(conf.host + "getSong")).json();

        console.log(res.currentSong);
    } catch(e) {
        console.log(e);
    }
}

setInterval(getUpdate, 1000);
    
