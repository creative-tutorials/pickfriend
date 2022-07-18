import { Commenting } from "./commenting";
import React from "react";
import { useEffect, useRef, useState } from "react";
import cmnt from "../../../styles/comments.module.css";
import Image from "next/image";
import avatar from "../../../avatar/avatr.png";
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
export function Index({}) {
  const comment_text = useRef();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    return () => {
      fetchPostwithID();
    };
  }, []);

  const fetchPostwithID = async () => {
    const cmtRef = comment_text.current;
    setloading(true);
    // fetch localstorage
    const fetchpost = localStorage.getItem("retrieveId");
    const docRef = doc(db, "postRef", fetchpost);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      cmtRef.innerHTML = docSnap.data().data.text;
      setloading(true);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className={cmnt.cpBox}>
      <div className={cmnt.comment_threads}>
        <div className={cmnt.commnet_top}>
          <div className={cmnt.user_icon}>
            <Image
              width={50}
              height={50}
              objectFit="cover"
              src={avatar}
              alt="user_image"
              placeholder="blur"
              blurDataURL={avatar}
              style={
                {
                  // borderRadius: "50%",
                }
              }
            />
          </div>
          <div className={cmnt.user_name}>test</div>
          <div className={cmnt.time_post}>1 hour ago</div>
        </div>
        {/*  */}
        <div className={cmnt.commnet_bottom}>
          <div className={cmnt.comment_post}>
            <div className={cmnt.comment_text} ref={comment_text}>
              {/* get data from firebase */}
              {loading ? "Fetching post from database..." : ""}
            </div>
          </div>
        </div>
      </div>
      <i className="fa-light fa-circle-sort"></i>
      <Commenting />
    </div>
  );
}
