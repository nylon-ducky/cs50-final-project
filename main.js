// figure out how to structure the grid (table?)
let cols, rows;
let w = 75;
let cells = [];
let current;
let rand;
let stack = [];

let starting = Date.now();
console.log(starting);


function difficulty() {
  w = w / 2;
  redraw()
}
// p5 required function
function setup() {
  let cnv = createCanvas(750, 750);
  cnv.center('horizontal');
  cols = floor(width/w);
  rows = floor(height/w);
  // make the cells
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++){
      let cell = new Cell(i,j);
      cells.push(cell);
    }
  }
  // define current working cell
  current = cells[0];
}
// p5 required function
function draw() {
  background(79, 107, 81);
  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
  }
  current.visited = true;
  current.highlight(0, 255, 0);
  let next = current.checkNeighbors();

  let ending = Date.now();
  // check to see if maze is fully generated
  if (stack.length == 0 && ending > starting + 100){

    current.highlight(255,255,255)
    console.log(current + current.walls);
    noLoop();
    console.log("stopped!");
    solve(cells[0])
  }

  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next); 
    current = next;
  }
  // backtrack or random
  else if (stack.length > 0 && stack.length < cells.length)
  {
    rand = floor(random(0, stack.length));
    if (stack[rand].checkNeighbors()) {
      current = stack[rand]
    }else{
      current = stack.pop();
    }
    
  }


}


// calculate index
function index(i,j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return undefined;
  }
  return i + j * cols;
}
//define a cell
function Cell(i,j) {
  this.i = i;
  this.j = j;
  this.walls = [true,true,true,true];
  this.visited = false;
  this.checkNeighbors = ()=> {
    let neighbors = [];
    
    
    let top = cells[index(i, j-1)];
    let right = cells[index(i+1,j)];
    let bottom = cells[index(i, j+1)];
    let left = cells[index(i-1,j)];
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left &&!left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
    else {
      return undefined;
    }
  }
  // make the leading block bright green
  this.highlight = (r,g,b)=> {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(r,g,b);
    rect(x,y,50,50);
  }
  // display cell, control walls
  this.display = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255, 255, 0);

    strokeWeight(3);

    if (this.walls[0]) {
      line(x,y,x+w,y);
    }
    if (this.walls[1]) {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3]) {
      line(x,y+w,x,y);
    }
    // if visited, make it obvious to me, the viewer
    if (this.visited) {
      noStroke();
      fill(0,0,0);
      rect(x,y,w,w);
      
    }
    
  }
}
function removeWalls(c,n) {
  let x = c.i - n.i;
  if (x == 1){
    c.walls[3] = false;
    n.walls[1] = false;
  }
  else if (x == -1) {
    c.walls[1] = false;
    n.walls[3] = false;
  }
  let y = c.j - n.j;
  if (y == 1){
    c.walls[0] = false;
    n.walls[2] = false;
  }
  else if (y == -1) {
    c.walls[2] = false;
    n.walls[0] = false;
  }

}

