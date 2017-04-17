// line 156, I have a small attempt at playing around with collision detection
// Mario walks left and right and jumps
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
var goingUp = false;
var goingDown = false;
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
								[0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,],
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
// this alters the rate the sprite changes
if( rate % 6 == 0){
	if( dxM >=17 * 3)
		dxM = 17;
	else
		dxM += 17;
	}
	rate++;
}


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
	else if( !goingUp){ 
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
		
		if( rightPressed ){
			if(!goingUp && !goingDown){
			mFramePosX = 81;
			mFramePosY = 34;
			marioUpdate();
			}
		     marioX += marioSpeed;
				 if( marioX >720)
				 marioX = 0;
				 looking = 'right';
				 
			 }//end of rightPressed
	  else if( leftPressed ){
		if(!goingUp && !goingDown){
		mFramePosX = 81;
		mFramePosY = 101;
		marioUpdate();
	}
		else{
			mFramePosX = 166;
		    mFramePosY = 101;
		}
		  marioX -= marioSpeed;			 
			if( marioX < 0)
			 	marioX = 720;
		  
		   looking = 'left';
		}//end of LeftPressed
		if( !goingDown){
	  if(  upPressed){
		  dxM = 0;
		  if(looking === 'right'){
		  mFramePosX = 166;
		  mFramePosY = 34;
		}
		else
		{
			mFramePosX = 166;
		    mFramePosY = 101;
		}
		  goingUp = true;
		 // jump();
	  }
		}
	 
	if( goingUp){
		   var nx = Math.floor((marioY + dyM) / 30);
		   var ny = Math.floor( marioX / 30);
			console.log(nx + ' : ' + ny);
		if( dyM <= -90 || level[ nx][ny]){// the part after || is me experimenting with collision detection*******************************
			goingUp = false;
			goingDown = true;
		}
		else
			{
				
				dyM -= 4;
			}
	}
	if( goingDown){
		var nx = Math.floor((marioY + dyM) / 30);
		   var ny = Math.floor( marioX / 30);
		if( dyM >= 0 ){
			goingUp = false;
			goingDown = false;
		}
		else
			{
				dyM += 4;
			}
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
