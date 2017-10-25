<!DOCTYPE html>

<!--    	Jason Klamert 
		CS4500 
		HW1
		1/20/2017

		This program will simulate an odd game in which a grid of user specification size will be used to keep track of two tokens
		that move in a random fashion about the grid. The game ends if 1 million moves have been made by the tokens
		or if one token 'jumps' onto another token. If one token makes the jump onto another token that token will be
		declared as the winner; however, if the move counter reaches a number greater than 1 million for both of the tokens then nobody wins
		and the game simply expires. After the game has ran we will print off some useful statistics for the user such as
		the winning token, the max and min number of grid visits, the move counters for each token, 
		and the average number of touches to a grid cell.

		I want to note that the animation squares used stand for where the tokens have been and the color red will denote the red token and the
		color blue will denote the blue token. The color green will mark the winning grid location so the user can easily determine where the 'jump'
		has taken place. I want to also note that the setting of the pieces initially counts as a touch to the grid. In addition, the average number of
		touches to the grid will be defined as the summation of all grid spaces and it will be divided by total number of grid spaces.   
-->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<html>
	<title>Jason Klamert</title>
	<body>
    <div class="panel panel-default text-center">
        	<div class=" font-lg panel-heading">
              <h3>Author: Jason Klamert<h3>
              <h3>CS4500</h3>
              <h3>Homework 2: Painted Grid Cell Game</h3>
              <hr/>
			<div class="panel-body text-left">
              
              <h4>Maximum Grid Visits: <label id="max"></label></h4>
              <h4>Minimum Grid Visits: <label id="min"></label>
              <h4>Winning Token: <label id="winner"></label></h4>
              <h4>Red Token Moved: <label id="redCounter"></label> times</h4>
              <h4>Blue Token Moved: <label id="blueCounter"></label> times</h4>
              <h4>Average Number Of Grid Touches: <label id="average"></label> times</h4>
              
              		<!-- Sets up canvas  -->
			<canvas id="myCanvas" width="500" height="500" style="border:5px 	solid #c3c3c3; margin-top: 20px;">
			Your browser does not support the HTML5 canvas tag.
			</canvas>
              <hr/>
              
              <h5>Rows</h5>
              <input style="margin-bottom: 8px; width: 30%;" class="form-control" type="text" id="rows" name="rows" value="10">
              <h5>Columns</h5>
              <input style="margin-bottom: 15px; width: 30%;" class="form-control" type="text" id="columns" name="columns" value="10">
              <input style="margin-bottom: 8px; width: 97%;" class="btn btn-success btn-lg" type="button" value="Start" onclick="main()"/>
            </div>

			&nbsp;
    </div>

<script>

/**
 * Obtain the canvas and draw a white rectangle on it.
 **/
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,500,500);

/**
 * Constant declarations.
 **/
const MAXIMUM = 1000000;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

/**
 * Global Variables
 **/
var winner = "none";
var grid;
var countingGrid;
var rows;
var columns;

/**
 * Author: Jason Klamert
 * Last Modified: 1/26/2017
 * Prints out the 2D array so we can see the current board state. This is a utility function.
 **/