let solstack = [];
function solve(i) {
  
  let neighbors = [];
  //let i = 0;
  let n;
  let crnt = i;
  //crnt['i'] = i;
  //crnt['j'] = j;

  crnt.highlight(255,255,20);

  console.log(crnt)


  // must account for previous cell, so it doesnt go back and forth

    if (crnt.vis == false || crnt.vis == undefined){
      crnt.vis = true;
      solstack.push(crnt);
    }
  
  
  //console.log(crnt.vis)
  //for (let s = 0; s < solstack.length; s++)
  for (let i = 0; i < crnt.walls.length; i++){  
    //console.log(crnt.walls.length)
    console.log(crnt.walls[i])
    if (i == 0 && crnt.walls[i] == false) {
      neighbors.push(cells[cells.indexOf(crnt) - rows]);
    }
    else if (i == 1 && crnt.walls[i] == false) {
      neighbors.push(cells[cells.indexOf(crnt) + 1]);
    }
    else if (i == 2 && crnt.walls[i] == false) {
      neighbors.push(cells[cells.indexOf(crnt) + rows]);
    }
    else if (i == 3 && crnt.walls[i] == false) {
      neighbors.push(cells[cells.indexOf(crnt) - 1]);
    }
    console.log(neighbors)
    console.log(solstack)
  }

  for (let x = 0; x < neighbors.length; x++) {
    neighbors[x].highlight(255,0,0)
    if (neighbors[x].vis == true) {
      console.log(neighbors[x])
      console.log(neighbors)
      neighbors.slice(neighbors[x]);
      n = neighbors[0]
      console.log(n)
      //neighbors.slice(neighbors[x])
        //n = neighbors[x]
      console.log(neighbors)
    }else if (neighbors.length == 1){
      n = neighbors[0];
    }else {
      n = solstack.pop()
    }
  }
  /*
  if (neighbors.length > 1){
    if (neighbors[1].vis != true){
      n = neighbors[1];
      solve(n)
    } else if (neighbors[0].vis != true) {
      n = neighbors[0];
      solve(n)
    } else if (neighbors[2].vis != true) {
      n = neighbors[2];
      solve(n);
    }
  }*/
  console.log(neighbors.length)
  console.log(solstack.length)
  console.log(cells.length)
  console.log(n)
  //cells[n['i'] + (n['j'] * 10) + 1].highlight(255,0,255)
  //crnt['i'] = n['i'];
  //crnt['j'] = n['j'];
  //let ni = n['i'] + (n['j'] * 10);
  //console.log(ni)
  for (let i = 0; i < solstack.length; i++) {
    solstack[i].highlight(0,255,255)
  }
 if (n.vis != true || n.vis == undefined || !n.vis && solstack.length < cells.length) {
   //c = n['i'] + (n['j'] * 10);
   c = n;
   neighbors = [];
   console.log("c = " + c)
   solve(c)
}else{
    //neighbors.pop(n);
    //solstack.pop(n);

    console.log(crnt)
    console.log(neighbors);
    //console.log("prev c = " + c)
    console.log(n)
    console.log(cells[cells.length])
    
    return;
 }
 
}












//*/

/*

// figure out how to structure the grid (table?)

let cols, rows;
let w = 37.5;
let cells = [];
let current;
let stack = [];


// p5 required function
function setup() {
  let cnv = createCanvas(750, 750);
  cnv.center('horizontal');



  cols = floor(width/w);
  rows = floor(height/w);
  // make the cells
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++){
      let cell = new Cell(i,j);
      cells.push(cell);
    }
  }
  // define current working cell
  current = cells[0];

}

// p5 required function
function draw() {
  background(79, 107, 81);
  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
  }
  current.visited = true;
  current.highlight();

 
  let next = current.checkNeighbors();
  
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next); 

    current = next;
  }
  // backtrack
  else if (stack.length > 0){
      current = stack.pop();
  }

}

// calculate index
function index(i,j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return undefined;
  }
  return i + j * cols;
}


//define a cell
function Cell(i,j) {
  this.i = i;
  this.j = j;
  this.walls = [true,true,true,true];
  this.visited = false;


  this.checkNeighbors = ()=> {
    let neighbors = [];
    
    
    let top = cells[index(i, j-1)];
    let right = cells[index(i+1,j)];
    let bottom = cells[index(i, j+1)];
    let left = cells[index(i-1,j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }

    if (right && !right.visited) {
      neighbors.push(right);
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if (left &&!left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    }
    else {
      return undefined;
    }

  }

  this.highlight = ()=> {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 255, 0);
    rect(x,y,w,w);
  }


  // display cell, control walls
  this.display = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255, 255, 0);
    
    if (this.walls[0]) {
      line(x,y,x+w,y);
    }
    if (this.walls[1]) {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3]) {
      line(x,y+w,x,y);
    }
    // if visited, make it obvious to me, the viewer

    if (this.visited) {
      noStroke();
      fill(0,0,0);
      rect(x,y,w,w);
      
    }
    
  }

}


function removeWalls(c,n) {

  let x = c.i - n.i;

  if (x == 1){
    c.walls[3] = false;
    n.walls[1] = false;
  }
  else if (x == -1) {
    c.walls[1] = false;
    n.walls[3] = false;
  }

  let y = c.j - n.j;

  if (y == 1){
    c.walls[0] = false;
    n.walls[2] = false;
  }
  else if (y == -1) {
    c.walls[2] = false;
    n.walls[0] = false;
  }

}

*/



