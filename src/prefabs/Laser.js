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

    }
}