import Game from './Model/Game.js';
const app = window.Telegram.WebApp;
app.ready()
app.isVerticalSwipesEnabled = false;
// Добавляем таблицу на страницу
let game = new Game(5, 8);
$('.container').append(game.render());


$('body').on('mousedown', ".block", function(){
    game.checkMoves(this);
});

$('body').on('mouseup', ".block", function(){
    game.cancel();
});

$('body').on('mousemove', ".block.highlighted", function(){
    game.clear_path();
    game.checkMoves(this);
});

