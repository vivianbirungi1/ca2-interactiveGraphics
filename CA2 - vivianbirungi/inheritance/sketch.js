//Covid research:
//Analysed covid using the population of ireland
//focused on the number of infected at 245,319
//number of recovered 222,504 and number of deaths at 4,866
//took the number of infected in the month of april (2,225) and
//found the infection rate in a month by dividing all 3 weeks of april by the total number infected all month.
//infection rate at : 0.24
//got the total number of recovered since covid started and divided by 14 months(length of time covid has existed in ireland), to get number of recovered in one month.
//found the percentage of recovered by adding 3 weeks of april infected numbers and dividing by recovered in one month estimation.
//recovery percentage at 0.0714.
//decreased this gradually based on chances of survigin covid the longer it stays in the system.
//a website stated chances of recovery are higher with a slight decrease by the end of the second week, by weeks three to eight, chances of recovery are lower
//most deaths from covid have been infected from two to six weeks therefore i chose to make a critical and dead that would reflect this.
//the critical can also infect a healthy as some people with no underlying conditions catch covid and can still become critically ill and die.
//overall outcome to reflect the month of april, was to show a higher recovery to death ratio as the general statistics for ireland,
//show there are a high number of cases but also a high number of recovered and a significantly low number of death in comparison to recovered.
//by the end function should display a high number of infected a very low number of dead.



//initialising new variables at the start to be used in other functions in the script.
//creating empty molecules, grid and graph arrays.
//defining the percentageOfInfected which will determing how many infected objects start off on the screen
let molecules = [];
let grid = [];
let colWidth, rowHeight;
let checkNum = 0;
let percentageOfInfected = 0.33;
let graphHeight = 150;
let graphArray = [];
let healthyNum;
let infectedNum;
let recoveredNum;
let criticalNum;
let deadNum;

//1 day = 30 frames. 30 x 7 = 210. 1 week.
let infectedForAWeek = 210;
let infectedForTwoWeeks = 420;
let infectedForThreeWeeks = 630;


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
        i: i //assigning global molecule index value to local infected molecule index value
      }));
    } else {
      molecules.push(new Healthy({
        i: i //assigning global molecule index value to local healthy molecule index value
      }));
    }
  }

  gridify();
  checkLoop();
} //end of setup function

//in the draw function we are defining what will be drawn on the canvas
//we define the background colour
//we write a froeach loop that iterates through the molecule parameter and will reset the colour if the molecules to the default colour
//we call the splitObjectIntoGrid function in the draw as we are drawing the grid on the canvas
//we call the gridState function which is defined in the GUI. If gridState is true then execute the drawGrid function. However if gridStateis false then return null.
//we write a foreach loop to iterate through the molecule parameter and uses the render and step function written in our molecule.js file.
function draw() {

  background(255);

  splitObjectIntoGrid();

  obj.gridState ? drawGrid() : null;

  molecules.forEach((molecule) => {
    molecule.render();
    molecule.step();
  });


  drawGraph();
  recoveredMolecule();
  deadMolecule();
  drawText();

} //end of draw function


