class Player {
    constructor(initialX, initialY, width, height, color, keys) {
      this.x = initialX // Center of the car
      this.y = initialY // Center of the car
      this.width = width
      this.height = height
      this.maxSpeed = 7
      this.speed = 0 //VELOCITY OF THE ITEM
      this.acceleration = 0.1
      this.rotationSpeed = 0.08
      this.color = color
      this.angle = 1 * Math.PI / 4
      this.isUp = false
      this.isLeft = false
      this.isDown = false
      this.isRight = false
      this.image = new Image()
      this.image.src = "./img/car1-01.png"
  
      document.onkeydown = (event) => {
        event.preventDefault()
        // If the user pressed up
        console.log(event)
        if (event.keyCode === 38) {
          this.isUp = true
        }
        if (event.keyCode === 37) {
          this.isLeft = true
        }
        if (event.keyCode === 40) {
          this.isDown = true
        }
        if (event.keyCode === 39) {
          this.isRight = true
        }
      }
      // When the key is up, the movement is stopped
      document.onkeyup = (event) => {
        if (event.keyCode === 38) {
          this.isUp = false
        }
        if (event.keyCode === 37) {
          this.isLeft = false
        }
        if (event.keyCode === 40) {
          this.isDown = false
        }
        if (event.keyCode === 39) {
          this.isRight = false
        }
      }
    }
    update() {
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
      this.x  += this.speed * Math.cos(this.angle)
      this.y  += this.speed * Math.sin(this.angle)

      if (this.isLeft) {
        this.angle -= this.rotationSpeed
      }
      if (this.isRight) {
        this.angle += this.rotationSpeed
      }
      if (this.x < 0) {
        this.x = 0
      }
      if (this.y < 0) {
        this.y = 0
      }
      
      if (this.x > CANVAS_WIDTH) {
        this.x = CANVAS_WIDTH
      }
      if (this.y > CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT
      }
      if (this.x + this.side > CANVAS_WIDTH) {
        this.x = CANVAS_WIDTH - this.side
      }
      if (this.y + this.side > CANVAS_HEIGHT) {
        this.y = CANVAS_HEIGHT - this.side
      }
    }
    draw(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y) // Move the coordinates system to the center of the car
      ctx.rotate(this.angle)
      ctx.fillStyle = this.color
      ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height) //COMMENT PA tirar caixa
      ctx.drawImage(car,-50,-25,80,40) // TODO: draw the image instead of fillRect
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, this.width/2,1)
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
  }

  /*
  const playerMovementInterpolation = otherPlayers => {
    for (let id in otherPlayers) {
      let player = otherPlayers[id]
      if (player.target_x !== undefined) {
        // Interpolate the player's position
        player.sprite.body.x += (player.target_x - player.sprite.body.x) * 0.30
        player.sprite.body.y += (player.target_y - player.sprite.body.y) * 0.30
  
        let angle = player.target_rotation
        let direction = (angle - player.sprite.body.rotation) / (Math.PI * 2)
        direction -= Math.round(direction)
        direction *= Math.PI * 2
        player.sprite.body.rotation += direction * 0.30
  
        // Interpolate the player's name position
        player.playerName.x += (player.playerName.target_x - player.playerName.x) * 0.30
        player.playerName.y += (player.playerName.target_y - player.playerName.y) * 0.30
  
        // Interpolate the player's speed text position
        player.speedText.x += (player.speedText.target_x - player.speedText.x) * 0.30
        player.speedText.y += (player.speedText.target_y - player.speedText.y) * 0.30
  
        player.updatePlayerStatusText('speed', player.speedText.x, player.speedText.y, player.speedText)
      }
    }
  }
  
  export default playerMovementInterpolation*/