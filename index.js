/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
class Graph {
	constructor(){
		this.chessBoard = new Map();
	}

	addVertex(size = 8){// creates vertex of each block on chessBoard
		for(let i=1;i<= size;i+=1){
			for(let j=1; j<=size;j+=1){
				this.chessBoard.set(`${[i,j]}`, []);
			}
		}
	}

	addEdge(board = this.chessBoard){
		for(const [cords] of board){// looping through each vertex
			const cordsSplit = cords.split(",");
			const cordsXPosition = parseFloat(cordsSplit[0]);
			const cordsYPosition = parseFloat(cordsSplit[1]);
			
			const legalKnightMoves = {// all the moves cords for a certain block cords
				1: [ cordsXPosition + 1, cordsYPosition + 2 ],
				2: [ cordsXPosition + 2, cordsYPosition + 1 ],
				3: [ cordsXPosition + 2, cordsYPosition - 1 ],
				4: [ cordsXPosition + 1, cordsYPosition - 2 ],
				5: [ cordsXPosition - 1, cordsYPosition - 2 ],
				6: [ cordsXPosition - 2, cordsYPosition - 1 ],
				7: [ cordsXPosition - 2, cordsYPosition + 1 ],
				8: [ cordsXPosition - 1, cordsYPosition + 2 ],
			}

			for(const moves in legalKnightMoves){// looping through each possible moves
				const move = legalKnightMoves[moves].toString();// converting to string for creting edge of vertex
				if(board.has(move)// so no edge is created outside the board
				 && !board.get(cords).includes(move) // no edges get repeated for a vertex
				 ){
					board.get(cords).push(move);// setting edge for each vertex
				}	
			}
		}
	}

	knightMoves(start, end, board = this.chessBoard){
		const paths = [];
		const visitedBlock = new Set();
		const queue = [];

		queue.push([start, [start]]);
		while(queue.length > 0){
			const [current, path] = queue.shift();// current takes the block it is currently on and
												// path takes the path it has been to get to that block
			visitedBlock.add(current);

			if(current === end) paths.push(path);
			// base case(once the knight reaches end one by one the paths are stored)

			const something = board.get(current);// getting all positions of current block the knight is on
			for(const neighbor of something){// looping thru each block
				if(!visitedBlock.has(neighbor)){ // checkin if the block has been visited before
					queue.push([neighbor, [...path, neighbor]]); // if not queues the node
				}
			}
		}
		// choosing any one random shortest path to display
		const randomNumber = Math.floor(Math.random() * paths.length);
		console.log("Number of shortest path:", paths.length)
		console.log(`=>You Made it in ${paths[0].length-1} moves`);
		console.log("One of the shortest path:");
		paths[randomNumber].forEach((path)=> console.log(`[${path}]`));
	}
}
const newBoard = new Graph();
newBoard.addVertex()
newBoard.addEdge();
newBoard.knightMoves("1,1","1,2");
