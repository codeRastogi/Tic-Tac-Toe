const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]    
];

//initialize game



function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

    boxes.forEach((box) => {
        box.classList.remove("win");
    })
}

initGame();

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((array) => {
        if((gameGrid[array[0]] === "X" && gameGrid[array[1]] == "X" && gameGrid[array[2]] === "X")
        || (gameGrid[array[0]] === "O" && gameGrid[array[1]] == "O" && gameGrid[array[2]] === "O")){
            answer = gameGrid[array[0]];
            boxes[array[0]].classList.add("win");
            boxes[array[1]].classList.add("win");
            boxes[array[2]].classList.add("win");
            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })
        }
    });
    if(answer !== ""){
        gameInfo.innerHTML = `Player -${answer}-wins`;
        newGameBtn.classList.add("active");
        // console.log(gameInfo.innerHTML);
        return;
    }
    let i = 0;
   while(i < 9){
    if(gameGrid[i] === ""){
        break;
    }
    i++;
   }
   if(i === 9){
    newGameBtn.classList.add("active");
    gameInfo.innerHTML = `Match Tie`;
   }else{
    i = 0;
   }
}


function changePLayer() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        changePLayer();
        checkGameOver();

        
    }

}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})


newGameBtn.addEventListener("click", initGame);

