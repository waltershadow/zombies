export default class Spawner {
    constructor({ create }) {
      const spawnInterval = 100;
      this.maxSpawns = 10;
      this.create = create;
      this.spawns = [];
      setInterval(() => this.spawn(), spawnInterval);
    }
    spawn() {
      if (this.spawns.length >= this.maxSpawns) return;
      let s = this.create();
      this.spawns.push(s);
    }
  }
  