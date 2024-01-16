let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

const O = "O"
const X = "X"
let currentPlayer = X
let spaces = Array(16).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = (currentPlayer == X)? O : X
    }
}

let winningCombos = [
    [1,5,6,10],
    [5,9,10,14],
    [2,6,5,9],
    [6,10,9,13]
]
//cube
for (let i = 0; i < 11; i++) {
    winningCombos.push([i, i+4, i+5, i+1]);
}
//vertlightn
for (let i = 0; i < 7; i += 2) {
    winningCombos.push([i, i+4, i+5, i+9]);
}
//vertlightnrevers
for (let i = 1; i < 7; i += 2) {
    winningCombos.push([i, i+3, i+4, i+7]);
}
//gorlightn
for (let i = 0; i < 9; i += 4) {
    winningCombos.push([i, i+1, i+5, i+6]);
}
//gorlightn
for (let i = 1; i < 10; i += 4) {
    winningCombos.push([i, i+1, i+5, i+6]);
}
//gorlightnrev
for (let i = 4; i < 13; i += 4) {
    winningCombos.push([i, i+1, i-3, i-2]);
}
//gorlightnrev
for (let i = 5; i < 14; i += 4) {
    winningCombos.push([i, i+1, i-3, i-2]);
}
//console.log(winningCombos)

function playerHasWon() {
    for (let condition of winningCombos) {
        let [a, b, c, d] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c] && spaces[a] == spaces[d])) {
            return [a,b,c,d]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X
}

startGame()