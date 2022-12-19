import React, { useState, useEffect } from "react";
import { getQuiz, IQuiz } from "../utils/apiHandlers";
import { shuffle, goOtherUrlPath, formatCurrentDateToYYYYMMDD } from "../utils/common";
import { useRecoilState } from "recoil";
import { quizSelectValuesState, quizApiResState, startTimeState, endTimeState, quizCategoryState } from "../utils/atoms";
import styles from "../styles/quiz.module.scss";
import Loader from "../components/Loader";
import SEO from "../components/SEO"

import {
    useQuery,
} from "react-query";


const QuizPage = () => {

    const [quizData, setQuizData] = useRecoilState(quizApiResState);
    const [quizSelectValues, setQuizSelectValues] = useRecoilState(quizSelectValuesState);
    const [step, setStep] = useState<number>(0);
    const [isClick, setIsClick] = useState<boolean>(false);
    const [questions, setQuestions] = useState<string[]>([""]);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>();
    const [startTime, setStartTime] = useRecoilState(startTimeState);
    const [endTime, setEndTime] = useRecoilState(endTimeState);
    const [quizCategory, setCategory] = useRecoilState(quizCategoryState);

    useEffect(() => {
        setStartTime(performance.now());
    }, []);

    useEffect(() => {
        if (quizData.length !== 0) {
            setQuestions(quizData[step]["choice_list"]);
        }

    }, [quizData, step]);

    const { isLoading } = useQuery(["quizData", quizCategory], () => getQuiz(quizCategory), {
        onSuccess: res => {
            let copyResult = [...res.results];

            for (let i = 0; i < res.results.length; i++) {
                let words = [...res.results[i]["incorrect_answers"]];
                words.push(res.results[i]["correct_answer"]);
                words = shuffle(words);
                copyResult[i]["choice_list"] = words;
                copyResult[i]["answer"] = false;
                copyResult[i]["user_answer"] = "";
                copyResult[i]["date"] = formatCurrentDateToYYYYMMDD();
                copyResult[i]["time_recode"] = 0;
            }

            setQuizData(copyResult);
        },
        onError: e => {
            console.error(e);
        },
        refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
        retry: 1, // 실패시 재호출 몇번 할지
    });

    if (isLoading) {
        return <Loader isShow={true} />
    }

    const handleNextBtn = () => {
        setStep(step + 1);

        console.log(quizSelectValues);
        console.log("step + 1 => ", step + 1);

        // initial
        if (!quizSelectValues[step + 1]) {
            setIsClick(false);
        }
    };

    const handlePrevBtn = () => {
        setStep(step - 1);
    };

    const changeInput = (event: React.ChangeEvent) => {
        console.log("changeInput");
        setIsClick(true);

        let copy = [...quizSelectValues];
        const getValue = event.currentTarget.getAttribute("value") as string;
        copy[step] = getValue;
        setQuizSelectValues(copy);


        console.log(">>> quizSelectValues => ", quizSelectValues);
        console.log(">>> quizData => ", quizData);

        (quizSelectValues.length >= (quizData.length - 1)) && (quizSelectValues.every(item => item !== "")) ? setIsSubmit(true) : setIsSubmit(false);

        const copiedQuizData = JSON.parse(JSON.stringify(quizData)) as IQuiz[];
        copiedQuizData[step]["user_answer"] = getValue;

        setQuizData(copiedQuizData);
        setIsCorrect(getValue === quizData[step]["correct_answer"]);

    };

    const handleSubmit = () => {
        setEndTime(performance.now());
        goOtherUrlPath("/result");
    };

    const quizTitleText = quizData[step] ? quizData[step].question.replaceAll("&quot;", `"`).replaceAll("&#039;", `'`) : "";

    return (
        quizData[step] ?
            <div className={styles["container"]}>
                <SEO
                    title="Quiz Questions"
                    description="4지선다형 퀴즈를 진행합니다."
                />
                <div className={styles["contents"]}>
                    <div>카테고리 : {quizData[step].category}</div>
                    <div>문제 난이도 : {quizData[step].difficulty}</div>
                    <div>{quizTitleText}</div>
                    <ul className={styles["checkbox-box"]}>
                        {
                            questions ?
                                questions.map((item, index) => {
                                    const isChecked = ((quizSelectValues[step] !== "") && (quizSelectValues[step] === item)) ? true : false;
                                    return (
                                        <li key={index}>
                                            <input type="radio" id={`checkbox${index}`} className={isChecked && isCorrect ? `${styles["checkbox-box__input"]} ${styles["is-correct"]}` : isChecked && !isCorrect ? `${styles["checkbox-box__input"]} ${styles["is-incorrect"]}` : `${styles["checkbox-box__input"]}`} onChange={changeInput} name={quizData[step].category} value={item} checked={isChecked} />
                                            <label htmlFor={`checkbox${index}`} className={styles["checkbox-box__label"]}>{item}</label>
                                        </li>
                                    )
                                })
                                : <></>
                        }
                    </ul>
                    {
                        isCorrect && isClick ?
                            <p className={`${styles["result-msg"]} ${styles["result-msg--correct"]}`}>정답입니다.</p>
                            : !isCorrect && isClick ?
                                <p className={`${styles["result-msg"]} ${styles["result-msg--incorrect"]}`}>틀렸습니다.</p>
                                : <></>
                    }

                    <div>
                        <button type="button" className={`${styles["btn"]} ${styles["btn--prev"]}`} onClick={handlePrevBtn} disabled={step !== 0 ? false : true}>이전</button>
                        <button type="button" className={`${styles["btn"]} ${styles["btn--next"]}`} onClick={handleNextBtn} disabled={step !== (quizData.length - 1) && isClick ? false : true}>다음</button>
                        <button type="button" className={`${styles["btn"]} ${styles["btn--submit"]}`} disabled={!isSubmit} onClick={handleSubmit}>제출</button>
                    </div>
                </div>



            </div> : <></>
    )
};

export default QuizPage;