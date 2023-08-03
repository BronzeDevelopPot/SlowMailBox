import { doc, collection, getDoc } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";

export const getArriveLetter = async (reqParams: any) => {
  const { userName } = reqParams;

  const letterRef = doc(collection(database, "slowmailbox", "arrive", "letters"), userName);
  const letterDoc = await getDoc(letterRef);

  return letterDoc;
};
