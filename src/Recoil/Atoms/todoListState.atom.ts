/* recoil 패키지에서 atom 가져오기 */

import { atom } from "recoil";

/* todoListState atom을 생성하고 export */
export const todoListState = atom({
  /* 키 */
  key: "todoListState",
  /* 기본 값 */
  default: [],
});
