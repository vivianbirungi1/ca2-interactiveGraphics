//Covid research


// here we create the empty arrays molecules and grid
//and initialise varaible colWidth and rowHeight
let molecules = [];
let grid = [];
let colWidth, rowHeight;
let checkNum = 0;
let percentageOfInfected = 0.33;
//let percentageIll = 0.2;
let graphHeight = 150;
let graphArray = [];
let healthyNum;
let infectedNum;
let recoveredNum;
let criticalNum;
let deadNum;

//1 day = 30 frames. 30 x 7 = 210. 1 week.
//370 cases -  one week.
//743 cases - two weeks
//1112 cases - three

let infectedForAWeek = 210; //
let infectedForTwoWeeks = 420; //
let infectedForThreeWeeks = 630; //



//in the setup we are defining the default values.
//we create the canvas which will be 900 width and 900 height
//we assign the colWidth and rowHeight to be equal to width and height divided by nummber of rows and col
//we pass in the empty molecules array in setup so the array is empty each time the program starts
//for loop the iterates through the number of molecules and populates the array and pushes in a new Molecule object.
//calling gridift and checkLoop within setup
function setup() {
  createCanvas(1000, 1000);
  colWidth = width / obj.numCols;
  rowHeight = height / obj.numRows;
  molecules = [];



  for (let i = 0; i < obj.numOfMolecules; i++) {
    //  let randomNum = random();
    if (i < percentageOfInfected * obj.numOfMolecules) { //creating as many molecules as number of molecules we want to be infected
      molecules.push(new Infected({
        i: i
      }));
    } else {
      molecules.push(new Healthy({
        i: i
      }));
    }
    // if(randomNum > 6 && i < 12){
    //   molecules.push(new Critical({
    //     i: i
    //   }));
    // }
  }

  //  console.log(molecules);



  gridify();
  checkLoop();
}

//in the draw function we are defining what will be drawn on the canvas
//we define the background colour
//we write a froeach loop that iterates through the molecule parameter and will reset the colour if the molecules to the default colour
//we call the splitObjectIntoGrid function in the draw as we are drawing the grid on the canvas
//we call the gridState function which is defined in the GUI. If gridState is true then execute the drawGrid function. However if gridStateis false then return null.
//we write a foreach loop to iterate through the molecule parameter and uses the render and step function written in our molecule.js file.
function draw() {

  background(255);

  // molecules.forEach((molecule) => {
  //     molecule.reset();
  // });

  splitObjectIntoGrid();
  //  checkIntersectionsOld();
  obj.gridState ? drawGrid() : null;

  molecules.forEach((molecule) => {
    molecule.render();
    molecule.step();
  });

  //console.log(frameRate());

  drawGraph();
  recoveredMolecule();
  deadMolecule();
  //  criticallyIll();
  drawText();

}


//this is a new checkIntersections function where we are passing in a parameter
//in this function we are checking the intersection of our molecules.
//we use a nested for loop to iterate through each molecule
//we assign moleculeA and moleculeB to the varaibles in our for loop
//we write an if statement to check if the lineStateis on. The lineState is being called from the GUI
//if lineState is on we draw the line and specify the stroke colour of the line
//we write a condition to check if moleculeA is intersecting with moleculeB
//the isIntersecting function is written in the molecule.js and checks the distance between the molecules
//if the molecules are intersecting then they will change color using the changeColor function written in the molecule.js file also.
//if they are not intersecting they remain the default colour.
function checkIntersections(_collection) {

  for (let a = 0; a < _collection.length; a++) {
    for (let b = a + 1; b < _collection.length; b++) {
      let moleculeA = molecules[_collection[a]];
      let moleculeB = molecules[_collection[b]];
      if (obj.lineState) {
        stroke(125, 100);
        line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
      };
      // moleculeA.isIntersecting(moleculeB) ? (moleculeA.changeColor(), moleculeB.changeColor(), moleculeA.infect(moleculeB)) : null;

      if (moleculeA.isIntersecting(moleculeB)) {

        //assigning tempObj to the value of new Infected molecule created
        //if a molecule is infected and other is healthy, and randomNum is less than 0.1 which is infection rate,
        // give the values of the healthy object to a new infected object and assign that object to that index.
        if (moleculeA.constructor.name == "Infected" && moleculeB.constructor.name == "Healthy") {
          let randomNum = random();
          if (randomNum < 0.24) { //rate of infection is 2.4%
            let tempObj = new Infected({
              i: moleculeB.index,
              px: moleculeB.position.x,
              py: moleculeB.position.y,
              vx: moleculeB.velocity.x,
              vy: moleculeB.velocity.y
            });
            console.log(tempObj);

            molecules[moleculeB.index] = tempObj; //assigning tempObj to the specified index in the molecules array.
          }


        } else if (moleculeB.constructor.name == "Infected" && moleculeA.constructor.name == "Healthy") {
          let randomNum = random();
          if (randomNum < 0.24) { //percentage of B that will get infected
            let tempObj = new Infected({
              i: moleculeA.index,
              px: moleculeA.position.x,
              py: moleculeA.position.y,
              vx: moleculeA.velocity.x,
              vy: moleculeA.velocity.y
            });
            console.log(tempObj);

            molecules[moleculeA.index] = tempObj;
          }

          //once its infected, has a chance of becoming critically infected
          if (randomNum < 0.30) { //percentage that will go critical
            let tempObj = new Critical({
              i: moleculeA.index,
              px: moleculeA.position.x,
              py: moleculeA.position.y,
              vx: moleculeA.velocity.x,
              vy: moleculeA.velocity.y
            });
            console.log(tempObj);

            molecules[moleculeA.index] = tempObj;

          }



        }

      } //closing first if statement
    }
  }

}

