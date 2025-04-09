let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"]

let start=false;

//let highScore = 0;
let highScore = localStorage.getItem("highScore") || 0;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    
    if(start==false){
        console.log("game started");
        start=true;

        levelup();
    }
} );


//button flash

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}
//user fntion
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}
//level up 

function levelup(){
    userseq=[];
level++;
h2.innerText=`level ${level}`;

let randidx=Math.floor(Math.random()*4);
let randcolor=btns[randidx];
let randbtn=document.querySelector(`.${randcolor}`);

// console.log(randbtn);
// console.log(randcolor);
// console.log(randidx);
gameseq.push(randcolor);
console.log(gameseq);
gameFlash(randbtn);
}
// for checking 
function checkAns(idx){
    //console.log("curr level: " , level);
    // let idx= level-1;
    

    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
        
    }else{
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }
        
        h2.innerHTML = `Game Over!<br>Your Score: <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        
        reset();
    
    }
}

function btnpress(){
   // console.log(this);
   let btn=this;
   userFlash(btn);

   usercolor= btn.getAttribute("id");
//    console.log(usercolor);
   userseq.push(usercolor);
   checkAns(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
   
    start=false;
    gameseq=[];
    userseq=[];
    level=0;
}