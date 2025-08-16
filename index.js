const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1650 
canvas.height = 600 

const gravity = .55;

//player blueprint
//player blueprint
class Player {
	constructor() {
		//set player speed
		this.speed = 9 // default is 9
		this.position = {
			x: 100,
			y: 100
		}
		this.velocity = {
			x: 0,
			y: 0
		}

		this.width = 66
		this.height = 150

		// Add ground detection
		this.isOnGround = false

		this.image = createImage('img/spriteStandRight.png')
		this.frames = 0
		//stand is 18 frames, run is 11 frames

		this.sprites = {
			stand: {
				right: createImage('img/spriteStandRight.png'),
				left: createImage('img/spriteStandLeft.png'),
				cropWidth: 177,	
				width: 66
			},
			run: {
				right: createImage('img/spriteRunRight.png'),
				left: createImage('img/spriteRunLeft.png'),
				cropWidth: 341,
				width: 127.875
			}
		}

		this.currentSprite = this.sprites.stand.right
		this.currentCropWidth = 177
	}

	draw() {
		c.drawImage(
			this.currentSprite,
			this.currentCropWidth * this.frames, //x coordinate to pick frame
			0,
			this.currentCropWidth, //width selection for frame 670
			400, //height selection for frame
			this.position.x,
			this.position.y, 
			this.width,
			this.height)
	}

	update() { 
		//frames
		this.frames++
		if (this.frames >= 28) this.frames = 0
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		
		//creation of player velocity
		if (this.position.y + this.height +
			this.velocity.y <= canvas.height) {
			this.velocity.y += gravity //jump
		}

		// Check if player is on ground (canvas floor)
		if (this.position.y + this.height >= canvas.height) {
			this.isOnGround = true
		} else {
			this.isOnGround = false
		}
	}

	// Method to handle jumping
	jump() {
		if (this.isOnGround) {
			this.velocity.y = -15
			this.isOnGround = false
		}
	}
}

//bat blueprint
class Bat {
	constructor(x, y) {
		this.position = {
			x,
			y
		}

		this.speed = 3
		this.direction = 1

		this.width = 150
		this.height = 100

		this.frames = 0 //11 frames

		this.batImg = new Image()
		this.batImg.src = 'img/bat.png' 
	}

	draw () {
		c.drawImage(
			this.batImg, 
			350 * this.frames, //frame selection
			0, 
			350, //width
			270, //height
			 this.position.x,
			this.position.y, 
			this.width,
			this.height)
	 }

	 update() { //frames
		this.frames++
		if(this.frames > 10) {
			this.frames = 0
		}

		//update bat position
		this.position.y += this.speed * this.direction

		// Check if the bat has reached the top or bottom of the screen
		if (this.position.y <= 0 || this.position.y >= canvas.height - this.height) {
			this.direction *= -1; // Reverse the direction
		}
	}
}

class Pig {
	constructor(x, y, start, end) {
		this.position = {
			x,
			y
		} 

		this.end = end 
		this.start = start

		this.speed = 3
		this.direction = 1

		this.width = 150
		this.height = 150

		this.frames = 0 // 16 frames

		this.pigImg = new Image()
		this.pigImg.src = 'img/pig.png' 

		
	}

	draw() {
		if (this.direction === 1) {
			c.drawImage(
				this.pigImg, 
				256 * this.frames, // frame selection
				0, 
				256, // width
				256, // height
				this.position.x,
				this.position.y, 
				this.width,
				this.height
			)
		} else {
			// Flip the pig horizontally and draw it
			c.save()
			c.translate(this.position.x + this.width, this.position.y)
			c.scale(-1, 1)
			c.drawImage(
				this.pigImg,
				256 * this.frames,
				0,
				256,
				256,
				0,
				0,
				this.width,
				this.height
			)
			c.restore()
		}
	}

