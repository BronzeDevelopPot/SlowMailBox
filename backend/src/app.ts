import express from "express";
import { router } from "./Router/routes";
import { sessionConfig } from "./Config/sessionConfig";
import { database } from "./Config/firebaseConfig";

const app = express();
const PORT = process.env.PORT;

/* kakao login */
app.use(sessionConfig);
app.use(router);

/* firebase test code */
test();

async function test() {
  database.collection("test").doc("test").set({
    first: "first",
    second: "second",
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port 3000`);
});
