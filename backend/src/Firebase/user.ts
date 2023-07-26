import { doc, increment, setDoc, getDoc, updateDoc, collection } from "firebase/firestore";
import { database } from "../Config/firebaseConfig";

export const setUsers = async (userData: any) => {
    const userInfo = {
        _id: userData.id,
        email: userData.kakao_account.email,
        name: userData.kakao_account.profile.nickname
    }
    
    const userRef = doc(collection(database, "slowmailbox", "user", "users"), `${userInfo._id}`);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        await updateDoc(doc(database, "slowmailbox", "counter"), {
            totalUser: increment(1)
        });

        await setDoc(userRef, userInfo);
    }
}