//See Towers of Hanoi

class GameView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.$el.on(
      "click",
      this.startGame()
    ).bind(this);
  }

  startGame() {

  }
}
