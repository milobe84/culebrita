let snake = [0, 1, 2];
const size = 10;
const interval = 1000;
let idInterval;
let divs;
const playButton = document.getElementById("play-button");
const arribaButton = document.getElementById("arriba-button");
const abajoButton = document.getElementById("abajo-button");
const derechaButton = document.getElementById("derecha-button");
const izquierdaButton = document.getElementById("izquierda-button");
const box = document.getElementById("snake-box");
let acumulador = 1;
let foodIndex;
let contador=0;
let puntaje = document.getElementById('puntaje');

playButton.addEventListener("click", ()=>{
    iniciarJuego();
})

arribaButton.addEventListener("click", ()=>{
    arriba();
})

abajoButton.addEventListener("click", ()=>{
    abajo();
}) 

derechaButton.addEventListener("click", ()=>{
    derecha();
}) 

izquierdaButton.addEventListener("click", ()=>{
    izquierda();
}) 

function createBox(){
    for(let i = 0; i<size; i++){
        for(let j = 0; j<size; j++){
            const div = document.createElement("div");
            box.appendChild(div);
        }
    }
}

function drawSnake(){
    // tomamos todos los div que hay dentro de box
    divs = document.querySelectorAll(".box div");

    // recorremos el tamano del snake y pintamos los divs que alcancen ese tamano.
    // empezando por la posicion cero 0.
    snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake(){
    const tail = snake.shift();
    divs[tail].classList.remove('snake');

    const head = snake[snake.length - 1] + acumulador;
    if (isCollision(head)){
        alert("fin del juego");
        limpiarJuego();
        return;
    }
    snake.push(head);
    divs[head].classList.add('snake');

    comerComida(tail);
}

function comerComida(tail) {
    if (snake[snake.length - 1] === posicionComida) {
      divs[posicionComida].classList.remove('food');
      snake.unshift(tail);
      divs[tail].classList.add('snake');
      contador = contador+1;
      puntaje.innerText = contador;
      comidaAleatoria();
    }
  }

function isCollision(index) {
    if(
        index >= size * size
        || index < 0
        || (acumulador === 1 && index % size === 0)
        || (acumulador === -1 && (index+1) % size ===0)
    ){
        return true;
    }
    return false;
}

function iniciarJuego() {
    limpiarJuego();
    idInterval = setInterval(() => {
        moveSnake();
    }, interval);
}

function limpiarJuego(){
    snake = [0, 1, 2];
    box.innerHTML = '';
    contador=0;
    createBox();
    drawSnake();
    clearInterval(idInterval);
    comidaAleatoria();
}

function arriba(){
    acumulador = -size;
 }

function abajo(){
   acumulador = size;
}

function derecha(){
    acumulador = 1;
 }

 function izquierda(){
    acumulador = -1;
 }

 function comidaAleatoria() {
    posicionComida = Math.floor(Math.random() * divs.length);
    while (snake.includes(posicionComida)) {
      posicionComida = Math.floor(Math.random() * divs.length);
    }
    divs[posicionComida].classList.add('food');
  }

limpiarJuego();