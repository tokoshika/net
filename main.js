const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("result-text");
const scoreElement = document.getElementById("score");
let scoreArray = [];
const results = [
  {
    text: "問題ありません。使いすぎに気をつけて、これからもiPadと仲良くしていきましょう!",
  },
  {
    text: "iPadと仲良くなりすぎています。少し距離を置いてつきあっていきましょう!",
  },
  {
    text: "このままでは危険です。iPadとの付き合い方を見直しませんか？",
  },
];

currentQuestionIndex = 0;
startButton.addEventListener("click", () => {
  startQuiz();
});

function startQuiz() {
  startButton.classList.add("hide");
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  // 連想配列の値をそれぞれ挿入

  // タイトル
  questionElement.innerText = questions[currentQuestionIndex].question;

  // 設問
  questions[currentQuestionIndex].answers.forEach((answer) => {
    // ボタンタグを生成して、設問を挿入
    const button = document.createElement("button");
    button.innerText = answer.text;
    const value = answer.value;
    button.dataset.value = value;
    answerButtonsElement.appendChild(button);

    // 選択肢をクリックをする
    button.addEventListener("click", selectAnswer);
  });
}

// 回答の選択
function selectAnswer(e) {
  const selectedButton = e.target;
  // 選択したボタンのvalueを取得
  const scoreData = parseInt(selectedButton.dataset.value);
  // 配列に格納
  scoreArray.push(scoreData);

  if (currentQuestionIndex < questions.length - 1) {
    resetState();
    currentQuestionIndex++;

    showQuestion();
  } else {
    showResult();
  }
}

const showResultText = () => {
  const totalScore = scoreArray.reduce(function (sum, currentValue) {
    return sum + parseInt(currentValue);
  }, 0);
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (totalScore <= 10 && i === 0) {
      scoreElement.innerText = result.text;
      break;
    } else if (totalScore < 22 && i === 1) {
      scoreElement.innerText = result.text;
      break;
    } else if (i === 2) {
      scoreElement.innerText = result.text;
      break;
    }
  }
};

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// 結果の表示
function showResult() {
  //   console.log(scoreArray)

  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  showResultText();
}

// もう一度診断するのボタンをクリック
restartButton.addEventListener("click", () => {
  resultContainer.classList.add("hide");
  startButton.classList.remove("hide");
  currentQuestionIndex = 0;
  scoreArray = [];
  resetState();
});
