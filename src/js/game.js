(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.physics.startSystem(Phaser.Physics.ARCADE);

      // Background.
      this.background = this.add.sprite(0, 0, 'clouds');

      // Platforms.
      this.platforms = this.add.group();
      this.platforms.enableBody = true;
      var ground = this.platforms.create(0, this.world.height - 40, 'ground');
      ground.body.immovable = true;

      // Create player.
      this.player = this.add.sprite(320, 0, 'player');
      this.player.anchor.setTo(0.5, 0.5);

      // Add physics.
      this.physics.arcade.enable(this.player);
      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;

      // Input.
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
      var x, y, cx, cy;

      if (!this.expired) {
        this.expired = true;
      }

      x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      this.physics.arcade.collide(this.player, this.platforms);
    },

    onDown: function () {
      var thisClick = +(new Date());
      if (thisClick - this.lastClick < 400) {
        return;
      }
      this.player.body.velocity.y = -200;
      this.lastClick = thisClick;
    }

  };

  window['instrument'] = window['instrument'] || {};
  window['instrument'].Game = Game;

}());
