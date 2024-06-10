const boardSize = 4;
let gameBoard = createEmptyBoard(boardSize);

function createEmptyBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = { value: 0 };
        }
    }
    return board;
}

function renderGameBoard() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = ''; // Очищаем предыдущее состояние игры

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i); // Устанавливаем атрибут data-row
            cell.setAttribute('data-col', j); // Устанавливаем атрибут data-col
            cell.textContent = gameBoard[i][j].value || '';
            gameBoardElement.appendChild(cell);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const boardSize = 4;
    let gameBoard = createEmptyBoard(boardSize);
    let score = 0;

    function createEmptyBoard(size) {
        let board = [];
        for (let i = 0; i < size; i++) {
            board[i] = [];
            for (let j = 0; j < size; j++) {
                board[i][j] = { value: 0 };
            }
        }
        return board;
    }

    function renderGameBoard() {
        const gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = ''; // Очищаем предыдущее состояние игры
    
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell'); // Основной класс для всех клеток
                if (gameBoard[i][j].value!== 0) {
                    cell.classList.add(`cell-${gameBoard[i][j].value}`); // Исправлено: добавлены кавычки вокруг шаблонной строки
                }
                cell.setAttribute('data-row', i);
                cell.setAttribute('data-col', j);
                cell.textContent = gameBoard[i][j].value || '';
                gameBoardElement.appendChild(cell);
            }
        }
    }

    function addRandomNumber() {
        const emptyCells = findEmptyCells();
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const [randomRow, randomCol] = emptyCells[randomIndex];
            const newValue = Math.random() < 0.9? 2 : 4;
            gameBoard[randomRow][randomCol].value = newValue;
            updateCell(randomRow, randomCol, newValue); // Обновляем стиль клетки с новым числом
        }
    }

    function findEmptyCells() {
        const emptyCells = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (gameBoard[i][j].value === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }
        return emptyCells;
    }

    function getRandomValue() {
        return Math.random() < 0.9? 2 : 4;
    }

    function updateCell(row, col, value) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = value;
            // Удаляем старый класс значения, если он есть
            cell.className = 'cell';
            // Добавляем новый класс в зависимости от значения
            if (value!== '') {
                cell.classList.add(`cell-${value}`);
            }
        }
    }

    function mergeCells(row1, col1, row2, col2) {
        const value1 = gameBoard[row1][col1].value;
        const value2 = gameBoard[row2][col2].value;
        if (value1 && value2 && value1 === value2) {
            gameBoard[row1][col1].value *= 2;
            score += gameBoard[row1][col1].value;
            updateCell(row1, col1, gameBoard[row1][col1].value);
            gameBoard[row2][col2].value = 0;
            updateCell(row2, col2, '');
            addRandomNumber(); // Add a new number after merging
        }
    }

    function moveDown() {
        for (let col = 0; col < boardSize; col++) {
            for (let row = 0; row < boardSize - 1; row++) { // Изменено, чтобы исключить последнюю строку
                for (let nextRow = row + 1; nextRow < boardSize; nextRow++) {
                    if (gameBoard[row][col].value!== 0 && gameBoard[nextRow][col].value === 0) {
                        gameBoard[nextRow][col].value = gameBoard[row][col].value;
                        gameBoard[row][col].value = 0;
                        updateCell(nextRow, col, gameBoard[nextRow][col].value);
                        updateCell(row, col, '');
                    } else if (gameBoard[row][col].value!== 0 && gameBoard[nextRow][col].value!== 0 && gameBoard[row][col].value === gameBoard[nextRow][col].value) {
                        gameBoard[nextRow][col].value *= 2;
                        gameBoard[row][col].value = 0;
                        updateCell(nextRow, col, gameBoard[nextRow][col].value);
                        updateCell(row, col, '');
                    }
                }
            }
        }
        renderGameBoard();
        if (findEmptyCells().length > 0) {
            addRandomNumber();
        };
    }

    function moveUp() {
        for (let col = 0; col < boardSize; col++) {
            for (let row = boardSize - 1; row >= 0; row--) {
                for (let prevRow = row - 1; prevRow >= 0; prevRow--) {
                    if (gameBoard[row][col].value!== 0 && gameBoard[prevRow][col].value === 0) {
                        gameBoard[prevRow][col].value = gameBoard[row][col].value;
                        gameBoard[row][col].value = 0;
                        updateCell(row, col, gameBoard[prevRow][col].value);
                        updateCell(row, col, '');
                    } else if (gameBoard[row][col].value!== 0 && gameBoard[prevRow][col].value!== 0 && gameBoard[row][col].value === gameBoard[prevRow][col].value) {
                        gameBoard[prevRow][col].value *= 2;
                        gameBoard[row][col].value = 0;
                        updateCell(prevRow, col, gameBoard[prevRow][col].value);
                        updateCell(row, col, '');
                    }
                }
            }
        }
        renderGameBoard();
        if (findEmptyCells().length > 0) {
            addRandomNumber();
        };
    }

    function moveRight() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize - 1; col++) {
                for (let nextCol = col + 1; nextCol < boardSize; nextCol++) {
                    if (gameBoard[row][col].value!== 0 && gameBoard[row][nextCol].value === 0) {
                        gameBoard[row][nextCol].value = gameBoard[row][col].value;
                        gameBoard[row][col].value = 0;
                        updateCell(row, nextCol, gameBoard[row][nextCol].value);
                        updateCell(row, col, '');
                    } else if (gameBoard[row][col].value!== 0 && gameBoard[row][nextCol].value!== 0 && gameBoard[row][col].value === gameBoard[row][nextCol].value) {
                        gameBoard[row][nextCol].value *= 2;
                        gameBoard[row][col].value = 0;
                        updateCell(row, nextCol, gameBoard[row][nextCol].value);
                        updateCell(row, col, '');
                    }
                }
            }
        }
        renderGameBoard();
        if (findEmptyCells().length > 0) {
            addRandomNumber();
        };
    }

    function moveLeft() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = boardSize - 1; col > 0; col--) {
                for (let prevCol = col - 1; prevCol >= 0; prevCol--) {
                    if (gameBoard[row][col].value!== 0 && gameBoard[row][prevCol].value === 0) {
                        gameBoard[row][prevCol].value = gameBoard[row][col].value;
                        gameBoard[row][col].value = 0;
                        updateCell(row, prevCol, gameBoard[row][prevCol].value);
                        updateCell(row, col, '');
                    } else if (gameBoard[row][col].value!== 0 && gameBoard[row][prevCol].value!== 0 && gameBoard[row][col].value === gameBoard[row][prevCol].value) {
                        gameBoard[row][prevCol].value *= 2;
                        gameBoard[row][col].value = 0;
                        updateCell(row, prevCol, gameBoard[row][prevCol].value);
                        updateCell(row, col, '');
                    }
                }
            }
        }
        renderGameBoard();
        if (findEmptyCells().length > 0) {
            addRandomNumber();
        };
    }

    function checkGameOver() {
        if (!findEmptyCells().length) {
            const values = gameBoard.flat().map(cell => cell.value).filter(value => value!== 0);
            if (values.every(value => value === 2048)) {
                alert('Вы выиграли!');
            } else {
                alert('Вы проиграли.');
            }
        }
    }

    function handleKeydown(event) {
        switch (event.keyCode) {
            case 38: // Up arrow
                moveUp();
                break;
            case 40: // Down arrow
                moveDown();
                break;
            case 37: // Left arrow
                moveLeft();
                break;
            case 39: // Right arrow
                moveRight();
                break;
        }
        renderGameBoard();
        checkGameOver();
    }

    window.addEventListener('keydown', handleKeydown);
    addRandomNumber();
    renderGameBoard();
});

renderGameBoard();

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('themeToggle');
    if (!themeToggleButton) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.classList.add(savedTheme); // Применяем сохраненную тему
    }

    themeToggleButton.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark-theme');
    
        const currentTheme = document.documentElement.classList.contains('dark-theme')? 'dark-theme' : '';
        localStorage.setItem('theme', currentTheme);
    });
});