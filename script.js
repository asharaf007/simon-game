let colors=["red","green","yellow","blue"];
let level=0;
let gamePattern=[];
let isGameStarted=false;
let target=$("h1");
let index=0;
//if any key is pressed
$(document).keypress(function( ){
    //if game has not already started then start it
    if(!isGameStarted){
        isGameStarted=true;
        nextLevel();
    }
    //otherwise do nothing
})
function nextLevel(){
    index=0;
    //increase the level of game first
    level++;
    //change the h1 text
    target.text("Level "+level);
    //randomly choose any color
    let colour=colors[Math.floor(Math.random() * 4)];
    //push it into the array
    gamePattern.push(colour);
    //animate and make sound for that colour
    $("."+colour).animate({"opacity":0}).animate({"opacity":1});
    playSound(colour);
}
//if someone clicks on any colour button
$(".btn").click(function(){
    
    //get the colour which player has clicked on
    let color=$(this).attr("id");
    playSound(color);
    animatePress(color)
    //check if the colour is correct and matches the right index
    if(gamePattern[index]===color){
        //increase index for future checking
        index++;
        //if whole array is checked then
        if(gamePattern.length===index){
            //proceed to next level after 10seconds
            setTimeout(function (){
                nextLevel();
            },1000);
        }
    }
    //if colour did not match then game over
    else{
        //play game over sound
        playSound("wrong");
        //add animation of being game over 
        $("body").addClass("game-over");
        //change the h1 text to game over .......
        target.text("Game Over, Press Any Key To Restart");
        //animation for 2 seconds
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        //and then start over again
        startOver();
    }
    
})
function startOver(){
    //reset all things 
    gamePattern=[];
    isGameStarted=false;
    level=0;
}
function animatePress(colour) {
    $("#"+colour).addClass("pressed");
    setTimeout(function () {
        $("#"+colour).removeClass("pressed");
    },100)
}
function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}