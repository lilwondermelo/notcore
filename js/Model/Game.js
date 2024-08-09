import Block from './Block.js';

export default class Game {
  map = {};
  path = [];
  moves = {};
  types = [
    {
      "id": 0,
      "name": "fire",
      "type": "field",
      "mass": 0
    },
    {
      "id": 1,
      "name": "air",
      "type": "gas",
      "mass": 0
    },
    {
      "id": 2,
      "name": "water",
      "type": "liquid",
      "mass": 2
    },
    {
      "id": 3,
      "name": "earth",
      "type": "solid",
      "mass": 6
    }
  ]
    constructor(gridWidth, gridHeight) {
      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.grid = new Array(gridWidth * gridHeight).fill(null);
      this.renderMain();
    }
  
    moveBlock(block) {
    }

    get_direction() {

    }

    cancel() {
      Object.entries(this.map).forEach(([key, value]) => value.unselect());
      $('.energy').html(0);
      this.path = [];
    }

    clear_path() {
      Object.entries(this.map).forEach(([key, value]) => {
        if (value.cell.hasClass("highlighted")) {
          value.unselect();
        }
      });
    }

    get_direction(x, y) {
      if (x >= 1) {
        return "right";
      }
      else if (x <= -1) {
        return "left";
      }
      else if (y >= 1) {
        return "down";
      }
      else if (y <= -1) {
        return "up";
      }
    }

    checkMoves(block) {
      const type = this.types[block.attr("data-type")].type;
      const mass = this.types[block.attr("data-type")].mass;
      let moves = [];
      let x = 0;
      let y = 0;
      let force = 0;

      if (this.path.length > 0) {
        x = parseInt(block.attr('data-x') - parseInt(this.path.slice(-1)[0].attr('data-x')));
        y = parseInt(block.attr('data-y') - parseInt(this.path.slice(-1)[0].attr('data-y')));
        force = this.moves[this.get_direction(x,y)];
      }
      console.log(force);
      if (type == "solid") {
        moves = this.movesSolid(mass, [x * force, y * force]);
      }
      else if (type == "liquid") {
        moves = this.movesLiquid(mass, [x * force, y * force]);
      }
      else if (type == "gas") {
        moves = this.moveGas([x * force, y * force]);
      }
      else {
        moves = {
          "up": -1,
          "right": -1,
          "down": -1,
          "left": -1
        }
      }
      console.log(moves);
      let cell = this.map[block.attr('data-id')];
      if (this.path.length > 0) {
        cell.select(moves[this.get_direction(x, y)]);
      }
      else {
        cell.select(mass);
      }
      this.moves = moves;
      this.path.push(block);
      this.availableMoves(moves, cell);
    }

    availableMoves(moves, cell) {
      let x = cell.x;
      let y = cell.y;
      const near = {
        "up": (y > 0)?this.map['' + x + '' + (y-1)]:null,
        "right": (x < this.gridWidth - 1)?this.map['' + (x+1) + '' + y]:null,
        "down": (y < this.gridHeight - 1)?this.map['' + x + '' + (y+1)]:null,
        "left": (x > 0)?this.map['' + (x-1) + '' + y]:null
      }
      for (const key in moves) {
        if (near[key] != null) {
          if ((moves[key] >= this.types[near[key].type].mass) && (moves[key] != -1)) {
            near[key].highlight();
          }
        }
        
      }
    }

    render() {
      return this.table;
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    renderMain() {
      this.table = $('<table class="main"></table>');
      for (let j = 0; j < this.gridHeight; j++) {
        const row = $('<tr></tr>');
        for (let i = 0; i < this.gridWidth; i++) {
          var type = this.getRandomInt(4);
          var cell = new Block(i, j, this.types[type]);
          this.map['' + i + j] = cell;
          row.append(cell.render());
        }
        // Добавляем строку в таблицу
        this.table.append(row);
      }
    }

    movesLiquid(mass, force) {
      let vector = {
        "up": -1,
        "right": -1,
        "down": -1,
        "left": -1
      }
      if (force[0] > 0) {
        vector["right"] = force[0]/2 + mass/2;
        vector["up"] = force[0]/2 - mass;
        vector["down"] = force[0] + mass;
      }
      else if (force[0] < 0) {
        vector["left"] = -force[0]/2 + mass/2;
        vector["up"] = -force[0]/2 - mass;
        vector["down"] = -force[0] + mass;
      }
      else if (force[1] < 0) {
        vector["left"] = -force[1]/2 + mass/2;
        vector["right"] = -force[1]/2 + mass/2;
        vector["up"] = -force[1] - mass;
      }
      else {
        vector["left"] = force[1]/2 + mass/2;
        vector["right"] = force[1]/2 + mass/2;
        vector["down"] = force[1] + mass;
      }
      return vector;
    }

    movesSolid(mass, force) {
      let vector = {
        "up": -1,
        "right": -1,
        "down": -1,
        "left": -1
      }

      let y = force[1];
      let x = force[0];
      if (x > 0) {
        vector['right'] = x;
        vector['down'] = mass;
      }
      else if (x < 0) {
        vector['left'] = -x;
        vector['down'] = mass;
      }
      else if (y < 0) {
        vector['up'] = -y - mass;
      }
      else {
        vector['down'] = y + mass;
      }
      return vector;
    }

    moveGas(force) {
      let vector = {
        "up": Math.abs(force[1]/3) + Math.abs(force[0]/3),
        "right": Math.abs(force[1]/3) + Math.abs(force[0]/3),
        "down": Math.abs(force[1]/3) + Math.abs(force[0]/3),
        "left": Math.abs(force[1]/3) + Math.abs(force[0]/3)
      }
      return vector;
    }
  }