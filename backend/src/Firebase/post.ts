import { database } from "../Config/firebaseConfig";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";

export const getTotalLetter = async () => {
  const counterRef = doc(database, "slowmailbox", "counter");
  let res = await getDoc(counterRef);

  return res.data()?.totalLetter ?? {};
};

export const setTotalLetter = async () => {
  const counterRef = doc(database, "slowmailbox", "counter");
  await updateDoc(counterRef, { totalLetter: increment(1) });
};
