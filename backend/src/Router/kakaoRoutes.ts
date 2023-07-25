import { Request, Response, Router } from "express";
import { users } from "../Firebase/user";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

export const router = Router();

dotenv.config();

const kakao = {
  CLIENT_ID: process.env.KAKAO_ID,
  REDIRECT_URI: process.env.REDIRECT_URI,
};

/* kakao login page 연결 */
router.get("/oauth/callback", (req: Request, res: Response) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.CLIENT_ID}&redirect_uri=${kakao.REDIRECT_URI}&response_type=code&scope=profile_nickname,account_email`;
  res.redirect(kakaoAuthURL);
});

/* login 이후 나타나는 callback page */
router.get("/oauth/callback/kakao", async (req: Request, res: Response) => {
    /* access token 발급 */
    let token: any;
    try {
      token = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: kakao.CLIENT_ID,
          redirectUri: kakao.REDIRECT_URI,
          code: req.query.code as string,
        }),
      });
    } catch (e: any) {
      res.json(e.data);
      return;
    }

    /* access token 발급받은 뒤 사용자 정보 가져옴 */
    let user: any;
    try {
      user = await axios({
        method: "get",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      });
    } catch (e: any) {
      res.json(e.data);
      return;
    }

    /* 가지고 온 사용자 정보 DB에 저장 */
    await users(user.data);
  
    res.redirect("http://localhost:4000/main");
});
