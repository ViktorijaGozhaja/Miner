var miner = document.querySelector('#miner');

var boardSize = 10;
for (var x = 0; x < boardSize; x++) {
    var row = document.createElement('div');
    row.classList.add('row');
    miner.appendChild(row);
    for (var y = 0; y < boardSize; y++) {
        var col = document.createElement('div');
        col.dataset.x = x;
        col.dataset.y = y;
        col.classList.add('col');
        var content = document.createElement('div');
        col.appendChild(content);
        content.className = 'content';
        row.appendChild(col);
    }
}

var board = new Array(boardSize);
for (var i = 0; i < boardSize; i++) {
    var row = new Array(boardSize).fill(0);
    board[i] = row;
}
function getCol(i, j) {
    return document.querySelector('[data-x="' + i + '"][data-y="' + j + '"]');
}
function getColContent(i, j) {
    return document.querySelector('[data-x="' + i + '"][data-y="' + j + '"] > .content');
}
var count = 0;
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
while (count < 10) {
    var i = getRandomArbitrary(0, 10);
    var j = getRandomArbitrary(0, 10);
    if (board[i][j] !== -1) {
        board[i][j] = -1;
        count++;
        var elem = getColContent(i, j);
        elem.style.backgroundImage = 'url("bomb.jpg")';
        elem.style.backgroundSize = '50px 50px';
    }
}
for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
        if (board[i][j] !== -1) {
            var bombsRound = 0;
            if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === -1) {
                bombsRound++;
            }
            if (i - 1 >= 0 && board[i - 1][j] === -1) {
                bombsRound++;
            }
            if (i - 1 >= 0 && j + 1 < boardSize && board[i - 1][j + 1] === -1) {
                bombsRound++;
            }
            if (j + 1 < boardSize && board[i][j + 1] === -1) {
                bombsRound++;
            }
            if (i + 1 < boardSize && j + 1 < boardSize && board[i + 1][j + 1] === -1) {
                bombsRound++;
            }
            if (i + 1 < boardSize && board[i + 1][j] === -1) {
                bombsRound++;
            }
            if (i + 1 < boardSize && j - 1 >= 0 && board[i + 1][j - 1] === -1) {
                bombsRound++;
            }
            if (j - 1 >= 0 && board[i][j - 1] === -1) {
                bombsRound++;
            }

            if (bombsRound !== 0) {
                var elem = getColContent(i, j);
                elem.innerHTML = bombsRound;
                board[i][j] = bombsRound;
            }
        }
    }
}
function win() {
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            if (board[i][j] > 0 && !getColContent(i, j).classList.contains('open')) {
                return false;
            }
        }
    }
    return true;
}
function open(elem) {
    elem.classList.add('open');
}
miner.onclick = function (event) {
    var target = event.target;
    while (target !== miner) {
        if (target.className == 'col') {
            var elem = target.querySelector('.content');
            open(elem);
            var i = target.dataset.x;
            var j = target.dataset.y;
            if (board[i][j] === -1) {
                alert('К сожалению, Вы проиграли. В следующий раз Вам повезет больше!');
                window.location = window.location;
                return;
            }
            var array = [];
            var checked = [];
            if (board[i][j] === 0) {
                array.push(getCol(i, j));
                while (array.length > 0) {
                    var col = array.shift();
                    checked.push(col);
                    open(col);
                    var x = +col.dataset.x;
                    var y = +col.dataset.y;
                    if (x - 1 >= 0 && y - 1 >= 0) {
                        if (board[x - 1][y - 1] === 0 && !checked.includes(getCol(x - 1, y - 1))) {
                            array.push(getCol(x - 1, y - 1));
                        }
                        if (board[x - 1][y - 1] !== -1) {
                            open(getColContent(x - 1, y - 1));
                        }
                    }
                    if (x - 1 >= 0) {
                        if (board[x - 1][y] === 0 && !checked.includes(getCol(x - 1, y))) {
                            array.push(getCol(x - 1, y));
                        }
                        if (board[x - 1][y] !== -1) {
                            open(getColContent(x - 1, y));
                        }
                    }
                    if (x - 1 >= 0 && y + 1 < boardSize) {
                        if (board[x - 1][y + 1] === 0 && !checked.includes(getCol(x - 1, y + 1))) {
                            array.push(getCol(x - 1, y + 1));
                        }
                        if (board[x - 1][y + 1] !== -1) {
                            open(getColContent(x - 1, y + 1));
                        }
                    }
                    if (y + 1 < boardSize) {
                        if (board[x][y + 1] === 0 && !checked.includes(getCol(x, y + 1))) {
                            array.push(getCol(x, y + 1));
                        }
                        if (board[x][y + 1] !== -1) {
                            open(getColContent(x, y + 1));
                        }
                    }
                    if (x + 1 < boardSize && y + 1 < boardSize) {
                        if (board[x + 1][y + 1] === 0 && !checked.includes(getCol(x + 1, y + 1))) {
                            array.push(getCol(x + 1, y + 1));
                        }
                        if (board[x + 1][y + 1] !== -1) {
                            open(getColContent(x + 1, y + 1));
                        }
                    }
                    if (x + 1 < boardSize) {
                        if (board[x + 1][y] === 0 && !checked.includes(getCol(x + 1, y))) {
                            array.push(getCol(x + 1, y));
                        }
                        if (board[x + 1][y] !== -1) {
                            open(getColContent(x + 1, y));
                        }
                    }
                    if (x + 1 < boardSize && y - 1 >= 0) {
                        if (board[x + 1][y - 1] === 0 && !checked.includes(getCol(x + 1, y - 1))) {
                            array.push(getCol(x + 1, y - 1));
                        }
                        if (board[x + 1][y - 1] !== -1) {
                            open(getColContent(x + 1, y - 1));
                        }
                    }
                    if (y - 1 >= 0) {
                        if (board[x][y - 1] === 0 && !checked.includes(getCol(x, y - 1))) {
                            array.push(getCol(x, y - 1));
                        }
                        if (board[x][y - 1] !== -1) {
                            open(getColContent(x, y - 1));
                        }
                    }
                }
            }
            if(win()) {
                alert('Вы победили!');
                window.location = window.location;
                return;
            }
            return;
        }
        target = target.ParentNode;
    }
}
miner.onmousedown = function () {
    return false;
}
miner.oncontextmenu = function (event) {
    event.preventDefault();
    var target = event.target;
    while (target !== miner) {
        if (target.className == 'col') {
            target.classList.add('flag');
            return;
        }
        if (target.classList.contains('flag')) {
            target.classList.remove('flag');
            target.classList.add('question');
            return;
        }
        if (target.classList.contains('question')) {
            target.classList.remove('question');
            return;
        }
        target = target.ParentNode;
    }
}
