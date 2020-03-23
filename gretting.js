const form = document.querySelector(".js-form"),
  input = form.querySelector("input"), //이름 입력창
  gretting = document.querySelector(".js-gretting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//이름 저장
function saveName(text) {
  localStorage.setItem(USER_LS, text); //localStorage에 이름 저장
}

//이름 작성 제출
function handleSubmit(event) {
  event.preventDefault(); //입력폼에서 엔터를 누르는 것을 방지
  const currentValue = input.value; //입력폼에서 입력한 값 추출
  paintGretting(currentValue); //이름 출력
  saveName(currentValue); //localStorage에 이름 저장
}

//이름 요청
function askForName() {
  form.classList.add(SHOWING_CN); //이름 입력창을 보여준다.
  form.addEventListener("submit", handleSubmit); //form 입력창에 handleSubmit 이벤트 추가
}

//이름 출력
function paintGretting(text) {
  form.classList.remove(SHOWING_CN); //입력창을 보이지 않게 제거한다.
  gretting.classList.add(SHOWING_CN); //헤더 요소를 보이게 추가한다.
  gretting.innerText = `Hello ${text}`; //가공된 문자열값을 넣어서 보여준다.
}

//이름 출력
function loadName() {
  //localStorage에서 "currentUser"를 키값으로 이름을 가져온다.
  const currentUser = localStorage.getItem(USER_LS);

  //이름을 설정하지 않았으면 입력폼을 제공한다.
  if (currentUser == null) {
    //she is not
    askForName();
  } else {
    //she is
    paintGretting(currentUser);
  }
}

//초기화
function init() {
  loadName();
}

init();
