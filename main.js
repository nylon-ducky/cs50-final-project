// figure out how to structure the grid (table?)

let cols, rows;
let w = 37.5;
let cells = [];
let current;
let stack = [];


// p5 required function
function setup() {
  createCanvas(750, 750);
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
      fill(79, 107, 81);
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














/*
function draw()
{
  
  let height = document.getElementById("height").value;
  let width = document.getElementById("width").value;
  let holder = document.getElementById("maze-holder");
  


  for (let h = 0; h < Number(height); h++)
    {
      for (let i = 0; i < width; i++)
        {
          let div = document.createElement('div');
          div.classList.add('cell');
          // at the beginning of every row, add a line break tag
          if (i==0){
            let br = document.createElement('br')
            holder.append(br)
          }

          div.innerHTML = "| |";
          div.style.borderBottom = "1px solid red";
          rand = Math.floor(Math.random() * 10);
          if (rand < 5){
            div.style.borderTop = "1px solid rgba(255, 255, 255, 0)";
            div.style.borderBottom = "1px solid rgba(255, 255, 255, 0)";

            div.style.borderLeft = "1px solid red";
            div.style.borderRight = "1px solid red";
          }
          if (rand > 5){
            div.style.borderRight = "1px solid rgba(255, 255, 255, 0)";
            div.style.borderLeft = "1px solid rgba(255, 255, 255, 0)";

            div.style.borderTop = "1px solid red";
            div.style.borderBottom = "1px solid red";

          }

          holder.append(div);
          
        }
    }
}
*/