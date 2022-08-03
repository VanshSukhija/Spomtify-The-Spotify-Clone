console.log("Welcome to Spomtify :)");

let songs = [
    { songname: "Attention", singer: "Charlie Puth", filepath: "songs/Attention.mp3", coverpath: "images/Attention.png" },
    { songname: "Blinding Lights", singer: "The Weeknd", filepath: "songs/Blindinglights.mp3", coverpath: "images/Blindinglights.png" },
    { songname: "Hymn for the Weekend", singer: "Coldplay", filepath: "songs/Hymnfortheweekend.mp3", coverpath: "images/Hymnfortheweekend.png" },
    { songname: "Matargashti", singer: "Mohit Chauhan", filepath: "songs/Matargashti.mp3", coverpath: "images/Matargashti.png" },
    { songname: "Pasoori", singer: "Shae Gill, Ali Sethi", filepath: "songs/Pasoori.mp3", coverpath: "images/Pasoori.png" },
    { songname: "The Real Slim Shady", singer: "Eminem", filepath: "songs/Realslimshady.mp3", coverpath: "images/Realslimshady.png" },
    { songname: "Shape of You", singer: "Ed Sheeran", filepath: "songs/Shapeofyou.mp3", coverpath: "images/Shapeofyou.png" },
    { songname: "Starboy", singer: "The Weeknd", filepath: "songs/Starboy.mp3", coverpath: "images/Starboy.png" },
    { songname: "To All of You", singer: "Syd Matters", filepath: "songs/Toallofyou.mp3", coverpath: "images/Toallofyou.png" },
    { songname: "Udd Gaye", singer: "Ritviz", filepath: "songs/Uddgaye.mp3", coverpath: "images/Uddgaye.png" },
    { songname: "Wishlist", singer: "Dino James, Kaprila", filepath: "songs/Wishlist.mp3", coverpath: "images/Wishlist.png" }
]

let songindex = 0;
let totalsongs = 11;
let AudioElement = new Audio(songs[songindex].filepath);
let playpausebtn = document.getElementById("playpausebtn");
let prevbtn = document.getElementById("prevbtn");
let nextbtn = document.getElementById("nextbtn");
let bar = document.getElementById("bar");
let volumebar = document.getElementById("volumebar");
let totaltime = document.getElementById("totaltime");
let currtime = document.getElementById("currtime");
let details = document.getElementById("currsong");

function updatetime() {
    let mins1 = parseInt(AudioElement.currentTime / 60);
    let secs1 = parseInt(AudioElement.currentTime % 60);
    let mins2 = parseInt(AudioElement.duration / 60);
    let secs2 = parseInt(AudioElement.duration % 60);
    if (secs1 < 10)
        currtime.innerHTML = `0${mins1}:0${secs1}`;
    else
        currtime.innerHTML = `0${mins1}:${secs1}`;
    totaltime.innerHTML = `0${mins2}:${secs2}`;
}

function changedetails(index) {
    details.childNodes[1].src = songs[index].coverpath;
    details.childNodes[3].innerHTML = songs[index].songname;
    details.childNodes[5].innerHTML = songs[index].singer;
}

playpausebtn.addEventListener("click", () => {
    if (AudioElement.paused || AudioElement.currentTime <= 0) {
        AudioElement.play();
        playpausebtn.classList.remove("fa-circle-play");
        playpausebtn.classList.add("fa-circle-pause");
    }
    else {
        AudioElement.pause();
        playpausebtn.classList.remove("fa-circle-pause");
        playpausebtn.classList.add("fa-circle-play");
    }
})

prevbtn.addEventListener("click", () => {
    if (AudioElement.currentTime > 0.1 * AudioElement.duration) {
        AudioElement.src = songs[songindex].filepath;
        AudioElement.play();
    }
    else if (songindex != 0) {
        AudioElement.src = songs[--songindex].filepath;
        AudioElement.play();
        changedetails(songindex);
    }
})

nextbtn.addEventListener("click", () => {
    if (songindex != totalsongs - 1) {
        AudioElement.src = songs[++songindex].filepath;
        AudioElement.play();
        changedetails(songindex);
    }
})

AudioElement.addEventListener("timeupdate", () => {
    bar.value = parseInt(AudioElement.currentTime * 100 / AudioElement.duration);
    updatetime();
    if (AudioElement.currentTime == AudioElement.duration) {
        if (songindex != totalsongs - 1) {
            AudioElement.src = songs[++songindex].filepath;
            AudioElement.play();
            changedetails(songindex);
        }
    }
})

bar.addEventListener("change", () => {
    AudioElement.currentTime = bar.value * AudioElement.duration / 100;
    updatetime();
})

volumebar.addEventListener("change", () => {
    AudioElement.volume = volumebar.value / 100;
})