import { CreateImagePost } from "../client/fetchImagePost";
import React from "react";
import Image from "next/image";
import {
  getFirestore,
  collection,
  doc as docRef,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Notifypop } from "../event/notifypop";
import newstyle from "../../../styles/posts.module.css";
import { useEffect, useRef } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function ImagePost({}) {
  const image_post_ref = useRef();
  const slideNotify = useRef();
  const changeText = useRef();
  useEffect(() => {
    return () => {
      getImagePost();
    };
  }, []);

  const getImagePost = async () => {
    const imagepostRef = image_post_ref.current;
    const slideNt = slideNotify.current;
    const chngeText = changeText.current;
    const checkInternetConnection = await fetch(
      "https://62d182dedccad0cf1769313a.mockapi.io/info"
    );
    if (checkInternetConnection.status === 200) {
      console.info("connected");
      const querySnapshot = await getDocs(collection(db, "ImagePost"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " ImagePost => ", doc.data());

        CreateImagePost(imagepostRef, doc, db, docRef, updateDoc);
      });
    } else {

      slideNt.style.left = "30px";
      slideNt.style.top = "120px";
      slideNt.style.backgroundColor = "#f8d7da";
      slideNt.style.color = "#721c24";
      slideNt.style.borderColor = "#f5c6cb";
      setTimeout(() => {
        slideNt.style.left = "-5900%";
        slideNt.style.top = "120px";
      }, 5000);
      chngeText.innerHTML = `<span>
      <i class="fa-light fa-bell"></i>
      Error: Couldn't fetch data from server. Try again later.
      </span>`;
    }
  };

  return (
    <div className={newstyle.image_post} ref={image_post_ref}>
      <Notifypop slideNotify={slideNotify} changeText={changeText} />
      {/*  */}
    </div>
  );
}
