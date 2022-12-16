import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
    MainPage,
    QuizPage,
    ResultPage,
} from '../pages';

export const Root = () => {
    return (
        <BrowserRouter basename="/quiz-webapp">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>

        </BrowserRouter>
    )
};