<!DOCTYPE html>

<!--    	
		Jason Klamert 
		CS4500 
		HW4
		2/10/2017

		My experiment varies the board size from 2x2 all the way up to nxn where n = 2 + user times of the game ran.
		I was curious about how this would effect the numbers in terms of average, min, and max. So, board size is the independent variable
		and the dependents are the min, max, and average values at each board size. The goal is to spot trends in the data by using scatter plots and lines of best fit.
		After the plots are made I will give the user some general comments about the data right below the chart and above the respective table.
		This program will simulate an odd game in which a grid of 2x2 size will be used to keep track of two tokens
		that move in a random fashion about the grid. This grid will grow by one column and row after every simulated game! The game ends if 1 million moves have been made by the tokens
		or if one token 'jumps' onto another token. If one token makes the jump onto another token that token will be
		declared as the winner; however, if the move counter reaches a number greater than 1 million for both of the tokens then nobody wins
		and the game simply expires. After the game has ran we will print off some useful statistics for the user such as
		the winning token, the max and min number of grid visits, the move counters for each token, 
		and the average number of touches to a grid cell.

		I want to note that the animation squares used stand for where the tokens have been and the color red will denote the red token and the
		color blue will denote the blue token. The color green will mark the winning grid location so the user can easily determine where the 'jump'
		has taken place. I want to also note that the setting of the pieces initially counts as a touch to the grid. In addition, the average number of
		touches to the grid will be defined as the summation of all grid spaces and it will be divided by total number of grid spaces. Lastly, I would like to note
		that the program will only deal with row and column specifications of no greater than 20 and no less than 5. This is left to the user to fulfill. The user may run
		the game all the way up to 999 times. At the end of the game a statistics sheet will be populated and a histogram will be rendered based on that data. We will generate
		3 scatter plots to visually aid the tables of how the min, max, and averages are affected by the growing of the grid. They will be drawn after the games have finished and 
		a short description will accompany the scatter plot. It will be placed just below it. I want to note that the user should use a number of times around 120 for fast results.
		However, if the user has time to kill and wants really see the scatter plots fill out, I suggest that the user select a number around 250-300. Note: THE HIGHER THE NUMBER OF TIMES
		THE LONGER THE WAIT! This kind of statistical analysis with graphics in js not the fastest thing in the world!
