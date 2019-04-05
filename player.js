class Player {
    constructor(initialX, initialY, initialAngle, width, height, src) {
      this.x = initialX // Center of the car
      this.y = initialY // Center of the car
      this.width = width
      this.height = height
      this.maxSpeed = 6
      this.speed = 0 //VELOCITY OF THE ITEM
      this.acceleration = 0.1
      this.rotationSpeed = 0.07
      this.angle = initialAngle
      this.isUp = false
      this.isLeft = false
      this.isDown = false
      this.isRight = false
      this.lap = 0.5
      this.img = new Image()
      this.img.src = src
      this.numOfLaps = 0
      
  
      document.onkeydown = (event) => {
        // If the user pressed up
        //PLAYER_1 RED CAR
        if (event.keyCode === 38) {
          event.preventDefault()
          player1.isUp = true
        }
        if (event.keyCode === 37) {
          event.preventDefault()
          player1.isLeft = true
        }
        if (event.keyCode === 40) {
          event.preventDefault()
          player1.isDown = true
        }
        if (event.keyCode === 39) {
          event.preventDefault()
          player1.isRight = true
        }
         //PLAYER_2 BLUE
        if (event.keyCode === 87) {
          event.preventDefault()
          player2.isUp = true
        }
        if (event.keyCode === 65) {
          event.preventDefault()
          player2.isLeft = true
        }
        if (event.keyCode === 83) {
          event.preventDefault()
          player2.isDown = true
        }
        if (event.keyCode === 68) {
          event.preventDefault()
          player2.isRight = true
        }
      }
       // When the key is up, the movement is stopped
       //PLAYER_1
      document.onkeyup = (event) => {
        if (event.keyCode === 38) {
          player1.isUp = false
        }
        if (event.keyCode === 37) {
          player1.isLeft = false
        }
        if (event.keyCode === 40) {
          player1.isDown = false
        }
        if (event.keyCode === 39) {
          player1.isRight = false
        }
         //PLAYER_2
        if (event.keyCode === 87) {
          player2.isUp = false
        }
        if (event.keyCode === 65) {
          player2.isLeft = false
        }
        if (event.keyCode === 83) {
          player2.isDown = false
        }
        if (event.keyCode === 68) {
          player2.isRight = false
        }
      }

    }
    // Return a number between 0 and 1, used to multiple the speed
    // 0 means, the speed is set to 0
    // 1 means, the speed is not changed
    // 0.5 means, the speed is divided by 2
    getSpeedFactor() {
      if (circuit.getGridValueAtCoordinates(this.x, this.y) === 0)
        return 0.8
      else 
        return 1
    }
    update() {
      // Update the speed
      if (this.isUp) {
        this.speed += this.acceleration
        if (this.speed >this.maxSpeed) {
          this.speed = this.maxSpeed
        }
      }
      else if (this.isDown) {
        this.speed -= this.acceleration
        if (this.speed < -this.maxSpeed/2) {
          this.speed = -this.maxSpeed/2
        }
      }
      else {
        this.speed *= 0.9
      }

      this.speed *= this.getSpeedFactor()

      // Update x and y
      this.x += this.speed * Math.cos(this.angle)
      this.y += this.speed * Math.sin(this.angle)

      // speed
      // 5
      // (5+0.1) * 0.8 = 4.08
      // (4.08+0.1) * 0.8 = 3.33
      // (3.33+0.1) * 0.8 = 2.74
      // (2.74+0.1) * 0.8 = 2.27

      // Update the angle
      if (this.isLeft) {
        this.angle -= this.rotationSpeed
      }
      if (this.isRight) {
        this.angle += this.rotationSpeed
      }

      // Check for the limit inside the canvas
      if (this.x < this.width/2) {
        this.x = this.width/2
      }
      if (this.y < this.height/2) {
        this.y = this.height/2
      }
      if (this.x > CANVAS_WIDTH - this.width/2) {
        this.x = CANVAS_WIDTH - this.width/2
      }
      if (this.y > CANVAS_HEIGHT-this.height/2) {
        this.y = CANVAS_HEIGHT-this.height/2
      }
      if (this.x + this.side > CANVAS_WIDTH) {
        this.x = CANVAS_WIDTH - this.side
      }
      if (this.y + this.side > CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT - this.side
      }
    }
    draw(ctx, src) {
      ctx.save()
      ctx.translate(this.x, this.y) // Move the coordinates system to the center of the car
      ctx.rotate(this.angle)
      // ctx.fillStyle = this.color
      // ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height) //COMMENT PA tirar caixa
      // ctx.fillStyle = "black" // ORIENTATION LINE
      // ctx.fillRect(0, 0, this.width/2,1)
      ctx.drawImage(this.img,-this.width/2, -this.height/2, this.width, this.height) // TODO: draw the image instead of fillRect
      ctx.restore()
    }
    top() {
      return this.y
    }
    bottom() {
      return this.y + this.side
    }
    left() {
      return this.x
    }
    right() {
      return this.x + this.side
    }
    getFloorLap() {
      return Math.floor(this.lap)
    }
  }

  