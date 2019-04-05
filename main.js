/* ----------- PROJECTO CARRO -------- */
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let introSound = document.getElementById('introSound')
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
let player2 = new Player(224,510, 0, 60,30, './img/PL2-01.png')//Blue Car
let player1 = new Player(225,545, 0, 50,32, './img/car_mini-01.png')//Red Car
let checkPoints = [new CheckPoint("start", 264, 465), new CheckPoint("middle", 380, 272)]
let enemies = [
  new Enemy(200,100,2,2,'#ffffff'),
  new Enemy(200,150,2,2,'#ffffff'),
  new Enemy(50,200,2,2,'#ffffff'),
  new Enemy(80,250,2,2,'#ffffff'),
  new Enemy(30,350,1,1,'#ffffff'),
  new Enemy(60,400,1,1,'#ffffff'),
]
let winnerNb = null // Possible values: null (no one yet), 1 or 2
let nbOfLaps = 5 //NR OF LAPS to atrb a Winner

function animation() {
  updateEverything()
  drawEverything()
  window.requestAnimationFrame(animation) // The function animation will be triggered when the browser is ready to draw something again
  //drawWinner() 
}
animation()

// The goal is this function is to draw everything (no update)
function drawEverything() {
  // Clearing all the canvas
  ctx.clearRect(0,0,canvas.width, canvas.height)
  circuit.draw(ctx)

  for (let i = 0; i < checkPoints.length; i++) {
    checkPoints[i].draw(ctx);
  }

  // Draw player1 and player2
  player1.draw(ctx)//Red Car
  player2.draw(ctx)//Blue Car

  // Draw all enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw(ctx)
  }

  drawLaps()

  if (winnerNb) {
    drawWinner()
  }
}

//GameSound
function playMusic() {
  backgroundMusic.play()
}

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
  for (let i = 0; i < checkPoints.length; i++) {
    checkPoints[i].updateCarLap(player1)
    checkPoints[i].updateCarLap(player2)
  }
  if (!winnerNb && player1.getFloorLap() > nbOfLaps) {
    winnerNb = 1
  }
  if (!winnerNb && player2.getFloorLap() > nbOfLaps) {
    winnerNb = 2
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

function drawLaps() {
  ctx.save()
  let lap1 = player1.getFloorLap()
  let lap2 = player2.getFloorLap()
  ctx.fillStyle ='#f9f9f9' //'#fff9fa'
  ctx.font = "40px 'Iceberg', cursive" //"45px 'VT323', monospace"
  ctx.shadowBlur = 10
  ctx.shadowColor = 'black'
  ctx.fillText("Red Car:"+lap1, 775,100)
  ctx.fillText("Blue Car:"+lap2, 775,150)
  ctx.restore()
}

function drawWinner() {
  ctx.save()
  ctx.globalAlpha = 0.8
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
  ctx.fillStyle ='#f9f9f9' //'#fff9fa'
  ctx.font = "85px 'Iceberg', cursive" //"100px 'VT323', monospace" //"45px 'VT323', monospace"
  // ctx.shadowBlur = 10
  // ctx.shadowColor = 'black'
  let colorWinner = winnerNb === 1 ? "red" : "blue";
  ctx.fillText("WINNER   " + colorWinner, 330,300) 
  ctx.restore()
}

