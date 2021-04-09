var Status = require("./jsons/status.json");
var getSongs = require("./getSongs")

/**
 * The accutal function who:
 * can go one song back or forward
 */
function changeSong(action) {
    let currentSong = Status.currentSong;
    let path = ""
    let nextSong = "";
    let pos = 0;

    if (!currentSong.includes("http://") && !currentSong.includes("https://")) {
        path = currentSong.split("/").slice(0, -1).join('/');
        currentSong = currentSong.replace(path, "").replace("/", "");
    }

    let songs = getSongs.getSongs(path);

    if (typeof songs == "string") return "Error while getting songs: " + songs;

    songs.forEach((r, i) => { if (currentSong == r.name) pos = i});

    if (pos >= songs.length) pos = 0;

    let wiederholungen = 0;

    if (action == "next") {
        pos++;

        for (let i = pos; i < songs.length; i++) {
            if (i == songs.length - 1 && songs[i].type == "dir" && wiederholungen == 0) {
                wiederholungen++;
                i = -1;
                continue;
            }
            if (songs[i].type == "dir") continue;
    
            nextSong = songs[i].name;
            break;
        }
    } else if (action == "back") {
        pos--;

        if (pos < 0) pos = songs.length - 1;

        for (let i = pos; i >= 0; i--) {
            console.log(i + " | " + songs[i].name)

            if (i == 0 && songs[i].type == "dir" && wiederholungen == 0) {
                wiederholungen++;
                i = songs.length - 1;
                continue;
            }
            if (songs[i].type == "dir") continue;
    
            nextSong = songs[i].name;
            break;
        }
    }
    

    Status.currentSong = path + "/" + nextSong;
}

module.exports.changeSong = changeSong
