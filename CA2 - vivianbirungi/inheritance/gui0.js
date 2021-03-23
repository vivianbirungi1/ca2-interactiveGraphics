//here we are reconfiguring the way we store and declare variables.
//we store the variables and the default values inside one universal obj variable.
//when we want to call these variables we use obj before the name e.g obj.numOfMolecules
//in our browser the user is able to manipilate and change these values.
let obj = {
    numOfMolecules: 20
    , numRows: 1
    , numCols: 1
    , showText: false
    , loopState: true
    , gridState: false
    , lineState: false
    , moleculeColor: [255, 0, 0]
    , intersectingColor: [0, 255, 0]
    , minMoleculeSize: 20
    , maxMoleculeSize: 30
};

//declaring the gui variable and assigning it as a new GUI object.
var gui = new dat.gui.GUI();

//we want to remember the object obj.
gui.remember(obj);

//we create folders for our different elements.
//the layout folder contains the functional elements such as number of molecules etc.
//The design folder focuses on the stylistic elements such as intersectColor etc.
//we assign sections to the folders and specify what goes in each section.
//onChange will run the setup and draw each time a change is made in the gui.
//min and max will create a slider in the controls to give a minimum and maximum value.
section01 = gui.addFolder('Layout');
section01.add(obj, 'numOfMolecules').min(0).max(1000).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numRows').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numCols').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'showText').onChange(function () {
    draw()
});
section01.add(obj, 'loopState').onChange(function () {
    checkLoop()
});
section01.add(obj, 'gridState').onChange(function () {
    draw()
});
section01.add(obj, 'lineState').onChange(function () {
    draw()
});

section02 = gui.addFolder('Design');
section02.addColor(obj, 'moleculeColor').onChange(function () {
    draw()
});
section02.addColor(obj, 'intersectingColor').onChange(function () {
    draw()
});
section02.add(obj, 'minMoleculeSize').min(1).max(50).step(1).onChange(function () {
    setup();
    draw()
});
section02.add(obj, 'maxMoleculeSize').min(1).max(50).step(1).onChange(function () {
    setup();
    draw()
});
