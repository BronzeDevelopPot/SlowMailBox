import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../Styles/_mainPage.module.scss";

const MainPage = () => {
  const [name, setName] = useState<string>("");
  const [monthDifArray, setMonthDifArray] = useState<number[]>([]);

  const getLetter = async () => {
    try {
      const response = await axios.get("/api/user");
      const userName = response.data.name;
      setName(userName);

      const letterResponse = await axios.get(`/api/letter/${userName}`);
      const letterData = letterResponse.data.letter;
      setMonthDifArray(
        letterData.map((item: { monthDif: number }) => item.monthDif)
      );

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

  const Envelope = (monthDif: number) => {
    for (let i = 0; i < monthDifArray.length; i++) {
      if (monthDifArray[i] == monthDif) {
        return <img src="/src/Assets/envelope_column.png" />;
      }
    }
  };

  return (
    <div className={styles.main_page}>
      <span className={styles.title}>{name}님의 우체통</span>
      <div className={styles.mail_box}>
        <div className={styles.post_box}>
          <div className={styles.envelope_box}>
            {Array.from({ length: 5 }, (_, i) => (
              <div className={styles.envelope_img}>{Envelope(i)}</div>
            ))}
          </div>
          <div className={styles.envelope_box}>
            {Array.from({ length: 5 }, (_, i) => (
              <div className={styles.envelope_img}>{Envelope(i + 5)}</div>
            ))}
          </div>
          <div className={styles.envelope_box}>
            {Array.from({ length: 2 }, (_, i) => (
              <div className={styles.envelope_img}>{Envelope(i + 10)}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.link_container}>
        <Link to="/letter">
          <button className={styles.write_button}>편지 남기기</button>
        </Link>
      </div>
      <button className={styles.share_button}>
        내 우체통 공유하기 (Link 복사)
      </button>
    </div>
  );
};

export default MainPage;
