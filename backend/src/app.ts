import express from "express";
import { router } from "./Router/kakaoRoutes";
import { sessionConfig } from './Config/sessionConfig';

const app = express();
const PORT = process.env.PORT;

/* kakao login */
app.use(sessionConfig);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port 3000`);
});
