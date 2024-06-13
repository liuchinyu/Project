const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const height = c.height;
const width = c.width;
const radius = 20;
let x = 20;
let y = 20;
let circle_x = 50;
let circle_y = 50;
let ground_x = 150;
let ground_y = 600;
let brick_x = 100;
let brick_y = 100;
let count = 0;

let brickArray = [];

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.visible = true;
    brickArray.push(this);
  }
  // drawBrick() {
  //   ctx.fillStyle = "lightgreen";
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // }
  drawBrick(visible) {
    if (visible) {
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}
for (let i = 0; i < 10; i++) {
  new Brick(getRandom(0, 1150), getRandom(0, 750));
}
// function drawBrick() {
//   for (let i = 0; i < 10; i++) {
//     let x = getRandom(0, 1150);
//     let y = getRandom(0, 750);
//     ctx.fillStyle = "lightgreen";
//     ctx.fillRect(x, y, 50, 50);
//   }
// }

function getRandom(minNumber, maxNumber) {
  return minNumber + Math.floor(Math.random() * (maxNumber - minNumber));
}

function drawCircle() {
  //   console.log("draw...");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  //   for (let i = 0; i < 10; i++) {
  //     let x = getRandom(0, 1150);
  //     let y = getRandom(0, 750);
  //     ctx.fillStyle = "lightgreen";
  //     ctx.fillRect(x, y, 50, 50);
  //   }
  // brickArray.forEach((brick) => {
  //   if (brick.visible) {
  //     brick.drawBrick();
  //   }
  // });
  brickArray.forEach((brick) => {
    // if (brick.visible) {
    brick.drawBrick(brick.visible);
    // }
  });

  circle_x += x;
  circle_y += y;

  if (
    circle_x + radius >= ground_x &&
    circle_x - radius <= ground_x + 200 &&
    circle_y + radius >= ground_y &&
    circle_y - radius <= ground_y
  ) {
    if (y > 0) {
      circle_y -= 40;
      //   circle_y += y;
    } else {
      circle_y += 40;
      //   circle_y += y;
    }
    y *= -1;
  }

  if (circle_x >= width - radius) {
    x *= -1;
  } else if (circle_x <= radius) {
    x *= -1;
  }
  if (circle_y >= height - radius) {
    y *= -1;
  } else if (circle_y <= radius) {
    y *= -1;
  }

  brickArray.forEach((brick) => {
    if (brick.touchingBall(circle_x, circle_y) && brick.visible) {
      count++;
      brick.visible = false;
      if (circle_x >= brick.x - radius) {
        x *= -1;
      } else if (circle_x <= brick_x + width + radius) {
        x *= -1;
      }
      if (circle_y >= brick_y - radius) {
        y *= -1;
      } else if (circle_y >= brick_y + height + radius) {
        y *= -1;
      }

      // brickArray.splice(index, 1);
      // if (brickArray.length == 0) {
      //   clearInterval(game);
      //   alert("遊戲結束");
      // }
      if (count == 10) {
        clearInterval(game);
        alert("遊戲結束");
      }
    }
  });

  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, 5);

  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI); //arc(x,y,r,start,end) - Define a circle
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(() => {
  drawCircle();
}, 25);
