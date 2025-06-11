/*Reference:
AsmrProg, https://www.youtube.com/watch?v=KndQpfPkOOY
Traversy Media, https://www.youtube.com/watch?v=QTHRWGn_sJw
Coding Artist, https://www.youtube.com/watch?v=vvdRu7ljg54
CodingNepal, https://www.youtube.com/watch?v=txP82s1akoE
Acknowledgments to the YouTubers for their inspiration for this project.
*/
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    Ly = document.querySelector('#element'),
    Songly = document.getElementById('element'),
    background = document.getElementById('bg-img'),
    button = document.getElementById('toggleButton');
    
const music = new Audio();
/*咁都俾你發現到，最近過得還好嗎，有時間記得請我食飯!!!!!*/
const songs = [
    {
        path: 'assets/eng/1.mp3',
        displayName: 'Rain In My Heart',
        cover: 'assets/eng/photo1/1.jpg',
        artist: 'Edgar Lee Masters/ Adam Paltrowitz',
        lyrics: 'assets/eng/txt1/1.txt',
    },
    {
        path: 'assets/eng/2.mp3',
        displayName: 'Supermarket Flowers',
        cover: 'assets/eng/photo1/2.jpg',
        artist: 'Ed Sheeran',
        lyrics: 'assets/eng/txt1/2.txt',
    },
    {
        path: 'assets/eng/3.mp3',
        displayName: 'Lost Boy',
        cover: 'assets/eng/photo1/3.jpg',
        artist: 'Ruth B.',
        lyrics: 'assets/eng/txt1/3.txt',
    },
    {
        path: 'assets/eng/4.mp3',
        displayName: 'Peter Pan Was Right',
        cover: 'assets/eng/photo1/4.jpg',
        artist: 'Anson Seabra',
        lyrics: 'assets/eng/txt1/4.txt',
    },
    {
        path: 'assets/pt/5.mp3',
        displayName: '南山南',
        cover: 'assets/pt/photo2/1.jpg',
        artist: '馬頔',
        lyrics: 'assets/pt/txt2/1.txt',
    },
    {
        path: 'assets/pt/6.mp3',
        displayName: '工廠',
        cover: 'assets/pt/photo2/2.jpg',
        artist: '河南說唱之神',
        lyrics: 'assets/pt/txt2/2.txt',
    },
    {
        path: 'assets/pt/7.mp3',
        displayName: '轉眼',
        cover: 'assets/pt/photo2/3.jpg',
        artist: 'MAYDAY五月天',
        lyrics: 'assets/pt/txt2/3.txt',
    },
    {
        path: 'assets/pt/8.mp3',
        displayName: "天空",
        cover: 'assets/pt/photo2/4.jpg',
        artist: '163braces',
        lyrics: 'assets/pt/txt2/4.txt',
    },
    {
        path: 'assets/ot/9.mp3',
        displayName: "ひまわりの約束",
        cover: 'assets/ot/photo3/1.jpg',
        artist: '高橋李依',
        lyrics: 'assets/ot/txt3/1.txt',
    },
    {
        path: 'assets/ot/10.mp3',
        displayName: "우주를 줄게",
        cover: 'assets/ot/photo3/2.jpg',
        artist: '볼빨간사춘기',
        lyrics: 'assets/ot/txt3/2.txt',
    },
    {
        path: 'assets/ot/11.mp3',
        displayName: "MTZ Manuel Turizo",
        cover: 'assets/ot/photo3/3.jpg',
        artist: 'La Bachata',
        lyrics: 'assets/ot/txt3/3.txt',
    },
    {
        path: 'assets/ot/12.mp3',
        displayName: "墮進夜空",
        cover: 'assets/ot/photo3/4.jpg',
        artist: 'DS',
        lyrics: 'assets/ot/txt3/4.txt',
    }
];

let musicIndex = 0;
let isPlaying = false;
let container = document.querySelector('.container');
let toneArm = document.querySelector('.tone-arm');
let isClicked = true;

let show = function(){
    if(isClicked){
        Ly.style.display = 'block';
        isClicked = false;
    }else{
        Ly.style.display = 'none';
        isClicked = true;
    }
}


function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    toneArm.classList.add('on');
    setTimeout(() => {
	container.classList.add('play');
    music.play();
	}, 1000);
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    container.classList.remove('play');
    toneArm.classList.remove('on');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
    Songly.src = song.lyrics;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
button.addEventListener('click', function() { this.classList.toggle('active'); });
/*This time, I want
… You, you, you, you, like it's magnetic
You, you, you, you, you, you, you, you, super 이끌림*/
loadMusic(songs[musicIndex]);
