const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

//todoList 내용 삭제
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode; //삭제버튼의 부모노드인 li 선택

  toDoList.removeChild(li); //ui 요소에서 li 요소 삭제

  //toDos의 요소들을 function(toDo)에 넣어서 true인지 false인지 판단한다.
  //false이면 제거된다.
  const cleanToDos = toDos.filter(function(toDo) {
    //toDos 각각의 요소들의 id와 삭제하고자 하는 id를 비교한다.
    //같으면 false를 반환한다.
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//localStorage에 toDos 저장
function saveToDos() {
  //console.log("toDos : ", toDos); //> [{text:"hello", id:1}]
  //console.log("JSON.stringify : ", JSON.stringify(toDos)); //> [{"text" : "hello", "id" : 1}]

  //JSON.stringify 메서드는 Javascript 값이나 객체를 문자열로 변환합니다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//todoList 내용을 화면에 출력한다.
function paintToDo(text) {
  //HTML 요소 생성
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);

  //LI요소 자식에 내용과 삭제버튼을 추가한다.
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  //ul요소 자식에 추가한다.
  toDoList.appendChild(li);

  //toDos 리스트에 넣기 위해 toDoObj를 정의한다.
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj); //toDos 리스트에 삽입
  saveToDos(); //toDos를 localStorage에 넣는다.
}

//todOList를 제출하는 함수
function handleSubmit(event) {
  event.preventDefault(); //엔터 제출 방지
  const currentValue = toDoInput.value; //todoList 내용 추출
  paintToDo(currentValue); //입력 내용을 출력한다.
  toDoInput.value = ""; //todoList 입력창 초기화
}

//todoList 출력
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //LocalStorage에서 toDos를 가져와 오브젝트 리스트를 반환함
  if (loadedToDos != null) {
    const parsedToDos = JSON.parse(loadedToDos); //배열로 변환한다.

    //배열의 요소들을 전부 실행한다.
    //배열의 요소들은 something 함수의 매개변수(toDo)로 들어간다.
    //각각의 요소에 paintToDo 함수를 실행한다.
    parsedToDos.forEach(function something(toDo) {
      paintToDo(toDo.text);
    });
  }
}

//초기화
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit); //toDoForm에 이벤트 추가
}

init();
