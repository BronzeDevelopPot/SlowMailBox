import { doc, setDoc } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";

export const setUsers = async (userData: any) => {
    await setDoc(doc(database, "slowmailbox", "users"), {
        _id: userData.id,
        email: userData.kakao_account.email,
        name: userData.kakao_account.profile.nickname
    });
} 