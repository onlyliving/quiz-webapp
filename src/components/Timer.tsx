interface Props {
    ms: number;
    className?: string;
}
const Timer = ({ ms, className }: Props) => {
    // milliseconds
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0"); // 분
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0"); // 초

    return (
        <div className={className}>
            {`${minutes === "00" ? "" : minutes + "분"}`} {seconds}초
        </div>
    );
};

export default Timer;