function printGrid(grid, rows, columns)
{
	for(var i = 0; i < rows; i++) 
	{
		console.log();

		for(var j = 0; j < columns; j++)
    	{
    		console.log(grid[i][j]);
    	}
    }
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function will generate a random number between one and four to determine which direction
 * the tokens will move. This number will be returned.
 **/
function getRandom() 
{
		return Math.floor(1 + (Math.random() * 4));
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will loop through the two dimensional array and retrieve the maximum number of times that
 * a grid spot has been visited.
 **/
function getMax() 
{
	
	var max = countingGrid[0][0];

	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{
			if(countingGrid[row][col] > max)
			{
				max = countingGrid[row][col];
			}
		}
	}

	console.log("max returned: " + max);
	return max;
}


/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will loop through the two dimensional array and retrieve the maximum number of times that
 * a grid spot has been visited.
 **/
function getMin() 
{
	
	var min = countingGrid[0][0];

	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{

			if(countingGrid[row][col] < min)
			{
				min = countingGrid[row][col];
			}
		}
	}

	console.log("min returned: " + min);
	return min;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will loop through the two dimensional array and retrieve the maximum number of times that
 * a grid spot has been visited.
 **/
function getAverage() 
{
	
	var accumulator = 0;

	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{
			accumulator = accumulator + countingGrid[row][col];
		}
	}

	accumulator = accumulator / (rows * columns);
	return accumulator;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function will check for out of bounds conditions for the grid.
 * If an out of bounds condition is found the function returns true.
 * Otherwise the out of bounds condition is not violated and we return false.
 **/
function isOutOfBounds(row, col) 
{

	/**
	 * Check if row number or column number is out of bounds.
	 **/
	if(row < 0 || row > rows - 1)
	{
    	console.log("Unable to move token");
		return true;
	}

	if(col < 0 || col > columns - 1)
	{
    	console.log("Unable to move token");
		return true;
	}
	
	/**
	 * Row and column numbers must be in bounds so return false.
	 **/
	return false;
}


/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will return the row of the red token.
 **/
function getRedRow() 
{
	
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{

			if(grid[row][col] === 1)
			{
				return row;
			}
		}
	}	
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will return the column of the red token.
 **/
function getRedCol() 
{
	
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{

			if(grid[row][col] === 1)
			{
				return col;
			}
		}
	}
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will return the row of the blue token.
 **/
function getBlueRow() 
{
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{
			if(grid[row][col] === 2)
			{			
				console.log("getBlueRow returned: " + row);
				return row;
			}
		}
	}
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will increment the countingGrid space.
 **/
function incrementGrid(row, col) 
{
	
	countingGrid[row][col] = countingGrid[row][col] + 1;

}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will return the column of the blue token.
 **/
function getBlueCol() 
{	
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{
			if(grid[row][col] === 2)
			{
				console.log("getBlueCol returned: " + col);
				return col;
			}
		}
	}
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function will move the corresponding game piece according to piece color passed and the random number passed for movement.
 * The function returns if the move was successful or not. This function will also call spotMaker to paint the canvas.
 **/
function move(color, movement) 
{

	var success = true;
    var paintWinner = false;

	if(color == 1)
	{
		var row = getRedRow();
		var col = getRedCol();
        
        console.log("red row: " + row);
        console.log("red col: " + col);

		if(movement == UP)
		{
			if(!isOutOfBounds(row + 1,col))
			{
				var temp = grid[row + 1][col];

				if(temp === 2)
				{
					winner = "Red";
					paintWinner = true;
				}

				grid[row + 1][col] = 1;
				grid[row][col] = temp;
				incrementGrid(row + 1,col);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 1, row + 1, col);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row + 1, col);
			}
			else
			{
				success = false;
			}		
		}
		else if(movement == DOWN)
		{
			if(!isOutOfBounds(row - 1,col))
			{
				var temp = grid[row - 1][col];

				if(temp === 2)
				{
					winner = "Red";
					paintWinner = true;
				}

				grid[row - 1][col] = 1;
				grid[row][col] = temp;
				incrementGrid(row - 1,col);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 1, row - 1, col);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row - 1, col);
			}
			else
			{
				success = false;
			}
		}
		else if(movement == LEFT)
		{
			if(!isOutOfBounds(row,col - 1))
			{
				var temp = grid[row][col - 1];

				if(temp === 2)
				{
					winner = "Red";
					paintWinner = true;
				}

				grid[row][col - 1] = 1;
				grid[row][col] = temp;
				incrementGrid(row,col - 1);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 1, row, col);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row, col);
			}
			else
			{
				success = false;
			}
		}
		else if(movement == RIGHT)
		{
			if(!isOutOfBounds(row,col + 1))
			{
				var temp = grid[row][col + 1];

				if(temp === 2)
				{
					winner = "Red";
					paintWinner = true;
				}

				grid[row][col + 1] = 1;
				grid[row][col] = temp;
				incrementGrid(row,col + 1);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 1, row, col + 1);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row, col + 1);
			}
			else
			{
				success = false;
			}
		}
	}

	if(color == 2)
	{
		var row = getBlueRow();
        console.log("blue row: " + row);
		var col = getBlueCol();
        console.log("blue col: " + col);
        
		if(movement == UP)
		{
			if(!isOutOfBounds(row + 1,col))
			{
				var temp = grid[row + 1][col];

				if(temp === 1)
				{
					winner = "Blue";
					paintWinner = true;
				}

				grid[row + 1][col] = 2;
				grid[row][col] = temp;
				incrementGrid(row + 1, col);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 2, row + 1, col);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row + 1, col);
			}
			else
			{
				success = false;
			}		
		}
		else if(movement == DOWN)
		{
			if(!isOutOfBounds(row - 1,col))
			{
				var temp = grid[row - 1][col];

				if(temp === 1)
				{
					winner = "Blue";
					paintWinner = true;
				}

				grid[row - 1][col] = 2;
				grid[row][col] = temp;
				incrementGrid(row - 1, col);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 2, row - 1, col);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row - 1, col);
			}
			else
			{
				success = false;
			}
		}
		else if(movement == LEFT)
		{
			if(!isOutOfBounds(row,col - 1))
			{
				var temp = grid[row][col - 1];

				if(temp === 1)
				{
					winner = "Blue";
					paintWinner = true;
				}

				grid[row][col - 1] = 2;
				grid[row][col] = temp;
				incrementGrid(row,col - 1);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 2, row, col - 1);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row, col - 1);
			}
			else
			{
				success = false;
			}
		}
		else if(movement == RIGHT)
		{
			if(!isOutOfBounds(row,col + 1))
			{
				var temp = grid[row][col + 1];

				if(temp === 1)
				{
					winner = "Blue";
					paintWinner = true;
				}

				grid[row][col + 1] = 2;
				grid[row][col] = temp;
				incrementGrid(row,col + 1);
				spotClear(row,col);
				setTimeout(spotMaker, 2000, 2, row, col + 1);
                
                if(paintWinner == true)
                	setTimeout(spotMaker, 2000, 3, row, col + 1);
			}
			else
			{
				success = false;
			}
		}
	}

	return success;
}


