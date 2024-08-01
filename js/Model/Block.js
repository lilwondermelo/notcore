export default class Block {
    constructor(x, y, element) {
      this.x = x;
      this.y = y;
      this.type = element.id;
      this.name = element.name;
      this.id = '' + x + '' + y;
      this.cell = $('<td class="block" data-id="' + x + '' + y + '" data-type="' + this.type + '"><img src="./media/elements/' + this.name + '.svg"></td>');
    }
    render() {
      return this.cell;
    }
    select() {
      this.cell.removeClass('highlighted');
      this.cell.addClass('selected');
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