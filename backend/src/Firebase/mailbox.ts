import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";

export const saveLetter = async (reqBody: any) => {
  try {
    const { text, from, to, toId, sendDate, arriveDate, monthDif } = reqBody;

    const letterData = {
      sendDate: sendDate,
      arriveDate: arriveDate,
      text: text,
      from: from,
      monthDif: monthDif,
    };

    const letterRef = doc(collection(database, "slowmailbox", "mailbox", "letters"), to);

    /* 
     letterRef 경로에서 현재 letter 배열을 가지고 오고, 현재 배열이 undefiend라면 초기값을 빈 배열([])로 설정 
     newLetter 배열에는 현재 letter 배열 데이터들과 새롭게 들어온 letter 데이터를 함께 저장
     */
    const getLetter = await getDoc(letterRef);
    const currentLetter = getLetter.data()?.letter || [];
    const newLetter = [...currentLetter, letterData];

    /* letterRef 경로에 letter data 저장 */
    await setDoc(letterRef, {
      userID: toId,
      userName: to,
      letter: newLetter,
    });
  } catch (e) {
    console.log(`편지 저장 실패: ${e}`);
  }
};

export const getLetter = async (reqParams: any) => {
  const { userName } = reqParams;

  const letterRef = doc(collection(database, "slowmailbox", "mailbox", "letters"), userName);
  const letterDoc = await getDoc(letterRef);

  return letterDoc;
};
