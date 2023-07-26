import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sessionConfig } from "./Config/sessionConfig";
import { letterRouter } from "./Router/letterRoutes";
import { kakaoRouter } from "./Router/kakaoRoutes";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

/* kakao login */
app.use(sessionConfig);
app.use(kakaoRouter);

/* letter data in DB */
app.use(letterRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port 3000`);
});
