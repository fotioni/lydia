// Click and Drag an object

let bodyparts;
let heldBodypart;
let back;
var cameraImage;
let cnv;
let myFont;
let evdokia;
let evdokiahead;

function preload() {

  myFont = loadFont('images/PFGaramondClassic-OsFReg.ttf');
  evdokiahead = loadImage('images/new/evdokia_head.png');
}

function setup() {

  cnv = createCanvas(windowWidth, windowHeight);

  cameraImage = new Bodypart("images/1942191.png", 1415, 720);
  back = loadImage ("images/background_1.jpg");
  heldBodypart = null;
  bodyparts = [];
  evdokia = loadImage('images/new/evdokia_full_small.png');

  bodyparts.push(new Bodypart("images/new/item_one.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_two.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_three.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_four.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_five.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_six.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_seven.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_eight.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_nine.png", 0, 0));
  bodyparts.push(new Bodypart("images/new/item_ten.png", 0, 0));

}

function draw() {
  background (back);
  image(evdokia, 0, 0);
  
  var bodypartIsHovered = false;
  for (let index = bodyparts.length - 1; index >= 0; index--) {
    if (bodyparts[index].isHovered()) {
      bodypartIsHovered = true;
      break;
    }
  }
  if (cameraImage.isHovered() && heldBodypart === null ) {
    cursor(HAND);
  } else if ((bodypartIsHovered || heldBodypart !== null)) {
    cursor(MOVE);
  } else {
    cursor(ARROW);
  }

  if (heldBodypart !== null ) {
    heldBodypart.move(mouseX - pmouseX, mouseY - pmouseY);
  }

  for (let index = 0; index < bodyparts.length; index++) {
    bodyparts[index].draw();
  }
  cameraImage.draw();
  if (heldBodypart !== null) {
    heldBodypart.draw();
  }


  fill('white');
  textFont(myFont);
  textSize(16);
  text('press space to start over', 1330, 720);
  
  image(evdokiahead, 0, 0);
}

function mousePressed() {
  if (mouseButton === LEFT && cameraImage.isHovered()) {
    saveCanvas("dressmeup", "png");
  } else if (mouseButton === LEFT) {
    for (let index = bodyparts.length - 1; index >= 0; index--) {
      if (bodyparts[index].isHovered()) {
        heldBodypart = bodyparts[index];
        bodyparts.splice(index, 1);
        break;
      }
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT && heldBodypart !== null) {

    bodyparts.push(heldBodypart);
    heldBodypart = null;
  }
}

function keyPressed() {
  if (key === ' ') {
    clear();
    setup();
  } else if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
