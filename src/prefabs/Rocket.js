// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, laser) {
      super(scene, x, y, texture, frame);
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      //this.load.spritesheet('laser', './assets/blast.png', {frameWidth: 16, frameHeight: 480, startFrame: 0, endFrame: 16});
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = 1;
      this.laser = laser;
    }

    update() {
      
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
          this.x -= this.moveSpeed;
        }            
        else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
          this.x += this.moveSpeed;
        }
        
    
    if(Phaser.Input.Keyboard.JustDown(keyF)){
      //console.log("Laser should be working");
      this.sfxRocket.play();  // play sfx
      this.laser.x = this.x - 6;
      this.laser.y = this.y - 440;
      this.laser.setVisible(true);
      this.laser.anims.play('laser');
      this.anims.play('shoot');
    }


    if(this.y <= borderUISize * 3 + borderPadding){
      this.reset();
    }
  }

}