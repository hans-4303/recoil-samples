/* 리스트 필터를 위한 atom 작성 */
import { atom } from "recoil";

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
