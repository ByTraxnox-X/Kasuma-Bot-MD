let gameSessions = new Map();

function createBoard(rows, cols, initialValue = 0) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols).fill(initialValue);
  }
  return board;
}

function placeMines(board, count) {
  let minesPlaced = 0;
  while (minesPlaced < count) {
    const x = Math.floor(Math.random() * board.length);
    const y = Math.floor(Math.random() * board[0].length);
    if (board[x][y] !== 'M') {
      board[x][y] = 'M';
      minesPlaced++;
    }
  }
}

function printHiddenBoard(conn, m, revealedBoard) {
  let result = '*Mapa del Busca Minas*\n\nPara jugar elije la casilla de la fila que quieras destapar, ejemplo: 2,1';
  for (let i = 0; i < revealedBoard.length; i++) {
    for (let j = 0; j < revealedBoard[i].length; j++) {
      result += revealedBoard[i][j] ? '⬛ ' : '⬜ ';
    }
    result += '\n';
  }
  conn.reply(m.chat, result, m);
}

function printRevealedBoard(conn, m, revealedBoard, gameBoard, withEmoji = false) {
  let result = '*Mapa del Busca Minas*\n\n';
  for (let i = 0; i < revealedBoard.length; i++) {
    for (let j = 0; j < revealedBoard[i].length; j++) {
      if (revealedBoard[i][j]) {
        if (gameBoard[i][j] === 'M') {
          result += withEmoji ? '💣 ' : 'M ';
        } else {
          const minesCount = countAdjacentMines(i, j, gameBoard);
          result += minesCount > 0 ? `${minesCount} ` : '0 ';
        }
      } else {
        result += '⬛ ';
      }
    }
    result += '\n';
  }
  conn.reply(m.chat, result, m);
}

function countAdjacentMines(x, y, gameBoard) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < gameBoard.length && ny >= 0 && ny < gameBoard[0].length && gameBoard[nx][ny] === 'M') {
        count++;
      }
    }
  }
  return count;
}

async function revealCell(conn, m, x, y, userId) {
  const userSession = gameSessions.get(userId);
  if (userSession.revealedBoard[x][y]) {
    conn.reply(m.chat, 'Esta celda ya ha sido revelada.', m);
  } else if (userSession.gameBoard[x][y] === 'M') {
    userSession.revealedBoard[x][y] = true;
    printRevealedBoard(conn, m, userSession.revealedBoard, userSession.gameBoard, true); // Mostrar tablero con emoji de mina
    conn.reply(m.chat, '¡Has perdido! Has encontrado una mina.', m);

    // Eliminar la sesión de juego del usuario después de perder
    gameSessions.delete(userId);
  } else {
    const adjacentMines = countAdjacentMines(x, y, userSession.gameBoard);
    userSession.revealedBoard[x][y] = true;
    userSession.gameBoard[x][y] = adjacentMines;
    printRevealedBoard(conn, m, userSession.revealedBoard, userSession.gameBoard);
  }
}

let handler = async (m, { conn }) => {
  // Identificar al usuario
  const userId = m.sender;

  if (!gameSessions.has(userId)) {
    // Si el usuario no tiene una sesión de juego, crea una nueva
    const numRows = 4; // Número de filas
    const numCols = 5; // Número de columnas
    const mineCount = 6; // Cantidad de minas

    // Inicializa el tablero del juego para el usuario
    const userGameBoard = createBoard(numRows, numCols);
    const userRevealedBoard = createBoard(numRows, numCols, false);

    // Coloca minas aleatorias en el tablero
    placeMines(userGameBoard, mineCount);

    // Almacenar el tablero de juego del usuario en la sesión
    gameSessions.set(userId, { gameBoard: userGameBoard, revealedBoard: userRevealedBoard });
  }

  // Obtener el tablero del juego del usuario
  const userSession = gameSessions.get(userId);

  // Muestra el tablero inicialmente oculto para el usuario
  printHiddenBoard(conn, m, userSession.revealedBoard);
};

handler.help = ['buscaminas'];
handler.tags = ['game'];
handler.command = /^(buscaminas)$/i;

handler.before = async (m, { conn }) => {
  // Identificar al usuario
  const userId = m.sender;
  const input = m.text.trim();
  const userSession = gameSessions.get(userId);

  if (/^\d+,\d+$/i.test(input)) {
    const [x, y] = input.split(',').map(Number);
    if (x >= 1 && x <= userSession.gameBoard.length && y >= 1 && y <= userSession.gameBoard[0].length) {
      // Las coordenadas ingresadas por el usuario son válidas
      revealCell(conn, m, x - 1, y - 1, userId);
    } else {
      conn.reply(m.chat, 'Coordenadas inválidas. Debes ingresar números dentro del rango del tablero.', m);
    }
  }
};

export default handler;
