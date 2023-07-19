import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";
import { getId } from "../../Utils/getId.util";

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState(todoListState);

  /* 문제 해결:
  
  '{ id: number; text: string; isComplete: boolean; }[]' 형식은 'never[]' 형식에 할당할 수 없습니다.
  '{ id: number; text: string; isComplete: boolean; }' 형식은 'never' 형식에 할당할 수 없습니다.
  
  왜 생겼는가?
  type을 생성하지 않았고, atom에 적용하지 않았기 때문
  
  해결방법
  타입을 생성하고, atom의 제네릭으로 선언해줘야 한다 */
  const addItem = () => {
    /* before: oldTodoList: never[] -> after: oldTodoList: TodoItem[] */
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <div>
      {/* 입력 값과 state 연결, onChange 이벤트와 함수 연결 */}
      <input type="text" value={inputValue} onChange={onChange} />
      {/* 버튼에 아이템 생성 함수 연결 */}
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
