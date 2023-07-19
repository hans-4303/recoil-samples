import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../../Recoil/Selectors/todoListStatsState.selector";

const TodoListStats = () => {
  /* useRecoilValue로 atom 호출 -> 객체 반환 -> 구조 분해 */
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  /* 완료 값 %로 변환 */
  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      {/* 반환 및 구조 분해된 값들 사용 */}
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
};

export default TodoListStats;
