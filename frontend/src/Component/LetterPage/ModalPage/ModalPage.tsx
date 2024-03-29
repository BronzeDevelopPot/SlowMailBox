import { useState } from "react";
import axios from "axios";
import styles from "../../../Styles/_modalPage.module.scss";

const ModalPage = (_props: any) => {
  const [modal, setModal] = useState<boolean>(true);
  const [fromName, setFromName] = useState<string>("");
  const [toName, setToName] = useState<string>("");

  const onHandleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromName(e.target.value);
  };

  const today: Date = new Date();
  const todayMonth: number = today.getMonth() + 1;
  const todayDate: number = today.getDate();

  const submit = async () => {
    try {
      const response = await axios.get("/api/user");
      setToName(response.data.name);

      await axios.post("/api/send", {
        text: _props.inputText,
        from: fromName,
        to: response.data.name,
        toId: response.data._id,
        sendDate: Number(`${2023}${todayMonth}${todayDate}`),
        arriveDate: Number(`${2023}${selectedMonth}${selectedDate}`),
        monthDif: selectedMonth - todayMonth,
      });

      setModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  // monthList
  const monthList: number[] = [];
  for (let i = todayMonth; i < 13; i++) {
    monthList.push(i);
  }

  const [selectedMonth, setSelectedMonth] = useState<number>(todayMonth);
  const onHandleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedMonth(selectedValue);

    // 월에 따라 dateList 수정됨
    if (selectedValue == todayMonth) {
      let lastDayOfMonth: number;

      if (selectedValue === 2) {
        lastDayOfMonth = 28;
      } else if ([4, 6, 9, 11].includes(selectedValue)) {
        lastDayOfMonth = 30;
      } else {
        lastDayOfMonth = 31;
      }

      const dateList = [...Array(lastDayOfMonth - todayDate).keys()].map(
        (i) => todayDate + i + 1
      );
      setDateList(dateList);
    } else if (selectedValue == 2) {
      setDateList([...Array(28).keys()].map((i) => i + 1));
    } else if ([4, 6, 9, 11].includes(selectedValue)) {
      setDateList([...Array(30).keys()].map((i) => i + 1));
    } else {
      setDateList([...Array(31).keys()].map((i) => i + 1));
    }
  };

  // 기본 dateList
  let dateArr: number[] = [];
  let lastDayOfMonth: number;

  if (todayDate === 2) {
    lastDayOfMonth = 28;
  } else if ([4, 6, 9, 11].includes(todayMonth)) {
    lastDayOfMonth = 30;
  } else {
    lastDayOfMonth = 31;
  }

  if (todayDate === lastDayOfMonth) {
    dateArr = [todayDate];
  } else {
    dateArr = [...Array(lastDayOfMonth - todayDate).keys()].map(
      (i) => todayDate + i
    );
  }

  const [dateList, setDateList] = useState<number[]>(dateArr);
  const [selectedDate, setSelectedDate] = useState<number>(dateList[0]);
  const onHandleDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(parseInt(e.target.value));
  };

  return (
    <div className={styles.modal_page}>
      {modal ? (
        <div className={styles.modal_container}>
          <div className={styles.nickname_ment}>닉네임을 입력하세요!</div>
          <input
            type="text"
            className={styles.nickname}
            value={fromName}
            onChange={onHandleName}
          />
          <div className={styles.date_ment}>보낼 날짜를 선택해주세요!</div>
          <div className={styles.date_select}>
            <select name="year">
              <option value="2023">2023</option>
            </select>
            <div>년</div>

            <select name="month" onChange={onHandleMonth} value={selectedMonth}>
              {monthList.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <div>월</div>

            <select name="date" onChange={onHandleDate} value={selectedDate}>
              {dateList.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <div>일</div>
          </div>

          <button onClick={submit}>작성</button>
        </div>
      ) : (
        <div className={styles.modal_container}>
          <a href={`/main/${toName}`} style={{ textDecoration: "none" }}>
            <div className={styles.close_button}>X</div>
          </a>
          <div className={styles.complete_ment}>
            편지 전송이 완료되었습니다!
          </div>
          <div className={styles.join_ment}>
            나도 추억의 우체통을 만들고 싶다면?
          </div>
          {/* login page로 이동하게 해 둔 상태 (고민해 봐야 함) */}
          <a href="/">
            <img src="../src/Assets/kakaologin_start.png" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ModalPage;
