/* recoil 패키지에서 atom 가져오기 */

import { atom } from "recoil";
import { todoItem } from "../../Types/todoItem.type";

/* todoListState atom을 생성하고 export */
export const todoListState = atom<todoItem[]>({
  /* 키 */
  key: "todoListState",
  /* 기본 값 */
  default: [],
});
