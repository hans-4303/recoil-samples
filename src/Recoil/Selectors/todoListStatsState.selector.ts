/* selector 가져오기 */
import { selector } from "recoil";
/* atom 가져오기 */
import { todoListState } from "../Atoms/todoListState.atom";

/* 파생 상태 나타내는 선택기 생성 */
export const todoListStatsState = selector({
  /* 키 작성 */
  key: "todoListStatsState",
  /* get 동작, 파라미터에서 분해한 get은 특정 atom 가져오는 getter */
  get: ({ get }) => {
    /* todoListState를 get으로 가져오고 반환, 의존성 발생 */
    const todoList = get(todoListState);
    /* todoList의 길이 */
    const totalNum = todoList.length;
    /* todoList 요소 중 isComplete가 포함되는 요소들 길이 */
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    /* totalNum - totalCompletedNum 연산하여 미완료된 숫자 계산 */
    const totalUncompletedNum = totalNum - totalCompletedNum;
    /* totalNum이 0이면 0 대입, 0 아닐 때 완료 항목 / 총 항목 계산 */
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    /* 객체로 정보 반환 */
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted
    }
  },
});
