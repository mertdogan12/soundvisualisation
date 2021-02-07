async function getUpdate() {
    try {
        const res = await (await fetch("http://localhost:3000/getSong")).json();

        console.log(res.currentSong);
    } catch(e) {
        console.log(e);
    }
}

setInterval(getUpdate, 1000);
    
