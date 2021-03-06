import { doc, setDoc, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export function SendImagePost(
  retrTextblock,
  imgObjURL,
  setisAccepted,
  retrpostbutton,
  isAccepted
) {
  setisAccepted(true);
  setTimeout(() => {
    retrpostbutton.disabled = true;
    retrpostbutton.innerText = "Posting...";
  }, 1000);
  setTimeout(() => {
    retrpostbutton.disabled = false;
    retrpostbutton.innerText = "Post";
    setisAccepted(true);
    const postid =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const imagePostRef = doc(db, "ImagePost", postid);
    let post = {
      text: retrTextblock,
      image: imgObjURL,
    };
    setDoc(imagePostRef, {
      data: post,
      counterDB: 0,
    });
    localStorage.setItem("imgpostid", postid)
  }, 5000);

  if (isAccepted === true) {
    console.log(isAccepted);
  }
}
