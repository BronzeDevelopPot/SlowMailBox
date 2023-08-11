import { Request, Response, Router } from "express";
import { database } from "../Config/firebaseConfig";
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { getArriveLetter } from "../Firebase/arrive";
import { getLetter } from "../Firebase/mailbox";
import { saveLetter } from "../Firebase/mailbox";

export const letterRouter = Router();

letterRouter.post("/api/send", async (req: Request, res: Response) => {
  try {
    await saveLetter(req.body);
    res.status(200).json({ message: "편지 저장 완료!" });
  } catch (e) {
    console.error("편지 저장 오류:", e);
    res.status(500).json({ e: "편지 저장 실패" });
  }
});

letterRouter.get("/api/letter/:userName", async (req: Request, res: Response) => {
  try {
    const letterDoc = await getLetter(req.params);

    if (letterDoc.exists()) {
      const letterData = letterDoc.data()?.letter || [];
      res.status(200).json({ letter: letterData });
    } else {
      res.status(404).json({ message: "편지 데이터가 존재하지 않습니다." });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "편지 조회에 실패하였습니다." });
  }
});

letterRouter.post("/api/index", async (req: Request, res: Response) => {
  try {
    const letterIndex = req.body.index;
    const userName = req.body.userName;

    const letterRef = doc(collection(database, "slowmailbox", "mailbox", "letters"), userName);
    const letterDoc = await getDoc(letterRef);

    for (let i = 0; i < letterIndex.length; i++) {
      const letterData = letterDoc.data()?.letter || [];
      const newLetter = letterData[letterIndex[i]];

      const arriveRef = doc(collection(database, "slowmailbox", "arrive", "letters"), userName);
      const arriveDoc = await getDoc(arriveRef);
      const currentLetter = arriveDoc.data()?.letter || [];

      await updateDoc(arriveRef, { letter: [...currentLetter, newLetter] });

      if (letterData.length > letterIndex) {
        letterData.splice(letterIndex, 1);
      }

      await updateDoc(letterRef, { letter: letterData });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "인덱스에 해당하는 편지를 조회하는 데 실패했습니다." });
  }
});

letterRouter.get("/api/arrive/:userName", async (req: Request, res: Response) => {
  try {
    const letterDoc = await getArriveLetter(req.params);

    if (letterDoc.exists()) {
      const letterData = letterDoc.data()?.letter || [];
      res.status(200).json({ letter: letterData });
    } else {
      res.status(404).json({ message: "편지 데이터가 존재하지 않습니다." });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "편지 조회에 실패하였습니다." });
  }
});
