class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, variant) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.points = pointValue;
      if(variant == false){
        this.moveSpeed = game.settings.spaceshipSpeed;
      }
      else if(variant == true){
        this.moveSpeed = game.settings.spaceshipSpeed + 1;
      }
      
    }

    update(){
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width){
            this.reset();
        } 
    }
    reset(){
        this.x = game.config.width;
    }
}