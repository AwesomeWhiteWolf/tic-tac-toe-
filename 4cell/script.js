let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

//let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

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

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = (currentPlayer == X)? O : X
    }
}

let winningCombos = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
    
]
// console.log(winningCombos)
// for (let i = 0; i < 11; i++) {
//     winningCombos.push([i, i+4, i+5, i+1]);
// }
// console.log(winningCombos)

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