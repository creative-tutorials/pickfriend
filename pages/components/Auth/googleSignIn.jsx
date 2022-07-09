import React from "react";
import { useRef } from "react";
import { Form_error } from "../error/form_error"
import lgn from "../../../styles/login.module.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//

// Your web app's Firebase configuration
//
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
const provider = new GoogleAuthProvider();
const auth = getAuth();

export function GoogleSignIn({}) {
  const errorClass = useRef();
  const errorMsg = useRef();


  // ... Sign in with Google Firebase API Function ==> to The App(*pickfriend app*) ...
  const signInWithGoogle = async () => {
    const err = errorClass.current;
    const msg = errorMsg.current;
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        err.classList.add(`${lgn.show}`);
        msg.innerHTML = `${errorCode}`;
        setTimeout(() => {
          err.classList.remove(`${lgn.show}`);
        }, 5000);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className={lgn.LoginButton}>
      <button className={lgn.googlebtn} onClick={signInWithGoogle}>
        <i className="fa-brands fa-google"></i>
        <span>Sign In with Google</span>
      </button>
      <Form_error errorClass={errorClass} errorMsg={errorMsg} />
    </div>
  );
}
