import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyA09wDLB4Kj8WBFI5CvEyNNiooZ6aj68n0",
   authDomain: "react-firebase-auth-8fa0f.firebaseapp.com",
   projectId: "react-firebase-auth-8fa0f",
   storageBucket: "react-firebase-auth-8fa0f.appspot.com",
   messagingSenderId: "754213176722",
   appId: "1:754213176722:web:bb5e6e6dfbc68d3deb6d4b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};