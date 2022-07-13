import styles from "../../styles/Home.module.css";
import { useRef, useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";

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
  const pollInputOptA = useRef();
  const pollInputOptB = useRef();
  const pollInputOptC = useRef();
  const pollInputOptD = useRef();
  const postbutton = useRef();
  const pollpop = useRef();
  const closeicon = useRef();

  useEffect(() => {
    // first

    return () => {
      checkifLocalStorageisValid();
    };
  }, []);

  const checkifLocalStorageisValid = () => {
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
    }
  };

  const publishPoll = () => {
    // function to publish the poll
    // when user clicks on publish poll button
    const pollTitleBlock = polltitleblock.current.value;
    const pollOptA = pollInputOptA.current.value;
    const pollOptB = pollInputOptB.current.value;
    const pollOptC = pollInputOptC.current.value;
    const pollOptD = pollInputOptD.current.value;

    if (pollTitleBlock === "") {
      alert("Poll title is required ❌");
    }
    if (
      pollOptA === "" &&
      pollOptB === "" &&
      pollOptC === "" &&
      pollOptD === ""
    ) {
      alert("Poll options are required ❌");
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
              ref={pollInputOptA}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionB"
              id="getinput"
              ref={pollInputOptB}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionC"
              id="getinput"
              ref={pollInputOptC}
            />
          </div>
          <div className={styles.poll_input}>
            <input
              type="text"
              placeholder="OptionD"
              id="getinput"
              ref={pollInputOptD}
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
