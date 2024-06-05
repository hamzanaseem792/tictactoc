let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset_btn');
let newgamebutton = document.querySelector('#new_btn');
let msgcontainer = document.querySelector('.msg_container');
let msg = document.querySelector('#msg');
// We have to alternate turns for two players and we also must know whose turn it is 
let turnO = true; // playerX / playerO

// To store the winning pattern we will use arrays in JS 
// and we will use the 2D arrays 
const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Now we want some action to be performed whenever we touch a button, so we will use the event listener for it 

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("The box has been clicked ");
        // Now we have to tell which player is playing the game
        if (turnO) {
            box.innerText = "O";
            turnO = false; // We have to make it false to iterate the turn; 
        } else {
            box.innerText = "X";
            turnO = true;
        }
        // But we have a problem here if we touch 2 times a box it changes to X or O so now we have to solve this problem, and the solution is disabling the box
        box.disabled = true;

        checkWinner();
        // Now we have done with our value but we have to add the logic that determines who is winning the game
    });
});

const resetGame = () => {
    turnO = true;
    enableBox();
    msgcontainer.classList.add("hide");
};

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
};

const checkWinner = () => {
    let hasWinner = false;

    for (let pattern of winPattern) {
        let poss1val = boxes[pattern[0]].innerText;
        let poss2val = boxes[pattern[1]].innerText;
        let poss3val = boxes[pattern[2]].innerText;

        if (poss1val !== "" && poss2val !== "" && poss3val !== "") {
            if (poss1val === poss2val && poss2val === poss3val) {
                console.log("winner", poss1val);
                showWinner(poss1val);
                disableBox();
                hasWinner = true;
                break;
            }
        }
    }

    if (!hasWinner) {
        let isDraw = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                isDraw = false;
                break;
            }
        }

        if (isDraw) {
            showDraw();
            disableBox();
        }
    }
};

newgamebutton.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
