import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { quizSelectValuesState, quizApiResState, endTimeState, startTimeState } from "../utils/atoms";
import { IQuiz } from "../utils/apiHandlers";
import { PieChart } from 'react-minimal-pie-chart';
import { formatChartValueToPercent, goOtherUrlPath } from "../utils/common";
import Timer from "../components/Timer";
import SEO from "../components/SEO";
import styles from "../styles/result.module.scss";
import commonStyles from "../styles/common.module.scss";

const ResultPage = () => {
    const [quizData, setQuizData] = useRecoilState(quizApiResState);
    const [quizSelectValues, setQuizSelectValues] = useRecoilState(quizSelectValuesState);
    const [incorrectAnswers, setIncorrectAnswers] = useState<IQuiz[]>([]);
    const [totalIncorrectAnswers, setTotalIncorrectAnswers] = useState<IQuiz[]>([]);
    const [correctLength, setCorrectLength] = useState<number>(0);
    const [endTime, setEndTime] = useRecoilState(endTimeState);
    const [startTime, setStartTime] = useRecoilState(startTimeState);

    useEffect(() => {
        console.log("quizData => ", quizData);
        console.log("quizSelectValues => ", quizSelectValues);

        const copiedQuizData = JSON.parse(JSON.stringify(quizData)) as IQuiz[];

        quizData.map((item, indexIndex) => {
            copiedQuizData[indexIndex]["answer"] = quizSelectValues[indexIndex] === item["correct_answer"] ? true : false;
            copiedQuizData[indexIndex]["time_recode"] = endTime - startTime;
        })

        setQuizData(copiedQuizData);
        const incorrectList = copiedQuizData.filter(item => !item["answer"]);
        setIncorrectAnswers(incorrectList);

        // update 
        const updateIncorrectAnswers = localStorage.incorrectAnswersList ? JSON.parse(localStorage.incorrectAnswersList).concat(incorrectList) : incorrectList;

        // update localStorage
        window.localStorage.incorrectAnswersList = JSON.stringify(updateIncorrectAnswers);

        // update state
        setTotalIncorrectAnswers(updateIncorrectAnswers);

    }, []);

    useEffect(() => {
        setCorrectLength(quizData.length - incorrectAnswers.length);
    }, [incorrectAnswers]);

    const choiceList = (strs: string[]) => {
        const List = strs.map(item => <li key={item} className={styles["keyword"]}>{item}</li>);
        return (
            <ul key={0} className={styles["choice-keyword-box"]}>
                {List}
            </ul>
        )
    }

    const defaultLabelStyle = {
        fontSize: "6px",
        fontFamily: "sans-serif",
    }

    const handleGoMain = () => {
        // reset
        setQuizSelectValues([""]);
        goOtherUrlPath("/");
    };

    return (

        quizData.length === 0 ?
            <div className={styles["container"]}>
                <p className={styles["content-error-msg"]}>???????????????.<br />???????????? ????????? ????????????. ???????????? ???????????? ?????? ??????????????????~!</p>
                <button type="button" className={commonStyles["active-btn"]} onClick={handleGoMain}>?????? ???????????? ??????</button>
            </div> :
            <div className={styles["container"]}>
                <SEO
                    title="Quiz Result"
                    description="?????? ????????? ???????????????. ??????????????? ????????????."
                />
                <section className={styles["container__contents"]}>
                    <section className={styles["result-top-info"]}>
                        <h2 className={styles["container__head"]}>?????? ??????</h2>

                        <ul>
                            <li>??? ????????? ?????? : <Timer className={styles["total-time"]} ms={endTime - startTime} /></li>
                            <li>?????? ?????? : {correctLength}</li>
                            <li>?????? ?????? : {incorrectAnswers.length}</li>
                            <li>
                                <PieChart
                                    data={[
                                        { title: '??????', value: (correctLength), color: '#10d210' },
                                        { title: '??????', value: incorrectAnswers.length, color: 'red' }
                                    ]}
                                    radius={40}
                                    segmentsShift={1}
                                    label={({ dataEntry }) => dataEntry.value !== 0 ? `${dataEntry.title} ${formatChartValueToPercent(dataEntry.value, quizData.length)}` : ""}
                                    labelStyle={{ ...defaultLabelStyle }}
                                    startAngle={90}
                                />
                            </li>
                        </ul>
                        <button type="button" className={commonStyles["active-btn"]} onClick={handleGoMain}>?????? ?????? ??????</button>
                    </section>
                    {
                        quizData.length === correctLength ?
                            <p>????????? ????????????.</p> :
                            <section className={styles["incorrect-answers-box"]}>
                                <h3 className={styles["incorrect-answers-box__head"]}>?????? ??????</h3>
                                <section>
                                    {
                                        totalIncorrectAnswers ?
                                            totalIncorrectAnswers.map((item, index) => {
                                                return !item["answer"] ?
                                                    (
                                                        <ul key={index} className={styles["info-list"]}>
                                                            <li><em>????????????</em>{item.category}</li>
                                                            <li><em>?????????</em>{item.difficulty}</li>
                                                            <li><em>??????</em>{item.question}</li>
                                                            <li><em>?????????</em>{choiceList(item.choice_list)}</li>
                                                            <li><em>??????</em><span className={styles["keyword"]}>{item.correct_answer}</span></li>
                                                            <li><em>?????? ????????? ??????</em><span className={styles["keyword"]}>{item.user_answer}</span></li>
                                                        </ul>
                                                    ) : <></>
                                            })
                                            : <></>
                                    }
                                </section>
                            </section>
                    }

                </section>
            </div>




    )
};

export default ResultPage;