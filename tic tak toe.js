
const cells  = document.querySelectorAll('.cell')
const playAgain = document.querySelector('button')
const mess = document.querySelector('.message')
let grid = ['', '', '', '', '', '', '', '', ''];

const winPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]            

let isFirst = true;
let indexList = [];
let counter = 0;
let gameEnd = false;

playAgain.onclick = reset;

cells.forEach((cell)=>{
    cell.onclick = ()=>{
        if(gameEnd){
            return;
        }
        counter++;
        let value ='';
        let index= cell.getAttribute('index')
        if(isFirst && !indexList.includes(index) ){
            indexList.push(index);
            cell.innerHTML = 'X';
            value = 'X'
            isFirst = false;
            grid[index] = value;
            mess.innerHTML = "O's turn"
        }
        else if(!indexList.includes(index)){
            indexList.push(index);
            cell.innerHTML = 'O';
            isFirst = true;
            value = 'O';
            mess.innerHTML = "X's turn"
            grid[index] = value;

        }
        let isThereWinner  = checkWin();
        if(!isThereWinner && counter == 9){
            mess.innerHTML = "It's Draw!!"
            gameEnd = true;

        }      
}
})

function checkWin(){
for( row of winPos){
            let c1 = grid[row[0]];
            let c2 = grid[row[1]];
            let c3 = grid[row[2]];

            if(c1 =='' || c2 == '' || c3 == '') {
                continue;
            }
            else if(c1 == c2 && c2 ==c3){
                mess.innerHTML = `${c1}` + ' Wins!!';
                for(let i = 0; i < cells.length; i++){
                    if(i == row[0] || i == row[1]|| i == row[2] ){
                        cells[i].style.background = 'rgb(5, 142, 201)';
                        cells[i].style.color = 'rgb(212, 210, 210)';
                    }
                }
                gameEnd = true;
                return true;
            }           
        }
        return false;

}

function reset(){
indexList = [];
cells.forEach((cell)=>{
    cell.innerHTML = '';
    cell.style.background = 'inherit';
    cell.style.color = 'inherit';
})
grid = ['', '', '', '', '', '', '', '', ''];

counter = 0;
isFirst = true;
gameEnd = false;
mess.innerHTML = "X's turn"
}