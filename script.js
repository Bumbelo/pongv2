const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//wielkośc canvas
const cw = canvas.width;
const ch = canvas.height;

//wielkość linii środkowych
const lineWidth=6;
const lineHeight=20;

//wielkość piłki
const ballSize = 20; 
//pozycja piłki
let ballX=cw/2-ballSize/2;
//let ballY=ch/2-ballSize/2;
let ballY=100;
//prędkośc piłki
/*let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedX=plusOrMinus*4;
plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedY=plusOrMinus*Math.round(Math.random()*3+1);
*/
ballSpeedX=-2;
ballSpeedY=1;
//wielkość paletek
const paddleWidth=20;
const paddleHeight=100;
//pozycja paletek
//gracz
const playerX=70;
let playerY=200;
//AI
const aiX=910;
let aiY=200;

function player(){
    //gracz
    ctx.fillStyle="#0091f9";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight); 
}

function ai(){
    //ai
    ctx.fillStyle="#b20000";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight); 
}

function ball(){
    const middleBall=ballY+ballSize/2;
    const middlePaddleP=playerY+paddleHeight/2;
    const middlePaddleAI=aiY+paddleHeight/2;
    //piłka
    ctx.fillStyle="#ffffff";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    //rozpoznawanie krawędzi
    if(ballY<=0 || (ballY+ballSize)>=ch){
        ballSpeedY=-ballSpeedY;
        speedUp();
    }
    /*if(ballX<=0 || (ballX+ballSize)>=cw){
        ballSpeedX=-ballSpeedX;
        speedUp();
    }*/
    if(ballX<=0 || (ballX+ballSize)>=cw){
        ballX=cw/2-ballSize/2;
        ballY=ch/2-ballSize/2;
        
        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        ballSpeedX=plusOrMinus*4;
        plusOrMinus = Math.random() < 0.5 ? -1 : 1; ballSpeedY=plusOrMinus*Math.round(Math.random()*3+1);
        
    }
    
    if(ballX<90 && ballX>50){
        if(middleBall>=middlePaddleP-50-ballSize/2 && middleBall<=middlePaddleP+50+ballSize/2){
            ballSpeedX=-ballSpeedX;
            speedUp();
            console.log(playerY+paddleHeight-ballY);
            
            
            if(playerY+paddleHeight-ballY<=10){
                if(ballSpeedY<0){
                    ballSpeedY=Math.abs(ballSpeedY);
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY)*3;
                    ballX=playerX+paddleWidth;
                }
            }
            
            else if(playerY+paddleHeight-ballY<=30){
                
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY)/3;
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY)*3;
                    ballX=playerX+paddleWidth;            
                }
                
            }
            
            else if(playerY+paddleHeight-ballY<=50){
                
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY)/2;
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY)*2;
                    ballX=playerX+paddleWidth;
                }
                
            }
            
            else if(playerY+paddleHeight-ballY<=70){
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY);
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY);
                    ballX=playerX+paddleWidth;
                }
            }
            
            else if(playerY+paddleHeight-ballY<=90){
                
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY)*2;
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY)/2;
                    ballX=playerX+paddleWidth;
                }
            }
            
            else if(playerY+paddleHeight-ballY<=110){
                
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY)*3;
                    ballX=playerX+paddleWidth;                    
                }
                else{
                    ballSpeedY=Math.abs(ballSpeedY)/3;
                    ballX=playerX+paddleWidth;        
                }
            }
            
            else if(playerY+paddleHeight-ballY<=120){
                
                if(ballSpeedY<0){
                    ballSpeedY=-Math.abs(ballSpeedY)*3;
                    ballX=playerX+paddleWidth;
                }
                else{
                    ballSpeedY=-Math.abs(ballSpeedY);
                    ballX=playerX+paddleWidth;
                }              
            }
            
            /*if(middleBall>=middlePaddleP){
                console.log("dol");
            }
            if(middleBall<=middlePaddleP){
                console.log("gora")
            }*/
        }
    }
    if(ballX>890 && ballX<930){
        if(middleBall>=middlePaddleAI-50-ballSize/2 && middleBall<=middlePaddleAI+50+ballSize/2){
            ballSpeedX=-ballSpeedX;
            speedUp();
        }
    }
    
}

function table(){
    //stół
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    //linie na środku
    ctx.fillStyle = "#999999";
    for(let linePosition = 20; linePosition < ch; linePosition+=2*lineHeight){
        ctx.fillRect(cw/2-lineWidth/2, linePosition, lineWidth, lineHeight);
    }
}

//gdzie canvas znajduje się od górnej krawędzi okna przeglądarki
topCanvas = canvas.offsetTop;

//pozycja kursora
//e - informacje o położeniu myszy
function playerPosition(e){
    playerY=e.offsetY-paddleHeight/2;
    
    //zabezpieczenie przed wyjechaniem paletki poza canvas
    if(playerY>=ch-paddleHeight){
        playerY=ch-paddleHeight;
    }
    if(playerY<=0){
        playerY=0;
    }
    
    //aiY=playerY;
};

//przyspieszenie
function speedUp(){
    //prędkość X
    if(ballSpeedX>0 && ballSpeedX<18){
        ballSpeedX += 0.5;
    }
    else if(ballSpeedX<0 && ballSpeedX>-18){
        ballSpeedX -= 0.5;
    }   
    //prędkośc Y
    if(ballSpeedY>0 && ballSpeedY<18){
        ballSpeedY += 0.5;
    }
    else if(ballSpeedY<0 && ballSpeedY>-18){
        ballSpeedY -= 0.5;
    }   
}

function speedUpPad(){
    if(ballSpeedX>0 && ballSpeedX<18){
        ballSpeedX += 0.5;
    }
    else if(ballSpeedX<0 && ballSpeedX>-18){
        ballSpeedX -= 0.5;
    }   
    
}

//sztuczna inteligencja
function aiPosition(){
    //pozycja środka paletki
    const middlePaddle=aiY+paddleHeight/2;
    //pozycja środka piłki
    const middleBall=ballY+ballSize/2;
    
    //druga połowa boiska
    if(ballX>600){
        if(middlePaddle-middleBall>200){
            aiY-=30; 
        }
        else if(middlePaddle-middleBall>50){
            aiY-=20;
        }
        else if(middlePaddle-middleBall<-200){
            aiY+=30;
        }
        else if(middlePaddle-middleBall<-50){
            aiY+=20;
        }
    }
    
    //pierwsza połowa boiska
    else if(ballX<=600 && ballX>150){
        if(middlePaddle-middleBall>100){
            aiY-=10; 
        }
        else if(middlePaddle-middleBall<-100){
            aiY+=10;
        }
        
    }
}

//sterowanie paddle za pomocą myszy
canvas.addEventListener("mousemove", playerPosition);

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
    console.log(ballSpeedY);
}


setInterval(game, 1000/60);