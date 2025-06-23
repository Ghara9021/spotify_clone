console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songTitle: "Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songTitle: "Numb", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songTitle: "Ghost", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songTitle: "Let Me Love You", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songTitle: "Battle Symphony", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songTitle")[0].innerText = songs[i].songTitle;
});


masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = "Icons/pause.svg";
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.src = "Icons/play.svg";
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("playIcon")).forEach((element) => {
        element.src = "Icons/play.svg";
    });
};


Array.from(document.getElementsByClassName("playIcon")).forEach((element) => {
    element.addEventListener("click", (node) => {
        const clickedIndex = parseInt(node.target.id);

        if (clickedIndex === songIndex && !audioElement.paused) {
            audioElement.pause();
            node.target.src = "Icons/play.svg";
            masterPlay.src = "Icons/play.svg";
            gif.style.opacity = 0;
        }
        else {
            makeAllPlays();

            songIndex = clickedIndex;
            node.target.src = "Icons/pause.svg";

            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songTitle;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.src = "Icons/pause.svg";
            gif.style.opacity = 1;
        }
    });
});




document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songTitle;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "Icons/pause.svg";
    gif.style.opacity = 1;

    makeAllPlays();
    document.getElementById(songIndex).src = "Icons/pause.svg";
});


document.getElementById("previous").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songTitle;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.src = "Icons/pause.svg";
    gif.style.opacity = 1;

    makeAllPlays();
    document.getElementById(songIndex).src = "Icons/pause.svg";
});