	update() {
		this.frames++
		if (this.frames > 15) {
			this.frames = 0
		}

		//update bat position
		this.position.x += this.speed * this.direction

		// Check if the pig has reached the left or right side
		if (this.position.x < this.start || this.position.x >= this.end - this.width) {
			this.direction *= -1; // Reverse the direction
		}
	}
}


//platform blueprint
class Platform {
constructor(x, y) {
	this.position = {
		x,
		y
	}
	
	this.width = 600
	this.height = 150

	
	//create platform image 
	this.platImg = new Image()
	this.platImg.src = 'img/platform.png'
	}

  draw () {
	c.drawImage(this.platImg, this.position.x,
		this.position.y, this.width,
		this.height)
 }
}

//Tall Platform blueprint
class PlatformTall {
	constructor(x, y) {
		this.position = {
			x,
			y
		}
		
		this.width = 300
		this.height = 250
	
		
		//create platform image 
		this.tallImg = new Image()
		this.tallImg.src = 'img/platformTall.png'
		}
	
	  draw () {
		c.drawImage(this.tallImg, this.position.x,
			this.position.y, this.width,
			this.height)
	 }
	}

//background blueprint
class Background {
	constructor(x, y) {
		this.position = {
			x,
			y
		}

		this.width = 1650
		this.height = 600

		//create background image
		this.backImg = new Image()
		
		this.backImg.src = 'img/background.jpg'
	}
	draw () {
		c.drawImage(this.backImg, 
			this.position.x, this.position.y,
			this.width, this.height)
	}
}

//tree blueprint
class Tree {
	constructor(x, y) {
		this.position = {
			x,
			y
		}

		this.width = 500
		this.height = 500

		//create background image
		this.treeImg = new Image()
		
		this.treeImg.src = 'img/tree1.png'
	}
	draw () {
		c.drawImage(this.treeImg, 
			this.position.x, this.position.y,
			this.width, this.height)
	}
}

class YouWin {
	
		constructor(x, y) {
			this.position = {
				x,
				y
			}
			
			this.width = 600
			this.height = 500
		
			
			//create platform image 
			this.winImg = new Image()
			this.winImg.src = 'img/youwin.png'
			}
		
		  draw () {
			c.drawImage(this.winImg, this.position.x,
				this.position.y, this.width,
				this.height)
		 }
		
}
	
//create first spawn in objects
let player = new Player()
let platforms = []
let background = new Background()
let tree = new Tree()
let platformsTall = []
let bats = []
let pigs = []
let youWin = new YouWin()
let lastKey

const keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	}
}

let scrollOffset = 0

function createImage(imageSrc) {
	const image = new Image()
	image.src = imageSrc
	return image
}

function init() { //aka reset

//create objects in INIT!!!
 player = new Player()
 platforms = [ //598 distance for perfect alignment
	new Platform(-1, 480), 
	new Platform(597, 480), 
	new Platform(1500, 480),
	new Platform(2700, 480),
	new Platform(3600, 480),
	new Platform(3898, 480),
	new Platform(4900, 480),
	new Platform(6000, 480),
	new Platform(6598, 480),
	new Platform(7500, 270),
	new Platform(8300, 340),
	new Platform(9200, 480),
	new Platform(9798, 480),
	new Platform(10396, 480),
	new Platform(10994, 480)
]
 background = new Background(0 , 0)
 tree = new Tree(200, 2)
 platformsTall = [ //add 301 to platform so that platformtall is perfect on the right edge
	new PlatformTall(1801, 270),
	new PlatformTall(3900, 270),
	new PlatformTall(5201, 270),
	new PlatformTall(6000, 270),
	new PlatformTall(6899, 270),
	new PlatformTall(8300, 200)
] 
// 1platform.width + 1platform.x = endposition
// endposition + 2platform.width / 2 = bat position
bats = [
	new Bat(1270, 100), 
	new Bat(3380, 100),
	new Bat(4615, 100),
	new Bat(5670, 10),
	new Bat(5670, 400),
	new Bat(8130, 100),
	new Bat(8979, 100)
]

pigs = [ 
 //  position.x position.y start end
	new Pig(3100, 375, 2675, 3345),
	new Pig(4000, 375, 3570, 4530),
	new Pig(6600, 375, 5970, 7225),
	new Pig(7930, 165, 7470, 8140),
	new Pig(7500, 165, 7470, 8140),
	new Pig(8500, 233, 8280, 8925)
]

youWin = new YouWin(20,10)

//larger x =  right
//larger y =  down

player.update()

scrollOffset = 0
}



