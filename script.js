// スコアを初期化
let score = 0;

// スコアを表示する要素を取得
const scoreElement = document.getElementById('score');

// スコアを更新する関数
function updateScore(points) {
  score += points;
  scoreElement.textContent = score;
}

// タイルが合体したときにスコアを更新する例
// (実際には、ゲームロジック内でこの関数を呼び出す)
// updateScore(10);
