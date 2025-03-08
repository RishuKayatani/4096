// スコアを初期化
let score = 0;

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// スコアを更新する関数
function updateScore(points) {
  score += points;
  scoreElement.textContent = score;
}

// タイルの数字に応じてCSSクラスを付与する関数
function updateTileColor(tile) {
  const value = parseInt(tile.textContent);
  tile.className = 'grid-cell'; // Reset class
  if (!isNaN(value)) {
    tile.classList.add('grid-cell-' + value);
  } else {
    tile.style.backgroundColor = "#eee";
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
