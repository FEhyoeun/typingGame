// 사용변수
const GAME_TIME = 9;
const msg = '획득 점수를 기록하시겠습니까?';
let score = 0;
let recallScore = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];


const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const recallScoreDisplay = document.querySelector('.recent-score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
const buttonQuit = document.querySelector('.quit');


init();

function init() {
    buttonChange('게임 로딩중');
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run() {
    if(isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("게임 중");
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        buttonChange("게임 시작");
        clearInterval(checkInterval);
    }
}

// 단어 불러오기
function getWords() {
    // // axios를 써서 불러옴 
    // axios.get('https://random-word-api.herokuapp.com/word?number=100')
    //     .then(function (response) {
    //     response.data.forEach((word) => {
    //         if(word.length < 10) {
    //             words.push(word);
    //         }
    //     }) 
    //     buttonChange('게임 시작');  
    //     console.log(words);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    words = ['Hello', 'Banana', 'Apple', 'Cherry'];
    buttonChange('게임 시작');
}

// 단어 일치 체크
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        // 정답을 맞추고 나면 단어 리셋
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

function countDown() {
    //(조건) ? 참일 경우 : 거짓일 경우 
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    // 시간이 줄어들면, 보여지는 시간도 줄어들도록
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임 시작' ? button.classList.remove('loading') : button.classList.add('loading');
}

function quit() {
    time = 0;
    let r = confirm(msg);
    if(r == true) {
        // 저장한다고 했을 때: score 값이 저장되고 초기 화면으로
        recallScore = score;
        recallScoreDisplay.innerText = recallScore;
        score = 0;
        scoreDisplay.innerText = 0;
    } else {
        // 저장하지 않는다고 했을 때: score 0으로 reset되며 초기 화면으로
        score = 0;
        scoreDisplay.innerText = 0;
    }
}
