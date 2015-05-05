 $(function() {

  // Make Player constructor

  function Player(name) {
    this.name = name;
  };

  // Make Board constructor

  function Board() {
    this.$squares = $('.box');
    this.firstPlayer = new Player('X');
    this.secondPlayer = new Player('O');
    this.$reset = $('#reset');
    this.$gameMessage = $('#gameMessage');
    this.$clicks = 0;
  };

   // Make Board prototype for reset event
   // On reset button click, instantiate a new board, then call reset on it


  Board.prototype.reset = function() {
    this.$squares.children(0).html('&nbsp;');
    this.clicks = 0;
    this.$gameMessage.html('Let\'s Play! ' + this.firstPlayer.name + ' goes first.');
    console.log('It worked!');
  };

  // Make Board prototype to check winner

  Board.prototype.checkWinner = function(player) {

    var _this = this;

    // Checks innerHTML of x index of box array

    var checkBox = function(x) {
        return _this.$squares.eq(x).children(0).html();
    }

    // Sets winning conditions
    var winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
    for (var i = 0; i < winner.length; i++) {
        // console.log(winner[i]);
        if (checkBox(winner[i][0]) === player.name && checkBox(winner[i][1]) === player.name && checkBox(winner[i][2]) === player.name) {
            console.log("winner: " + i);
            return true;
        } 
    }   
    return false;
  }

  // Make Board prototype to handle click event

  Board.prototype.handleClick = function(event) {
    var $square = $(event.target);
      if (this.checkWinner(this.firstPlayer) || this.checkWinner(this.secondPlayer)) {
          this.$gameMessage.append("!");
      } else if ($square.html() === this.firstPlayer.name || $square.html() === this.secondPlayer.name) {
          this.$gameMessage.html('Pick another square!');
      } else {
          this.clicks += 1;
          console.log(this.clicks);
          if (this.clicks % 2 === 1) {
              $square.html(this.firstPlayer.name);
              $square.css('color', 'cyan');
              if (this.clicks === 9) {
                  this.$gameMessage.html('It\'s a draw!');
              } else {
                  this.$gameMessage.html(this.secondPlayer.name + ' goes next.');
              }
          } else {
              $square.html(this.secondPlayer.name);
              $square.css('color', 'yellow');
              this.$gameMessage.html(this.firstPlayer.name + ' goes next.');
          }
          if (this.checkWinner(this.firstPlayer)) {
              this.$gameMessage.html(this.firstPlayer.name + ' wins!');
          } else if (this.checkWinner(this.secondPlayer)) {
              this.$gameMessage.html(this.secondPlayer.name + ' wins!');
          } else {
              console.log('No winner yet!');
          }
      }
  };

  // 

  Board.prototype.init = function() {
    var _this = this;

    this.$reset.click(function(event) {
      _this.reset();
    });

    this.$squares.click(function(event) {
      _this.handleClick(event);
    });

    this.reset();

  };

  // Instantiate a new game

  var newBoard = new Board();
  newBoard.init();

});
