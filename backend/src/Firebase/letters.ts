import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";
import { getTotalLetter, setTotalLetter } from "./post";

export const saveLetter = async (reqBody: any) => {
  try {
    const { year, todayMonth, todayDate, month, date, text, from, to, toId, monthDif } = reqBody;

    const totalLetterData: any = await getTotalLetter();

    const letterData = {
      _id: totalLetterData + 1,
      sendDate: year + todayMonth + todayDate,
      arriveDate: year + month + date,
      text: text,
      from: from,
      to: to,
      toId: toId,
      monthDif: monthDif,
    };

    const letterRef = doc(collection(database, "slowmailbox", "post", "letters"), `${letterData._id}`);
    await setDoc(letterRef, letterData);
    await setTotalLetter();
  } catch (e) {
    console.log(`편지 저장 실패: ${e}`);
  }
};
