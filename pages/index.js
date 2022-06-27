import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";

//
import { initializeApp } from "firebase/app";
//

// Your web app's Firebase configuration
//
const firebaseConfig = {
  apiKey: "AIzaSyCGytgKhO6x6WsIPzmyB4fmIfOYL9PlwZc",
  authDomain: "redditclone-b7474.firebaseapp.com",
  projectId: "redditclone-b7474",
  storageBucket: "redditclone-b7474.appspot.com",
  messagingSenderId: "841817735605",
  appId: "1:841817735605:web:4f74f7bc95ba19b73859fc",
  measurementId: "G-TBR5ZYQHQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [userStatus, setUserStatus] = useState(null);
  const header_user = useRef();
  const post_user = useRef();
  const popup = useRef();
  const closeicon = useRef();
  const count = useRef();
  const counts = useRef();
  const titleblock = useRef();
  const textblock = useRef();
  const postbutton = useRef();
  const postBrd = useRef();
  const [count_num, setCountNum] = useState(1);
  useEffect(() => {
    //

    return () => {
      getUserStatus();
      getPosts();
    };
  }, []);

  const getUserStatus = async () => {
    const usr = localStorage.getItem("user_id");
    const getheaderUser = header_user.current;
    const getPostUser = post_user.current;
    if (usr) {
      // alert("user is logged in");
      console.log("user is logged in");
      getheaderUser.innerHTML = "user";
      getPostUser.innerHTML = "user";
      setUserStatus(true);
    } else {
      // alert("user is not logged in");
      console.log("user is not logged in");
      getheaderUser.innerHTML = "null";
      getPostUser.innerHTML = "null";
      setUserStatus(false);
    }
  };

  const showPopup = () => {
    const popupBx = popup.current.style;
    const popupBx2 = popup.current;
    //
    popupBx.transform = "translate(-50%, -50%) scale(1)";
    popupBx.pointerEvents = "auto";
    // give popupBx an ID of "show"
    popupBx2.id = "show";
  };
  const hidePopup = () => {
    const popupBx = popup.current.style;
    const popupBx2 = popup.current;

    if (popupBx2.id === "show") {
      popupBx.transform = "translate(-50%, -50%) scale(0)";
      popupBx.pointerEvents = "none";
      setTimeout(() => {
        popupBx2.id = "";
      }, 1000);
    }
  };
  const counter = 0;
  const upvote = () => {
    const storecount = count.current;

    counter++;
    storecount.innerText = counter;
  };
  const downvote = () => {
    const storecount = count.current;
    counter--;
    storecount.innerText = counter;

    if (counter < 1) {
      counter = 0;
      storecount.innerText = counter;
    }
  };
  const postcontent = () => {
    const retrTextblock = textblock.current.value;
    const retrTitleblock = titleblock.current.value;
    const retrpostbutton = postbutton.current;

    if (retrTextblock === "" || retrTitleblock === "") {
      console.log("empty");
    } else {
      // random post sting id
      const postid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const cityRef = doc(db, "postRef", postid);
      let post = {
        title: retrTitleblock,
        text: retrTextblock,
      };
      setDoc(cityRef, { data: post });
    }
    // console.log("post content");
  };

  const getPosts = async () => {
    const getpostBrd = postBrd.current;
    const querySnapshot = await getDocs(collection(db, "postRef"));
    querySnapshot.forEach((doc) => {
      const createEl = document.createElement("div");
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data().data.text);
      getpostBrd.appendChild(createEl);
      const counter2 = 0;
      createEl.innerHTML += `<div class=${styles.post_board}>
      <div class=${styles.post_board_content}>
        <div class=${styles.pst_left}>
          <div class=${styles.upvote} id=upvote>
            <i class="fa-light fa-thumbs-up"></i>
          </div>
          <div class=${styles.count} id="counter">
            ${counter2}
          </div>
          <div class=${styles.downvote} id=downvote>
            <i class="fa-light fa-thumbs-down"></i>
          </div>
        </div>
        <div class=${styles.pst_right}>
          <div class=${styles.pst_right_top}>
            <div class=${styles.usr_post}>
              <div class=${styles.usr_post_img}>
                <Image
                  src="/favicon.ico"
                  width=${30}
                  height=${30}
                  alt="userimage"
                />
              </div>
              <div class=${styles.usr_post_name}>
                <span ref=${post_user}></span>
              </div>
              <div class=${styles.usr_post_time}>
                <span>
                  <i class="fa-regular fa-clock"></i>
                  <span>1 hour ago</span>
                </span>
              </div>
            </div>
          </div>
          <div class=${styles.pst_right_bottom}>
            <div class=${styles.pst_right_bottom_text}>
              <span>
                ${doc.data().data.text}
              </span>
            </div>
            <div class=${styles.pst_right_bottom_icon}>

              <div class=${styles.comment_icon}>
                <i class="fa-regular fa-comment-dots"></i>
              </div>

              <div class=${styles.share_icon}>
                <i class="fa-regular fa-share-alt"></i>
              </div>

              <div class=${styles.save_icon}>
                <i class="fa-regular fa-bookmark"></i>
              </div>

              <div class=${styles.sponsor_icon}>
                <i class="fa-regular fa-user-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      const getC = document.getElementById("counter");
      function upvote() {
        // const storecount2 = counts.current;

        counter++;
        // storecount2.innerText = counter;
        console.log("upvote");
        getC.innerText = counter;
        if (counter > 5) {
          alert("you cant like more than 5");
          counter = 5;
        }
      }
      function downvote() {
        counter--;
        getC.innerText = counter;
        if (counter < 1) {
          counter = 0;
          // storecount2.innerText = counter;
          getC.innerText = counter;
          //
        }
      }
      const upv = document.getElementById("upvote");
      upv.onclick = () => {
        console.log("upvote");
        upvote();
      };
      const downv = document.getElementById("downvote");
      downv.onclick = () => {
        console.log("downvote");
        downvote();
      };
    });
    // += is used to append the content to the existing content
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src="/favicon.ico" alt="PrimeEx" width={50} height={50} />
        </div>
        <div className={styles.nav_links}>
          <Link href="/">
            <a>
              <i className="fa-solid fa-house"></i> Home
            </a>
          </Link>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search PrimeEX" />
        </div>
        <div className={styles.action_links}>
          <Link href="/chat">
            <a>
              <i className="fa-regular fa-comment-dots"></i>
            </a>
          </Link>
          <Link href="/notification">
            <a>
              <i className="fa-regular fa-bell"></i>
            </a>
          </Link>
          <Link href="/create-post">
            <a>
              <i className="fa-regular fa-plus"></i>
            </a>
          </Link>
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_info_icon}>
            <Image src="/favicon.ico" width={30} height={30} alt="userimage" />
          </div>
          <div className={styles.user_info_name}>
            <span ref={header_user}></span>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={styles.primeex_body} ref={postBrd}>
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
              hidden
              onChange={(event) => {
                // convert file to reader

                const reader = new FileReader();
                reader.onload = () => {
                  // set image src to reader.result
                  // setImage(reader.result);
                  console.log(reader.result);
                };
                // if file is not empty, read the file
                if (event.target.files[0]) {
                  reader.readAsDataURL(event.target.files[0]);
                } else {
                  // setImage(null);
                  console.log("file is empty");
                }
                // console.log(event.target.files[0]);
              }}
            />
            <div className={styles.image_upload}>
              <label htmlFor="file">
                <i className="fa-light fa-image"></i>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.post_board}>
          <div className={styles.post_board_content}>
            <div className={styles.pst_left}>
              <div className={styles.upvote} onClick={upvote}>
                <i className="fa-light fa-up"></i>
              </div>
              <div className={styles.count} ref={count}>
                {counter}
              </div>
              <div className={styles.downvote} onClick={downvote}>
                <i className="fa-light fa-down"></i>
              </div>
            </div>
            <div className={styles.pst_right}>
              <div className={styles.pst_right_top}>
                <div className={styles.usr_post}>
                  <div className={styles.usr_post_img}>
                    <Image
                      src="/favicon.ico"
                      width={30}
                      height={30}
                      alt="userimage"
                    />
                  </div>
                  <div className={styles.usr_post_name}>
                    <span ref={post_user}></span>
                  </div>
                  <div className={styles.usr_post_time}>
                    <span>
                      <i className="fa-regular fa-clock"></i>
                      <span>1 hour ago</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.pst_right_bottom}>
                <div className={styles.pst_right_bottom_text}>
                  <span>
                    Building the next generation social network - PrimeEX
                    PrimeEx is a social network that allows you to connect with
                    people around the world, share your thoughts and ideas, and
                    interact with other people.
                  </span>
                </div>
                <div className={styles.pst_right_bottom_icon}>
                  {/* comment */}
                  <div className={styles.comment_icon}>
                    <i className="fa-regular fa-comment-dots"></i>
                  </div>
                  {/* share */}
                  <div className={styles.share_icon}>
                    <i className="fa-regular fa-share-alt"></i>
                  </div>
                  {/* save */}
                  <div className={styles.save_icon}>
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
                  {/* sponsor */}
                  <div className={styles.sponsor_icon}>
                    <i className="fa-regular fa-user-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div className={styles.tab}>
            <i className="fa-light fa-square-poll-horizontal"></i>
            <span>Poll</span>
          </div>
        </div>
        <div className={styles.titleInput}>
          <input
            type="text"
            placeholder="Title"
            maxLength={300}
            ref={titleblock}
          />
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
          <textarea
            placeholder="Write your post here..."
            ref={textblock}
          ></textarea>
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
    </div>
  );
}
