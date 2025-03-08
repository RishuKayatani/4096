// スコアを初期化
let score = 0;

function setHighScore(score) {
  localStorage.setItem('highScore', score);
}

function getHighScore() {
  return localStorage.getItem('highScore') || 0;
}

function displayHighScore() {
  const highScore = getHighScore();
  alert('最高スコア: ' + highScore);
}

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');

function updateHighScoreDisplay() {
  const highScore = getHighScore();
  highScoreElement.textContent = '最高スコア: ' + highScore;
}

updateHighScoreDisplay();

// スコアを更新する関数
function updateScore(points) {
  score += points;
  scoreElement.textContent = score;
  updateHighScoreDisplay();
}

// タイルの数字に応じてCSSクラスを付与する関数
function updateTileColor(tile) {
  const value = parseInt(tile.textContent);
  tile.className = 'grid-cell'; // Reset class
  tile.style.animation = ''; // アニメーションをリセット
  if (!isNaN(value)) {
    tile.classList.add('grid-cell-' + value);
  }
}

// ゲームクリア判定
function checkGameClear() {
  // 4096のタイルが存在するか確認する
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].textContent === '4096') {
      // クリア画面を表示する
      alert('ゲームクリア！');
      return true;
    }
  }
  return false;
}

// タイルが合体したときにスコアを更新する例
// (実際には、ゲームロジック内でこの関数を呼び出す)
// updateScore(10);

// ゲームクリア判定を呼び出す例
// (実際には、タイルが生成・合体した後にこの関数を呼び出す)
//checkGameClear();

// テストコード
function testCheckGameClear() {
  // 4096のタイルが存在しない場合
  document.body.innerHTML = '<div class="tile">2048</div>';
  if (checkGameClear() === false) {
    console.log('テスト1: 成功');
  } else {
    console.error('テスト1: 失敗');
  }

  // 4096のタイルが存在する場合
  document.body.innerHTML = '<div class="tile">4096</div>';
  if (checkGameClear() === true) {
    console.log('テスト2: 成功');
  } else {
    console.error('テスト2: 失敗');
  }
}

// テストコードを実行する
// testCheckGameClear();

