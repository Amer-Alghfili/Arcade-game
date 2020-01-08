// Enemies our player must avoid

var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.row = this.y / 73;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
  this.img = new Image();
  this.img.src = this.sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 4 * 130) {
    this.x = -2 * 101;
    if (this.row === 3) {
      this.y = 73;
      this.row = 1;
    } else {
      this.row++;
      this.y = this.row * 73;
    }
  }
  this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
  if (
    this.row === player.row &&
    this.x < player.x + player.img.width - 40 &&
    this.x + this.img.width - 40 > player.x &&
    this.y < player.y + player.img.height - 20 &&
    this.y + this.img.height - 20 > player.y
  ) {
    player.reset();
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.boy = "images/char-boy.png";
  this.img = new Image();
  this.img.src = this.boy;
  this.row = 5;
  this.culomn = 2;
  this.x = this.culomn * 101;
  this.y = this.row * 73;
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.boy), this.x, this.y);
};

Player.prototype.reset = function() {
  this.row = 5;
  this.culomn = 2;
  this.x = this.culomn * 101;
  this.y = this.row * 73;
};

Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case "right":
      if (this.culomn === 4) return;
      this.culomn += 1;
      this.x = this.culomn * 101;
      break;
    case "left":
      if (this.culomn === 0) return;
      this.culomn -= 1;
      this.x = this.culomn * 101;
      break;
    case "up":
      if (this.row === 0) return;
      this.row -= 1;
      this.y = this.row * 73;
      break;
    case "down":
      if (this.row === 5) return;
      this.row += 1;
      this.y = this.row * 73;
      break;
  }
  if (this.row === 0) {
    setTimeout(this.reset.bind(this), 150);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const e1 = new Enemy(-2 * 101, 1 * 73, 250);
const e2 = new Enemy(-2 * 101, 2 * 73, 350);
const e3 = new Enemy(-2 * 101, 3 * 73, 450);
const allEnemies = [e1, e2, e3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
