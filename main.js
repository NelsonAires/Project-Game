/* ----------- PROJECTO CARRO -------- */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let intro = document.getElementById('intro')
let gameSound = document.getElementById('soundGame')

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

let frame = 0

function start(){
  intro.style.display = 'none';
  gameSound.play()

}
// let gameSound = new Audio()
// gameSound.src = "./img/GameSound.mp3"

// gameSound.src = "./img/GameSound.mp3"
// function playGame() {
//   backgroundMusic.play()
//   backgroundMusic.pause()

let circuit = new Circuit()
let player2 = new Player(224,510, 0, 60,30, '#ffffff', ['z','x','c','v'])//Blue Car
let player1 = new Player(225,545, 0, 50,32, '#ffffff', ['w','a','s','d'])//Red Car
let enemies = [
  new Enemy(200,100,0,1,'#ffffff'),
  new Enemy(200,150,2,1,'#ffffff'),
  new Enemy(30,200,1,2,'#ffffff'),
  new Enemy(10,250,0,1,'#ffffff'),
  new Enemy(30,350,1,2,'#ffffff'),
  new Enemy(60,400,1,2,'#ffffff'),
]

function animation() {
  updateEverything()
  drawEverything()
  window.requestAnimationFrame(animation) // The function animation will be triggered when the browser is ready to draw something again
  }
animation()

// The goal is this function is to draw everything (no update)
function drawEverything() {
  // Clearing all the canvas
  ctx.clearRect(0,0,canvas.width, canvas.height)
  circuit.draw(ctx)

  // Draw player1 and player2
  player1.draw(ctx, './img/car_mini-01.png')//Red Car
  player2.draw(ctx, './img/PL2-01.png')//Blue Car

  // Draw all enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx)
  }
}
/////////////////////////
//gameSound.src = "./img/GameSound.mp3"
function playMusic() {
  backgroundMusic.play()
}

//id = Music getElementById = acrescentar

//--UPDATE------   The goal of this function is to update each element
function updateEverything() {
  frame++
  player1.update()
  player2.update()
  //music.update()
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
    enemies.push(new Enemy(x,y,1,6,'#ffffff'))
  } 
}

function checkCollision(player, enemy) {
  // If the right side of the enemy < left side of player, return false
  if (enemy.right() < player.left() || player.right() < enemy.left() || enemy.bottom() < player.top() || player.bottom() < enemy.top())
    return false
  return true
}


