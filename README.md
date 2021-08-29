# My 50x Maze
#### Video Demo:  <URL https://youtu.be/cyW9kdSaD7g>
#### Description:

LIVE LINK: https://pensive-austin-f3a2c9.netlify.app/

This is a JavaScript maze generator using p5js.
It's a recursive backtracker and keeps track of the solution as it creates the maze.
Once a solution is reached, It's randomized, moving to cells at random and knocking down walls.

As with any JS project, I have an index.html file, a CSS file, which has so little in it that I could have just used some style tags, and of course, the main.js file.
This is where the magic happens!

I've implemented a recursive backtracker for the first portion of the program.
This was done with a basic array or "stack" and backtracking was done by just popping off the last item in the stack.
Learning about stacks and ques from cs50 has made this possible.

While it's creating the maze (by going from cell to a random neighboring cell, and breaking down walls), its keeping track of the solution too! the solution being the path from the top left corner to the bottom right.
Once it's got a solution, it randomizes. This may be prims algorithm or it may not be. Either way, it took inspiration from prims algorithm.
From there, it moves randomly knocking down walls of cells that have not yet been visited, and once all have been visited, it backtracks through the whole stack.
Then thats it, the maze is created, and its up to the viewer to either find a solution and check it with the solution button or to just click the button and see what the solution is.