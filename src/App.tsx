import "./App.css";
/* 리코일 값 사용 Hook */
import { useRecoilValue } from "recoil";
/* 작성한 Recoil atom */
import { todoListState } from "./Recoil/Atoms/todoListState.atom";

function App() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      

      {/* {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))} */}
    </>
  );
}

export default App;
