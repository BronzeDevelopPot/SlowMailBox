import styles from "../../Styles/_mainPage.module.scss";

const MainPage = () => {
    return (
        <div className={styles.main_page}>
            <span className={styles.title}>OO님의 우체통</span>
            <div className={styles.mail_box}></div>

            <button className={styles.write_button}>편지 남기기</button>
            <button className={styles.share_button}>
                내 우체통 공유하기 (Link 복사)
            </button>
        </div>
    );
};

export default MainPage;