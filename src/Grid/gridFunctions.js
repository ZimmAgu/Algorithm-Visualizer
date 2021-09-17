const GRID_ROW_LENGTH = 15;
const GRID_COL_LENGTH = 30;

const START_NODE_ROW = 5;
const START_NODE_COLUMN = 5;

const END_NODE_ROW = 5;
const END_NODE_COLUMN = 20;

function setUpGrid (grid) {
    
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


export { setUpGrid, getGridWithToggledWall }
export { START_NODE_ROW, START_NODE_COLUMN, END_NODE_ROW, END_NODE_COLUMN }