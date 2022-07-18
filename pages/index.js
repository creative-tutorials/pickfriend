import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
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
  const currSidebar = useRef();
  //
  const pollrefID = "ABCDEFGHIJKLMNOP";
  let captureID = "";
  for (let i = 0; i < 6; i++) {
    captureID += pollrefID.charAt(Math.floor(Math.random() * pollrefID.length));
  }
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

        // if email length is greater than 10 then truncate the email
        if (splitEmail[0].length > 10) {
          getheaderUser.innerHTML = splitEmail[0].substring(0, 10);
        }
      });
      setUserStatus(true);
    } else {
      // alert("user is not logged in");
      console.log("user is not logged in");
      window.location.href = "/components/Auth/signup";
      getheaderUser.innerHTML = "null";
      setUserStatus(false);
    }
  };
  const toogleClass = () => {
    //? toggle the dropdown class ====> show/hide
    const dropdown = dropdwn.current;
    dropdown.classList.toggle(`${styles.active}`);
  };

  const toogleSidebar = () => {
    currSidebar.current.classList.add(`${styles.active}`);
    const curSidebar = currSidebar.current;

    curSidebar.onclick = () => {
      curSidebar.classList.remove(`${styles.active}`);
    };
  };

  //
  return (
    <div className={styles.container}>
      {/*  */}
      <Header
        header_user={header_user}
        toogleClass={toogleClass}
        dropdwn={dropdwn}
        toogleSidebar={toogleSidebar}
      />
      <Sidebar currSidebar={currSidebar} />
      <BodyPage />
      {/* popup input box */}
      <ModalBox />
      {/* poll menu box */}
      <PollBox />
    </div>
  );
}