-->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<html>
	<title>Jason Klamert</title>
	<body>
    <div class="panel panel-default text-center">
        	<div class=" font-lg panel-heading">
              <h3>Author: Jason Klamert<h3>
              <h3>CS4500</h3>
              <h3>Homework 4: Multiple Iterations of the Grid Cell Game</h3>
              <hr/>
			<div class="panel-body text-left">
              
              	<h5>Absolute Maximum of all Grid Visits: <label id="max"></label></h5>
              	<h5>Absolute Minimum of all Grid Visits: <label id="min"></label></h5>
              	<h5>Number of times blue won: <label id="winnerBlue"></label></h5>
              	<h5>Number of times red won: <label id="winnerRed"></label></h5>
              	<h5>Total Times The Red Token Has Moved: <label id="redCounter"></label> times</h5>
              	<h5>Total Times The Blue Token Has Moved: <label id="blueCounter"></label> times</h5>
              	<h5>Absolute average Of all grid touches: <label id="average"></label> times</h5>
              	<h5>Number of times the game ran: <label id="times"></label> times</h5>
              	<h5>Absolute minimum Of all minimums: <label id="absMinOfMin"></label></h5>
              	<h5>Absolute maximum Of all minimums: <label id="absMaxOfMin"></label></h5>
              	<h5>Absolute average Of all minimums: <label id="absAverageOfMin"></label></h5>
              	<h5>Absolute minimum Of all maximums: <label id="absMinOfMax"></label></h5>
              	<h5>Absolute maximum Of all maximums: <label id="absMaxOfMax"></label></h5>
              	<h5>Absolute average Of all maximums: <label id="absAverageOfMax"></label></h5>
              	<h5>Absolute minimum Of all averages: <label id="absMinOfAverages"></label></h5>
              	<h5>Absolute maximum Of all averages: <label id="absMaxOfAverages"></label></h5>
              	<h5>Absolute average Of all averages: <label id="absAverageOfAverages"></label></h5>

				<hr/>
              	<h4 style="margin-top: 15px;">Description of the Experiment:</h4>
              	<p>
        			My experiment varies the board size from 2x2 all the way up to nxn where n = 2 + user times of the game ran.
					I was curious about how this would effect the numbers in terms of average, min, and max. So, board size is the independent variable
					and the dependents are the min, max, and average values at each board size. The goal is to spot trends in the data by using scatter plots and lines of best fit.
					After the plots are made I will give the user some general comments about the data right below the chart and above the respective table.
					This program will simulate an odd game in which a grid of 2x2 size will be used to keep track of two tokens
					that move in a random fashion about the grid. This grid will grow by one column and row after every simulated game! The game ends if 1 million moves have been made by the tokens
					or if one token 'jumps' onto another token. If one token makes the jump onto another token that token will be
					declared as the winner; however, if the move counter reaches a number greater than 1 million for both of the tokens then nobody wins
					and the game simply expires. After the game has ran we will print off some useful statistics for the user such as
					the winning token, the max and min number of grid visits, the move counters for each token, 
					and the average number of touches to a grid cell.
              	</p>
              	<hr/>
                
              	<!-- Sets up canvas  -->
              	<h5 class="text-center" style="margin-top: 15px;">Scatter Plot of Grid Size VS Maximum Number of Grid Touches</h5>
				<canvas class="text-center" id="myCanvas" width="300" height="300" style="border:5px 	solid #c3c3c3; margin-top: 20px;">
					Your browser does not support the HTML5 canvas tag.
				</canvas>
				<h5 class="text-center">Grid Size</h5>
				<label id="conclusions"></label>
				<table class="table table-striped table-hover" style="width: 100%; margin-top: 30px;" id="table">
				</table>
            	<hr/>

				
				<h5 class="text-center">Scatter Plot of Grid Size VS Minimum Number of Grid Touches</h5>
            	<canvas class="text-center" id="minCanvas" width="300" height="300" style="border:5px 	solid #c3c3c3; margin-top: 20px;">
					Your browser does not support the HTML5 canvas tag.
				</canvas>
				<h5 class="text-center">Grid Size</h5>
				<label id="conclusions2"></label>
				<table class="table table-striped table-hover" style="width: 100%; margin-top: 30px;" id="tableMin">
				</table>
				<hr/>


				<h5 class="text-center">Scatter Plot of Grid Size VS Average Number of Grid Touches</h5>
				<canvas class="text-center" id="averageCanvas" width="300" height="300" style="border:5px 	solid #c3c3c3; margin-top: 20px;">
					Your browser does not support the HTML5 canvas tag.
				</canvas>
				<h5 class="text-center">Grid Size</h5>
				<label id="conclusions3"></label>
				<table class="table table-striped table-hover" style="width: 100%; margin-top: 30px;" id="tableAverage">
				</table>
				<hr/>
              
              	<input style="margin-bottom: 8px; width: 100%;" class="btn btn-success btn-lg" type="button" value="Start" onclick="main()"/>

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
ctx.fillRect(0,0,600,400);

var c2 = document.getElementById("minCanvas");
var ctx2 = c2.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,600,400);

var c3 = document.getElementById("averageCanvas");
var ctx3 = c3.getContext("2d");
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,600,400);

/**
 * Constant declarations.
 **/
const MAXIMUM = 1000000;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
var USERTIMES = 0;

/**
 * Global Variables
 **/
var winner = "none";
var grid;
var countingGrid;
var rows = 0;
var columns = 0;
var times = 0;
var redCounterTotal = 0;
var blueCounterTotal = 0;
var redWins = 0;
var blueWins = 0;
var totalMins = [];
var totalMaxes = [];
var totalAverages = [];
var totalTurnsForAllGames = 0;
var startingCol;
var startingRow;

/**
 * Author: Jason Klamert
 * Last Modified: 1/31/2017
 * Function to prompt the user for the required inputs for grid dimensions and number of times to run.
 **/
