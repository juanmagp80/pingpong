// Variables importantes
const game = document.getElementById('game');
const paddleLeft = document.getElementById('leftPaddle');
const paddleRight = document.getElementById('rightPaddle');
const ball = document.getElementById('ball');

let ballPositionX = 120; // Posición inicial de la pelota en el eje X
let ballPositionY = 50; // Posición inicial de la pelota en el eje Y
let ballSpeedX = 5; // Velocidad en el eje X
let ballSpeedY = 5; // Velocidad en el eje Y
let paddleSpeed = 25; // Velocidad de movimiento de las paletas

// Movimiento de la pelota
function moveBall() {
  // Actualizar la posición de la pelota
  ballPositionX += ballSpeedX;
  ballPositionY += ballSpeedY;

  // Detectar colisión con las paredes verticales
  if (ballPositionY >= game.offsetHeight - ball.offsetHeight || ballPositionY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Detectar colisión con las paletas
  if (ballPositionX <= paddleLeft.offsetWidth && ballPositionY >= paddleLeft.offsetTop && 
      ballPositionY <= paddleLeft.offsetTop + paddleLeft.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballPositionX >= game.offsetWidth - paddleRight.offsetWidth - ball.offsetWidth && 
      ballPositionY >= paddleRight.offsetTop && 
      ballPositionY <= paddleRight.offsetTop + paddleRight.offsetHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Corregir la posición de la pelota si se sale de la pantalla
  if (ballPositionX < 0 || ballPositionX > game.offsetWidth - ball.offsetWidth) {
    ballSpeedX = -ballSpeedX;
    if (ballPositionX < 0) {
      ballPositionX = 0;
    } else {
      ballPositionX = game.offsetWidth - ball.offsetWidth;
    }
  }

  // Actualizar la posición visual de la pelota
  ball.style.left = ballPositionX + 'px';
  ball.style.top = ballPositionY + 'px';

  // Solicitar el siguiente frame de animación
  requestAnimationFrame(moveBall);
}

// Mover las paletas
function movePaddles(event) {
  // Movimiento de la paleta izquierda
  if (event.keyCode === 87) { // Tecla W
    let paddleLeftPositionY = paddleLeft.offsetTop - paddleSpeed;
    if (paddleLeftPositionY >= 0) {
      paddleLeft.style.top = paddleLeftPositionY + 'px';
    }
  }
  if (event.keyCode === 83) { // Tecla S
    let paddleLeftPositionY = paddleLeft.offsetTop + paddleSpeed;
    if (paddleLeftPositionY <= game.offsetHeight - paddleLeft.offsetHeight) {
      paddleLeft.style.top = paddleLeftPositionY + 'px';
    }
  }

  // Movimiento de la paleta derecha
  if (event.keyCode === 38) { // Tecla Arriba
    let paddleRightPositionY = paddleRight.offsetTop - paddleSpeed;
    if (paddleRightPositionY >= 0) {
      paddleRight.style.top = paddleRightPositionY + 'px';
    }
  }
  if (event.keyCode === 40) { // Tecla Abajo
    let paddleRightPositionY = paddleRight.offsetTop + paddleSpeed;
    if (paddleRightPositionY <= game.offsetHeight - paddleRight.offsetHeight) {
      paddleRight.style.top = paddleRightPositionY + 'px';
    }
  }
}

// Evento de teclado para mover las paletas
document.addEventListener('keydown', movePaddles);

// Iniciar la animación
requestAnimationFrame(moveBall);