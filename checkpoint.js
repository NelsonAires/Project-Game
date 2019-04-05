class CheckPoint {
    constructor(type, x, y) {
        this.x = x
        this.y = y
        this.width = 20
        this.height = 120
        this.type = type
        this.nrOfLaps = 4 //Nr of laps
        //this.winner = 3
    }
    draw(ctx) {
        ctx.save()
        // ctx.globalAlpha = 0.5
        // ctx.fillStyle = "yellow"
        // ctx.fillRect(this.x, this.y, this.width, this.height)       
        ctx.restore()
    }

    left() {
        return this.x
    }
    right() {
        return this.x + this.width
    }
    top() {
        return this.y
    }
    bottom() {
        return this.y + this.height
    }
    updateCarLap(player) {
        if (this.left() <= player.x && player.x <= this.right() && this.top() <= player.y && player.y <= this.bottom()) {
            if (this.type === "start") {
                player.lap = Math.ceil(player.lap)
            }
            else {
                player.lap = Math.floor(player.lap) + 0.5
            }
        }
    }
    
}