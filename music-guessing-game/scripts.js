const songs = [
    {
        name: "Sharml Aznavur",
        file: "music/sharml_aznavur.mp3",
        options: ["Sharml Aznavur", "Shape of You", "Despacito", "Closer"],
        correct: 0
    },
    {
        name: "Stromae - Papaoutai",
        file: "music/Stromae - Papaoutai.mp3",
        options: ["Pitpull", "Levitating", "Rockstar", "Stromae"],
        correct: 3
    },
    {
        name: "Eminem - Lose Yourself",
        file: "music/Eminem - Lose Yourself.mp3",
        options: ["2Pac", "Dr. Dre", "Eminem", "21 Savage"],
        correct: 2
    },
    {
        name: "Umbrella - Rihanna",
        file: "music/Umbrella - Rihanna.mp3",
        options: ["Rihanna", "Ariana Grande", "Lana Del Rey", "Billie Eilish"],
        correct: 0
    },
    {
        name: "Pitbull - Rain Over Me",
        file: "music/Pitbull - Rain Over Me.mp3",
        options: ["Frank Sinatra", "Justin Bieber", "Pitbull", "Ed Sheeran"],
        correct: 2
    }
];

let score = 0;
let currentSongIndex = 0;
let isPlaying = false;
let timeout;

const playPauseButton = document.getElementById("play-pause-button");
const musicPlayer = document.getElementById("music-player");
const optionsContainer = document.getElementById("options-container");
const options = document.querySelectorAll(".option");
const scoreDisplay = document.getElementById("score");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
const backButton = document.getElementById("back-button");
const timerBar = document.getElementById("timer-bar");

playPauseButton.addEventListener("click", () => isPlaying ? pauseMusic() : playMusic());

backButton.addEventListener("click", () => {
    window.location.href = "../index.html";
});

function playMusic() {
    const song = songs[currentSongIndex];
    musicPlayer.src = song.file;
    musicPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = "⏸ Pause";
    optionsContainer.style.visibility = "hidden";

    let startTime = Date.now();
    timeout = setInterval(() => {
        let elapsed = (Date.now() - startTime) / 1000;
        let percentage = (elapsed / 30) * 100;
        timerBar.style.width = `${percentage}%`;
        currentTimeDisplay.textContent = formatTime(elapsed);
        totalTimeDisplay.textContent = "00:30";

        if (elapsed >= 30) {
            clearInterval(timeout);
            musicPlayer.pause();
            isPlaying = false;
            playPauseButton.textContent = "▶ Play";
            optionsContainer.style.visibility = "visible";
            loadOptions();
        }
    }, 500);
}

function pauseMusic() {
    musicPlayer.pause();
    clearInterval(timeout);
    isPlaying = false;
    playPauseButton.textContent = "▶ Play";
}

function loadOptions() {
    const song = songs[currentSongIndex];
    options.forEach((button, index) => {
        button.textContent = song.options[index];
        button.onclick = () => checkAnswer(index, song.correct);
    });
}

function checkAnswer(selected, correct) {
    score += (selected === correct) ? 20 : 0;
    scoreDisplay.textContent = score;
    nextSong();
}

function nextSong() {
    optionsContainer.style.visibility = "hidden";
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playMusic();
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
