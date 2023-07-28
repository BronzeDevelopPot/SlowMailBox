import { database } from "../Config/firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

export const setTotalLetter = async () => {
  const counterRef = doc(database, "slowmailbox", "counter");
  await updateDoc(counterRef, { totalLetter: increment(1) });
};
