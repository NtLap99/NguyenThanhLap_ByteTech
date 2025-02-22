import { atom } from "recoil";

export const counterState = atom<number>({
  key: "counterState", // Unique key for the atom
  default: 0, // Initial value
});
