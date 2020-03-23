const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  //+1을 하는 이유는 random이 0이 나올수있기때문이다.
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  image.addEventListener("loadend", handleImgLoad);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
