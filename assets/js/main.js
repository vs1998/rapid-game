// IMPORTS
import Rectangle from './Rectangle.mjs';
import Circle from './Circle.mjs';
import Player from './Player.mjs';
import InputHandler from './InputHandler.mjs';

const createCanvas = (width,height,id,parent) => {
  width = width || 1200;
  height = height || 800;
  id = id || 'canvas-game';
  parent = parent || document.body;

  const canvas = document.createElement('canvas');
  parent.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;
  canvas.id = id;

  const ctx = canvas.getContext('2d');
  return ctx;
}

// GLOBAL STUFF HERE
const ctx = createCanvas();
let bgColor = '#333';
const gameObjects = [];
let t0 = 0;

const clear = () => {
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.restore();
}

const render = () => {
  for(let go of gameObjects) {
    go.render();
  }
}

const update = () => {
  for(let go of gameObjects) {
    go.update();
  }
}

const addGameObjects = (...el) => {
  for(let o of el) {
    gameObjects.push(o);
  }
}

const gameLoop = () => {
  clear();
  render();
  update();
  t0 = window.requestAnimationFrame(gameLoop);
}

const IH = new InputHandler();







// IH.bindOnKeyEvent(e => {
//   console.log(e.keyCode + " " + e.which);
// })

let ground = new Rectangle({x:600,y:760},1200,20);
ground.color = '#775d49'
ground.ctx = ctx;
let player = new Player({x:600,y:600},40,60);
player.color = '#5ca1c8';
player.input = IH;
player.ctx = ctx;
addGameObjects(ground,player);
//IH.bindOnMouseMove(e => {console.log(e.clientX,e.clientY)});

gameLoop();
