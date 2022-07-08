import { Form_error } from "../error/form_error";
import { GoogleSignIn } from "./googleSignIn";
import lgn from "../../../styles/login.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

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
const auth = getAuth();
const db = getFirestore();

const LoginPage = () => {
  const [user, setUser] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const errorClass = useRef();
  const errorMsg = useRef();
  const eye_icon = useRef();

  const SignIn = async (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const err = errorClass.current;
    const msg = errorMsg.current;
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          const uuid = user.uid;
          console.log("uuid => ", uuid);

          const generateUserId = () => {
            const userid = Math.random().toString(36).substring(2, 15);

            setDoc(doc(db, "loggedInAccount", userid), {
              id: userid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
              LoggedinAt: new Date(),
            });
            return userid;
          };
          generateUserId();
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode, errorMessage);
          //   ...
          err.classList.add(`${lgn.show}`);
          //   ...
          msg.innerHTML = `${errorMessage}`;

          setTimeout(() => {
            err.classList.remove(`${lgn.show}`);
          }, 5000);
        });
    } // TODO: sign in
    else {
      console.log("Please enter email and password");
      err.classList.add(`${lgn.show}`);
      msg.innerHTML = `<i class="fa-light fa-exclamation-triangle"></i>
      Please enter email and password`;

      setTimeout(() => {
        err.classList.remove(`${lgn.show}`);
      }, 5000);
    }
  };
  const show_hide_password = (e) => {
    e.preventDefault();
    const password = passwordInput.current.type;
    const eyecon = eye_icon.current;
    if (password === "password") {
      passwordInput.current.type = "text";
      eyecon.classList.replace(`${"fa-eye"}`, `${"fa-eye-slash"}`);
    } else {
      passwordInput.current.type = "password";
      eyecon.classList.replace(`${"fa-eye-slash"}`, `${"fa-eye"}`);
    }
  };
  return (
    <div className={lgn.LoginContainer}>
      <div className={lgn.LoginBox}>
        <div className={lgn.LoginBoxHeader}>
          <div className={lgn.LoginIcon}>
            <Image
              width={100}
              height={100}
              objectFit="cover"
              src={"/logo.png"}
              alt="logo icon"
              placeholder="blur"
              blurDataURL={"/logo.png"}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
          <div className={lgn.LoginHeaderText}>
            Sign In <i className="fa-solid fa-key"></i>
          </div>
          <div className={lgn.LoginDescriptionText}>
            <p>SignIn Now and continue with PickFriend.</p>
          </div>
        </div>
        <div className={lgn.LoginBoxBody}>
          <div className={lgn.InputBox}>
            <input type="text" placeholder="Email Address" ref={emailInput} />
          </div>
          <div className={lgn.InputBox}>
            <input type="password" placeholder="Password" ref={passwordInput} />
            <div className={lgn.show_hide} onClick={show_hide_password}>
              <i className="fa-solid fa-eye" ref={eye_icon}></i>
            </div>
          </div>
          <div className={lgn.LoginBoxFooter}>
            <div className={lgn.help_link}>
              <Link href="/404">
                <a>Problem Signing In?</a>
              </Link>
            </div>
            <div className={lgn.forogt_password}>
              <Link href="/404">
                <a>Forgot Password?</a>
              </Link>
            </div>
            <div className={lgn.LoginButton}>
              <button onClick={SignIn}>
                Sign In <i className="fa-light fa-hand-wave"></i>
              </button>
            </div>
            {/* or */}
            <div className={lgn.or}>or</div>
            <GoogleSignIn />
            <div className={lgn.signup_link}>
              Don&apos;t have an account?
              <Link href="/components/Auth/signup">
                <a>Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Form_error errorClass={errorClass} errorMsg={errorMsg} />
    </div>
  );
};
export default LoginPage;
