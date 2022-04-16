class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/mixkit-retro-game-notification-212.wav');
      this.load.audio('sfx_explosion', './assets/amogusplosion.wav');
      this.load.audio('sfx_rocket', './assets/mixkit-fast-small-sweep-transition-166.wav');
    } 
    create() {
      //this.add.text(20, 20, "Rocket Patrol Menu");
      //this.scene.start("playScene");
      let menuConfig = {
        fontFamily: 'Comic Sans MS',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }

      this.add.text(game.config.width/2, game.config.height/2 -borderUISize - borderPadding, 'IMPOSTER PATROL', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }



    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }

  }