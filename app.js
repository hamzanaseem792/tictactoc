let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset_btn')
let newgamebutton = document.querySelector('#new_btn')
let msgcontainer = document.querySelector('.msg_container')
let msg = document.querySelector('#msg')
// we have to alternate turns for two players and we also must know whose turn it is 
// so for that we will make a varbale with tha name of turn 
let turnO = true // playerX / playerO



// and to store the winning pattern we will use the arrays in js 
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


// now we want that some action must be perform whenever we touch a button , So we will use the even listener for it 

boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
        console.log("The box has been clicked ")
        // so now we have to tell which player is playing the Game
        if(turnO){
            box.innerText="O";
            turnO=false;// we have to make it false to itrate the turn ; 
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        // but we have a problem here if we touch 2time a box it changes to x or y so now we have to solve this problem ,and the solution of this problem is disabled 
        box.disabled= true;

        checkWinner();
        // now we have done with our value but we have to add th elogic that who is winning the game
    })
})

const resetGame = ()=>{
    turnO = true;
    enableBox();
    msgcontainer.classList.add("hide")
}

const disableBox = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText= ""
    }
}

const showWinner= (winner)=>{
  msg.innerText= `Congratulation winner is ${winner}`;
  msgcontainer.classList.remove("hide");
}

const checkWinner= ()=>{
    for(let pattern of winPattern){
        
    
    let poss1val = boxes[pattern[0]].innerText;
    let poss2val= boxes[pattern[1]].innerText;
    let poss3val= boxes[pattern[2]].innerText;   
    if(poss1val!="" && poss2val!="" && poss3val!=""){
        if(poss1val=== poss2val && poss2val===poss3val){
            console.log("winer",poss1val)
            showWinner(poss1val)
            disableBox()
        }
    } 
}
}
newgamebutton.addEventListener('click',resetGame);
resetBtn.addEventListener('click', resetGame)