$(function() {
    // Sets variable boxes

    var $boxes = $('.box');

    // Sets game message variable for displaying turns, winner etc.

    var $gameMessage = $('#gameMessage');

    // Sets variable clicks to keep track of X vs. O

    var clicks = 0;

    // Sets variables x & o

    var x = "X";
    var o = "O";

    // Checks if a player has played in a winning combination

    var checkWinner = function(player) {
        
        // Checks innerHTML of x index of box array

        var checkBox = function(x) {
            return $boxes.eq(x).children(0).html();
        }

        // Sets winning conditions
        var winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
        for (var i = 0; i < winner.length; i++) {
            // console.log(winner[i]);
            if (checkBox(winner[i][0]) === player && checkBox(winner[i][1]) === player && checkBox(winner[i][2]) === player) {
                console.log("winner: " + i);
                return true;
            } 
        }   
        return false;
    }

    // Handles box click event

    $boxes.click(function(event) {
        var $box = $(event.target);
        if (checkWinner(x) || checkWinner(o)) {
            $gameMessage.append("!");
        } else if ($box.html() === x || $box.html() === o) {
            $gameMessage.html('Pick another square!');
        } else {
            clicks += 1;
            console.log(clicks);
            if (clicks % 2 === 1) {
                $box.html(x);
                $box.css('color', 'cyan');
                if (clicks === 9) {
                    $gameMessage.html('It\'s a draw!');
                } else {
                    $gameMessage.html('O goes next.');
                }
            } else {
                $box.html(o);
                $box.css('color', 'yellow');
                $gameMessage.html('X goes next.');
            }
            if (checkWinner(x)) {
                $gameMessage.html('X wins!');
            } else if (checkWinner(o)) {
                $gameMessage.html('O wins!');
            } else {
                console.log('WTF');
            }
        }
    });

    // Reset button - changes html for all boxes, changes gameMessage & sets clicks to 0

    var $resetButton = $('#reset');

    $resetButton.click(function(event) {
        $boxes.html('<p>&nbsp;</p>');
        $gameMessage.html('Let\'s Play! X goes first.');
        clicks = 0;
    }); 

});
