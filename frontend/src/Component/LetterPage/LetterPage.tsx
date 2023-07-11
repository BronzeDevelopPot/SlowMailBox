import styles from "../../Styles/_letterPage.module.scss"

const LetterPage = () => {
    return (
        <div className={styles.letter_page}>
            <div className={styles.letter_image}>
                <textarea className={styles.textarea_style}></textarea>
            </div>
            <button className={styles.send_button}>전송</button>
        </div>
    );
}

export default LetterPage;