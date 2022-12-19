import axios from "axios";

export interface IQuiz {
    "category": string,
    "type": "multiple",
    "difficulty": "easy" | "medium" | "hard",
    "question": string,
    "correct_answer": string,
    "incorrect_answers": string[],
    "user_answer": string,
    "choice_list": string[],
    "answer": boolean,
    "date": string,
    "time_recode": number
};

export interface IQuizReturnProps {
    "response_code": number,
    "results": IQuiz[]
}

export const getQuiz = async (category: string): Promise<IQuizReturnProps> => {
    
    /**
     * type은 고정값
     * 카테고리, 난이도, 문제수는 변경 가능
     * 
     * 카테고리 : string
     * 난이도 : easy | medium | hard
     * 문제수 : number
     */

    const CATEGORY_NAMING: {[str: string]: number} = {
        "sports": 21,
        "animals": 27
    };
    
    const res = await axios({
        url: (category && category !== "random") ? `?category=${CATEGORY_NAMING[category]}&amount=4&type=multiple` : "?amount=4&type=multiple",
        baseURL: "https://opentdb.com/api.php",
        method: "get",
        headers: {
            "content-Type": "application/json",
        },
        withCredentials: false,
        maxRedirects: 2,
    });


    return res.data;
}