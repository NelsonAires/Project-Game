class Enemy {
    constructor(initialX,initialY,speed,side,color) {
      this.x = initialX
      this.y = initialY
      this.speed = speed
      this.side = side
      this.color = '#f9f9f9'
    }
    update() {
      if (this.x > CANVAS_WIDTH-this.side || this.x < 0) {
        this.speed *= -1
      }
      this.x += this.speed
    }
    draw(ctx) {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.side, this.side)
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