// ゲームオーバー判定
function checkGameOver() {
  // 空きスペースがあるか確認
  const emptyTiles = document.querySelectorAll('.grid-cell:empty');
  if (emptyTiles.length > 0) {
    return false;
  }

  // 合体できるタイルがあるか確認
  const gridContainer = document.querySelector('.grid-container');
  const gridCells = Array.from(gridContainer.children);
  const gridSize = 4;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const index = i * gridSize + j;
      const cell = gridCells[index];
      const value = parseInt(cell.textContent);

      if (isNaN(value)) continue;

      // 右方向のチェック
      if (j < gridSize - 1) {
        const rightCell = gridCells[index + 1];
        if (rightCell && rightCell.textContent) {
          const rightValue = parseInt(rightCell.textContent);
          if (value === rightValue) {
            return false;
          }
        }
      }

      // 下方向のチェック
      if (i < gridSize - 1) {
        const downCell = gridCells[index + gridSize];
        if (downCell && downCell.textContent) {
          const downValue = parseInt(downCell.textContent);
          if (value === downValue) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

// ゲームオーバー画面を表示
function gameOver() {
  alert('ゲームオーバー！');
  const currentScore = score;
  const highScore = getHighScore();
  if (currentScore > highScore) {
    setHighScore(currentScore);
    updateHighScoreDisplay();
  }
  stopAutoPlay();
}

function testCheckGameOver() {
  // 空きスペースがない場合
  document.body.innerHTML = '<div class="grid-cell">2</div><div class="grid-cell">4</div><div class="grid-cell">8</div><div class="grid-cell">16</div>';
  if (checkGameOver() === true) {
    console.log('テスト1: 成功');
  } else {
    console.error('テスト1: 失敗');
  }

  // 空きスペースがあり、合体できるタイルがない場合
  document.body.innerHTML = '<div class="grid-cell">2</div><div class="grid-cell">4</div><div class="grid-cell">8</div><div class="grid-cell">16</div><div class="grid-cell"></div>';
  if (checkGameOver() === false) {
    console.log('テスト2: 成功');
  } else {
    console.error('テスト2: 失敗');
  }

  // 空きスペースがなく、合体できるタイルがある場合
  document.body.innerHTML = '<div class="grid-cell">2</div><div class="grid-cell">2</div><div class="grid-cell">8</div><div class="grid-cell">16</div>';
  if (checkGameOver() === false) {
    console.log('テスト3: 成功');
  } else {
    console.error('テスト3: 失敗');
  }

  // 空きスペースがなく、合体できるタイルがない場合
  document.body.innerHTML = '<div class="grid-cell">2</div><div class="grid-cell">4</div><div class="grid-cell">8</div><div class="grid-cell">16</div>';
  if (checkGameOver() === true) {
    console.log('テスト4: 成功');
  } else {
    console.error('テスト4: 失敗');
  }
}

// テストコードを実行する
//testCheckGameOver();

// ゲームオーバー判定を呼び出す例
// (実際には、タイルが生成・合体した後にこの関数を呼び出す)
//checkGameOver();

function resetGame() {
  const gridContainer = document.querySelector('.grid-container');
  const gridCells = Array.from(gridContainer.children);
  gridCells.forEach(cell => {
    cell.textContent = "";
    updateTileColor(cell);
  });
  generateNewTile(gridCells);
  generateNewTile(gridCells);
  const currentScore = score;
  const highScore = getHighScore();
  if (currentScore > highScore) {
    setHighScore(currentScore);
  }
  score = 0;
  updateScore(0);
  updateHighScoreDisplay();
}

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

function evaluateBoard() {
  const gridContainer = document.querySelector('.grid-container');
  const gridCells = Array.from(gridContainer.children);
  const gridSize = 4;
  let score = 0;

  // モナトーン性を評価
  let monotonicityLeftRight = 0;
  let monotonicityUpDown = 0;
  for (let i = 0; i < gridSize; i++) {
    let currentLeftRight = 0;
    let currentUpDown = 0;
    for (let j = 0; j < gridSize - 1; j++) {
      const currentValueLeftRight = parseInt(gridCells[i * gridSize + j].textContent) || 0;
      const nextValueLeftRight = parseInt(gridCells[i * gridSize + j + 1].textContent) || 0;
      monotonicityLeftRight += (currentValueLeftRight > nextValueLeftRight) ? currentValueLeftRight - nextValueLeftRight : nextValueLeftRight - currentValueLeftRight;

      const currentValueUpDown = parseInt(gridCells[j * gridSize + i].textContent) || 0;
      const nextValueUpDown = parseInt(gridCells[(j + 1) * gridSize + i].textContent) || 0;
      monotonicityUpDown += (currentValueUpDown > nextValueUpDown) ? currentValueUpDown - nextValueUpDown : nextValueUpDown - currentValueUpDown;
    }
  }
  score -= monotonicityLeftRight + monotonicityUpDown;

  // 最大タイルを角に配置する評価
  let maxTileValue = 0;
  let maxTilePosition = null;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const value = parseInt(gridCells[i * gridSize + j].textContent) || 0;
      if (value > maxTileValue) {
        maxTileValue = value;
        maxTilePosition = { i, j };
      }
    }
  }

  if (maxTilePosition) {
    if ((maxTilePosition.i === 0 && maxTilePosition.j === 0) ||
      (maxTilePosition.i === 0 && maxTilePosition.j === gridSize - 1) ||
      (maxTilePosition.i === gridSize - 1 && maxTilePosition.j === 0) ||
      (maxTilePosition.i === gridSize - 1 && maxTilePosition.j === gridSize - 1)) {
      score += maxTileValue * 0.5;
    }
  }

  // 空きマスの評価
  let emptyCount = 0;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!gridCells[i * gridSize + j].textContent) {
        emptyCount++;
      }
    }
  }
  score += emptyCount * 10;

  return score;
}

function getBestMove() {
  const directions = ['up', 'down', 'left', 'right'];
  let bestScore = -Infinity;
  let bestDirection = null;

  for (const direction of directions) {
    // Simulate move
    const gridContainer = document.querySelector('.grid-container');
    const gridCells = Array.from(gridContainer.children);
    const originalGrid = gridCells.map(cell => cell.textContent);
    let score = -Infinity;
    // Simulate move
    moveTiles(direction);
    let simulatedScore = evaluateBoard();
    if (checkGameOver()) {
      simulatedScore = -Infinity;
    }

    // Undo move
    const gridContainer2 = document.querySelector('.grid-container');
    const gridCells2 = Array.from(gridContainer2.children);
    for (let i = 0; i < gridCells2.length; i++) {
      gridCells2[i].textContent = originalGrid[i];
      updateTileColor(gridCells2[i]);
    }

    if (score > bestScore) {
      bestScore = score;
      bestDirection = direction;
    }
  }

  return bestDirection;
}

let autoPlayInterval;

function autoPlay() {
  if (checkGameOver() || checkGameClear()) {
    stopAutoPlay();
    return;
  }
  const bestDirection = getBestMove();
  if (bestDirection) {
    moveTiles(bestDirection);
  } else {
    // If no best direction, move randomly
    const directions = ['up', 'down', 'left', 'right'];
    const randomIndex = Math.floor(Math.random() * directions.length);
    const direction = directions[randomIndex];
    moveTiles(direction);
  }
}

const autoPlayButton = document.getElementById('auto-play-button');
autoPlayButton.addEventListener('click', function() {
  if (autoPlayInterval) {
    stopAutoPlay();
    //autoPlayButton.disabled = false;
  } else {
    autoPlayButton.textContent = '自動プレイ中止';
    //autoPlayButton.disabled = true;
    autoPlayInterval = setInterval(autoPlay, 100);
  }
});

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
  autoPlayButton.textContent = '自動プレイ';
}
