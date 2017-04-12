var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var bgImage = new Image();
var mImage = new Image();
var mReady = false;
var bgReady = false;
var marioX = 400;
var tiles = [];
var rightPressed = false;
var leftPressed = false;
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
								[0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,],
								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
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
var rate = 0;
var marioUpdate = () =>{

if( rate % 6 == 0){
	if( dxM >=17 * 3)
		dxM = 17;
	else
		dxM += 17;
	}
	rate++;

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
		ctx.drawImage(mImage,80+dxM,34,15,15,marioX,390, 30, 30);
		if( rightPressed){
		     marioX += 7;
				 if( marioX >720)
				 marioX = 0;
				 marioUpdate();
			 }
	  else if( leftPressed)
		     marioX -= 7;
				 if( marioX < 0)
				 marioX = 0;
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
	else if( event.keyCode == 37)
		leftPressed = true;
}

function keyUpHandler(event){
	if(event.keyCode == 39)
		rightPressed = false;
	else if( event.keyCode == 37)
		leftPressed = false;
}
main();
