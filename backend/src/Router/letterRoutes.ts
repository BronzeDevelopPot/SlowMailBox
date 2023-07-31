import { Request, Response, Router } from "express";
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