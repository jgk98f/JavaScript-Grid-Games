<!DOCTYPE html>

<!--    	Jason Klamert 
		CS4500 
		HW1
		1/20/2017

		This program will simulate an odd game in which a 10 x 10 grid will be used to keep track of two tokens
		that move in a random fashion about the grid. The game ends if 1 million moves have been made by one of the tokens
		or if one token 'jumps' onto another token. If one token makes the jump onto another token that token will be
		declared as the winner; however, if a the move counter reaches a number greater than 1 million for either token then nobody wins
		and the game simply expires. After the game has ran we will print off some useful statistics for the user such as
		the winning token, the max and min number of grid visits, the move counters for each token, 
		and the average number of touches to a grid cell.   
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
			<canvas id="myCanvas" width="500" height="300" style="border:5px 	solid #c3c3c3; margin-top: 20px;">
			Your browser does not support the HTML5 canvas tag.
			</canvas>
              <hr/>
              
              <h5>Rows</h5>
              <input style="margin-bottom: 8px; width: 30%;" class="form-control" type="text" id="rows" name="rows">
              <h5>Columns</h5>
              <input style="margin-bottom: 15px; width: 30%;" class="form-control" type="text" id="columns" name="columns">
              <input style="margin-bottom: 8px; width: 97%;" class="btn btn-success btn-lg" type="button" value="Start" onclick="main()"/>
            </div>

			&nbsp;
    </div>
</body>
</html>

<script>

/**
 * Constant declarations.
 **/
const MAXIMUM = 1000000;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

/**
 * Draw a white rectangle inside of the canvas.
 * Adapted from Professor Miller's code example.
 **/
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,500,500);


/**
 * Win Condition Variable
 **/
var winner = "none";

