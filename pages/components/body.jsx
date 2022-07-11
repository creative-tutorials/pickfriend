import { ImagePost } from './post/imagePost';
import { Post2 } from "./post/post2";
import { Post } from "./post/post";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRef, useEffect } from "react";
import {
  doc as docRef,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
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
  const count = useRef();
  const post_user = useRef();
  const counter = 0;
  useEffect(() => {
    // first

    return () => {
      getPosts();
      getUserStatus();
    };
  }, []);

  const getUserStatus = async () => {
    const usr = localStorage.getItem("emailval");
    const getPostUser = post_user.current;
    const random_user_name = "";
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 10; i++) {
      random_user_name += char.charAt(Math.floor(Math.random() * char.length));
    }

    if (usr) {
      console.log("user is logged in");
      getPostUser.innerHTML = random_user_name;
    } else {
      console.log("user is not logged in");
      getPostUser.innerHTML = "guest";
    }
  };

  const showPopup = () => {
    // local
    localStorage.setItem("popup", true);

    setTimeout(() => {
      location.reload();
    }, 3000);
  };
  const getPosts = async () => {
    const getpostBrd = postBrd.current;
    const usr = localStorage.getItem("emailval");
    const querySnapshot = await getDocs(collection(db, "postRef"));
    querySnapshot.forEach((doc) => {
      const createEl = document.createElement("div");
      //? doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().data.text);
      getpostBrd.appendChild(createEl);
      //
      //
      //* generate radom post id
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      MainPost(createEl, post_user, doc);
    });
    // *
  };
  return (
    <div className={styles.mains_body} ref={postBrd}>
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
            onChange={(event) => {
              // convert file to reader

              const reader = new FileReader();
              reader.onload = () => {
                // set image src to reader.result
                // setImage(reader.result);
                console.log(reader.result);
              };
              //* if file size is greater than 500kb, alert the user and stop the upload
              if (event.target.files[0].size > 500000) {
                alert(
                  "file size is too big upload a smaller file or compress it"
                );
                event.target.value = "";
              }
              // if file is not empty, read the file
              if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0]);
              } else {
                // setImage(null);
                console.log("file is empty");
              }
            }}
          />
          <div className={styles.image_upload}>
            <label htmlFor="file">
              <i className="fa-light fa-image"></i>
            </label>
          </div>
        </div>
      </div>
      <Post post_user={post_user} />
      <Post2 post_user={post_user} />
      <ImagePost     />
    </div>
  );
}
