//game constants
let direction={x:0,y:0};
let foodSound=new Audio("../music/food.mp3")
let gameOverSound=new Audio("../music/gameover.mp3");
let moveSound=new Audio("../music/move.mp3")
let musicSound=new Audio("../music/music.mp3")
let board=document.getElementById("board")
let scoreDiv=document.getElementById("score");
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food={x:13,y:13}
let inputDir={x:0,y:0};
let snakeElement;
// game functions

function main(ctime)
{
   window.requestAnimationFrame(main);
   if((ctime-lastPaintTime)/1000<1/speed){
       return
   }
   lastPaintTime=ctime;
   gameEngine()
}

function isCollided(sarr){
    //if you collide to yourself
    for(let index=1;index<snakeArr.length;index++){
        if(snakeArr[index].x===snakeArr[0].x && snakeArr[index].y===snakeArr[0].y){
            return true;
        }
    } 
    //if you collide with the wall
        if(snakeArr[0].x>=18|| snakeArr[0].x<=0 ||snakeArr[0].y>=18|| snakeArr[0].y<=0){
     return true;
        }
  
    return false;
}
function gameEngine(){
    //part 1:updating the snake array
             if(isCollided()){
               gameOverSound.play()
               musicSound.pause()
               inputDir={x:0,y:0}
               alert("game over press any key to play again")
               snakeArr=[{x:13,y:15}]
               musicSound.play()
               score=0;
             }

    //if you have eaten the food

     if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
     {
         foodSound.play();
         snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
         let a=2;
         let b=16;
         food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
         score+=1;
        scoreDiv.innerHTML=`Score:${score}`;
     }
      //move the snake
       for(let i=snakeArr.length-2;i>=0;i--){
           snakeArr[i+1]={...snakeArr[i]};
       }

       snakeArr[0].x+=inputDir.x;
       snakeArr[0].y+=inputDir.y;

    // part 2:display the snake 

       
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
      
        snakeElement=document.createElement("div")
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add("snake")
        board.appendChild(snakeElement);
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake")
        }
    })
// display the food
        foodElement=document.createElement("div")
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food")
        board.appendChild(foodElement);


}


// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir={x:0,y:1}// start the game
    musicSound.play()
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;    
        default:break;        
    }
})