// figure out how to structure the grid (table?)

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
          holder.append(div);
          
        }
    }
}
// implement with a -- binary growing tree --