/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function to paint the canvas for a token. This will take care of the red token, blue token, and a green token to denote the game winning grid space.
 **/
function spotMaker(color, row, col) {
				
	if(color == 1)
	{
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(row * 15, col * 15, 15, 15);
	}

		
	if(color == 2)
	{
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.fillRect(row * 15, col * 15, 15, 15);		
	}

	if(color == 3)
	{
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillRect(row * 15, col * 15, 15, 15);		
	}

}

/**
 * Author: Jason Klamert
 * Last Modified: 1/27/2017
 * Function to clear an old spot.
 **/
function spotClear(row, col)
{
	ctx.clearRect(0, 0, 50000, 50000);
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function to kick off the odd game simulator. This will be triggered by the start button on the HTML page.
 * This will house our functional logic and put together a display for the user once the program has completed.
 **/
function main() 
{

	/**
	 * Get the rows and columns from the user.
	 **/
	var tempRows = document.getElementById("rows").value;
	var tempColumns = document.getElementById("columns").value;

	rows = parseInt(tempRows);
	columns = parseInt(tempColumns);

	console.log(rows);
	console.log(columns);

	/**
	 * Variable declarations.
	 **/
	var redCounter = 0;
	var blueCounter = 0;
	var notWon = true;
	var average = 0;
	var max = 0;
	var min = 0;
	var totalTurns = 0;
	var moveStatus;
	grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	countingGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	/**
	 * Initialize our grids.
	 **/
	for(var i = 0; i < 20; i++) 
	{
		 grid[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		 countingGrid[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}

	/**
	 * Set our tokens on the board and increment our starting token positions as they have been used. 
	 * - 0 is for empty.
	 * - 1 is for red token.
	 * - 2 is for blue token.
	 **/
	grid[0][0] = 1;
	spotMaker(1, 0, 0);
	grid[rows - 1][columns - 1] = 2;
	spotMaker(2, rows - 1, columns - 1);
	countingGrid[0][0] = countingGrid[0][0] + 1;
	countingGrid[rows - 1][columns - 1] = countingGrid[rows - 1][columns - 1] + 1;

	printGrid(grid, rows, columns);
	console.log("Divider");
	printGrid(countingGrid, rows, columns);

	/**
	 * Keep going while each token has less than a million moves and no token has won.
	 **/
	while((redCounter + blueCounter < MAXIMUM) && winner == "none")
	{

		/**
	 	 * Move red token and check the grid for win conditions.
		 * Increment the red token counter if it is a valid move. If not skip turn and do not increment.
		 * If move is valid also increment the grid space for countingGrid.
	 	 **/
		var randomRed = getRandom();
		moveStatus = move(1, randomRed);

		if(moveStatus)
		{
			redCounter++;
		}

		if(winner == "Red")
        	break;

		/**
	 	 * Move blue token and check the grid for win conditions.
		 * Increment the blue token counter if it is a valid move. If not skip turn and do not increment.
		 * If move is valid also increment the grid space for countingGrid.
	 	 **/
		var randomBlue = getRandom();
		moveStatus = move(2, randomBlue);

		if(moveStatus)
		{
			blueCounter++;
		}

		totalTurns++;
		
	}

	average = getAverage();
    max = getMax();
    min = getMin();

	document.getElementById("redCounter").innerHTML = redCounter;
	document.getElementById("blueCounter").innerHTML = blueCounter;
	document.getElementById("winner").innerHTML = winner;
	document.getElementById("average").innerHTML = average;
	document.getElementById("max").innerHTML = max;
	document.getElementById("min").innerHTML = min;
}

</script>
</body>
</html>