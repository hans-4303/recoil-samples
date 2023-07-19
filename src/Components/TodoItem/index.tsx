import { ChangeEvent } from "react";
/* recoil state 다루는 hook */
import { useRecoilState } from "recoil";
/* 생성한 atom */
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";
import { todoItem } from "../../Types/todoItem.type";

/* 각각의 TodoItem 컴포넌트
파라미터로 item을 가짐, 구조 분해 해서 다루기 */
function TodoItem({ item }: { item: todoItem }) {
  /* useRecoilState hook 호출하고 인수로 다루고자 하는 atom 지정
  recoil 초기 state와 setter/updater 함수 반환받음 */
  const [todoList, setTodoList] = useRecoilState(todoListState);
  /* findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다.
  만족하는 요소가 없으면 -1을 반환합니다.

  todoList의 index 찾고 반환하여 다룸
  
  listItem === item으로 일치하는 첫 번째 요소의 인덱스가 반환됨 */
  const index = todoList.findIndex((listItem) => listItem === item);

  /* ItemText 편집 메서드
  파라미터는 이벤트 -> 타겟 -> 값 순으로 구조 분해됨 */
  const editItemText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    /* 인덱스에 아이템 재배치 함수로 연결, 새로운 리스트 반환 */
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 항목 완료 전환 메서드 */
  const toggleItemCompletion = () => {
    /* 인덱스에 아이템 재배치 함수로 연결, 새로운 리스트 반환 */
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 항목 삭제 메서드 */
  const deleteItem = () => {
    /* 인덱스로 아이템 삭제 함수 연결, 새로운 리스트 반환 */
    const newList = removeItemAtIndex(todoList, index);

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 반환되는 컴포넌트 */
  return (
    <div>
      {/* 입력 값은 item.text, onChange 이벤트와 editItemText 메서드 연결 */}
      <input type="text" value={item.text} onChange={editItemText} />
      {/* item.isComplete가 체크 값, onChange 이벤트와 toggleItemCompletion 메서드 연결 */}
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      {/* onClick 이벤트와 deleteItem 메서드 연결 */}
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default TodoItem;

/* 인덱스에 아이템 재배치 함수
파라미터로 배열, 인덱스, 새 값을 가짐 */
function replaceItemAtIndex(
  arr: todoItem[],
  index: number,
  newValue: todoItem
) {
  /* 배열을 반환
  배열 불변성을 위해 스프레드 연산자 사용한 것으로 이해됨 */

  /* 불변성
  데이터 불변성
  기존 값 그대로 유지하면서 새로운 값을 추가하는 것, 객체가 생성된 이후 상태를 변경할 수 없는 디자인 패턴 의미
  
  원시 데이터
  종류: string, number, boolean, undefined, null
  데이터가 불변함
  데이터 생김새가 똑같으면 똑같은 메모리 주소를 바라보고 있고, 이를 같은 데이터라 해도 무방함

  let str = "Hello";
  let num = 42;
  let bool = true;

  function modifyData(str, num, bool) {
    str = str + " World"; // 문자열 연결
    num = num * 2; // 숫자 연산
    bool = !bool; // 부정 연산

    console.log(str); // "Hello World"
    console.log(num); // 84
    console.log(bool); // false
  }

  console.log(str); // "Hello"
  console.log(num); // 42
  console.log(bool); // true

  modifyData(str, num, bool);

  console.log(str); // "Hello"
  console.log(num); // 42
  console.log(bool); // true

  
  참조형 데이터
  종류: object, array, function
  데이터가 불변하지 않음 -> 변수 선언할 때마다 새로운 메모리 주소에 각 참조형 데이터들이 할당됨
  데이터의 생김새가 같아도 서로 같은 데이터 아닐 수 있음
  할당 연산자 (a = b)를 사용했고 같은 메모리를 바라보고 있는 여러 개 변수들이 있을 때
  한쪽 변수(a) 속성 값을 수정했을 경우 다른 변수(b) 속성 값도 바뀌는 경우 있음
  불변성을 지키지 못함
  
  이 문제를 해결하기 위해 복사(얕은 복사)를 이용하여 불변성을 지켜줌
  
  a. 불변성 지키지 못하는 케이스
  
  let arr1 = [1, 2, 3];
  let arr2 = arr1; // arr1과 같은 배열을 가리키는 새로운 변수 arr2를 선언

  console.log(arr1); // [1, 2, 3]
  console.log(arr2); // [1, 2, 3]

  arr1.push(4); // arr1 배열에 요소 추가

  console.log(arr1); // [1, 2, 3, 4]
  console.log(arr2); // [1, 2, 3, 4]

  b. 불변성 지키는 케이스
  
  let arr1 = [1, 2, 3];
  let arr2 = [...arr1];

  console.log(arr1); // [1, 2, 3]
  console.log(arr2); // [1, 2, 3]

  arr1.push(4); // arr1 배열에 요소 추가

  console.log(arr1); // [1, 2, 3, 4]
  console.log(arr2); // [1, 2, 3]
  
  개념 출처: https://goddino.tistory.com/200
  예제 코드: chat gpt */

  /* ...arr.slice(0, index)
  arr을 스프레드 하여 원본은 유지하고 얕은 복사
  이후 슬라이스 하여 0번째 요소부터 index 미만 요소를 반환

  newValue
  인수로 입력된 객체, { ...item, text | isComplete }
  
  ...arr.slice(index + 1)
  index + 1 위치에서 배열 끝까지 모든 요소를 포함하는 부분 배열 반환 */

  /* 파라미터 적용

  todoList 배열
  index === 2
  newValue === { ...item, text | isComplete } 이 들어왔다 할 때

  1. 반환되는 건 하나의 배열임
  2. ...arr.slice(0, index) == ...todoList.slice(0, 2)와 같음
  todoList를 스프레드 하고, 0번째 요소부터 1번 요소까지 slice
  3. newValue 객체를 위치시킴
  4. ...arr.slice(index + 1) == ...todoList.slice(2 + 1)과 같음
  todoList를 스프레드하고, 2 + 1 === 3번째 요소를 반환하는 문법

  (그런데 잘 이해되지는 않음, 해당 index를 넘겨버리면?)
  
  let arr = [1, 2, 3, 4, 5]; // 배열 선언 및 초기화
  undefined
  console.log([...arr.slice(5)]); // 배열 최대 인덱스는 4, + 1 해봤을 때
  VM196:1 [] // 빈 배열 리턴
  
  빈 배열 하나가 리턴됨 */
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

/* 인덱스 기준 아이템 제거 함수
파라미터로 배열, 인덱스를 가짐 */
function removeItemAtIndex(arr: todoItem[], index: number) {
  /* 대부분 원리는 위와 같음
  slice 메서드는 첫 번째 인수 이상, 두 번째 인수 미만으로 작동하기 때문에 index는 빠짐 */
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
