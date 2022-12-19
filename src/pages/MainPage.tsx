import commonStyles from "../styles/common.module.scss";
import styles from "../styles/main.module.scss";
import React, { useState, ChangeEvent, useEffect } from "react";
import { goOtherUrlPath } from "../utils/common";
import { useRecoilState } from "recoil";
import { quizSelectValuesState, quizCategoryState } from "../utils/atoms";


const MainPage = () => {
    const [category, setCategory] = useState("random");
    const [quizSelectValues, setQuizSelectValues] = useRecoilState(quizSelectValuesState);
    const [quizCategory, setQuizCategory] = useRecoilState(quizCategoryState);


    const handleSelect = (event: ChangeEvent) => {
        const target = event.target as HTMLSelectElement;
        setCategory(target.value as "random" | "sports" | "animals");
        setQuizCategory(target.value as "random" | "sports" | "animals");
    };

    const handleStart = () => goOtherUrlPath(`/quiz`);

    useEffect(() => {
        setQuizSelectValues([""]);
    }, []);


    return (
        <div className={styles["container"]}>
            <div className={styles["category-box"]}>
                <h3 className={styles["category-box__head"]}>퀴즈 카테고리 선택</h3>
                <select className={styles["select"]} onChange={handleSelect} defaultValue="random">
                    <option value="random">random</option>
                    <option value="sports">sports</option>
                    <option value="animals">animals</option>
                </select>
            </div>
            <button type="button" className={commonStyles["active-btn"]} onClick={handleStart}>퀴즈 풀기</button>
        </div>
    )
};

export default MainPage;