/*

  let cols, rows;
  let w = 25;
  let cells = [];
  let current;
  let rand;
  let stack = [];
  
  function difficulty() {
    w = w / 2;
    redraw()

  }

  // p5 required function
  function setup() {


    let cnv = createCanvas(750, 750);
    cnv.center('horizontal');



    cols = floor(width/w);
    rows = floor(height/w);
    // make the cells
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++){
        let cell = new Cell(i,j);
        cells.push(cell);
      }
    }

    // define current working cell
    current = cells[0];

  }

  // p5 required function
  function draw() {
    background(79, 107, 81);
    for (let i = 0; i < cells.length; i++) {
      cells[i].display();
    }

    current.visited = true;
    current.highlight(0, 255, 0);

    let next = current.checkNeighbors();
    if (stack.length == cells.length - 1){
      current.highlight(0,0,0)
      return;
    }
    if (next) {
      next.visited = true;

      stack.push(current);

      removeWalls(current, next); 

      current = next;
    }
    // backtrack
    else if (stack.length > 0 && stack.length < cells.length)
    {
      rand = floor(random(0, stack.length));
      if (stack[rand].checkNeighbors()) {
        current = stack[rand]
      }else{
        current = stack.pop();
      }
      
    }
    console.log("done!")
  }
 

  // calculate index
  function index(i,j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
      return undefined;
    }
    return i + j * cols;
  }


  //define a cell
  function Cell(i,j) {
    this.i = i;
    this.j = j;
    this.walls = [true,true,true,true];
    this.visited = false;


    this.checkNeighbors = ()=> {
      let neighbors = [];
      
      
      let top = cells[index(i, j-1)];
      let right = cells[index(i+1,j)];
      let bottom = cells[index(i, j+1)];
      let left = cells[index(i-1,j)];

      if (top && !top.visited) {
        neighbors.push(top);
      }

      if (right && !right.visited) {
        neighbors.push(right);
      }

      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }

      if (left &&!left.visited) {
        neighbors.push(left);
      }

      if (neighbors.length > 0) {
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
      }
      else {
        return undefined;
      }

    }
    // make th eleading block bright green
    this.highlight = (r,g,b)=> {
      let x = this.i * w;
      let y = this.j * w;
      noStroke();
      fill(r,g,b);
      rect(x,y,w,w);
    }


    // display cell, control walls
    this.display = function() {
      let x = this.i * w;
      let y = this.j * w;
      stroke(255, 255, 0);
      
      if (this.walls[0]) {
        line(x,y,x+w,y);
      }
      if (this.walls[1]) {
        line(x+w,y,x+w,y+w);
      }
      if (this.walls[2]) {
        line(x+w,y+w,x,y+w);
      }
      if (this.walls[3]) {
        line(x,y+w,x,y);
      }
      // if visited, make it obvious to me, the viewer

      if (this.visited) {
        noStroke();
        fill(0,0,0);
        rect(x,y,w,w);
        
      }
      
    }

  }


  function removeWalls(c,n) {

    let x = c.i - n.i;

    if (x == 1){
      c.walls[3] = false;
      n.walls[1] = false;
    }
    else if (x == -1) {
      c.walls[1] = false;
      n.walls[3] = false;
    }

    let y = c.j - n.j;

    if (y == 1){
      c.walls[0] = false;
      n.walls[2] = false;
    }
    else if (y == -1) {
      c.walls[2] = false;
      n.walls[0] = false;
    }

  }


*/