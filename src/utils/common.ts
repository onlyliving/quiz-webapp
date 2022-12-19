export const getParameter = (key: string): string => {
    const getParam = new URLSearchParams(window.location.search).get(key);
    return getParam ? getParam : "";
};

export const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

export const formatChartValueToPercent = (targetValue: number, totalValue: number): string => {
    return `${(targetValue/totalValue) * 100}%`;
}

export const goOtherUrlPath = (urlPathName: string) => {
    const URL_BASE_PATH = '/quiz-webapp';

    const title = urlPathName === "/quiz" ? "퀴즈 진행" : urlPathName === "/result" ? "퀴즈 결과" : urlPathName === "/" ? "퀴즈 메인" : "";

    // update url
    window.history.pushState({}, title, `${URL_BASE_PATH}${urlPathName}`);

    // update page
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
};

export const formatCurrentDateToYYYYMMDD = (): string => {
    const date = new Date();
    return `${date.getFullYear()}.${String(Math.floor(date.getMonth())).padStart(2, "0")}.${String(Math.floor(date.getDate())).padStart(2, "0")}`;
}
