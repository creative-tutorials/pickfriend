import { addComment } from "./addComment";
import { Index } from "./index";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import cmnt from "../../../styles/comments.module.css";
import avatar from "../../../avatar/student.jpeg";
import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore";
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

export default function Comments() {
  const [uuid, setuuid] = useState();
  const [comments, setcomments] = useState([
    "beta app running on version 1.0.0",
  ]);
  const readComment = useRef();
  const buttonText = useRef();
  useEffect(() => {
    // first

    return () => {
      // generateUUID();
    };
  }, []);

  // get the comments
  const postComment = async (e) => {
    const getCommentVal = readComment.current.value;
    const btnTxt = buttonText.current;
    if (getCommentVal) {
      //? if the commentInputValue is not empty
      // set the comments
      setcomments([...comments, getCommentVal]);

      console.log(
        "%c🧪comments => ",
        "color: #ff5733; font-weight: 500;",
        comments
      );

      // console log the last array item
      console.log(
        "%c🧪comments => ",
        "color: #ff5733; font-weight: 500;",
        comments[comments.length - 1]
      );

      const last_array_item = comments[comments.length - 1];
      setTimeout(() => {
        btnTxt.innerText = "Posting...";
      }, 1000);
      addComment(
        btnTxt,
        setDoc,
        doc,
        db,
        readComment,
        last_array_item,
        setuuid
      );

      localStorage.setItem("commentAllowed", true);
    } else {
      localStorage.setItem("commentAllowed", false);
      alert("Please enter a comment");
    }
  };

  return (
    <div className={cmnt.wrapper}>
      <div className={cmnt.content}>
        <div className={cmnt.comment_box}>
          <Index />
          <div className={cmnt.comment_input}>
            <div className={cmnt.comment_input_top}>
              <div className={cmnt.comment_input_top_left}>
                <div className={cmnt.comment_input_top_left_icon}>
                  <Image
                    width={50}
                    height={50}
                    objectFit="cover"
                    src={avatar}
                    alt="user_image"
                    placeholder="blur"
                    blurDataURL={avatar}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
              <div className={cmnt.comment_input_top_right}>
                <div className={cmnt.comment_input_top_right_text}>
                  <textarea
                    placeholder="Write a comment🏄‍♂️..."
                    ref={readComment}
                  ></textarea>
                </div>
                <div className={cmnt.comment_input_top_right_button}>
                  <button onClick={postComment}>
                    <span ref={buttonText}>Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
