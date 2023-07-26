import { initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const serviceAccount = require("../../config");

export let app: FirebaseApp;

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(serviceAccount, "app");
}

export const database = getFirestore(app);