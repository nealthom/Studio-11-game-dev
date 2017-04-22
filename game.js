var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var bgImage = new Image();
var mImage = new Image();
bgImage.src = 'tiles.png';
mImage.src = 'mario.png';
var mReady = false;
var bgReady = false;
var marioX = 400;
var marioY = 390;
var platformY = 0;
var tiles = [];
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var goingUp = false;
var goingDown = false;
var level =	[
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
						[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
						];

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


var dxB = 0;
var dxM = 0;
var dyM = 0;
var marioSpeed = 0;
var mFramePosX = 81;
var mFramePosY = 34;
var spriteSpeed = 0;
var looking = 'right';

var marioUpdate = () => {
	if (spriteSpeed === 4){
		if (dxM >=17 * 3)
			dxM = 17;
		else
			dxM += 17;
		spriteSpeed = 0;
	}
	spriteSpeed++;
}

var render = () =>{
	ctx.clearRect(0,0,canvas.width, canvas.height);
	drawLevel();
  drawMario();
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
var updateMarioPosition = () =>{

    var nx = Math.floor((marioY + dyM) / 30);
	var ny = Math.floor( marioX / 30);
    if (rightPressed){
			if(!goingUp && !goingDown){
				mFramePosX = 81;
				mFramePosY = 34;
				marioUpdate();
			}
			marioSpeed = marioSpeed < 5 ? marioSpeed+0.2 : 5;
			marioX += marioSpeed;
		  if (marioX >720)
				marioX = 0;
			looking = 'right';
		}

	  else if (leftPressed){
			if (!goingUp && !goingDown){
				mFramePosX = 81;
				mFramePosY = 101;
				marioUpdate();
			}
			else {
				mFramePosX = 166;
			  mFramePosY = 101;
			}
			marioSpeed = marioSpeed < 5 ? marioSpeed+0.2 : 5;
		  marioX -= marioSpeed;
			if (marioX < 0)
			 	marioX = 720;
			looking = 'left';
		}

		if (!goingDown && upPressed){
		  dxM = 0;
		  if(looking === 'right'){
				mFramePosX = 166;
				mFramePosY = 34;
			}
			else {
				mFramePosX = 166;
			  mFramePosY = 101;
			}
			goingUp = true;
			// jump();
		}

		if (goingUp){			
		//	console.log(nx + ' : ' + ny);
			if (dyM <= platformY - 90 || level[nx][ny]){// the part after || is me experimenting with collision detection*******************************
				goingUp = false;
				goingDown = true;
			}
			else {
				dyM -= 4;
			}
		}

		if (!goingUp){			
			if (dyM >= 0 || level[nx +1][ny +1]){
				goingUp = false;
				goingDown = false;
				platformY = dyM;
			}
			else {
                goingDown = true;
                if(looking === 'right'){
				mFramePosX = 166;
				mFramePosY = 34;
			    }
			    else {
				mFramePosX = 166;
			    mFramePosY = 101;
			    }
                dxM = 0;
			    dyM += 4;
			}
		}

		if (!goingDown && !goingUp && !upPressed && !leftPressed && !rightPressed){
			if(looking ==='right'){
				mFramePosX = 81;
				mFramePosY = 34;
				dxM = 0;
			}
			else{
				mFramePosX = 81;
		    mFramePosY = 101;
				dxM = 0;
			}
			marioSpeed = 0;
		}

		
			

}
var drawMario = () =>{
	if(mReady){
		ctx.drawImage(mImage,mFramePosX+dxM,mFramePosY,15,15,marioX,marioY + dyM, 30, 30);
        updateMarioPosition();
		
	}//end of mReady
}//end of drawMario

var main = () =>{

	render();

	requestAnimationFrame(main);
}


document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);


function keyDownHandler(event){
	if (event.keyCode == 39)
		rightPressed = true;
  else if (event.keyCode == 38)
		upPressed = true;
	else if (event.keyCode == 37)
		leftPressed = true;
}

function keyUpHandler(event){
	if (event.keyCode == 39)
		rightPressed = false;
	else if (event.keyCode == 38)
		upPressed = false;
	else if (event.keyCode == 37)
		leftPressed = false;
}
main();