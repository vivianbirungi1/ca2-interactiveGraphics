class Infected extends Molecule {
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

    this.color = color(255,0,0);
    this.status = "Isolate!";

  //  this.infectedForAWeek = 300;
    this.age = frameCount;


  }

//pulsing
  render(){
    super.render();
    noFill();
    stroke(this.color);
    angleMode(DEGREES);
    strokeWeight(3);
    let diam = map(Math.sin(frameCount), -1,1,70,140);
    ellipse(this.position.x,this.position.y,diam,diam);
  }
}
