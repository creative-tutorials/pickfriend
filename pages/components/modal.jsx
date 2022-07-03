import { useRef, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import {
  doc,
  setDoc,
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


export default function PopUp() {
  const popup = useRef();
  const titleblock = useRef();
  const textblock = useRef();
  const closeicon = useRef();
  const postbutton = useRef();

  useEffect(() => {
    // first

    return () => {
      getLocalStorageData();
    };
  }, []);

  const hidePopup = () => {
    const popupBx = popup.current.style;
    const popupBx2 = popup.current;
    localStorage.setItem("popup", false);

    if (localStorage.getItem("popup") === "false") {
      popupBx.transform = "translate(-50%, -50%) scale(0)";
      popupBx.pointerEvents = "none";
      setTimeout(() => {
        popupBx2.id = "";
      }, 1000);
    }
  };

  const showPollMenu = () => {
    localStorage.setItem("pollC", true);
    localStorage.setItem("popup", false);
  };

  const getLocalStorageData = () => {
    const popupBx = popup.current.style;
    const popupBx2 = popup.current;
    if (localStorage.getItem("popup") === "true") {
      popupBx.transform = "translate(-50%, -50%) scale(1)";
      popupBx.pointerEvents = "auto";
      popupBx2.id = "show";
    } else {
      popupBx.transform = "translate(-50%, -50%) scale(0)";
      popupBx.pointerEvents = "none";
      setTimeout(() => {
        popupBx2.id = "";
      }, 1000);
    }
  };

  const postcontent = () => {
    const retrTextblock = textblock.current.value;
    const retrTitleblock = titleblock.current.value;
    const retrpostbutton = postbutton.current;

    if (retrTextblock === "" || retrTitleblock === "") {
      alert("please fill in all fields");
    } else {
      // random post sting id
      const postid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const cityRef = doc(db, "postRef", postid);
      let post = {
        title: retrTitleblock,
        text: retrTextblock,
      };
      setDoc(cityRef, { data: post });
    }
  };
  return (
    <div className={styles.input_box} ref={popup}>
      <div className={styles.tabs}>
        <div className={styles.tab}>
          <i className="fa-solid fa-memo"></i>
          <span>Post</span>
        </div>
        <div className={styles.tab}>
          <i className="fa-light fa-image"></i>
          <span>Images & Video</span>
        </div>
        <div className={styles.tab} onClick={showPollMenu}>
          <i className="fa-light fa-square-poll-horizontal"></i>
          <span>Poll</span>
        </div>
      </div>
      <div className={styles.titleInput}>
        <input
          type="text"
          placeholder="Title"
          maxLength={300}
          ref={titleblock}
        />
      </div>
      <div className={styles.textInput}>
        <div className={styles.textEdit}>
          <div className={styles.icon}>
            <i className="fa-solid fa-bold"></i>
          </div>
          <div className={styles.icon}>
            <i className="fa-solid fa-italic"></i>
          </div>
          <div className={styles.icon}>
            <i className="fa-solid fa-underline"></i>
          </div>
          <div className={styles.icon}>
            <i className="fa-solid fa-link"></i>
          </div>
          <div className={styles.icon}>
            <i className="fa-solid fa-strikethrough"></i>
          </div>
        </div>
        <textarea
          placeholder="Write your post here..."
          ref={textblock}
        ></textarea>
      </div>
      <div className={styles.seprate}>
        <div className={styles.seprate_line}></div>
      </div>
      <div className={styles.opButtons}>
        <div className={styles.opButtons_left}>
          <button>Save Draft</button>
        </div>
        <div className={styles.opButtons_right}>
          <button
            className={styles.active}
            onClick={postcontent}
            ref={postbutton}
          >
            Post
          </button>
        </div>
      </div>
      <div className={styles.close} ref={closeicon} onClick={hidePopup}>
        <i className="fa-light fa-times"></i>
      </div>
    </div>
  );
}
