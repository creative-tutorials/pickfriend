import { Form_error } from "../error/form_error";
import sup from "../../../styles/signup.module.css";
import lgn from "../../../styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
// ...
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

const SignUpPage = () => {
  const [user, setUser] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const DOBInput = useRef();
  const errorClass = useRef();
  const errorMsg = useRef();
  const eye_icon = useRef();
  const notificationPop = useRef()
  const signUp = async (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const dobinputfield = DOBInput.current.value;
    const notifypop = notificationPop.current;
    const err = errorClass.current;
    const msg = errorMsg.current;
    const today = new Date();
    const birthdate = new Date(dobinputfield);
    const age = today.getFullYear() - birthdate.getFullYear();
    // ...
    if (email && password && dobinputfield) {
      if (age < 18) {
        // ...? if age is less than 18
        err.classList.add(`${lgn.show}`);
        msg.innerHTML = `You are not 18 years old.`;
        setTimeout(() => {
          err.classList.remove(`${lgn.show}`);
        }, 5000);
      } else {
        createUser();
      }

      async function createUser() {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          dobinputfield
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // localStorage.setItem("loginstatus", true);
            // if user is signed in, log the console

            if (user) {
              console.log("user is signed in");
              localStorage.setItem("emailval", email);
              notifypop.classList.add(`${sup.show}`);
            } else {
              console.log("user is not signed in");
            }
            // ...
            const uuid = user.uid;
            const acceptUserLoginRequest = () => {
              const userid = Math.random().toString(36).substring(2, 15);
              setDoc(doc(db, "createdAccount", userid), {
                id: userid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                CreatedAt: new Date(),
              });
              return userid;
            };
            acceptUserLoginRequest();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //   ...
            console.log(errorCode, errorMessage);
            //   ...
            err.classList.add(`${lgn.show}`);
            //   ...
            msg.innerHTML = `${errorMessage}`;

            setTimeout(() => {
              err.classList.remove(`${lgn.show}`);
            }, 5000);
          });
      }
    } // ...? if input is valid
    else {
      console.log("Form is not valid, please check your input");
      err.classList.add(`${lgn.show}`);
      msg.innerHTML = `<i class="fa-light fa-exclamation-triangle"></i>
      Form is not valid, please check your input`;

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
    <div className={sup.SignUpWrapper}>
      <div className={sup.SignUpBox}>
        <div className={sup.SignUpBoxHeader}>
          <div className={sup.SignUpIcon}>
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
          <div className={sup.SignUpHeaderText}>
            Sign Up <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <div className={sup.SignUpDescriptionText}>
            <p>SignUp Now and become a member of PickFriend.</p>
          </div>
        </div>
        <div className={sup.SignupBody}>
          <div className={sup.InputBox}>
            <span>Email</span>
            <input
              type="text"
              placeholder="example@mail.com"
              ref={emailInput}
            />
          </div>
          <div className={sup.InputBox}>
            <span>Create a Password</span>
            <input
              type="password"
              placeholder="at least 8 characters"
              ref={passwordInput}
            />
            <div className={sup.show_hide} onClick={show_hide_password}>
              <i className="fa-solid fa-eye" ref={eye_icon}></i>
            </div>
          </div>
          <div className={sup.InputBox}>
            <span>Date of birth</span>
            <input type="date" placeholder="MM / DD / YYYY" ref={DOBInput} />
          </div>
          <div className={sup.LoginFooter}>
            <div className={sup.help_link}>
              <Link href="/404">
                <a>Problem Signing Up?</a>
              </Link>
            </div>
            <div className={sup.LoginButton}>
              <button onClick={signUp}>
                Become a member <i className="fa-solid fa-lock-keyhole"></i>
              </button>
            </div>
            <div className={sup.signup_link}>
              Have an account?
              <Link href="/components/Auth/login">
                <a>Sign In</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={sup.notificationPop} ref={notificationPop}>
        <div className={sup.notifyText}>
          Account Created Successfully click <br />
          <Link href="/components/mail/mail">
            <a>Verify</a>
          </Link>
          to verify your mail
        </div>
      </div>
      <Form_error errorClass={errorClass} errorMsg={errorMsg} />
    </div>
  );
};
export default SignUpPage;
