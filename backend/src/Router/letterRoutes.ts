import { Request, Response, Router } from "express";
import { saveLetter } from "../Firebase/letters";

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