function animate() {
	requestAnimationFrame(animate) 

	//create original canvas
	c.fillStyle = 'white'
	c.fillRect(0, 0, canvas.width,
		canvas.height)
	
	background.draw()	

	tree.draw()

	platformsTall.forEach((platformTall)  => {
		platformTall.draw()
	})

	platforms.forEach((platform)  => {
		platform.draw()
	})

	
	bats.forEach((bat) => {
		bat.draw()
		bat.update()
	})

	pigs.forEach((pig) => {
		pig.draw()
		pig.update()
	})

	

	player.update()

	

	//create boundries
	if (keys.right.pressed && 
		player.position.x < 600) { //how far right of boundy so that environment moves 
		player.velocity.x = player.speed
	} else if ((keys.left.pressed &&
		player.position.x > 150) || //how far left of boundry so that environment moves 
		(keys.left.pressed && scrollOffset == 0
			&& player.position.x > 0)) {
		player.velocity.x = -player.speed
	} else {
		player.velocity.x = 0

		//environment move left and right if trying to pass boundry
		//scrolloffset to check where on the map i am on
	if (keys.right.pressed && scrollOffset < 9800) {
			scrollOffset += player.speed
			platforms.forEach((platform)  => {
			platform.position.x -= player.speed
		})
			platformsTall.forEach((platformTall)  => {
			platformTall.position.x -= player.speed
		})	
			bats.forEach((bat) => {
				bat.position.x -= player.speed
		})
		pigs.forEach((pig) => {
			pig.position.x -= player.speed
			pig.end -= player.speed
			pig.start -= player.speed
		})
		  

			tree.position.x -= player.speed * .66
			
	} else if (keys.left.pressed && scrollOffset > 0) {
		scrollOffset -= player.speed
		platforms.forEach((platform)  => {
			platform.position.x += player.speed
		})	
		platformsTall.forEach((platformTall)  => {
			platformTall.position.x += player.speed
		})	
		bats.forEach((bat) => {
			bat.position.x += player.speed
		})
		pigs.forEach((pig) => {
			pig.position.x += player.speed
			pig.end += player.speed
			pig.start += player.speed
		})
		  
		tree.position.x += player.speed * .66
		}
	}

	console.log(scrollOffset)

	//platform collision detection
	platforms.forEach((platform)  => {
	if (player.position.y + player.height 
		<= platform.position.y && 
		player.position.y + player.height +
		player.velocity.y >= 
		platform.position.y && 
		player.position.x + 
		player.width >= 
		platform.position.x && 
		player.position.x <= 
		platform.position.x +
		platform.width) {
			player.velocity.y = 0
			player.isOnGround = true
		}
	}) 
    //tall platform detection
	platformsTall.forEach((platformTall)  => {
	if (player.position.y + player.height 
		<= platformTall.position.y && 
		player.position.y + player.height +
		player.velocity.y >= 
		platformTall.position.y && 
		player.position.x + 
		player.width >= 
		platformTall.position.x && 
		player.position.x <= 
		platformTall.position.x +
		platformTall.width) {
			player.velocity.y = 0
			player.isOnGround = true
		}
	})	

	


	//bat collision detetion
	bats.forEach((bat, index) => {
		if (player.position.y + player.height 
			<= bat.position.y && 
			player.position.y + player.height +
			player.velocity.y >= 
			bat.position.y && 
			player.position.x + 
			player.width >= 
			bat.position.x && 
			player.position.x <= 
			bat.position.x +
			bat.width) { //end of conditional
			player.velocity.y = -10 //do a little bounce when landing on head
			bat.position.x = -1500 //teleport bat out of screen
			} else if (
				player.position.y + player.velocity.y <= bat.position.y + bat.height &&
				player.position.y + player.height >= bat.position.y &&
				player.position.x + player.width >= bat.position.x &&
				player.position.x <= bat.position.x + bat.width
			) {
				// Player collided with bat's bottom side or sides
				init() // Call init() function
			} 
		})

		//pig collision detection
		pigs.forEach((pig, index) => {
			if (player.position.y + player.height 
				<= pig.position.y && 
				player.position.y + player.height +
				player.velocity.y >= 
				pig.position.y && 
				player.position.x + 
				player.width >= 
				pig.position.x && 
				player.position.x <= 
				pig.position.x +
				pig.width) { //end of conditional
				player.velocity.y = -10 //do a little bounce when landing on head
				pig.position.x = -1500 //teleport pig out of screen
				} else if (
					player.position.y + player.velocity.y <= pig.position.y + pig.height &&
					player.position.y + player.height >= pig.position.y &&
					player.position.x + player.width >= pig.position.x &&
					player.position.x <= pig.position.x + pig.width
				) {
					// Player collided with pig's bottom side or sides
					init() // Call init() function
				} 
			})

	//sprite switching
		if (keys.right.pressed && 
			lastKey === 'right' && 
			player.currentSprite !== player.sprites.run.right) {
				player.frames = 1
			player.currentSprite = player.sprites.run.right
			player.currentCropWidth = player.sprites.run.cropWidth
			player.width = player.sprites.run.width
		} else if (keys.left.pressed && 
			lastKey === 'left' && player.currentSprite 
		!= player.sprites.run.left) {
		player.currentSprite = player.sprites.run.left
		player.currentCropWidth = player.sprites.run.cropWidth
		player.width = player.sprites.run.width
		} else if (!keys.left.pressed && 
			lastKey === 'left' && player.currentSprite 
		!= player.sprites.stand.left) {
		player.currentSprite = player.sprites.stand.left
		player.currentCropWidth = player.sprites.stand.cropWidth
		player.width = player.sprites.stand.width
		} else if (!keys.right.pressed && 
			lastKey === 'right' && player.currentSprite 
		!= player.sprites.stand.right) {
		player.currentSprite = player.sprites.stand.right
		player.currentCropWidth = player.sprites.stand.cropWidth
		player.width = player.sprites.stand.width
		}


		
		

	//win condition
	if (scrollOffset > 9799) {
		console.log('you win')
		youWin.draw()
		player.speed = 0
	}

	//lose condition
	if (player.position.y > canvas. height) {
		init()
		console.log('you lose')
	}
}



init()
animate()

//creation of when key is pressed down (down)
//and then released (up)
addEventListener('keydown', ({keyCode}) => {
	switch (keyCode) {
		case 65: 
		console.log('left')
		keys.left.pressed = true
		lastKey = 'left'
		break

		case 83: 
		console.log('down')
		break
		
		case 68: 
		console.log('right')
		keys.right.pressed = true
		lastKey = 'right'
		break

		case 87: 
	console.log('up')
	player.jump()  
	break
	
}
	console.log(keys.right.pressed)
}) 

addEventListener('keyup', ({keyCode}) => {
	switch (keyCode) {
		case 65: 
		console.log('left')
		keys.left.pressed = false
		break

		case 83: 
		console.log('down')
		break
		
		case 68: 
		console.log('right')
		keys.right.pressed = false
		break

		case 87: 
		console.log('up')
		break
	
}
	console.log(keys.right.pressed)
})