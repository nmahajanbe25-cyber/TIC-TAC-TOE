let boxes=document.querySelectorAll(".box");
let newgamebtn=document.querySelector("#newgamebtn");
let resetbtn=document.querySelector("#resetbtn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let count=0;   // to check draw 
let turnO="true";
const winPatterns=[                    // 2D ARRAY 
    [0,1,2],
    [3,4,5],              // here pattern[0]=3,pattern[1]=4,pattern[2]=5
    [6,7,8],
    
    [0,3,6],
    [1,4,7],
    [2,5,8],                 // here pattern[0] means 2 and pattern[1]=5,pattern[2]=8
    [0,4,8],
    [2,4,6],
];

 const resetgame=()=>{
    turnO="true";
    enableboxes();                       // to enable all the boxes again 
    msgcontainer.classList.add("hide");  // add he class list hide so that winner content is hidden //
 }



boxes.forEach((box)=>{                        // what happens when box is clicked access each box thats why use forEach
    box.addEventListener("click",()=>{
        if(turnO=="true"){
            box.innerText="O";
            turnO="false";
        }
        else{
            box.innerText="X";
            turnO="true";
        }
        box.disabled=true;
        count++;
        let isWinner = checkWinner();                        // call checkWinner function 

        if(count===9 && !isWinner){
            drawGame();
        }
    })
})
  
  
const enableboxes=()=>{                             // to enable all the boxes once we click new game btn 
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";                         // empty all the boxes 
        count=0;
    }
}



 const disableboxes=()=>{                        // to disbale all the buttons so that it could not clicked once winner is declared 
    for(let box of boxes){
        box.disabled=true;
    }
 }

 
 const showWinner=(winner)=>{                                      // to display the winner 
  msg.innerText=`Congratulations! Winner is ${winner}`;
  msgcontainer.classList.remove("hide");                      /// to remove the display:hide //
  disableboxes();
 }



 const checkWinner=()=>{                                           // we have to check each winPattern //
    for(let pattern of winPatterns){                              //winPattern wale array par loop chlaya hai transverse kra hai ki koi aa raha hai

    
        let pos1val=boxes[pattern[0]].innerText;              ///  it gives the position of the box and element inside it "O or X" ///
        let pos2val=boxes[pattern[1]].innerText              // boxes[pattern[0]]means pattern[0] jis bhi 8 pattern mein se ek ko select karega serial wise then see uske 0th idx par konsa position hai wo output dega and boxes[that position ] gives the position of the box means which box number  
        let pos3val=boxes[pattern[2]].innerText

        if(pos1val!==""&&pos2val!==""&&pos3val!==""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);                                 /// call function which display the winner msg 
                return true;
            }
        }
        
    }
    
    return false;

}


const drawGame=()=>{
    msg.innerText="Match is Drawn!!";
    msgcontainer.classList.remove("hide");   
    disableboxes();
}

resetbtn.addEventListener("click",resetgame);
newgamebtn.addEventListener("click",resetgame);



