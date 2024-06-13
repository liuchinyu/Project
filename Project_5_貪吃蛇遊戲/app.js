const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //getContext() method會回傳一個drawing context
//drawing context表繪畫環境，用在canvas內作圖，2d表繪畫是2d
//getContext可參考mdn rendering context 2d

const unit = 20; //貪食蛇由一格格的格子組成
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit;

let snake = []; // array內每個元素都是物件，表身體當時的X、Y座標
//初始設定，(讓程式碼更簡潔，使用function)
function createSnake() {
  snake[0] = {
    x: 80, //頭
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20, //canvas的第一行
    y: 0,
  };
}
//畫出果實
class Fruit {
  constructor() {
    // x不用先宣告嗎? 不用，如同一般的constructor function傳遞的參數一樣，this.x = x，x也沒有先做宣告
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  //果實被吃掉後重新給定位置
  pickALocation() {
    let overlapping = false; //判斷果實是否跟身體重疊
    let new_x;
    let new_y;

    //判斷果實是否跟身體重疊
    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          // console.log("overlapping...");
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    //使用do-while，必須先執行一次給定隨機位置，再加以判斷
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      // console.log("果實可能的新座標", new_x, new_y);
      checkOverlap(new_x, new_y);
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}
createSnake();
let score = 0;
let highestScore;
//顯示分數
document.getElementById("myScore").innerHTML = "我的分數:" + score;
loadHighestScore();
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
let myFruit = new Fruit();

//監控按下的按鍵是什麼，並傳遞方向
window.addEventListener("keydown", changeDirection);
let direction = "Right";

function changeDirection(e) {
  //不能180度轉彎
  if (e.key == "ArrowRight" && direction != "Left") {
    direction = "Right";
  } else if (e.key == "ArrowDown" && direction != "Up") {
    direction = "Down";
  } else if (e.key == "ArrowLeft" && direction != "Right") {
    direction = "Left";
  } else if (e.key == "ArrowUp" && direction != "Down") {
    direction = "Up";
  }

  //每次按下上下左右鍵之後，在下一幀被畫出來之前
  //不接受任何keydown事件
  //可以防止連續按鍵，導致蛇在邏輯上自殺(180度大轉彎，原先蛇方向往左，快速的按上在還沒被畫出來之前按下右，直接導致頭跟身體碰撞)
  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //判斷是否身體碰到頭
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame); //清空
      alert("遊戲結束");
      return; //直接將function整個結束，就不會有蛇了
    }
  }
  //每次執行先將背景設為黑色，再由下方填滿蛇的顏色，不然對canvas來說會一直重複填滿。
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  //填滿蛇的顏色
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen"; // fillStyle :表填滿的顏色
    } else {
      ctx.fillStyle = "lightblue";
    }

    //穿過右邊的牆
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    } else if (snake[i].x < 0) {
      // x < 0 表穿過左邊的牆
      snake[i].x = canvas.width - unit;
      // 穿過下方的牆
    } else if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    } else if (snake[i].y < 0) {
      // y < 0 表穿過上方的牆
      snake[i].y = canvas.height - unit;
    }

    ctx.strokeStyle = "white"; //外框的顏色
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    // fillRect:填滿長方形，參數 : x、y、width、height
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    // strokeRect:填滿長方形外框
  }

  //設定蛇頭位置，使後續改變方向可以套用
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // 以目前diretion的方向，決定下一幀要放在哪個座標
  if (direction == "Right") {
    snakeX += unit;
  } else if (direction == "Left") {
    snakeX -= unit;
  } else if (direction == "Up") {
    snakeY -= unit;
  } else if (direction == "Down") {
    snakeY += unit; //左上角為(0.0)向下為正，要相加
  }
  //以物件儲存改變方向後的新蛇頭
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //吃到果實後，重新給定果實位置
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation(); //重新選定一個新的隨機位置
    //畫出新果實  --> 重新執行之後就會回到93行的drawFruit
    score++; //加分
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "我的分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead); //再新增新表頭
  window.addEventListener("keydown", changeDirection); //畫完下一幀圖之後，再監聽keydown事件
}

// 因為有SerInterval，使每0.1秒使蛇自動移動，再根據window.addEventListener的Keydown，改變direction，draw即是讀取此direction
let myGame = setInterval(draw, 100);

//判斷是否有玩過遊戲，存取最高分
function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

//判斷當前分數是否超過最高分，並將最高分記錄到local storage
function setHighestScore(score) {
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
  }
}
