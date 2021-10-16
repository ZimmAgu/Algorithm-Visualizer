const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 40;

const START_NODE_ROW = 7;
const START_NODE_COLUMN = 10;

const END_NODE_ROW = 7;
const END_NODE_COLUMN = 30;



function setUpGrid (grid) {     // Sets ups initial grdi
    
    for (let row = 0; row < GRID_ROW_LENGTH; row++) {
        const currentRow = [];

        for (let column = 0; column < GRID_COL_LENGTH; column++) {
            const currentNode = {
                row,
                column,
                isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
                isEnd: row === END_NODE_ROW && column === END_NODE_COLUMN,
                previousNode: null,     // The previous node of every node starts at null
                isWall: false,          // None of the nodes are walls initially
            }

            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
}



function getAllNodes (grid) {   // Gets all of the individual nodes in a grid
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}




function getGridWithToggledWall (grid, row, column) {
    const newGrid = grid.slice();
    const node = newGrid[row][column];

    if (!node.isStart && !node.isEnd) { // Starting and ending nodes can not be made in to walls
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
    
        newGrid[row][column] = newNode;
    }

    return newGrid;
}


// function getGridWithNewPoint (grid, row, column) {
//     const newGrid = grid.slice();
//     const node = newGrid[row][column];


// }


export { setUpGrid, getGridWithToggledWall, getAllNodes }   // Function exports
export { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN } // Constant exports