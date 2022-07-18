import React from "react";
import { useRef, useEffect, useState } from "react";
import cmnt from "../../../styles/comments.module.css";
import avatar from "../../../avatar/student.jpeg";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

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

export function Commenting({}) {
  const cmnt_thrd_btm_txt = useRef();
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    return () => {
      fetchReplyComment();
    };
  }, []);

  const fetchReplyComment = async () => {
    setisloading(true);
    const ctbt = cmnt_thrd_btm_txt.current;
    const docRef = doc(db, "commentRef", "comments");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setisloading(true);
      ctbt.innerHTML = docSnap.data().comment;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className={cmnt.comment_thread}>
      <div className={cmnt.comment_thread_top}>
        <div className={cmnt.comment_thread_top_left}>
          <div className={cmnt.comment_thread_top_left_icon}>
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
          <div className={cmnt.comment_thread_top_left_name}>test</div>
          <div className={cmnt.comment_thread_top_left_time}>1 hour ago</div>
        </div>
      </div>
      <div className={cmnt.comment_thread_bottom}>
        <div
          className={cmnt.comment_thread_bottom_text}
          ref={cmnt_thrd_btm_txt}>
            {isloading ? "Loading your comment..." : ""}
          </div>
      </div>
    </div>
  );
}
