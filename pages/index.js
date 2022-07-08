import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import BodyPage from "./components/body.jsx";
import ModalBox from "./components/modal.jsx";
import PollBox from "./components/pollbox.jsx";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

//
import { initializeApp } from "firebase/app";
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
const db = getFirestore(app);

export default function Home() {
  const [userStatus, setUserStatus] = useState(null);
  const header_user = useRef();
  const dropdwn = useRef();
  //
  const pollrefID = "ABCDEFGHIJKLMNOP";
  let captureID = "";
  for (let i = 0; i < 6; i++) {
    captureID += pollrefID.charAt(Math.floor(Math.random() * pollrefID.length));
  }
  console.log("CaptureID => ", captureID);
  useEffect(() => {
    //

    return () => {
      getUserStatus();
    };
  }, []);

  const getUserStatus = async () => {
    const usr = localStorage.getItem("emailval");
    const getheaderUser = header_user.current;
    if (usr) {
      // alert("user is logged in");
      console.log("user is logged in");
      const q = query(
        collection(db, "createdAccount"),
        where("email", "==", localStorage.getItem("emailval"))
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        getheaderUser.innerHTML = doc.data().email;
        // split getheaderUser.innerHTML to get the first part of the email
        const splitEmail = getheaderUser.innerHTML.split("@");
        getheaderUser.innerHTML = splitEmail[0];
      });
      setUserStatus(true);
    } else {
      // alert("user is not logged in");
      console.log("user is not logged in");
      getheaderUser.innerHTML = "null";
      setUserStatus(false);
    }
  };
  const toogleClass = () => {
    //? toggle the dropdown class ====> show/hide
    const dropdown = dropdwn.current;
    dropdown.classList.toggle(`${styles.active}`);
  };

  //
  return (
    <div className={styles.container}>
      {/*  */}
      <div className={styles.header} header_user={header_user}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="pickieimage"
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
        <div className={styles.nav_links}>
          <Link href="/">
            <a>
              <i className="fa-solid fa-house"></i>
            </a>
          </Link>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search PickFriend" />
        </div>
        <div className={styles.action_links}>
          <Link href="/chat">
            <a>
              <i className="fa-regular fa-comment-dots"></i>
            </a>
          </Link>
          <Link href="/notification">
            <a>
              <i className="fa-regular fa-bell"></i>
            </a>
          </Link>
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_info_icon} onClick={toogleClass}>
            <Image src="/favicon.ico" width={50} height={50} alt="userimage" />
          </div>
          <div className={styles.dropdown} ref={dropdwn}>
            <div className={styles.settings}>
              <div className={styles.details}>
                <Image
                  src="/logo.png"
                  width={40}
                  height={40}
                  alt="userimage"
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <span ref={header_user}></span>
              </div>
              <div className={styles.cjx}>
                <i className="fa-solid fa-gear"></i>
                <p>Settings</p>
              </div>
              <div className={styles.cjx}>
                <i className="fa-solid fa-circle-question"></i>
                <p>Help</p>
              </div>
              <div className={styles.cjx}>
                <i className="fa-solid fa-universal-access"></i>
                <p>Accessibility</p>
              </div>
              <div className={styles.cjx}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p>Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BodyPage />
      {/* popup input box */}
      <ModalBox />
      {/* poll menu box */}
      <PollBox />
    </div>
  );
}
