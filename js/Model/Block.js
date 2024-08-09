export default class Block {
    constructor(x, y, element) {
      this.x = x;
      this.y = y;
      this.type = element.id;
      this.name = element.name;
      this.mass = element.mass;
      this.id = '' + x + '' + y;
      this.cell = $('<td class="block" data-id="' + x + '' + y + '" data-x="' + x + '" data-y="' + y + '"  data-type="' + this.type + '"><img src="./media/elements/' + this.name + '.svg"></td>');
    }
    render() {
      return this.cell;
    }
    select(energy) {
      this.cell.removeClass('highlighted');
      this.cell.addClass('selected');
      $('.energy').html(energy);
    }
    highlight() {
      if (!this.cell.hasClass("selected")) {
        this.cell.addClass('highlighted');
      }
      
    }
    unselect() {
      this.cell.removeClass('selected');
      this.cell.removeClass('highlighted');
      
    }
    
  }