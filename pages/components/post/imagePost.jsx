import React from "react";
import Image from "next/image";
import {
  getFirestore,
  collection,
  query,
  where,
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
    const getState = localStorage.getItem("isAccepted");
    const imagepostRef = image_post_ref.current;
    const slideNt = slideNotify.current;
    const chngeText = changeText.current;
    if (getState) {
      // do something
      console.log("getState");
      const querySnapshot = await getDocs(collection(db, "ImagePost"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " ImagePost => ", doc.data());

        imagepostRef.innerHTML = `<div class=${newstyle.imgpost_top}>
        <div class=${newstyle.top_of_top}>
          <Image
            width=${30}
            height=${30}
            style="object-fit: cover;"
            src="/favicon.ico"
            alt="user image"
          />
          <div class=${newstyle.top_of_left_name}>
            <span class=${newstyle.usex_namx}>
              <span>User Name</span>
            </span>
          </div>
          <div class=${newstyle.top_of_right_time}>
            <span class=${newstyle.clock}>
              <i class="fa-regular fa-clock"></i>
              <span>1 hour ago</span>
            </span>
          </div>
        </div>
      </div>
      <div class=${newstyle.imgpost_text}>
        <div class=${newstyle.text}>
          ${doc.data().data.text}
        </div>
      </div>
      <div class=${newstyle.image}>
        <Image
          src="${doc.data().data.image}"
          width=${500}
          height=${300}
          alt="image of post"
          style="object-fit: cover;
          border-radius: 5px;"
        />
      </div>`;
      });
    } else {
      // alert("Error can't complete request because image URL is not found");
      slideNt.style.left = "30px";
      slideNt.style.top = "120px";
      slideNt.style.backgroundColor = "#f8d7da";
      slideNt.style.color = "#721c24";
      slideNt.style.borderColor = "#f5c6cb";
      setTimeout(() => {
        slideNt.style.left = "-100%";
        slideNt.style.top = "120px";
      }, 5000);
      chngeText.innerHTML = `<span>
      <i class="fa-light fa-bell"></i>
      Error 274: Can't load post, seems post state is not accepted
      </span>`;
    }
  };

  return (
    <div className={newstyle.image_post} ref={image_post_ref}>
      <Notifypop slideNotify={slideNotify} changeText={changeText} />
      {/* <div className={newstyle.imgpost_top}>
        <div className={newstyle.top_of_top}>
          <Image
            width={30}
            height={30}
            objectFit="cover"
            src={"/favicon.ico"}
            alt="user image"
          />
          <div className={newstyle.top_of_left_name}>
            <span className={newstyle.usex_namx}>
              <span>User Name</span>
            </span>
          </div>
          <div className={newstyle.top_of_right_time}>
            <span className={newstyle.clock}>
              <i className="fa-regular fa-clock"></i>
              <span>1 hour ago</span>
            </span>
          </div>
        </div>
      </div>
      <div className={newstyle.imgpost_text}>
        <div className={newstyle.text}>
          Hello World, this is a test post. try to see how it looks like.
        </div>
      </div>
      <div className={newstyle.image}>
        <Image
          src="/postImage/unspalsh_lab1.png"
          width={500}
          height={300}
          alt="image of post"
          objectFit="cover"
          style={{
            borderRadius: "5px",
          }}
        />
      </div> */}
    </div>
  );
}
