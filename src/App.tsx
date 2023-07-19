import "./App.css";
/* 리코일 값 사용 Hook */
import { useRecoilValue } from "recoil";
/* 작성한 Recoil atom */
import { todoListState } from "./Recoil/Atoms/todoListState.atom";
import TodoItem from "./Components/TodoItem";
import TodoListStats from "./Components/TodoListStats";
import TodoListFilters from "./Components/TodoListFilters";
import TodoItemCreator from "./Components/TodoItemCreator";
import { filteredTodoListState } from "./Recoil/Selectors/filteredTodoListState.selector";

function App() {
  /* useRecoilValue
  원자 또는 선택기(읽기 전용 또는 쓰기 가능)의 값을 반환하고
  구성 요소를 해당 상태의 향후 업데이트에 구독합니다. */

  /* before, 필터 없이 모든 todoList를 호출함
  const todoList = useRecoilValue(todoListState); */

  /* after, 필터된 TodoList를 호출함 */
  const todoList = useRecoilValue(filteredTodoListState);

  /* 반환되는 컴포넌트 */
  return (
    <div className="App">
      {/* TodoItemCreator 컴포넌트 호출 */}
      <TodoListStats />
      {/* TodoItemCreator 컴포넌트 호출 */}
      <TodoListFilters />
      {/* TodoItemCreator 컴포넌트 호출, 작성과 업데이트 가능 */}
      <TodoItemCreator />

      {/* todoList 배열 순회하면서 TodoItem 컴포넌트 호출,
      별도의 조건부 렌더링 없어도 됐는데 */}
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
}

export default App;
