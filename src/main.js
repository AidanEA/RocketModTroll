// reserve keyboard vars
//Aidan Adams
//Rocket Patrol Mod
// 4/18/22
//~7 hours?

//POINT BREAKDOWN
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//Create and implement a new weapon (w/ new behavior and graphics) (20)
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)

//I recieved assistance from Jawad in getting my Laser weapon functionality working
let keyF, keyR, keyLEFT, keyRIGHT;
let keyC;
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;