/**
 * Author: Jason Klamert
 * Last Modified: 1/26/2017
 * Creates 2D arrays of grid spaces. This one keeps track of the tokens. 
 **/
 function setGrid(grid, columns)
 {
 	for(var i = 0; i < columns; i++) 
	{
		grid[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
 }

/**
 * Author: Jason Klamert
 * Last Modified: 1/26/2017
 * Creates 2D arrays of grid spaces. This one keeps track of the number of times a token landed here. 
 **/
 function setCountingGrid(countingGrid, columns)
 {
 	for(var i = 0; i < columns; i++) 
	{
		countingGrid[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}
}

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
 * Set our tokens on the board and increment our starting token positions as they have been used. 
 * - 0 is for empty.
 * - 1 is for red token.
 * - 2 is for blue token.
 **/
 function initTokens(grid, countingGrid, rows, columns)
 {
 	grid[0][0] = 1;
 	grid[9][9] = 2;
	//grid[rows][columns] = 2;
	countingGrid[0][0] = countingGrid[0][0] + 1;
	countingGrid[rows][columns] = countingGrid[rows][columns] + 1;
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
function getMax(countingGrid, rows, columns) 
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
function getMin(countingGrid, rows, columns) 
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
function getAverage(countingGrid, rows, columns) 
{
	
	var accumulator = 0;

	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{
			accumulator = accumulator + countingGrid[row][col];
		}
	}

	accumulator = accumulator / 100;
	return accumulator;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function will check for out of bounds conditions for the grid.
 * If an out of bounds condition is found the function returns true.
 * Otherwise the out of bounds condition is not violated and we return false.
 **/
function isOutOfBounds(row, col, rows, columns) 
{

	/**
	 * Check if row number or column number is out of bounds.
	 **/
	if(row < 0 || row > rows)
	{
    	console.log("Unable to move token");
		return true;
	}

	if(col < 0 || col > columns)
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
function getRedRow(grid, rows, columns) 
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
function getRedCol(grid, rows, columns) 
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
function getBlueRow(grid, rows, columns) 
{
	
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{

			if(grid[row][col] === 2)
			{			
				return Number(row);
			}
		}
	}
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will increment the countingGrid space.
 **/
function incrementGrid(countingGrid, row, col) 
{
	
	countingGrid[row][col] = countingGrid[row][col] + 1;

}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function that will return the column of the blue token.
 **/
function getBlueCol(grid, rows, columns) 
{
	
	for (var row = 0; row < rows; row++) 
	{		
		for (var col = 0; col < columns; col++) 
		{

			if(grid[row][col] === 2)
			{
				return Number(col);
			}
		}
	}
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/17/2017
 * Function will move the corresponding game piece according to piece color passed and the random number passed for movement.
 * The function returns if the move was successful or not.
 **/
function move(color, movement, grid, countingGrid, rows, columns) 
{
	console.log("Movement Params: ");
    console.log("columns: " + columns);
	console.log("rows: " + rows);
    console.log("color: " + color);
    console.log("movement: " + movement);
    printGrid(grid, rows, columns);
    console.log("Divider");
    printGrid(countingGrid, rows, columns);
    console.log("End Movement Params"); 

	var success = true;

	if(color === 1)
	{
		var row = Number(getRedRow(grid, rows, columns));
		var col = Number(getRedCol(grid, rows, columns));
        
        console.log("red row: " + row);
        console.log("red col: " + col);

		if(movement === UP)
		{
			if(!isOutOfBounds(row + 1,col, rows, columns))
			{
				var temp = Number(grid[row + 1][col]);

				if(temp === 2)
				{
					winner = "Red";
				}

				grid[row + 1][col] = 1;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row + 1, col);
			}
			else
			{
				success = false;
			}		
		}
		else if(movement === DOWN)
		{
			if(!isOutOfBounds(row - 1,col, rows, columns))
			{
				var temp = Number(grid[row - 1][col]);

				if(temp === 2)
				{
					winner = "Red";
				}

				grid[row - 1][col] = 1;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row - 1, col);
			}
			else
			{
				success = false;
			}
		}
		else if(movement === LEFT)
		{
			if(!isOutOfBounds(row,col - 1, rows, columns))
			{
				var temp = Number(grid[row][col - 1]);

				if(temp === 2)
				{
					winner = "Red";
				}

				grid[row][col - 1] = 1;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row, col - 1);
			}
			else
			{
				success = false;
			}
		}
		else if(movement === RIGHT)
		{
			if(!isOutOfBounds(row,col + 1, rows, columns))
			{
				var temp = Number(grid[row][col + 1]);

				if(temp === 2)
				{
					winner = "Red";
				}

				grid[row][col + 1] = 1;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row, col + 1);
			}
			else
			{
				success = false;
			}
		}
	}

	if(color === 2)
	{
		var row = Number(getBlueRow(grid, rows, columns));
        console.log("blue row: " + row);
		var col = Number(getBlueCol(grid, rows, columns));
        console.log("blue col: " + col);
        
		if(movement === UP)
		{
			if(!isOutOfBounds(row + 1,col, rows, columns))
			{
				var temp = Number(grid[row + 1][col]);

				if(temp === 1)
				{
					winner = "Blue";
				}

				grid[row + 1][col] = 2;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row + 1, col);
			}
			else
			{
				success = false;
			}		
		}
		else if(movement === DOWN)
		{
			if(!isOutOfBounds(row - 1,col, rows, columns))
			{
				var temp = Number(grid[row - 1][col]);

				if(temp === 1)
				{
					winner = "Blue";
				}

				grid[row - 1][col] = 2;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row - 1, col);
			}
			else
			{
				success = false;
			}
		}
		else if(movement === LEFT)
		{
			if(!isOutOfBounds(row,col - 1, rows, columns))
			{
				var temp = Number(grid[row][col - 1]);

				if(temp === 1)
				{
					winner = "Blue";
				}

				grid[row][col - 1] = 2;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row, col - 1);
			}
			else
			{
				success = false;
			}
		}
		else if(movement === RIGHT)
		{
			if(!isOutOfBounds(row,col + 1, rows, columns))
			{
				var temp = Number(grid[row][col + 1]);

				if(temp === 1)
				{
					winner = "Blue";
				}

				grid[row][col + 1] = 2;
				grid[row][col] = Number(temp);
				incrementGrid(countingGrid, row, col + 1);
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
 * Function to kick off the odd game simulator. This will be triggered by the start button on the HTML page.
 * This will house our functional logic and put together a display for the user once the program has completed.
 **/
function main() 
{
	var tempRows = document.getElementById("rows").value;
	var tempColumns = document.getElementById("columns").value;

	const rows = parseInt(tempRows);
	const columns = parseInt(tempColumns);

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
	var grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var countingGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	setGrid(grid, columns);
	setCountingGrid(countingGrid, columns);
	initTokens(grid, countingGrid, rows, columns);
	printGrid(grid, rows, columns);

	/**
	 * Keep going while each token has less than a million moves and no token has won.
	 **/
	while((redCounter < MAXIMUM && blueCounter < MAXIMUM) && winner == "none")
	{

		/**
	 	 * Move red token and check the grid for win conditions.
		 * Increment the red token counter if it is a valid move. If not skip turn and do not increment.
		 * If move is valid also increment the grid space for countingGrid.
	 	 **/
		var randomRed = getRandom();
		moveStatus = move(1, randomRed, grid, countingGrid, rows, columns);

		if(moveStatus)
		{
			redCounter++;
		}

		/**
	 	 * Move blue token and check the grid for win conditions.
		 * Increment the blue token counter if it is a valid move. If not skip turn and do not increment.
		 * If move is valid also increment the grid space for countingGrid.
	 	 **/
		var randomBlue = getRandom();
		moveStatus = move(2, randomBlue, grid, countingGrid, rows, columns);

		if(moveStatus)
		{
			blueCounter++;
		}

		totalTurns++;
		
	}

	average = getAverage(countingGrid, rows, columns);
    max = getMax(countingGrid, rows, columns);
    min = getMin(countingGrid, rows, columns);

	document.getElementById("redCounter").innerHTML = redCounter;
	document.getElementById("blueCounter").innerHTML = blueCounter;
	document.getElementById("winner").innerHTML = winner;
	document.getElementById("average").innerHTML = average;
	document.getElementById("max").innerHTML = max;
	document.getElementById("min").innerHTML = min;
}

</script>
