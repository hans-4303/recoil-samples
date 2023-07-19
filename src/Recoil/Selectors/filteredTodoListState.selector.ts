/* selector 불러오기 */
import { selector } from "recoil";
/* atom 불러오기 */
import { todoListFilterState } from "../Atoms/todoListFilterState.atom";
import { todoListState } from "../Atoms/todoListState.atom";

/* 파생 상태를 나타내는 선택기를 만듭니다. */
export const filteredTodoListState = selector({
  /* 키 작성 */
  key: "filteredTodoListState",
  /* get 동작 작성 가능
  파라미터에서 분해한 get은 특정 atom을 가져오는 getter */
  get: ({ get }) => {
    /* 의존성 1

    todoListFilterState를 가져오고 반환 */
    const filter = get(todoListFilterState);

    /* 의존성 2
    
    todoListState를 가져오고 반환 */
    const list = get(todoListState);

    /* filter에 따라 움직임 */
    switch (filter) {
      case "Show Completed":
        /* todoList 배열 순회하면서 필터, item.isComplete가 true인 요소들 반환 */
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        /* todoList 배열 순회하면서 필터, item.isComplete가 false인 요소들 반환 */
        return list.filter((item) => !item.isComplete);
      default:
        /* 만약 아무 상태도 아니거나 'Show all' 이라면 list 그대로 반환 */
        return list;
    }
  },
  /* set 동작 작성 가능
  파라미터에서 분해한 set은 특정 atom을 바꾸는 setter 추정 */
  /* set: ({ set }) => {

  } */
});
