import admin from "firebase-admin";
const serviceAccount = require("../../config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const database = admin.firestore();