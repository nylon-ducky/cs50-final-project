let cols, rows;
let w = 75;
let cells = [];
let current;
let rand;
let stack = [];
let solution = [];
//let goal;
let complete;
let check = [];


//let starting = Date.now();
//console.log(starting);



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
  cells[cells.length - 1].goal = true;
  
  solution.push(cells[0]);
}
// p5 required function
function draw() {

  //frameRate(5)

  background(79, 107, 81);
  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
  }

  //if(complete){
    //rand = floor(random(0, stack.length + 1));
    //current = stack[rand];
  //}
  
  
  if(current == undefined) {
    for (let i = 0; i < cells.length; i++){
      if(cells[i].visited == true){
        check.push(cells[i]);
      }
    }
    if (check.length == cells.length) {
      //noLoop();
      solve();

      if(solution.length < 22) {
        //clear();
        window.location.reload()
      }
      
      noLoop();
      console.log(solution);
      return;
      
    }else{
      current = stack.pop();
      check = [];
    }
  }
  //console.log(current);
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
    rand = floor(random(0, solution.length - 1));
    if (solution[rand] != undefined && solution[rand].checkNeighbors() && !complete) {
      current = solution[rand];
      console.log(solution);
      //if (!complete) {
        /////////////////////////////////////////////
        //if (solution[rand]['i'] > stack[stack.length - 1]['i']){
          solution.splice(rand + 1, solution.length)
          console.log(solution);
        //}
        
        
     // }
    }else{
      //current = stack.pop();
      current = solution.pop();
      
      //if (!complete) {
        //solution.pop();
      //}
    }
    /*
    if (complete) {
      for (let i = 0; i < solution.length; i++) {
        solution[i].solutionCell = true;
      }
      
    }*/
    
  }else{
    rand = floor(random(0, stack.length + 1));
    current = stack[rand];
  }

  solve();
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

  this.thinlight = (r,g,b)=> {
    let x = this.i * w + 25;
    let y = this.j * w + 25;
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
  
    for (let i = 0; i < solution.length; i++) {
      solution[i].thinlight(255,255,255);
    }
  
 
}


/*
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

  /*
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

*/
































/*
// figure out how to structure the grid (table?)
let cols, rows;
let w = 75;
let cells = [];
let current;
let rand;
let stack = [];
let solution = [];
//let goal;
let complete;
let check = [];


//let starting = Date.now();
//console.log(starting);



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
  cells[cells.length - 1].goal = true;
  
  solution.push(cells[0]);
}
// p5 required function
function draw() {

  //frameRate(5)

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
      //noLoop();
      solve();
      noLoop();
      console.log(solution);
      return;
    }else{
      current = stack.pop();
      check = [];
    }
  }
  console.log(current);
  current.visited = true;
  current.highlight(0, 255, 0);
  let next = current.checkNeighbors();

  //let ending = Date.now();
  // check to see if maze is fully generated
  //if (stack.length == 0 ){//&& ending > starting + 100){

    //urrent.highlight(255,255,255)
    //console.log(current + current.walls);
    //noLoop();
    //console.log("stopped!");
    //solve(cells[0])
  //}


  ///////////////////////////////////
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
    rand = floor(random(0, solution.length + 1));
    if (solution[rand] != undefined && solution[rand].checkNeighbors() && !complete) {
      current = solution[rand];
      console.log(solution);
      //if (!complete) {
        /////////////////////////////////////////////
        //if (solution[rand]['i'] > stack[stack.length - 1]['i']){
          solution.splice(rand + 1, solution.length)
          console.log(solution);
        //}
        
        
     // }
    }else{
      current = solution.pop();
      
      //if (!complete) {
        //solution.pop();
      //}
    }
    if (complete) {
      for (let i = 0; i < solution.length; i++) {
        solution[i].solutionCell = true;
      }
    }
    
  }else{
    rand = floor(random(0, stack.length + 1));
    current = stack[rand];
  }

  solve();
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

  this.thinlight = (r,g,b)=> {
    let x = this.i * w + 25;
    let y = this.j * w + 25;
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
  
    for (let i = 0; i < solution.length; i++) {
      solution[i].thinlight(255,255,255);
    }
  
 
}


*/















/*

let cols, rows;
let w = 75;
let cells = [];
let current;
let rand;
let stack = [];
let solution = [];
//let goal;
let complete;
let check = [];


//let starting = Date.now();
//console.log(starting);



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
  cells[cells.length - 1].goal = true;
  
  solution.push(cells[0]);
}
// p5 required function
function draw() {

  //frameRate(5)

  background(79, 107, 81);
  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
  }

  //if(complete){
    //rand = floor(random(0, stack.length + 1));
    //current = stack[rand];
  //}
  
  
  if(current == undefined) {
    for (let i = 0; i < cells.length; i++){
      if(cells[i].visited == true){
        check.push(cells[i]);
      }
    }
    if (check.length == cells.length) {
      //noLoop();
      solve();

      if(solution.length < 22) {
        //clear();
        window.location.reload()
      }
      
      noLoop();
      console.log(solution);
      return;
      
    }else{
      current = stack.pop();
      check = [];
    }
  }
  //console.log(current);
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
    rand = floor(random(0, solution.length - 1));
    if (solution[rand] != undefined && solution[rand].checkNeighbors() && !complete) {
      current = solution[rand];
      console.log(solution);
      //if (!complete) {
        /////////////////////////////////////////////
        //if (solution[rand]['i'] > stack[stack.length - 1]['i']){
          solution.splice(rand + 1, solution.length)
          console.log(solution);
        //}
        
        
     // }
    }else{
      //current = stack.pop();
      current = solution.pop();
      
      //if (!complete) {
        //solution.pop();
      //}
    }

    
  }else{
    rand = floor(random(0, stack.length + 1));
    current = stack[rand];
  }

  solve();
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

  this.thinlight = (r,g,b)=> {
    let x = this.i * w + 25;
    let y = this.j * w + 25;
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
  
    for (let i = 0; i < solution.length; i++) {
      solution[i].thinlight(255,255,255);
    }
  
 
}

*/