//checking each infected molecule's lifespan and age on when they spawn.
//if frameCount is larger than age and length of infection.

function recoveredMolecule() {
  molecules.forEach((molecule) => {
    if (molecule.constructor.name == "Infected") {
      if (frameCount > molecule.age + infectedForAWeek) {
        let randomNum = random();
        if (randomNum < 0.0071) { //percentage that will recover, highest chance of recovery
          let tempObj = new Recovered({
            i: molecule.index,
            px: molecule.position.x,
            py: molecule.position.y,
            vx: molecule.velocity.x,
            vy: molecule.velocity.y
          });

          console.log(tempObj);
          molecules[molecule.index] = tempObj;
        }


      } else if (frameCount > molecule.age + infectedForTwoWeeks) {

        let randomNum = random();
        if (randomNum < 0.0051) { //percentage that will recover after two weeks, lower chance of recovery
          let tempObj = new Recovered({
            i: molecule.index,
            px: molecule.position.x,
            py: molecule.position.y,
            vx: molecule.velocity.x,
            vy: molecule.velocity.y
          });

          console.log(tempObj);
          molecules[molecule.index] = tempObj;
        }

      }

    }
  });

}


function deadMolecule() {
  //  console.log("first step")
  console.log(molecules)
  molecules.forEach((molecule) => {
    //  console.log("second step")
    // console.log(molecule.age)
    // console.log(infectedForAWeek)

    if (frameCount > molecule.age + infectedForThreeWeeks && molecule.constructor.name == "Critical") {
      //  console.log("after first if")


      let randomNum = random();
      if (randomNum < 0.30) {
        //  console.log("last if to create Dead object")
        let tempObj = new Dead({
          i: molecule.index,
          px: molecule.position.x,
          py: molecule.position.y,
          vx: molecule.velocity.x,
          vy: molecule.velocity.y
        });
        console.log(tempObj);
        molecules[molecule.index] = tempObj;
      }

    }

  });

} //end of deadMolecule


function drawGraph() {

  let numInfected = molecules.filter(molecule => molecule.constructor.name == "Infected")
  let numHealthy = molecules.filter(molecule => molecule.constructor.name == "Healthy")
  let numRecovered = molecules.filter(molecule => molecule.constructor.name == "Recovered")
  let numCritical = molecules.filter(molecule => molecule.constructor.name == "Critical")
  let numDead = molecules.filter(molecule => molecule.constructor.name == "Dead")

  iHeight = map(numInfected.length, 0, obj.numOfMolecules, 0, graphHeight); //infected height
  hHeight = map(numHealthy.length, 0, obj.numOfMolecules, 0, graphHeight); //healthy height
  lHeight = map(numRecovered.length, 0, obj.numOfMolecules, 0, graphHeight); //recovered height
  cHeight = map(numCritical.length, 0, obj.numOfMolecules, 0, graphHeight); //critical height
  dHeight = map(numDead.length, 0, obj.numOfMolecules, 0, graphHeight); //dead height

  if (graphArray.length >= 300) {
    graphArray.shift();
  }

  graphArray.push({
    numInfected: numInfected.length,
    numHealthy: numHealthy.length,
    numRecovered: numRecovered.length,
    numCritical: numCritical.length,
    numDead: numDead.length,
    iHeight: iHeight,
    hHeight: hHeight,
    lHeight: lHeight,
    cHeight: cHeight,
    dHeight: dHeight
  })

  push();
  translate(350, 1000);
  graphArray.forEach(function(data, index) {

    noStroke()
    fill(255, 0, 0)
    rect(index, 0, 1, -data.iHeight) //infected

    fill(0, 255, 0);
    rect(index, -data.iHeight, 1, -data.hHeight) //healthy

    fill(255, 255, 0);
    rect(index, -data.hHeight + -data.iHeight, 1, -data.lHeight) //recovered

    fill(255, 0, 208);
    rect(index, -data.hHeight + -data.iHeight + -data.lHeight, 1, -data.cHeight) //critical

    fill(0, 0, 0);
    rect(index, -data.hHeight + -data.iHeight + -data.lHeight + -data.cHeight, 1, -data.dHeight) //dead
  })
  pop();


}

