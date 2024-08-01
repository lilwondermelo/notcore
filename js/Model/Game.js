import Block from './Block.js';

export default class Game {
  map = {};
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

    cancel() {
      Object.entries(this.map).forEach(([key, value]) => value.unselect());
    }

    clear_path() {
      Object.entries(this.map).forEach(([key, value]) => {
        

        if (value.cell.hasClass("highlighted")) {
          value.unselect();
        }
      });
    }

    checkMoves(block) {
      const type = this.types[$(block).attr("data-type")].type;
      const mass = this.types[$(block).attr("data-type")].mass;
      let moves = [];
      if (type == "solid") {
        moves = this.movesSolid(mass, [0, 0]);
      }
      else if (type == "liquid") {
        moves = this.movesLiquid(mass, [0, 0]);
      }
      else if (type == "gas") {
        moves = {
          "up": 0,
          "right": 0,
          "down": 0,
          "left": 0
        }
      }
      else {
        moves = {
          "up": -1,
          "right": -1,
          "down": -1,
          "left": -1
        }
      }
      let cell = this.map[$(block).attr('data-id')];
      cell.select();
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
        vector["right"] = force[0] + mass/2;
        vector["up"] = force[0]/2 - mass;
        vector["down"] = force[0]/2 + mass;
      }
      else if (force[0] < 0) {
        vector["left"] = force[0] + mass/2;
        vector["up"] = force[0]/2 - mass;
        vector["down"] = force[0]/2 + mass;
      }
      else if (force[1] < 0) {
        vector["left"] = force[1]/2 + mass/2;
        vector["right"] = force[1]/2 + mass/2;
        vector["up"] = force[1] - mass;
      }
      else {
        vector["left"] = force[1]/2 + mass/2
        vector["right"] = force[1]/2 + mass/2
        vector["down"] = force[1] + mass
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

      let y = force[1] + mass;
      let x = force[0];
      if (x > 0) {
        vector['right'] = x;
      }
      else if (x < 0) {
        vector['left'] = x;
      }
      else if (y < 0) {
        vector['up'] = y;
      }
      else {
        vector['down'] = y;
      }
      return vector;
    }

    moveGas(force) {
      let vector = {
        "up": force[1]/3 + force[0]/3,
        "right": force[1]/3 + force[0]/3,
        "down": force[1]/3 + force[0]/3,
        "left": force[1]/3 + force[0]/3
      }
      return vector;
    }
  }