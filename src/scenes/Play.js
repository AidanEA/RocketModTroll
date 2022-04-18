class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocketstatic', './assets/wizardbeeg2.png');
        this.load.image('spaceship', './assets/enemymagicmissle.png');
        this.load.image('spaceshipspecial', './assets/enemymagicmisslespecial.png');
        this.load.image('starfield', './assets/battleground.png');
        this.load.spritesheet('explosion', './assets/explosion2.png', {frameWidth: 25, frameHeight: 11, startFrame: 0, endFrame: 30});
        this.load.spritesheet('laser', './assets/blast.png', {frameWidth: 16, frameHeight: 480, startFrame: 0, endFrame: 16})
        this.load.spritesheet('rocket', './assets/WizardSheet.png', {frameWidth: 36, frameHeight: 50, startFrame: 0, endFrame: 4})
      }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x71f2ff).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.p1Laser = new Laser(this,-250, 0, 'laser', 0).setOrigin(0, 0);
        this.p1Laser.setVisible(false);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, this.p1Laser).setOrigin(0.5, .75);

          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceshipspecial', 0, 30, true).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, false).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', -20, 10, false).setOrigin(0,0);
        // define keys



        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // animation config
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 30, first: 0}),
          frameRate: 30
        })

        this.anims.create({
          key: 'laser',
          frames: this.anims.generateFrameNumbers('laser', {start: 0, end: 16, first: 0}),
          frameRate: 30
        })

        this.anims.create({
          key: 'shoot',
          frames: this.anims.generateFrameNumbers('rocket', {start: 0, end: 16, first: 0}),
          frameRate: 15
        })
        // initialize score
        this.p1Score = 0;
          // display score
        let scoreConfig = {
          fontFamily: 'Comic Sans MS',
          fontSize: '28px',
          backgroundColor: '#b0b3b4',
          color: ' #636869',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.scene.restart();
        } 

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene");
        } 
        this.starfield.tilePositionX -= 1;
        if (!this.gameOver) {               
          this.p1Rocket.update();         // update rocket sprite
          this.ship01.update();           // update spaceships (x3)
          this.ship02.update();
          this.ship03.update();
          //this.p1Laser.update();
      } 
      if(this.p1Laser.setVisible(true)){
        if(this.checkCollision(this.p1Laser, this.ship03)) {
          //this.p1Rocket.reset();
          this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Laser, this.ship02)) {
          //this.p1Rocket.reset();
          this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Laser, this.ship01)) {
          //this.p1Rocket.reset();
          this.shipExplode(this.ship01);
        }
      }

        // if(this.checkCollision(this.p1Rocket, this.ship03)) {
        //   this.p1Rocket.reset();
        //   this.shipExplode(this.ship03);
        // }
        // if (this.checkCollision(this.p1Rocket, this.ship02)) {
        //   this.p1Rocket.reset();
        //   this.shipExplode(this.ship02);
        // }
        // if (this.checkCollision(this.p1Rocket, this.ship01)) {
        //   this.p1Rocket.reset();
        //   this.shipExplode(this.ship01);
        // }
    }
    /*
    checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
              return true;
      } else {
          return false;
      }
  }
  */

  checkCollision(laser, ship){
    if(laser.x < ship.x + ship.width && laser.x + laser.width > ship.x && laser.y < ship.y + ship.height && laser.height + laser.y > ship.y){
      console.log("Collision works");
      return true;
    }
    else{
      return false;
    }
  }
  shipExplode(ship) {

    //test laser anim
    // this.p1Laser.alpha = 1;
    // let beam = this.add.sprite(ship.x, ship.y, 'laser');
    // beam.anims.play('laser');
    //this.p1Laser.anims.play('laser');


    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
     // this.p1Laser.alpha = 0;
    });   
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;   
    this.sound.play('sfx_explosion'); 
  }

  }
