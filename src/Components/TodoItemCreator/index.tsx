import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";
import { getId } from "../../Utils/getId";

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
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

  return <div></div>;
};

export default TodoItemCreator;
