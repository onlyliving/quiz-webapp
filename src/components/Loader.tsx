import styles from "../styles/common.module.scss";

interface Props {
    isShow: boolean;
}

const Loader = ({
    isShow
}: Props) => {
    return (
        isShow ?
            <div className={styles["loader-default"]}></div>
            : <></>
    )
};

export default Loader;