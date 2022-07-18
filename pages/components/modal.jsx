import { delCookie } from "./cookie/cookie";
import { SendImagePost } from "./post/handlePost";
import { useRef, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { doc, setDoc, deleteDoc, getFirestore } from "firebase/firestore";

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

const MoadalPage = () => {
  const popup = useRef();
  const textblock = useRef();
  const imageObejctUrl = useRef();
  const closeicon = useRef();
  const postbutton = useRef();
  const [isAccepted, setisAccepted] = useState(false);

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

    setTimeout(() => {
      location.reload();
    }, 3000);
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

  const postcontent = async () => {
    // function that posts the content to the database
    const retrTextblock = textblock.current.value;
    const imgObjURL = imageObejctUrl.current.value;
    const retrpostbutton = postbutton.current;

    if (retrTextblock === "") {
      alert("please fill in all fields to post");
    } else {
      const postid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const cityRef = doc(db, "postRef", postid);
      let post = {
        text: retrTextblock,
      };
      setisAccepted(true);
      setTimeout(() => {
        retrpostbutton.disabled = true;
        retrpostbutton.innerText = "Posting...";
      }, 1000);
      setTimeout(() => {
        retrpostbutton.disabled = false;
        retrpostbutton.innerText = "Post";
        setisAccepted(true);
        setDoc(cityRef, { data: post, counterDB: 0 });

        delCookie(); // delete the cookie that is used to block the user from liking the same post twice
        localStorage.setItem("retrieveId", postid);
      }, 5000);

      if (isAccepted === true) {
        console.log(isAccepted);
      }
      localStorage.setItem("deleteId", postid);
    }
    if (retrTextblock !== "" && imgObjURL !== "") {
      await deleteDoc(doc(db, "postRef", localStorage.getItem("deleteId")));

      SendImagePost(
        retrTextblock,
        imgObjURL,
        setisAccepted,
        retrpostbutton,
        isAccepted
      );
      // component function to handle image post
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
        <input
          type="text"
          id="imageobejecturl"
          placeholder="Enter Image Object URL"
          ref={imageObejctUrl}
        />
        <textarea placeholder="What's your Thoughts?" ref={textblock}></textarea>
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
};
export default MoadalPage;
