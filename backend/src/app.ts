const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const serviceAccount = require("../config");
const cors = require("cors");
const app = require("express");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const database = firestore.getFirestore();

test();

async function test() {
    database.collection("test").doc("test").set({
        first:"first",
        second: "second"
    });
}

app.use(cors());

app.listen('3000', () => {
    console.log(`Server listening on port 3000`);
});