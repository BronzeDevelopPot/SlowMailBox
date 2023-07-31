import { useState, useEffect } from "react";
import axios from "axios";
import ModalPage from "./ModalPage/ModalPage";
import styles from "../../Styles/_letterPage.module.scss";

const LetterPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  /* Test Code */
  const getLetter = async () => {
    try {
      const response = await axios.get("/api/user");
      const userName = response.data.name;
  
      const letterResponse = await axios.get(`/api/letter/${userName}`);
      const letterData = letterResponse.data.letter;

      return letterData;
    } catch (error) {
      console.error(`${error}`);
    }
  };
  
  useEffect(() => {
    const mailbox = async () => {
      try {
        const letterData = await getLetter();
        console.log("우체통:", letterData);
      } catch (e) {
        console.error("우체통 오류:", e);
      }
    };
    mailbox();
  }, []);

  return (
    <div className={styles.letter_page}>
      <div> {modal && <ModalPage inputText={inputText} />} </div>
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
