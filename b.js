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
        path: 'assets/chi/mv.mp3',
        displayName: '惜愛',
        cover: 'assets/chi/p1/1.jpg',
        artist: '張敬軒',
        lyrics: 'assets/chi/l1/chi1.txt',
    },
    {
        path: 'assets/chi/HANA.mp3',
        displayName: '忘記我自己',
        cover: 'assets/chi/p1/2.jpg',
        artist: 'HANA菊梓喬',
        lyrics: 'assets/chi/l1/chi2.txt',
    },
    {
        path: 'assets/chi/ToNick.mp3',
        displayName: '回憶備份',
        cover: 'assets/chi/p1/3.jpg',
        artist: 'ToNick',
        lyrics: 'assets/chi/l1/chi3.txt',
    },
    {
        path: 'assets/chi/AGA.mp3',
        displayName: '圓',
        cover: 'assets/chi/p1/4.jpg',
        artist: 'AGA 江海迦',
        lyrics: 'assets/chi/l1/chi4.txt',
    },
    {
        path: 'assets/eng/Something Just Like This.mp3',
        displayName: 'Something Just Like This',
        cover: 'assets/eng/p2/1.jpg',
        artist: 'The Chainsmokers, Coldplay',
        lyrics: 'assets/eng/l2/eng1.txt',
    },
    {
        path: 'assets/eng/Demons.mp3',
        displayName: 'Demons',
        cover: 'assets/eng/p2/2.jpg',
        artist: 'Imagine Dragons',
        lyrics: 'assets/eng/l2/eng2.txt',
    },
    {
        path: 'assets/eng/Animals.mp3',
        displayName: 'Animals',
        cover: 'assets/eng/p2/3.jpg',
        artist: 'Maroon 5',
        lyrics: 'assets/eng/l2/eng3.txt',
    },
    {
        path: 'assets/eng/Yours.mp3',
        displayName: "I'm Yours",
        cover: 'assets/eng/p2/4.jpg',
        artist: 'Jason Mraz',
        lyrics: 'assets/eng/l2/eng4.txt',
    },
    {
        path: 'assets/jap/a.mp3',
        displayName: "ぎゅっと 緊緊地",
        cover: 'assets/jap/p3/1.jpg',
        artist: 'Mosawo (もさを。)',
        lyrics: 'assets/jap/l3/jap1.txt',
    },
    {
        path: 'assets/jap/b.mp3',
        displayName: "空唄",
        cover: 'assets/jap/p3/2.jpg',
        artist: 'Kentaro ft.汐菜',
        lyrics: 'assets/jap/l3/jap2.txt',
    },
    {
        path: 'assets/jap/c.mp3',
        displayName: "Albireo(天鵝座)",
        cover: 'assets/jap/p3/3.jpg',
        artist: 'ロクデナシ',
        lyrics: 'assets/jap/l3/jap3.txt',
    },
    {
        path: 'assets/jap/d.mp3',
        displayName: "ランデヴー",
        cover: 'assets/jap/p3/4.jpg',
        artist: 'シャイトープ',
        lyrics: 'assets/jap/l3/jap4.txt',
    },
    {
        path: 'assets/pt/1.mp3',
        displayName: "六層樓",
        cover: 'assets/pt/p4/1.jpg',
        artist: '宋冬野',
        lyrics: 'assets/pt/l4/pt1.txt',
    },
    {
        path: 'assets/pt/2.mp3',
        displayName: "夢遺少年",
        cover: 'assets/pt/p4/1.jpg',
        artist: '宋冬野',
        lyrics: 'assets/pt/l4/pt2.txt',
    },
    {
        path: 'assets/pt/3.mp3',
        displayName: "快魚仔",
        cover: 'assets/pt/p4/3.jpg',
        artist: '盧廣仲 Crowd Lu',
        lyrics: 'assets/pt/l4/pt3.txt',
    },
    {
        path: 'assets/pt/4.mp3',
        displayName: "讓我逃離平庸的生活",
        cover: 'assets/pt/p4/4.jpg',
        artist: '白安ANN',
        lyrics: 'assets/pt/l4/pt4.txt',
    },
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