//this is a new checkIntersections function where we are passing in a parameter _collection
//in this function we are checking the intersection of our molecules.
//we use a nested for loop to iterate through each molecule
//we assign moleculeA and moleculeB to the varaibles in our for loop
//we write an if statement to check if the lineStateis on. The lineState is being called from the GUI
//if lineState is on we draw the line and specify the stroke colour of the line
//we write a condition to check if moleculeA is intersecting with moleculeB
//the isIntersecting function is written in the molecule.js and checks the distance between the molecules
function checkIntersections(_collection) {

  for (let a = 0; a < _collection.length; a++) {
    for (let b = a + 1; b < _collection.length; b++) {
      let moleculeA = molecules[_collection[a]];
      let moleculeB = molecules[_collection[b]];
      if (obj.lineState) {
        stroke(125, 100);
        line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
      };

      if (moleculeA.isIntersecting(moleculeB)) { //if moleculeA is intersecting with moleculeB, check for the following,

        //assigning tempObj to the value of new Infected or Critical molecule
        //if a moleculeA is infected and moleculeB is healthy, and randomNum is less than 0.1 which is infection rate,
        //give the values of the healthy object to a new infected object and assign that object to that index.
        if (moleculeA.constructor.name == "Infected" && moleculeB.constructor.name == "Healthy") {
          let randomNum = random();
          if (randomNum < obj.infectionRate) { //rate of infection is 2.4%
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

          //an infected moleculeB is checking for a healthy moleculeA.
          //if found then create a new infected object that will be assigned the same values in the array of the existing object to create a molecule in the same position and array.
        } else if (moleculeB.constructor.name == "Infected" && moleculeA.constructor.name == "Healthy") {
          let randomNum = random();
          if (randomNum < obj.infectionRate) { //percentage of B that will get infected
            let tempObj = new Infected({
              i: moleculeA.index,
              px: moleculeA.position.x,
              py: moleculeA.position.y,
              vx: moleculeA.velocity.x,
              vy: moleculeA.velocity.y
            });
            console.log(tempObj);

            molecules[moleculeA.index] = tempObj; //assigning tempObj to the specified index in the molecules array.
          }

          //moleculeA also has a chance of becoming critical upon intersection
          if (randomNum < 0.20) { //percentage that will go critical
            let tempObj = new Critical({
              i: moleculeA.index,
              px: moleculeA.position.x,
              py: moleculeA.position.y,
              vx: moleculeA.velocity.x,
              vy: moleculeA.velocity.y
            });
            console.log(tempObj);

            molecules[moleculeA.index] = tempObj; //assigning tempObj to the specified index in the molecules array.

          }



        }

      } //closing first if statement
    }
  }

}//end of checkIntersections

//passing through each infected molecule and creating a new recovered molecule.
//percentage of infected molecules that will recovered in the first week is higher than the second week as the
//virus stays in the body longer.
//by the third week the molecule will go into a critical stage and die.
//if ther randomNum is less then the percentage that will recover in the first week then create a new Recovered object.
//the new molecule object is being passed the same values in the array as the old object we are switching to create a molecule in the same position and array
function recoveredMolecule() {
  molecules.forEach((molecule) => {
    if (molecule.constructor.name == "Infected") {
      if (frameCount > molecule.age + infectedForAWeek) {
        let randomNum = random();
        if (randomNum < 0.0071) { //percentage that will recover, highest chance of recovery
          let tempObj = new Recovered({ //we declare the temporary object as a new Recovered object to store the values and be added to the array.
            i: molecule.index,
            px: molecule.position.x,
            py: molecule.position.y,
            vx: molecule.velocity.x,
            vy: molecule.velocity.y
          });

          console.log(tempObj);
          molecules[molecule.index] = tempObj; //assigning tempObj to the specified index in the molecules array.
        }

      //else if some molecules frameCount is greater than the age and infection time of two weeks then they have a chance to become recovered.
      //chance of recovery is lower than if infected for two weeks as covid is inside the system longer
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
          molecules[molecule.index] = tempObj; //assigning tempObj to the specified index in the molecules array.
        }

      }

    }
  }); //end of foreach loop

} //end of recoveredMolecule

//after a ball is in its Critical stage it will die
//if the frameCount is greater than when the critical molecule is first made and the infection time of three weeks (630 frames),
//then look for the molecule with the constructor name Critical and create a new Dead tempObject.
//this means the Critical object is now a completely new Dead object.
//the critical molecules have a 20% chance of becoming dead molecule after it has been infected for three weeks
function deadMolecule() {
  console.log(molecules)
  molecules.forEach((molecule) => {

    if (frameCount > molecule.age + infectedForThreeWeeks && molecule.constructor.name == "Critical") {

      let randomNum = random();
      if (randomNum < 0.20) {
        let tempObj = new Dead({
          i: molecule.index,
          px: molecule.position.x,
          py: molecule.position.y,
          vx: molecule.velocity.x,
          vy: molecule.velocity.y
        });
        console.log(tempObj); //console logging the new tempObj.
        molecules[molecule.index] = tempObj; //assigning tempObj to the specified index in the molecules array.

      }

    }
  });
} //end of deadMolecule

