import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../Styles/_mainPage.module.scss";

const MainPage = () => {
  const [name, setName] = useState<string>("");
  const [monthDifArr, setMonthDifArr] = useState<number[]>([]);
  const [arriveDateArr, setArriveDateArr] = useState<number[]>([]);
  const [alarmOn, setAlarmOn] = useState<boolean>(false);

  const todayMonth: number = new Date().getMonth() + 1;
  const todayDate: number = new Date().getDate();
  const today: number = Number(`${2023}${todayMonth}${todayDate}`);

  const getLetter = async () => {
    try {
      const response = await axios.get("/api/user");
      const userName = response.data.name;
      setName(userName);

      const letterResponse = await axios.get(`/api/letter/${userName}`);
      const letterData = letterResponse.data.letter;

      setMonthDifArr(
        letterData.map((item: { monthDif: number }) => item.monthDif)
      );
      setArriveDateArr(
        letterData.map((item: { arriveDate: number }) => item.arriveDate)
      );

      return letterData;
    } catch (error) {
      console.error(`${error}`);
    }
  };

  useEffect(() => {
    const mailbox = async () => {
      try {
        await getLetter();
      } catch (e) {
        console.error("우체통 오류:", e);
      }
    };
    mailbox();
  }, []);

  useEffect(() => {
    const letterIndex = async () => {
      const indexArray: number[] = [];

      for (let index = 0; index < arriveDateArr.length; index++) {
        const value: number = arriveDateArr[index];
        if (value == today) {
          setAlarmOn(true);
          indexArray.push(index);
        }
      }
      if (indexArray.length !== 0) {
        try {
          await axios.post("/api/index", {
            userName: name,
            index: indexArray,
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    letterIndex();
  }, [arriveDateArr]);

  const Envelope = (monthDif: number) => {
    for (let i = 0; i < monthDifArr.length; i++) {
      if (monthDifArr[i] == monthDif) {
        return <img src="../src/Assets/envelope_column.png" />;
      }
    }
  };

  const onCopyLink = (): void => {
    if (!navigator.clipboard) {
      alert("클립보드 지원 불가 브라우저입니다!")
    }
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("우체통 링크 복사 완료!");
    }).catch((err) => {
      console.log(err);
      alert("오류 발생!")
    })
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.alarm_container}>
        {alarmOn ? (
          <a href={`/arrive/${name}`}>
            <img
              src="../src/Assets/alarmOn.png"
              className={styles.alarm}
              onClick={() => setAlarmOn(false)}
            />
          </a>
        ) : (
          <a href={`/arrive/${name}`}>
            <img src="../src/Assets/alarmOff.png" className={styles.alarm} />
          </a>
        )}
      </div>
      <span className={styles.title}>{name}님의 우체통</span>
      <div className={styles.mail_box}>
        <div className={styles.post_box}>
          <div className={styles.envelope_box}>
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles.envelope_img}>
                {Envelope(index)}
              </div>
            ))}
          </div>
          <div className={styles.envelope_box}>
            {[...Array(5)].map((_, index) => (
              <div key={index} className={styles.envelope_img}>
                {Envelope(index + 5)}
              </div>
            ))}
          </div>
          <div className={styles.envelope_box}>
            {[...Array(2)].map((_, index) => (
              <div key={index} className={styles.envelope_img}>
                {Envelope(index + 10)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.link_container}>
        <a href={`/letter/${name}`}>
          <button className={styles.write_button}>편지 남기기</button>
        </a>
      </div>
      <button className={styles.share_button} onClick={onCopyLink}>
        내 우체통 공유하기 (Link 복사)
      </button>
    </div>
  );
};

export default MainPage;
