import * as PIXI from "pixi.js";
import Player from "./player";
import Zombie from "./zombie";
import Spawner from "./spawner";
//import Matter from "matter-js";

const canvasSize = 512;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f,
});

let player = new Player({ app });
let zSpawner = new Spawner({ create: () => new Zombie({ app, player }) });

app.ticker.add((delta) => {
  player.update();
  zSpawner.spawns.forEach((zombie) => zombie.update());
  bulletHitTest({
    bullets: player.shooting.bullets,
    zombies: zSpawner.spawns,
    bulletRadius: 8,
    zombieRadius: 16,
  });
});

function bulletHitTest({ bullets, zombies, bulletRadius, zombieRadius }) {
  bullets.forEach((bullet) => {
    zombies.forEach((zombie, index) => {
      let dx = zombie.position.x - bullet.position.x;
      let dy = zombie.position.y - bullet.position.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bulletRadius + zombieRadius) {
        zombies.splice(index, 1);
        zombie.kill();
      }
    });
  });
}

