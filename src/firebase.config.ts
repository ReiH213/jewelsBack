import * as admin from 'firebase-admin';

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
export const auth = admin.auth(); // Access Authentication
