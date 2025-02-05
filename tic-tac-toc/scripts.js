let playerText = document.getElementById('playerText') 
let restartBtn = document.getElementById('restartBtn')
let homeBtn = document.getElementById('homeBtn')
let musicBtn = document.getElementById('musicBtn')
let musicIcon = document.getElementById('musicIcon')
let boxes = Array.from(document.getElementsByClassName('box'))

let backgroundMusic = document.getElementById('backgroundMusic')

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let gameActive = true

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    
    //  ავტომატურად ვრთავ მუსიკას თამაშის დაწყებისას
    backgroundMusic.play().catch(error => console.log("Auto-play blocked:", error));
    musicIcon.src = "icon/pause.png"  // ავტომატურად აყენებს "Pause" ღილაკის იქონი
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            gameActive = false
            return
        }

          // ✅ ფრის შემოწმება
          if (!spaces.includes(null)) {
            playerText.innerHTML = "Draw!"  // ფრის შემთხვევაში ტექსტის ცვლილება
            gameActive = false  // ✅ თამაშის შეჩერება
            return
        }
        
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

// Home ღილაკის ფუნქცია
homeBtn.addEventListener('click', () => {
    window.location.href = '/index.html'
})

// მუსიკის ჩართვა/გამორთვა ღილაკით
musicBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
        musicIcon.src = "icon/pause.png"
    } else {
        backgroundMusic.pause()
        musicIcon.src = "icon/play.png"
    }
})

startGame()

