//시계 제목 선택
const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

//시간 반환
function getTime() {
  const date = new Date();
  const hours = date.getHours(); //시
  const minutes = date.getMinutes(); //분
  const seconds = date.getSeconds(); //초

  //만약 시, 분, 초가 10미만이면 0을 붙여서 출력하고 아니라면
  //기존대로 출력한다.
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

//초기화
function init() {
  //1초마다 getTime 함수를 실행한다.
  setInterval(getTime, 1000);
}

init();
