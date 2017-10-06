$( () => {
  const rootEl = $('.conway-draw');
  new Draw(rootEl);
});

class Draw {
  constructor($el) {
    this.height = 80;
    this.width = 200;

    this.$el = $el;
    this.setupBoard();
    this.paint();

    this.livePositions = [];

    this.setupBoard = this.setupBoard.bind(this);
    this.paint = this.paint.bind(this);
  }

  setupBoard() {
    let html = '';

    for (let i = 0; i < this.height; i++) {
      html += '<ul>';
      for (let j = 0; j < this.width; j++) {
        html += `<li data-pos="${[i, j]}"></li>`;
      }
      html += '</ul>';
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  paint() {
    this.$el.on('click', e => {
      const coords = e.target.dataset.pos.split(',').map(el => parseInt(el));
      const flatCoord = (coords[0] * this.width) + coords[1];
      const target = this.$li.eq(flatCoord);

      if (target.hasClass('live')) {
        target.removeClass();
        const index = this.livePositions.indexOf([coords[0], coords[1]]);
        this.livePositions.splice(index, 1);
      } else {
        target.addClass(`live ${this.chooseRandomColor()}`);
        this.livePositions.push([coords[0], coords[1]]);
      }

      this.updateTextArea();
    });
  }

  updateTextArea() {
    const area = $('.positions');
    area.empty();
    area.append(this.livePositions.map(position => {
      return `[${position}], \n`;
    }));
  }

  chooseRandomColor() {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];
    const randomNum = Math.floor(Math.random() * 7);
    return colors[randomNum];
  }
}
