import { sendTextPost } from './client/mainpost';
import { Notifypop } from "./event/notifypop";
import { ImagePost } from "./post/imagePost";
import { Post2 } from "./post/post2";
import { Post } from "./post/post";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useRef, useEffect } from "react";
import {
  doc as docRef,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

//
import { initializeApp } from "firebase/app";
import { MainPost } from "./client/mainpost";
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

export default function Body() {
  const postBrd = useRef();
  const slideNotify = useRef();
  useEffect(() => {
    return () => {
      fetchPostFromDB();
    };
  }, []);

  const showPopup = () => {
    // local
    localStorage.setItem("popup", true);

    setTimeout(() => {
      location.reload();
    }, 3000);
  };
  const fetchPostFromDB = async () => {
    const getpostBrd = postBrd.current;
    const usr = localStorage.getItem("emailval");
    const querySnapshot = await getDocs(collection(db, "postRef"));
    querySnapshot.forEach((doc) => {
      const createEl = document.createElement("div");
      //? doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      getpostBrd.appendChild(createEl);
      //
      //
      //* generate radom post id
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // creating a function to fetch the post from the database
      sendTextPost(createEl, doc, docRef, db);
    });
    // *
  };
  const uploadFile = async (e) => {
    const slideNt = slideNotify.current;
    // convert file to reader

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      localStorage.setItem("image", reader.result);
    };
    //* if file size is greater than 500kb, alert the user and stop the upload
    if (e.target.files[0].size > 500000) {
      alert("file size is too big upload a smaller file or compress it");
      e.target.value = "";
    }
    // if file is not empty, read the file
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      slideNt.style.left = "30px";
      setTimeout(() => {
        slideNt.style.left = "-5900%";
      }, 5000);
    } else {
      // setImage(null);
      console.log("file is empty");
    }
  };
  return (
    <div className={styles.mains_body} ref={postBrd}>
      <Notifypop slideNotify={slideNotify} />
      <div className={styles.post_div}>
        <div className={styles.pst_left}>
          <Image src="/favicon.ico" width={30} height={30} alt="userimage" />
        </div>
        <div className={styles.pst_right}>
          <input type="text" placeholder="Create Post" onClick={showPopup} />
        </div>
        <div className={styles.pst_upload}>
          <input
            type="file"
            placeholder="Upload Image"
            id="file"
            accept={"image/jpg, image/png, image/jpeg, image/gif, video/mp4"}
            hidden
            onChange={uploadFile}
          />
          <div className={styles.image_upload}>
            <label htmlFor="file">
              <i className="fa-light fa-image"></i>
            </label>
          </div>
        </div>
      </div>
      <ImagePost />
    </div>
  );
}


