(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const audio = new window.AudioDirector(document.getElementById('sound-toggle'));
    let director;
    const game = new window.DeliveryGame({
      canvas: document.getElementById('game-canvas'),
      jumpButton: document.getElementById('jump-button'),
      collectibleRow: document.getElementById('collectible-row'),
      audio,
      onComplete: () => director.onGameComplete()
    });
    director = new window.SceneDirector({ audio, game });
    window.TitipDoaApp = { audio, game, director };
  });
})();
