import { useState, useEffect } from "react";
import axios from "axios";
import MailModalPage from "./MailModalPage/MailModalPage";
import styles from "../../Styles/_arrivePage.module.scss";

const ArrivePage = () => {
  const [, setMailModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [fromName, setFromName] = useState<string[]>([]);
  const [letterText, setLetterText] = useState<string[]>([]);

  const getLetter = async () => {
    try {
      const response = await axios.get("/api/user");
      const userName = response.data.name;

      const letterResponse = await axios.get(`/api/arrive/${userName}`);
      const letterData = letterResponse.data.letter;
      setFromName(letterData.map((item: { from: string }) => item.from));
      setLetterText(letterData.map((item: { text: string }) => item.text));

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

  const handleEnvelopeClick = (index: number) => {
    setSelectedIndex(index);
    setMailModal(true);
  };

  return (
    <div className={styles.arrive_page}>
      <div className={styles.envelope_container}>
        {fromName.length != 0 && selectedIndex !== null && (
          <MailModalPage
            fromName={fromName[selectedIndex]}
            letterText={letterText[selectedIndex]}
            onHandleModal={() => {
              setSelectedIndex(null);
              setMailModal(false);
            }}
          />
        )}
        {fromName.map((_, index) => (
          <div key={index} className={styles.envelope_img}>
            <img
              src="/src/Assets/envelope_row.png"
              onClick={() => handleEnvelopeClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrivePage;
