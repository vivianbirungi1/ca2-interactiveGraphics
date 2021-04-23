class Critical extends Molecule {
  constructor({
    i,
    px = random(0, width),
    py = random(0, height),
    vx = random(-2.5,2.5),
    vy = random (-2.5,2.5)
  }){
    super({
      i,
      px,
      py,
      vx,
      vy
    });

    this.color = color(255, 0, 208);
    this.age = frameCount;

  //  this.timeSick = 100;
  //  this.count = frameCount;
  }
}
