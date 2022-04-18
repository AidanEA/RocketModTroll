//Laser prefab
class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        console.log("constructor laser.js");
        scene.add.existing(this);
    }
    preload() {
        // load images/tile sprites
        this.load.spritesheet('laser', './assets/blast.png', {frameWidth: 16, frameHeight: 480, startFrame: 0, endFrame: 16})
      }
    update(){
        // if(Phaser.Input.Keyboard.JustDown(keyC)){
        //     console.log("Laser should be working");
        //     this.p1Laser.alpha = 1;
        //     let beam = this.add.sprite(ship.x, ship.y, 'laser');
        //     beam.anims.play('laser');
        // }

    }
}