function promptUser() {

    columns = 2;
    startingCol = columns;
    rows = 2;
    startingRow = rows;
    times = parseInt(prompt("Please enter the number of times that you want to play the game. This should be less than 400.", "250"));
    console.log("User times: " + times);
    USERTIMES = times;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/31/2017
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
 * Last Modified: 1/31/2017
 * Prints out the array for utility.
 **/
function printArray(arr)
{
	for(var i = 0; i < USERTIMES; i++) 
	{
		console.log(arr[i]);
    }
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/31/2017
 * FUnction that finds the maximum value of all of the maxes from the passed array.
 **/
function getAbsoluteMax(arr)
{
	var max = arr[0];

	for(var i = 0; i < USERTIMES; i++) 
	{
		if(arr[i] > max)
		{
			max = arr[i];
		}
    }

    return max;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/31/2017
 * FUnction that finds the minimum value of all of the mins from the passed array.
 **/
function getAbsoluteMin(arr)
{
	var min = arr[0];

	for(var i = 0; i < USERTIMES; i++) 
	{
		if(arr[i] < min)
		{
			min = arr[i];
		}
    }

    return min;
}

/**
 * Author: Jason Klamert
 * Last Modified: 1/31/2017
 * FUnction that finds the average value of all of the values from the passed array.
 **/
function getAbsoluteAverage(arr)
{
	var average = 0;

	for(var i = 0; i < USERTIMES; i++) 
	{
		average = average + arr[i];
    }

    return (average / USERTIMES);
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
    	//console.log("Unable to move token");
		return true;
	}

	if(col < 0 || col > columns - 1)
	{
    	//console.log("Unable to move token");
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

	if(color == 1)
	{
		var row = getRedRow();
		var col = getRedCol();
        
        //console.log("red row: " + row);
        //console.log("red col: " + col);

		if(movement == UP)
		{
			if(!isOutOfBounds(row + 1,col))
			{
				var temp = grid[row + 1][col];

				if(temp === 2)
				{
					winner = "Red";
				}

				grid[row + 1][col] = 1;
				grid[row][col] = temp;
				incrementGrid(row + 1,col);
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
				}

				grid[row - 1][col] = 1;
				grid[row][col] = temp;
				incrementGrid(row - 1,col);
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
				}

				grid[row][col - 1] = 1;
				grid[row][col] = temp;
				incrementGrid(row,col - 1);
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
				}

				grid[row][col + 1] = 1;
				grid[row][col] = temp;
				incrementGrid(row,col + 1);
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
        //console.log("blue row: " + row);
		var col = getBlueCol();
        //console.log("blue col: " + col);
        
		if(movement == UP)
		{
			if(!isOutOfBounds(row + 1,col))
			{
				var temp = grid[row + 1][col];

				if(temp === 1)
				{
					winner = "Blue";
				}

				grid[row + 1][col] = 2;
				grid[row][col] = temp;
				incrementGrid(row + 1, col);
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
				}

				grid[row - 1][col] = 2;
				grid[row][col] = temp;
				incrementGrid(row - 1, col);
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
				}

				grid[row][col - 1] = 2;
				grid[row][col] = temp;
				incrementGrid(row,col - 1);
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
				}

				grid[row][col + 1] = 2;
				grid[row][col] = temp;
				incrementGrid(row,col + 1);
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
 * Last Modified: 2/10/2017
 * Function to paint a rudimentary histogram onto the canvas.
 **/
function paintGraph() {			

	for(var i = 1; i <= USERTIMES; i++)
	{
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(i, 300 - totalMaxes[i-1], 1, 1);
	}	

	var str = "<tr><td>Dimensions</td><td>Maximum Touches</td></tr>";
	for(var i = 0; i < USERTIMES; i++)
	{
		str += "<tr><td>" + (i + startingRow) + "x" + (i + startingCol) + "</td><td>" + totalMaxes[i] + "</td></tr>";
	}

	for(var i = 1; i <= USERTIMES; i++)
	{
		ctx2.fillStyle = "rgb(0,255,0)";
		ctx2.fillRect(i, 300 - totalMins[i - 1], 1, 1);
	}	

	var str2 = "<tr><td>Dimensions</td><td>Minimum Touches</td></tr>";
	for(var i = 0; i < USERTIMES; i++)
	{
		str2 += "<tr><td>" + (i + startingRow) + "x" + (i + startingCol) + "</td><td>" + totalMins[i] + "</td></tr>";
	}

	for(var i = 1; i <= USERTIMES; i++)
	{
		ctx3.fillStyle = "rgb(0,0,255)";
		ctx3.fillRect(i, 300 - totalAverages[i - 1], 1, 1);
	}	

	var str3 = "<tr><td>Dimensions</td><td>Average Touches</td></tr>";
	for(var i = 0; i < USERTIMES; i++)
	{
		str3 += "<tr><td>" + (i + startingRow) + "x" + (i + startingCol) + "</td><td>" + totalAverages[i] + "</td></tr>";
	}

	document.getElementById("table").innerHTML = str;
	document.getElementById("tableMin").innerHTML = str2;
	document.getElementById("tableAverage").innerHTML = str3;

	document.getElementById("conclusions").innerHTML = "If we ignore the obvious outliers for maximums vs grid size, we can obtain a gentle curve. By drawing the line of best fit, we can argue that as board dimensions approach infinety, the number of maximum grid touches can be roughly defined by log(Grid Size). In some cases the line may even look linear. Thus, there does at least seem to be a connection between a greater board size and a higher maximum amount of grid touches.";

	document.getElementById("conclusions2").innerHTML = "As you can see, most of the time the minimum case is always zero. I can count on one hand how many times I have gotten a number besides zero for the minimum. In fact, I suspect that greater board sizes lead to more untouched spaces. Thus, a greater chance of the min being zero.";

	document.getElementById("conclusions3").innerHTML = "We have a heavy concentration of points that are hovering just above the zero marker. This denotes that there are a lot of spaces that actually never get touched. The average doesn't seem to grow much, if at all, with board size.";
}

/**
 * Author: Jason Klamert
 * Last Modified: 2/10/2017
 * Function to kick off the odd game simulator. This will be triggered by the start button on the HTML page.
 * This will house our functional logic and put together a display for the user once the program has completed.
 **/
function main() 
{

	/**
	 * Get the rows and columns from the user.
	 **/
	promptUser();

	console.log(rows);
	console.log(columns);

	while(times > 0)
	{

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
		var moveStatus = false;
		winner = "none";

		grid = [];
		countingGrid = [];

		/**
		 * Initialize our grids.
		 **/
		for(var i = 0; i < columns; i++) 
		{
			 grid[i] = [];
			 countingGrid[i] = [];
		}

		for(var i = 0; i < rows; i++)
		{
			for(var k = 0; k < columns; k++)
			{
				grid[i][k] = 0;
				countingGrid[i][k] = 0;
			}
		}

		/**
		 * Set our tokens on the board and increment our starting token positions as they have been used. 
		 * - 0 is for empty.
		 * - 1 is for red token.
		 * - 2 is for blue token.
		 **/
		grid[0][0] = 1;
		grid[rows - 1][columns - 1] = 2;
		countingGrid[0][0] = countingGrid[0][0] + 1;
		countingGrid[rows - 1][columns - 1] = countingGrid[rows - 1][columns - 1] + 1;

		//printGrid(grid, rows, columns);
		//console.log("Divider");
		//printGrid(countingGrid, rows, columns);

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

		redCounterTotal = redCounterTotal + redCounter;
		blueCounterTotal = blueCounterTotal + blueCounter;
		totalMins.push(min);
		totalMaxes.push(max);
		totalAverages.push(average);
		totalTurnsForAllGames = totalTurnsForAllGames + totalTurns;

		if(winner == "Red")
		{
			redWins = redWins + 1;
		}
		else
		{
			blueWins = blueWins + 1;
		}

    	times = times - 1;

    	grid = 0;
    	countingGrid = 0;

    	columns++;    	
    	rows++;  

    	console.log("columns : " + columns);
    	console.log("rows : " + rows);  		

	}

	paintGraph();

	document.getElementById("redCounter").innerHTML = redCounterTotal;
	document.getElementById("blueCounter").innerHTML = blueCounterTotal;
	document.getElementById("winnerBlue").innerHTML = blueWins;
	document.getElementById("winnerRed").innerHTML = redWins;
	document.getElementById("average").innerHTML = getAbsoluteAverage(totalAverages);
	document.getElementById("max").innerHTML = getAbsoluteMax(totalMaxes);
	document.getElementById("min").innerHTML = getAbsoluteMin(totalMins);
	document.getElementById("times").innerHTML = USERTIMES;
	document.getElementById("absMinOfMin").innerHTML = getAbsoluteMin(totalMins);
	document.getElementById("absMaxOfMin").innerHTML = getAbsoluteMax(totalMins);
	document.getElementById("absAverageOfMin").innerHTML = getAbsoluteAverage(totalMins);
	document.getElementById("absMinOfMax").innerHTML = getAbsoluteMin(totalMaxes);
	document.getElementById("absMaxOfMax").innerHTML = getAbsoluteMax(totalMaxes);
	document.getElementById("absAverageOfMax").innerHTML = getAbsoluteAverage(totalMaxes);
	document.getElementById("absMinOfAverages").innerHTML = getAbsoluteMin(totalAverages);
	document.getElementById("absMaxOfAverages").innerHTML = getAbsoluteMax(totalAverages);
	document.getElementById("absAverageOfAverages").innerHTML = getAbsoluteAverage(totalAverages);
}

</script>
</body>
</html>