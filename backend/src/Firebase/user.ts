import { database } from "../Config/firebaseConfig";

export const users = async (userData: any) => {
    await database.collection("slowmailbox").doc("users").set({
        _id: userData.id,
        email: userData.kakao_account.email,
        name: userData.kakao_account.profile.nickname
    });
  } 