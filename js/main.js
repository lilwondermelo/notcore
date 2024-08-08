import Game from './Model/Game.js';
const app = window.Telegram.WebApp;
app.ready()
app.expand()
app.isVerticalSwipesEnabled = false;
// Добавляем таблицу на страницу
let game = new Game(5, 8);
$('.container').append(game.render());


$('body').on('mousedown', ".block", function(){
    game.checkMoves(this);
});

$('body').on('touchstart', ".block", function(){
    game.checkMoves(this);
});

$('body').on('mouseup', ".block", function(){
    game.cancel();
});

$('body').on("touchend", "*", function(){
    game.cancel();
});

$('body').on("touchcancel", "*", function(){
    game.cancel();
});

$('body').on('mousemove', ".block.highlighted", function(){
    game.clear_path();
    game.checkMoves(this);
});

$('body').on("touchmove", ".block", function(event){
    var touch = event.touches[0];
    var elem = document.elementFromPoint(touch.clientX, touch.clientY);
    if ($(elem).hasClass('block') && $(elem).hasClass('highlighted')) {
        game.clear_path();
        game.checkMoves(elem);
    }
});