//function to draw text on the screen to display the count of number of healthy, infected and recovered.
function drawText() {

  infectedNum = 0;
  healthyNum = 0;
  recoveredNum = 0;
  criticalNum = 0;
  deadNum = 0;

  for (let i = 0; i < obj.numOfMolecules; i++) {
    if (molecules[i].constructor.name == "Infected") {
      infectedNum++;
    }

    if (molecules[i].constructor.name == "Healthy") {
      healthyNum++;
    }
    if (molecules[i].constructor.name == "Recovered") {
      recoveredNum++;
    }
    if (molecules[i].constructor.name == "Critical") {
      criticalNum++;
    }
    if (molecules[i].constructor.name == "Dead") {
      deadNum++;
    }
  }

  //height
  iHeight = map(infectedNum, 0, obj.numOfMolecules, 0, graphHeight);
  hHeight = map(healthyNum, 0, obj.numOfMolecules, 0, graphHeight);
  lHeight = map(recoveredNum, 0, obj.numOfMolecules, 0, graphHeight);
  cHeight = map(criticalNum, 0, obj.numOfMolecules, 0, graphHeight);
  dHeight = map(deadNum, 0, obj.numOfMolecules, 0, graphHeight);

  //text display.
  textAlign(LEFT);
  textSize(20);
  text("Infected: " + infectedNum, 20, 840)
  text("Healthy: " + healthyNum, 20, 880)
  text("Recovered: " + recoveredNum, 20, 920)
  text("Critical: " + criticalNum, 20, 960)
  text("Dead: " + deadNum, 20, 1000)

  //actual length of the graph. only going as far as 500 (half the canvas)
  if (graphArray.length >= 500) {
    graphArray.shift(); //P5
  }

  //push into graphArray
  graphArray.push({
    infectedNum: infectedNum,
    healthyNum: healthyNum,
    recoveredNum: recoveredNum,
    criticalNum: criticalNum,
    deadNum: deadNum,
    iHeight: iHeight,
    hHeight: hHeight,
    lHeight: lHeight,
    cHeight: cHeight,
    dHeight: dHeight
  })



}

//in this function we are populating the empty 3D array
//we write a nested for loop that iterates through the i an j values.
//i and j represent the rows and cols.
//we create a filtered array called moleculeCollection.
//this filtered array will go through the possitions of the molecules on the canvas
//we map the filtered array to the indexes, storing only the index of the molecule that we are mapping to
//we call our checkIntersections function after and pass in that filtered array
function splitObjectIntoGrid() {
  checkNum = 0;
  //  console.time("New Method")
  for (let j = 0; j < obj.numRows; j++) {
    for (let i = 0; i < obj.numCols; i++) {

      let moleculeCollection = molecules.filter(molecule =>
        molecule.position.x > (i * colWidth) &&
        molecule.position.x < ((i + 1) * colWidth) &&
        molecule.position.y > j * rowHeight &&
        molecule.position.y < (j + 1) * rowHeight
      ).map(molecule => molecule.index);


      checkIntersections(moleculeCollection);
    }
  }

  //  console.timeEnd("New Method")

}

//in this function we are spacing out the molecules in our grid
//we write a foreach loop where we pass in the index and iterate through the molecule array
//we define the molecule.pos.x and y positions of the molecules to equally space out the molecules in each cell.
function gridify() {
  let numDivision = ceil(Math.sqrt(obj.numOfMolecules));
  let spacing = (width - graphHeight) / numDivision; //taking away the graphHeight to not have the balls overlapping

  molecules.forEach((molecule, index) => {

    let colPos = (index % numDivision) * spacing;
    let rowPos = floor(index / numDivision) * spacing;
    //console.log(`The col pos ${colPos} and the row pos ${rowPos}`);
    molecule.position.x = colPos + (obj.maxMoleculeSize) * 2;
    molecule.position.y = rowPos + (obj.minMoleculeSize) * 2;

  });
} //end of gridify



// The function drawGrid draws a grid using a nested loop iterating columns(i)
// within rows(j). colWidth and rowWidth are calculated in the setup(). The style
// of grid is defined by fill, stroke and strokeWeight. There
// are no parameters required to fulfil the function and no returns


//this function is where we draw the grid.
//we are using a nested for loop to iterate through ia nd j which are the values assigned to the rows and cols.
//we are calling the cols(i) and the rows(j) in our setup.
//we are drawing the cells within the nested for loop
//we are defining the way the lines look by adding noFill,
// strokeColor which defines the colour of the line and
//strokeWeight which defines the thickness of the lines.
function drawGrid() {
  noFill();
  stroke(155, 155, 155, 50);
  strokeWeight(1);

  for (let j = 0; j < obj.numRows; j++) {
    for (let i = 0; i < obj.numCols; i++) {
      //
      rect(i * colWidth, j * rowHeight, colWidth, rowHeight)
    }
  }
}


//in this function we are checking if loop is on.
//loopState is defined in the GUI as a boolean value
//if loostate is true then loop. If loopState is false then no loop meaning the molecules wont mmove.
function checkLoop() {
  if (obj.loopState) {
    loop();
  } else {
    noLoop();
  }
}
