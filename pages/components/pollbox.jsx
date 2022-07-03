import styles from "../../styles/Home.module.css";
import { useRef, useEffect } from "react";
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

export default function PollEl() {
  const polltitleblock = useRef();
  const pollInput = useRef();
  const pollInput2 = useRef();
  const pollInput3 = useRef();
  const pollInput4 = useRef();
  const postbutton = useRef();
  const pollpop = useRef();
  const closeicon = useRef();

  useEffect(() => {
    // first

    return () => {
      check();
    };
  }, []);

  const check = () => {
    if (localStorage.getItem("pollC") === "true") {
      const pollpop_ = pollpop.current.style;
      const pollpop2 = pollpop.current;
      //
      pollpop_.transform = "translate(-50%, -50%) scale(1)";
      pollpop_.pointerEvents = "auto";
      // give popupBx an ID of "show"
      pollpop2.id = "show";
      //

      if (pollpop2.id === "show") {
        localStorage.setItem("popup", false);
      }
      //   popup
    }
  };

  const publishPoll = () => {
    // function to publish the poll
    // when user clicks on publish poll button
    const pollTitleBlock = polltitleblock.current.value;
    const pollInputVal = pollInput.current.value;
    const pollInputVal2 = pollInput2.current.value;
    const pollInputVal3 = pollInput3.current.value;
    const pollInputVal4 = pollInput4.current.value;

    if (pollTitleBlock === "") {
      alert("Title is required");
      return;
    }
    if (
      pollInputVal === "" ||
      pollInputVal2 === "" ||
      pollInputVal3 === "" ||
      pollInputVal4 === ""
    ) {
      alert("Poll is required");
      return;
    } else if (
      pollInputVal.length < 2 ||
      pollInputVal2.length < 2 ||
      pollInputVal3.length < 2 ||
      pollInputVal4.length < 2
    ) {
      alert("Poll must be at least 2 characters");
      return;
    } else if (
      pollTitleBlock !== "" &&
      pollInput !== "" &&
      pollInput2 !== "" &&
      pollInput3 !== "" &&
      pollInput4 !== ""
    ) {
      // random post sting id
      const pollid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const cityRef = doc(db, "pollRef", pollid);

      const poll_menu = {
        title: pollTitleBlock,
        poll_tab: pollInputVal,
        poll_tab2: pollInputVal2,
        poll_tab3: pollInputVal3,
        poll_tab4: pollInputVal4,
      };
      localStorage.setItem("poll_title", pollTitleBlock);
      localStorage.setItem("poll_tab", pollInputVal);
      localStorage.setItem("poll_tab2", pollInputVal2);
      localStorage.setItem("poll_tab3", pollInputVal3);
      localStorage.setItem("poll_tab4", pollInputVal4);
      console.log("poll_menu => ", poll_menu);
      setDoc(cityRef, {
        data: poll_menu,
      });

      setTimeout(() => {
        localStorage.setItem("previousID", pollid);
      }, 1000);
    }
  };

  const hidePopup = () => {
    const pollpop_ = pollpop.current.style;
    const pollpop2 = pollpop.current;
    //
    if (pollpop2.id === "show") {
      pollpop_.transform = "translate(-50%, -50%) scale(0)";
      pollpop_.pointerEvents = "none";
      localStorage.setItem("pollC", false);
      setTimeout(() => {
        pollpop2.id = "";
      }, 1000);
    }
  };
  return (
    <div className={styles.poll_box} ref={pollpop}>
      <div className={styles.poll_box_top}>
        <div className={styles.titleInput}>
          <input
            type="text"
            placeholder="Title"
            maxLength={300}
            ref={polltitleblock}
          />
        </div>
      </div>
      <div className={styles.poll_box_bottom}>
        <div className={styles.seprate}>
          <div className={styles.seprate_line}></div>
        </div>
        <div className={styles.poll_add_menu}>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionA"
              id="getinput"
              ref={pollInput}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionB"
              id="getinput"
              ref={pollInput2}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionC"
              id="getinput"
              ref={pollInput3}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionD"
              id="getinput"
              ref={pollInput4}
            />
          </div>
        </div>
        <div className={styles.opButtons}>
          <div className={styles.opButtons_left}>
            <button>Save Draft</button>
          </div>
          <div className={styles.opButtons_right}>
            <button
              className={styles.active}
              onClick={publishPoll}
              ref={postbutton}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className={styles.close} ref={closeicon} onClick={hidePopup}>
        <i className="fa-light fa-times"></i>
      </div>
    </div>
  );
}
