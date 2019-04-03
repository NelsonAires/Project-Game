/* ----------- PROJECTO CARRO -------- */

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let frame = 0

let circuit = new Circuit()
let player2 = new Player(200,510, 0, 45,30, '#ffffff', ['z','x','c','v'])
let player1 = new Player(200,545, 0, 45,30, '#ffffff', ['w','a','s','d'])
let enemies = [
  new Enemy(30,100,0,2,'#ffffff'),
  new Enemy(30,200,2,2,'#ffffff'),
  new Enemy(30,300,3,2,'#ffffff'),
  new Enemy(30,100,4,2,'#ffffff'),
  new Enemy(30,200,5,2,'#ffffff'),
  new Enemy(30,300,6,2,'#ffffff'),
]

function animation() {
  updateEverything()
  drawEverything()
  window.requestAnimationFrame(animation) // The function animation will be triggered when the brower is ready to draw something again
}
animation()

// The goal is this function is to draw everything (no update)
function drawEverything() {
  // Clearing all the canvas
  ctx.clearRect(0,0,canvas.width, canvas.height)

  circuit.draw(ctx)

  // Draw player1
  player1.draw(ctx, './img/PL2-01.png')
  player2.draw(ctx, './img/car_mini-01.png')

  // Draw all enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx)
  }
}

// The goal of this function is to update each element
function updateEverything() {
  frame++
  player1.update()
  player2.update()
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update()
    if (checkCollision(player1, enemies[i])) {
      console.log('Collision with the enemy '+i)
      enemies.splice(i,1)
    }
  }
  // Generation of enemy every 100 frames
  if (frame % 100 === 0) {
    let x = 0
    let y = Math.floor(Math.random() * CANVAS_HEIGHT)
    enemies.push(new Enemy(x,y,1,3,'#ffffff'))
  } 
}

function checkCollision(player, enemy) {
  // If the right side of the enemy < left side of player, return false
  if (enemy.right() < player.left() || player.right() < enemy.left() || enemy.bottom() < player.top() || player.bottom() < enemy.top())
    return false
  return true
}

