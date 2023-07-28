import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";
import { setTotalLetter } from "./counter";

export const saveLetter = async (reqBody: any) => {
  try {
    const { year, todayMonth, todayDate, month, date, text, from, to, toId, monthDif } = reqBody;

    const letterData = {
      sendDate: year + todayMonth + todayDate,
      arriveDate: year + month + date,
      text: text,
      from: from,
      monthDif: monthDif,
    };

    const letterRef = doc(collection(database, "slowmailbox", "mailbox", "letters"), `${to}`);

    /* 
     letterRef 경로에서 현재 letter 배열을 가지고 오고, 현재 배열이 undefiend라면 초기값을 빈 배열([])로 설정 
     newLetter 배열에는 현재 letter 배열 데이터들과 새롭게 들어온 letter 데이터를 함께 저장
     */
    const getLetter = await getDoc(letterRef);
    const currentLetter = getLetter.data()?.letter || [];
    const newLetter = [...currentLetter, letterData];

    /* 유저가 받은 편지 개수를 계산하기 위해 배열의 길이 저장 */
    const letterCount = newLetter.length;

    /* letterRef 경로에 letter data 저장 */
    await setDoc(letterRef, {
      userID: toId,
      userName: to,
      letter: newLetter,
      totalLetter: letterCount,
    });

    await setTotalLetter();
  } catch (e) {
    console.log(`편지 저장 실패: ${e}`);
  }
};