//drawing the graph to display the data of the number of molecules that are healthy, infected, recovered, critical and dead.
function drawGraph() {

  // filtering through the molecules array to find the molecules with the constructor name "Healthy" etc.
  //assigning these filtered molecules to new variables
  let numInfected = molecules.filter(molecule => molecule.constructor.name == "Infected")
  let numHealthy = molecules.filter(molecule => molecule.constructor.name == "Healthy")
  let numRecovered = molecules.filter(molecule => molecule.constructor.name == "Recovered")
  let numCritical = molecules.filter(molecule => molecule.constructor.name == "Critical")
  let numDead = molecules.filter(molecule => molecule.constructor.name == "Dead")

  //mapping each variable to the graphArray to display their respective amount of molecules.
  iHeight = map(numInfected.length, 0, obj.numOfMolecules, 0, graphHeight); //infected height
  hHeight = map(numHealthy.length, 0, obj.numOfMolecules, 0, graphHeight); //healthy height
  lHeight = map(numRecovered.length, 0, obj.numOfMolecules, 0, graphHeight); //recovered height
  cHeight = map(numCritical.length, 0, obj.numOfMolecules, 0, graphHeight); //critical height
  dHeight = map(numDead.length, 0, obj.numOfMolecules, 0, graphHeight); //dead height

  if (graphArray.length >= 300) { //if graphArray is greater than or equal to 300 of the canvas size then carry out shift method
    graphArray.shift(); //shift() removes first element in array , changing the length of the array and returning the removed item.
  }

//pushing in an object with the values into the graphArray using the .length function,
//then pushing in the height values
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

  push(); //saves the settings of the drawing style
  translate(350, 1000); //positioning of the graph
  graphArray.forEach(function(data, index) { //foreach loop going through the graphArray to display the data as follows below

    //setting the fill color and rect size and positioning in the graph to display the data.
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
  pop(); //restores the settings of the drawing style


} //end of drawGraph

//function to draw text on the screen to display the count of number of healthy, infected, recovered, critical and dead
function drawText() {

  //assigning default values of 0.
  infectedNum = 0;
  healthyNum = 0;
  recoveredNum = 0;
  criticalNum = 0;
  deadNum = 0;

  //using a for loop with nested if statements to iterate though the constructors and assign them the global variables
  //passing in the index in the molecules array and accessing the constructor names of the molecule to count the number of molecules with the related constructor name
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

  //mapping each variable to the graphArray to display their respective amount of molecules.
  iHeight = map(infectedNum, 0, obj.numOfMolecules, 0, graphHeight);
  hHeight = map(healthyNum, 0, obj.numOfMolecules, 0, graphHeight);
  lHeight = map(recoveredNum, 0, obj.numOfMolecules, 0, graphHeight);
  cHeight = map(criticalNum, 0, obj.numOfMolecules, 0, graphHeight);
  dHeight = map(deadNum, 0, obj.numOfMolecules, 0, graphHeight);

  //adjusting the display of the text, alignment, colour, positioning...
  textAlign(LEFT);

  fill(0,0,0) //text color
  textSize(20);
  text("Infected: " + infectedNum, 20, 840)
  fill(255,0,0) //rectangle color to help identify ball
  rect(4, 825, 15,15) //rectangle positioning and size

  fill(0,0,0) //text color
  text("Healthy: " + healthyNum, 20, 880)
  fill(0,255,0) //rectangle color to help identify ball
  rect(4, 865, 15,15)

  fill(0,0,0) //text color
  text("Recovered: " + recoveredNum, 20, 920)
  fill(255,255,0) //rectangle color to help identify ball
  rect(4, 905, 15,15)

  fill(0,0,0) //text color
  text("Critical: " + criticalNum, 20, 960)
  fill(255, 0, 208) //rectangle color to help identify ball
  rect(4, 945, 15,15)

  fill(0,0,0) //text color
  text("Dead: " + deadNum, 20, 1000)
  fill(0,0,0) //rectangle color to help identify ball
  rect(4, 985, 15,15)


  if (graphArray.length >= 500) {
    graphArray.shift(); //shift removes first element in array , changing the length of the array and returning the removed item.
  }

  //pushing into the graphArray
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

} //end of drawText function



//in this function we are populating the empty 3D array
//we write a nested for loop that iterates through the i an j values.
//i and j represent the rows and cols.
//we create a filtered array called moleculeCollection.
//this filtered array will go through the possitions of the molecules on the canvas
//we map the filtered array to the indexes, storing only the index of the molecule that we are mapping to
//we call our checkIntersections function after and pass in that filtered array
function splitObjectIntoGrid() {
  checkNum = 0;
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


} //end of splitObjectIntoGrid

//in this function we are spacing out the molecules in our grid
//we write a foreach loop where we pass in the index and iterate through the molecule array
//we define the molecule.pos.x and y positions of the molecules to equally space out the molecules in each cell.
function gridify() {
  let numDivision = ceil(Math.sqrt(obj.numOfMolecules));
  let spacing = (width - graphHeight) / numDivision; //taking graphHeight away from the width to have the balls not being spaced over the graph

  molecules.forEach((molecule, index) => {

    let colPos = (index % numDivision) * spacing;
    let rowPos = floor(index / numDivision) * spacing;
    //console.log(`The col pos ${colPos} and the row pos ${rowPos}`);
    molecule.position.x = colPos + (obj.maxMoleculeSize) * 2;
    molecule.position.y = rowPos + (obj.minMoleculeSize) * 2;

  });
} //end of gridify


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
} //end of drawGrid


//in this function we are checking if loop is running.
//loopState is defined in the GUI as a boolean value
//if loostate is true then loop. If loopState is false then no loop meaning the molecules wont mmove.
function checkLoop() {
  if (obj.loopState) {
    loop();
  } else {
    noLoop();
  }
} //end of checkLoop
