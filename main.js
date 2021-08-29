

let cols, rows;
let w = 37.5;
let cells = [];
let current;
let rand;
let stack = [];
let solution = [];
let complete;
let check = [];

// p5 required function
function setup() {
  let cnv = createCanvas(750, 750);
  cnv.center('horizontal');

  let btn = createButton("Solve");
  btn.mouseClicked(solve);
  btn.position(455,50);

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
  cells[cells.length - 1].goal = true;
  
  solution.push(cells[0]);
}

// p5 required function
function draw() {

  background(79, 107, 81);
  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
  }

  if(current == undefined) {
    for (let i = 0; i < cells.length; i++){
      if(cells[i].visited == true){
        check.push(cells[i]);
      }
    }
    if (check.length == cells.length) {
      /*
      if(solution.length < 22) {
        window.location.reload()
      }*/
      
      noLoop();
      console.log(solution);
      return;
      
    }else{
      current = stack.pop();
      check = [];
    }
  }

  current.visited = true;
  current.highlight(0, 255, 0);
  let next = current.checkNeighbors();

  if (next) {
    if (!next.visited){
      if (!complete){
        solution.push(current);
        if (next.goal) {
          complete = true;
          solution.push(next);
        }
      }
    }
    next.visited = true;
    stack.push(current);
    removeWalls(current, next); 
    current = next;

  }

  // backtrack or random
  else if (!complete && solution.length > 0 && solution.length < cells.length)
  {  
    if (!complete){    
      current = solution.pop();
    }
    
  }else{
    rand = floor(random(0, stack.length + 1));
    current = stack[rand];
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
  this.goal = false;
  this.solutionCell = false;
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
    rect(x,y,w,w);
  }

  // the highlight function for the solution
  this.thinlight = (r,g,b)=> {
    let x = this.i * w + 7.5;
    let y = this.j * w + 7.5;
    noStroke();
    fill(r,g,b);
    rect(x ,y ,20,20);
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

function solve() {  
  for (let i = 0; i < solution.length;  i++) {
    solution[i].thinlight(255,255,255);
  }
}
