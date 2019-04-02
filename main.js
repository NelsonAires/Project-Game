/* ----------- PROJECTO CARRO -------- */

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let frame = 0

var car = new Image()
car.src = './img/car1-01.png'

let player1 = new Player(100,300,10,10, '#ffffff', ['w','a','s','d'])
let enemies = [
  new Enemy(30,100,0,10,'white'),
  new Enemy(30,200,2,10,'black'),
  new Enemy(30,300,3,10,'grey'),
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

  // Draw player1
  player1.draw(ctx)

  // Draw all enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx)
  }
}

// The goal of this function is to update each element
function updateEverything() {
  frame++
  player1.update()
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
    enemies.push(new Enemy(x,y,1,10,'black'))
  } 
}

function checkCollision(player, enemy) {
  // If the right side of the enemy < left side of player, return false
  if (enemy.right() < player.left() || player.right() < enemy.left() || enemy.bottom() < player.top() || player.bottom() < enemy.top())
    return false
  return true
}

/*const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
//constants
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height
// const GRAVITY = 0.5 // Constante para a gravidade (definida em VY)

 let frame = 0 // the counter
 let player1 = new Player(0,0,'red', ['w','a','s','d'])//INSERT CAR HERE ------------
// let scoreBalls = [ //SNOW MAYBE OR LEAFS ------------
//     new ScoreBall()
// ]

let bg = new Background()

function animation() {
    updateEverything()
    drawEverything(ctx)
    window.requestAnimationFrame(animation)
}
animation()

function drawEverything(ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  
    //bg.draw(ctx)
    player.draw(ctx)
}
   

function updateEverything() {
    frame++
    player1.update()
    // for (let i = 0; i < enemies.length; i++) {
    //   enemies[i].update()
    //   if (checkCollision(player1, enemies[i])) {
    //     //
    //     enemies.splice(i,1)
    //   }
    // }    
}
// function updateEverything(){
//         bg.update()
//     }

*/