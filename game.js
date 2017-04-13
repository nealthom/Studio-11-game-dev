var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var bgImage = new Image();
var mImage = new Image();
var mReady = false;
var bgReady = false;
var marioX = 400;
var marioY = 390;
var tiles = [];
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var level     =[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
							  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
							  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
							  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
							  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]];

var rows = 16;
var cols = 24;
tiles[0] = 0;
tiles[1] = { x: 0, y: 0, w: 15, h: 15};
tiles[2] = { x: 15, y: 0, w: 15, h: 15};




bgImage.onload = () =>{
	bgReady = true;

};
mImage.onload = () =>{
	mReady = true;
}

bgImage.src = 'tiles.png';
mImage.src = 'mario.png';
var dxB = 0;
var dxM = 0;
var dyM = 0;
var rate = 0;
var marioSpeed = 4;
var mFramePosX = 81;
var mFramePosY = 34;
var spriteSpeed = 8;
var looking = 'right';
var marioUpdate = () =>{

if( rate % 6 == 0){
	if( dxM >=17 * 3)
		dxM = 17;
	else
		dxM += 17;
	}
	rate++;
}

var goingUp = false;
var jump = () =>{

	if( goingUp){
		if(dyM == -90){
			goingUp = false;
		}
		else
			dyM -= 2;
	}
    else if( !dyM && !goingUp){
	
	goingUp = true;
}
	else if( !goingUp && dyM){
		if( dyM >= 0)
				dyM +=2;
	}

	
}

var render = () =>{
/*	if(bgReady){
		ctx.drawImage(bgImage,0 + dxB ,0,400,225,0,0,800,460);
	}*/
	ctx.clearRect(0,0,canvas.width, canvas.height);
	drawLevel();
  drawMario();
}
var drawMario = () =>{
	if(mReady){
		ctx.drawImage(mImage,mFramePosX+dxM,mFramePosY,15,15,marioX,marioY + dyM, 30, 30);
		
		if( rightPressed){
			mFramePosX = 81;
			mFramePosY = 34;
		     marioX += marioSpeed;
				 if( marioX >720)
				 marioX = 0;
				 marioUpdate();
				 
			 }//end of rightPressed
	  else if( leftPressed){
		mFramePosX = 81;
		mFramePosY = 101;
		
		  marioX -= marioSpeed;			 
			if( marioX < 0)
			 	marioX = 720;
		  marioUpdate();
		   
		}//end of LeftPressed
	  else if( upPressed){
		  dxM = 0;
		  mFramePosX = 166;
		  mFramePosY = 34;
		  jump();
	  }
	 
	
			
		
		
	  }
	}


var drawLevel = () =>{
 if( bgReady){
		for( var i = 0; i < rows; i++){
			for( var j = 0; j < cols; j++){
				if( level[i][j] !== 0){
					var type = level[i][j];
					ctx.drawImage(bgImage,tiles[type].x,tiles[type].y,tiles[type].w,tiles[type].h,j*30,i*30,30,30);
				}
			}
		}
	}
}
var main = () =>{

	render();

	requestAnimationFrame(main);
}


document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);


function keyDownHandler(event){
	if(event.keyCode == 39)
		rightPressed = true;
    else if( event.keyCode == 38)
		upPressed = true;
	else if( event.keyCode == 37)
		leftPressed = true;
}

function keyUpHandler(event){
	if(event.keyCode == 39)
		rightPressed = false;
	else if( event.keyCode == 38)
		upPressed = false;
	else if( event.keyCode == 37)
		leftPressed = false;
}
main();
