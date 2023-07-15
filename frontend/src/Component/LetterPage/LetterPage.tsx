import { useState } from "react";
import ModalPage from "./ModalPage/ModalPage";
import styles from "../../Styles/_letterPage.module.scss";

const LetterPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.letter_page}>
      <div> {modal && <ModalPage inputText={inputText}/>} </div>
      <div className={styles.letter_image}>
        <textarea
          className={styles.textarea_style}
          onChange={onChange}
          value={inputText}
          maxLength={300}
        ></textarea>
      </div>
      <button className={styles.send_button} onClick={() => setModal(true)}>
        전송
      </button>
    </div>
  );
};

export default LetterPage;