// スコアを初期化
let score = 0;

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// スコアを更新する関数
function updateScore(points) {
  score += points;
  scoreElement.textContent = score;
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
  const emptyTiles = document.querySelectorAll('.empty');
  if (emptyTiles.length > 0) {
    return false;
  }

  // 合体できるタイルがあるか確認
  const tiles = document.querySelectorAll('.tile');
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const row = tile.parentNode.rowIndex;
    const col = tile.cellIndex;

    // 上下左右のタイルを確認
    const up = document.querySelector('table tr:nth-child(' + (row - 1) + ') td:nth-child(' + col + ') .tile');
    const down = document.querySelector('table tr:nth-child(' + (row + 1) + ') td:nth-child(' + col + ') .tile');
    const left = document.querySelector('table tr:nth-child(' + row + ') td:nth-child(' + (col - 1) + ') .tile');
    const right = document.querySelector('table tr:nth-child(' + row + ') td:nth-child(' + (col + 1) + ') .tile');

    if (up && up !== null && up.textContent === tile.textContent) {
      return false;
    }
    if (down && down !== null && down.textContent === tile.textContent) {
      return false;
    }
    if (left && left !== null && left.textContent === tile.textContent) {
      return false;
    }
    if (right && right !== null && right.textContent === tile.textContent) {
      return false;
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
  document.body.innerHTML = '<div class="tile">2</div><div class="tile">4</div><div class="tile">8</div><div class="tile">16</div>';
  if (checkGameOver() === false) {
    console.log('テスト1: 成功');
  } else {
    console.error('テスト1: 失敗');
  }

  // 空きスペースがあり、合体できるタイルがない場合
  document.body.innerHTML = '<div class="tile">2</div><div class="tile">4</div><div class="tile">8</div><div class="tile">16</div><div class="empty"></div>';
  if (checkGameOver() === false) {
    console.log('テスト2: 成功');
  } else {
    console.error('テスト2: 失敗');
  }

  // 空きスペースがなく、合体できるタイルがある場合
  document.body.innerHTML = '<div class="tile">2</div><div class="tile">2</div><div class="tile">8</div><div class="tile">16</div>';
  if (checkGameOver() === false) {
    console.log('テスト3: 成功');
  } else {
    console.error('テスト3: 失敗');
  }

  // 空きスペースがなく、合体できるタイルがない場合
  document.body.innerHTML = '<div class="tile">2</div><div class="tile">4</div><div class="tile">8</div><div class="tile">16</div>';
  if (checkGameOver() === true) {
    console.log('テスト4: 成功');
  } else {
    console.error('テスト4: 失敗');
  }
}

// テストコードを実行する
testCheckGameOver();

// ゲームオーバー判定を呼び出す例
// (実際には、タイルが生成・合体した後にこの関数を呼び出す)
//checkGameOver();
