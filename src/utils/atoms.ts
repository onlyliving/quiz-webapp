import { atom } from "recoil";
import { IQuiz } from "./apiHandlers";

export const quizSelectValuesState = atom<string[]>({
    key: "quizSelectValuesState",
    default: [""]
});

export const quizApiResState = atom<IQuiz[] | []>({
    key: "quizApiResState",
    default: []
});

export const startTimeState = atom<number>({
    key: "startTimeState",
    default: 0
});

export const endTimeState = atom<number>({
    key: "endTimeState",
    default: 0
});

export const quizCategoryState = atom<string>({
    key: "quizCategoryState",
    default: "random"
})