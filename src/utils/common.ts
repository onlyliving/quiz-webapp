export const getParameter = (key: string): string => {
    const getParam = new URLSearchParams(window.location.search).get(key);
    return getParam ? getParam : "";
};

export const shuffle = (array: string[]) => array.sort(() => Math.random() - 0.5);

export const formatChartValueToPercent = (targetValue: number, totalValue: number): string => {
    return `${(targetValue/totalValue) * 100}%`;
}

export const goOtherUrlPath = (urlPathName: string) => {
    // update url
    window.history.pushState({}, "", urlPathName);

    // update page
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
};

export const formatCurrentDateToYYYYMMDD = (): string => {
    const date = new Date();
    return `${date.getFullYear()}.${String(Math.floor(date.getMonth())).padStart(2, "0")}.${String(Math.floor(date.getDate())).padStart(2, "0")}`;
}
