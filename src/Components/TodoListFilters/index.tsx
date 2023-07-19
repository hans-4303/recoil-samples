import { ChangeEvent } from "react";
/* useRecoilState hook 불러오기 */
import { useRecoilState } from "recoil";
/* atom 불러오기 */
import { todoListFilterState } from "../../Recoil/Atoms/todoListFilterState.atom";

/* 필터 컴포넌트 */
const TodoListFilters = () => {
  /* 훅 구조가 useState ≒ useRecoilState 유사함
  값과 setter 혹은 updater를 반환함 */
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  /* 필터 업데이트 메서드, 파라미터는 이벤트 -> 타겟 -> 값 순으로 구조 분해 */
  const updateFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    /* recoil state를 업데이트 함 */
    setFilter(value);
  };

  /* 반환되는 컴포넌트 */
  return (
    <>
      Filter:
      {/* select 및 option 요소로 구성
      select value는 recoil state, onChange와 필터 업데이트 메서드 연결 */}
      <select value={filter} onChange={updateFilter}>
        {/* todoListFilterState의 값이 될 option value들 */}
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
