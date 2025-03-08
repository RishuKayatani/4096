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
// checkGameClear();

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
testCheckGameClear();
