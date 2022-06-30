import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  doc,
  doc as docFuck,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
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

export default function Home() {
  const [userStatus, setUserStatus] = useState(null);
  const [poll, setPoll] = useState(["", "", ""]);
  const header_user = useRef();
  const post_user = useRef();
  const popup = useRef();
  const closeicon = useRef();
  const count = useRef();
  const titleblock = useRef();
  const textblock = useRef();
  const postbutton = useRef();
  const postBrd = useRef();
  const pollpop = useRef();
  const polltitleblock = useRef();
  const pollInput = useRef();
  const pollInput2 = useRef();
  const pollInput3 = useRef();
  const pollInput4 = useRef();
  //
  const pollrefID = "ABCDEFGHIJKLMNOP";
  let captureID = "";
  for (let i = 0; i < 6; i++) {
    captureID += pollrefID.charAt(Math.floor(Math.random() * pollrefID.length));
  }
  console.log("CaptureID => ", captureID);
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
    const pollpop_ = pollpop.current.style;
    const pollpop2 = pollpop.current;
    //

    if (popupBx2.id === "show") {
      popupBx.transform = "translate(-50%, -50%) scale(0)";
      popupBx.pointerEvents = "none";
      setTimeout(() => {
        popupBx2.id = "";
      }, 1000);
    }
    if (pollpop2.id === "show") {
      pollpop_.transform = "translate(-50%, -50%) scale(0)";
      pollpop_.pointerEvents = "none";
      setTimeout(() => {
        pollpop2.id = "";
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
      alert("please fill in all fields");
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
  };

  const getPosts = async () => {
    const getpostBrd = postBrd.current;
    const usr = localStorage.getItem("user_id");
    const querySnapshot = await getDocs(collection(db, "postRef"));
    querySnapshot.forEach((doc) => {
      const createEl = document.createElement("div");
      //? doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().data.text);
      getpostBrd.appendChild(createEl);
      //
      //
      const counter2 = 0; // counter for upvote and downvote
      //* generate radom post id
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let upvoterand = "";
      for (let i = 0; i < 6; i++) {
        upvoterand += char.charAt(Math.floor(Math.random() * char.length));
      }
      let downvoterand = "";
      for (let i = 0; i < 6; i++) {
        downvoterand += char.charAt(Math.floor(Math.random() * char.length));
      }
      let counterrand = "";
      for (let i = 0; i < 6; i++) {
        counterrand += char.charAt(Math.floor(Math.random() * char.length));
      }
      createEl.innerHTML += `<div class=${styles.post_board}>
      <div class=${styles.post_board_content}>
        <div class=${styles.pst_left}>
          <div class=${styles.upvote} id=${upvoterand}>
            <i class="fa-light fa-up"></i>
          </div>
          <div class=${styles.count} id=${counterrand}>
            ${counter2}
          </div>
          <div class=${styles.downvote} id=${downvoterand}>
            <i class="fa-light fa-down"></i>
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
                <span ref=${post_user} id="getuserhtml"></span>
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
    </div>
    `;
      const getC = document.querySelector(`#${counterrand}`); // selecting the counter element
      function upvote() {
        counter++; // incrementing the counter
        getC.innerText = counter; // updating the counter element
        if (counter > 5) {
          // if the counter is greater than 5
          alert("you cant like more than 5"); // alert the user
          counter = 5; // set the counter to 5
        }
      }
      function downvote() {
        counter--; // decrementing the counter
        getC.innerText = counter; // updating the counter element
        if (counter < 1) {
          // if the counter is less than 1
          counter = 0; // set the counter to 0
          getC.innerText = counter; // update the counter element
          //
        }
      }
      const upv = document.querySelector(`#${upvoterand}`); // selecting the upvote element
      upv.onclick = () => {
        // if the upvote element is clicked
        upvote(); // call the upvote function
      };
      const downv = document.querySelector(`#${downvoterand}`); // selecting the downvote element
      downv.onclick = () => {
        // if the downvote element is clicked
        downvote(); // call the downvote function
      };
      const getuserhtml = document.querySelectorAll("#getuserhtml"); // selecting the user name element. *using querySelectorAll because the user name is generated dynamically
      if (usr) {
        // if the user is logged in
        console.log("usr => ", usr); // log the user details
        getuserhtml.forEach((element) => {
          element.innerText = "usr"; // update the user name element
        });
      } else {
        // if the user is not logged in
        console.log("no usr");
        getuserhtml.forEach((element) => {
          element.innerText = "guest"; // update the user name element
        });
      }
    });
    // *
    const querySnapshot2 = await getDocs(collection(db, "pollRef"));
    querySnapshot2.forEach((doc) => {
      const createEl = document.createElement("div");
      //? doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().data.text);
      getpostBrd.appendChild(createEl);
      //
      //
      const counter2 = 0; // counter for upvote and downvote
      const poll_count = 5; // counter for upvote and downvote
      const poll_count2 = 5; // counter for upvote and downvote
      const poll_count3 = 5; // counter for upvote and downvote
      const poll_count4 = 5; // counter for upvote and downvote
      //* generate radom post id
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let upvoterand = "";
      for (let i = 0; i < 6; i++) {
        upvoterand += char.charAt(Math.floor(Math.random() * char.length));
      }
      let downvoterand = "";
      for (let i = 0; i < 6; i++) {
        downvoterand += char.charAt(Math.floor(Math.random() * char.length));
      }
      let counterrand = "";
      for (let i = 0; i < 6; i++) {
        counterrand += char.charAt(Math.floor(Math.random() * char.length));
      }
      let randomPollNumb = "";
      for (let i = 0; i < 6; i++) {
        randomPollNumb += char.charAt(Math.floor(Math.random() * char.length));
      }
      let randomPollNumb2 = "";
      for (let i = 0; i < 6; i++) {
        randomPollNumb2 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let randomPollNumb3 = "";
      for (let i = 0; i < 6; i++) {
        randomPollNumb3 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let randomPollNumb4 = "";
      for (let i = 0; i < 6; i++) {
        randomPollNumb4 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let pollPercent = "";
      for (let i = 0; i < 6; i++) {
        pollPercent += char.charAt(Math.floor(Math.random() * char.length));
      }
      let pollPercent2 = "";
      for (let i = 0; i < 6; i++) {
        pollPercent2 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let pollPercent3 = "";
      for (let i = 0; i < 6; i++) {
        pollPercent3 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let pollPercent4 = "";
      for (let i = 0; i < 6; i++) {
        pollPercent4 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let dragID = "";
      for (let i = 0; i < 6; i++) {
        dragID += char.charAt(Math.floor(Math.random() * char.length));
      }
      let dragID2 = "";
      for (let i = 0; i < 6; i++) {
        dragID2 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let dragID3 = "";
      for (let i = 0; i < 6; i++) {
        dragID3 += char.charAt(Math.floor(Math.random() * char.length));
      }
      let dragID4 = "";
      for (let i = 0; i < 6; i++) {
        dragID4 += char.charAt(Math.floor(Math.random() * char.length));
      }
      console.log("PollPercent => ", pollPercent);
      createEl.innerHTML += `<div class=${styles.post_board}>
      <div class=${styles.post_board_content}>
        <div class=${styles.pst_left}>
          <div class=${styles.upvote} id=${upvoterand}>
            <i class="fa-light fa-up"></i>
          </div>
          <div class=${styles.count} id=${counterrand}>
            ${counter2}
          </div>
          <div class={styles.downvote} id=${downvoterand}>
            <i class="fa-light fa-down"></i>
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
                <span ref=${post_user} id="getuserhtml"></span>
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
              <span>${doc.data().data.title}</span>
              <div class=${styles.polls_context_menu}>
                <div class=${styles.poll_context} id=${randomPollNumb}>
                  <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab
      }</div>
                  <div class=${
                    styles.poll_numb_tab
                  } id=${pollPercent}>${poll_count}</div>
                  <div class=${styles.poll_drag} id=${dragID}></div>
                </div>
                <div class=${styles.poll_context} id=${randomPollNumb2}>
                  <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab2
      }</div>
                  <div class=${
                    styles.poll_numb_tab
                  } id=${pollPercent2}>${poll_count2}</div>
                  <div class=${styles.poll_drag} id=${dragID2}></div>
                </div>
                <div class=${styles.poll_context} id=${randomPollNumb3}>
                  <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab3
      }</div>
                  <div class=${
                    styles.poll_numb_tab
                  } id=${pollPercent3}>${poll_count3}</div>
                  <div class=${styles.poll_drag} id=${dragID3}></div>
                </div>
                <div class=${styles.poll_context} id=${randomPollNumb4}>
                  <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab4
      }</div>
                  <div class=${
                    styles.poll_numb_tab
                  } id=${pollPercent4}>${poll_count4}</div>
                  <div class=${styles.poll_drag} id=${dragID4}></div>
                </div>
              </div>
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
      const getC = document.querySelector(`#${counterrand}`); // selecting the counter element
      const pollPx = document.querySelector(`#${pollPercent}`);
      const pollPx2 = document.querySelector(`#${pollPercent2}`);
      const pollPx3 = document.querySelector(`#${pollPercent3}`);
      const pollPx4 = document.querySelector(`#${pollPercent4}`);
      const pollDrag = document.querySelector(`#${dragID}`);
      const pollDrag2 = document.querySelector(`#${dragID2}`);
      const pollDrag3 = document.querySelector(`#${dragID3}`);
      const pollDrag4 = document.querySelector(`#${dragID4}`);
      function upvote() {
        counter++; // incrementing the counter
        getC.innerText = counter; // updating the counter element
        if (counter > 5) {
          // if the counter is greater than 5
          alert("you cant like more than 5"); // alert the user
          counter = 5; // set the counter to 5
        }
      }
      function downvote() {
        counter--; // decrementing the counter
        getC.innerText = counter; // updating the counter element
        if (counter < 1) {
          // if the counter is less than 1
          counter = 0; // set the counter to 0
          getC.innerText = counter; // update the counter element
          //
        }
      }
      function updatePoll() {
        // if the poll tab element is clicked
        // multiply the counter by 10
        // and update the poll tab element
        poll_count = poll_count * 2;
        pollPx.innerText = poll_count + "%"; // update the poll tab element
        localStorage.setItem("poll_count", poll_count + "%");
        pollDrag.style.width = poll_count + "%"; // update the poll drag element

        const pollid =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const voteRef = docFuck(db, "pollRef", pollid);

        const poll_menu = {
          title: localStorage.getItem("poll_title"),
          poll_tab: localStorage.getItem("poll_tab"),
          poll_tab2: localStorage.getItem("poll_tab2"),
          poll_tab3: localStorage.getItem("poll_tab3"),
          poll_tab4: localStorage.getItem("poll_tab4"),
          poll_count: localStorage.getItem("poll_count"),
        };
        setDoc(voteRef, {
          data: poll_menu,
        });
        setTimeout(() => {
          deleteDoc(docFuck(db, "pollRef", localStorage.getItem("previousID")));
        }, 1000);

        if (poll_count > 100) {
          poll_count = 100;
          pollPx.innerText = poll_count + "%";
          localStorage.setItem("poll_count", poll_count + "%");
          pollDrag.style.width = poll_count + "%";

          const poll_menu = {
            title: localStorage.getItem("poll_title"),
            poll_tab: localStorage.getItem("poll_tab"),
            poll_tab2: localStorage.getItem("poll_tab2"),
            poll_tab3: localStorage.getItem("poll_tab3"),
            poll_tab4: localStorage.getItem("poll_tab4"),
            poll_count: localStorage.getItem("poll_count"),
          };

          setDoc(voteRef, {
            data: poll_menu,
          });
        } // if the poll count is greater than 100
        console.log(poll_count);
      }

      function updatePoll2() {
        poll_count2 = poll_count2 * 2;
        pollPx2.innerText = poll_count2 + "%";
        localStorage.setItem("poll_count2", poll_count2 + "%");

        const pollid =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const voteRef = docFuck(db, "pollRef", pollid);

        const votes = {
          data_count2: localStorage.getItem("poll_count2"),
        };

        setDoc(voteRef, {
          datas: votes,
        });

        pollDrag2.style.width = poll_count2 + "%";
        if (poll_count2 > 100) {
          poll_count2 = 100;
          pollPx2.innerText = poll_count2 + "%";
          localStorage.setItem("poll_count2", poll_count2 + "%");
          pollDrag2.style.width = poll_count2 + "%";

          const votes = {
            data_count2: localStorage.getItem("poll_count2"),
          };

          setDoc(voteRef, {
            datas: votes,
          });
        }
        console.log(poll_count);
      }

      function updatePoll3() {
        poll_count3 = poll_count3 * 2;
        pollPx3.innerText = poll_count3 + "%";
        localStorage.setItem("poll_count3", poll_count3 + "%");

        const pollid =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const voteRef = docFuck(db, "pollRef", pollid);

        const votes = {
          data_count3: localStorage.getItem("poll_count3"),
        };

        setDoc(voteRef, {
          datas: votes,
        });

        pollDrag3.style.width = poll_count3 + "%";
        if (poll_count3 > 100) {
          poll_count3 = 100;
          pollPx3.innerText = poll_count3 + "%";
          localStorage.setItem("poll_count3", poll_count3 + "%");
          pollDrag3.style.width = poll_count3 + "%";

          const votes = {
            data_count3: localStorage.getItem("poll_count3"),
          };

          setDoc(voteRef, {
            datas: votes,
          });
        }
        console.log(poll_count);
      }

      function updatePoll4() {
        poll_count4 = poll_count4 * 2;
        pollPx4.innerText = poll_count4 + "%";
        localStorage.setItem("poll_count4", poll_count4 + "%");
        pollDrag4.style.width = poll_count4 + "%";

        const pollid =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        const voteRef = docFuck(db, "pollRef", pollid);

        const votes = {
          data_count4: localStorage.getItem("poll_count4"),
        };

        setDoc(voteRef, {
          datas: votes,
        });

        if (poll_count4 > 100) {
          poll_count4 = 100;
          pollPx4.innerText = poll_count4 + "%";
          localStorage.setItem("poll_count4", poll_count4 + "%");
          pollDrag4.style.width = poll_count4 + "%";

          const votes = {
            data_count4: localStorage.getItem("poll_count4"),
          };

          setDoc(voteRef, {
            datas: votes,
          });
        }
        console.log(poll_count);
      }
      const upv = document.querySelector(`#${upvoterand}`); // selecting the upvote element
      upv.onclick = () => {
        // if the upvote element is clicked
        upvote(); // call the upvote function
      };
      const downv = document.querySelector(`#${downvoterand}`); // selecting the downvote element
      downv.onclick = () => {
        // if the downvote element is clicked
        downvote(); // call the downvote function
      };
      const pollCaller = document.querySelector(`#${randomPollNumb}`); // selecting the poll tab element
      const pollCaller2 = document.querySelector(`#${randomPollNumb2}`); // selecting the poll tab element
      const pollCaller3 = document.querySelector(`#${randomPollNumb3}`); // selecting the poll tab element
      const pollCaller4 = document.querySelector(`#${randomPollNumb4}`); // selecting the poll tab element

      pollCaller.onclick = () => {
        updatePoll();

        localStorage.setItem("tabDisabled", true);

        const checkLocalStorage = localStorage.getItem("tabDisabled");

        if (checkLocalStorage === "true") {
          console.log("local storage set");
          pollCaller.style.pointerEvents = "none";
          pollCaller2.style.pointerEvents = "none";
          pollCaller3.style.pointerEvents = "none";
          pollCaller4.style.pointerEvents = "none";
        } else {
          console.log("local storage set");
        }
      };
      pollCaller2.onclick = () => {
        updatePoll2();

        localStorage.setItem("tabDisabled", true);

        const checkLocalStorage = localStorage.getItem("tabDisabled");

        if (checkLocalStorage === "true") {
          console.log("local storage set");
          pollCaller.style.pointerEvents = "none";
          pollCaller2.style.pointerEvents = "none";
          pollCaller3.style.pointerEvents = "none";
          pollCaller4.style.pointerEvents = "none";
        } else {
          console.log("local storage set");
        }
      };
      pollCaller3.onclick = () => {
        updatePoll3();

        localStorage.setItem("tabDisabled", true);

        const checkLocalStorage = localStorage.getItem("tabDisabled");

        if (checkLocalStorage === "true") {
          console.log("local storage set");
          pollCaller.style.pointerEvents = "none";
          pollCaller2.style.pointerEvents = "none";
          pollCaller3.style.pointerEvents = "none";
          pollCaller4.style.pointerEvents = "none";
        } else {
          console.log("local storage set");
        }
      };
      pollCaller4.onclick = () => {
        updatePoll4();

        localStorage.setItem("tabDisabled", true);

        const checkLocalStorage = localStorage.getItem("tabDisabled");

        if (checkLocalStorage === "true") {
          console.log("local storage set");
          pollCaller.style.pointerEvents = "none";
          pollCaller2.style.pointerEvents = "none";
          pollCaller3.style.pointerEvents = "none";
          pollCaller4.style.pointerEvents = "none";
        } else {
          console.log("local storage set");
        }
      };

      setTimeout(() => {
        // remove pointer events
        // if localstorage "tabDisabled" is present
        if (localStorage.getItem("tabDisabled") === "true") {
          console.log("local storage set");
          pollCaller.style.pointerEvents = "none";
          pollCaller2.style.pointerEvents = "none";
          pollCaller3.style.pointerEvents = "none";
          pollCaller4.style.pointerEvents = "none";
        } else {
          console.log("local storage not set");
        }
      }, 1000); // wait 1 seconds
      const getuserhtml = document.querySelectorAll("#getuserhtml"); // selecting the user name element. *using querySelectorAll because the user name is generated dynamically
      if (usr) {
        // if the user is logged in
        console.log("usr => ", usr); // log the user details
        getuserhtml.forEach((element) => {
          element.innerText = "usr"; // update the user name element
        });
      } else {
        // if the user is not logged in
        console.log("no usr");
        getuserhtml.forEach((element) => {
          element.innerText = "guest"; // update the user name element
        });
      }
    });
    // += is used to append the content to the existing content
  };
  const showPollMenu = async () => {
    const pollpop_ = pollpop.current.style;
    const pollpop2 = pollpop.current;
    const popupBx = popup.current.style;
    const popupBx2 = popup.current;
    //
    pollpop_.transform = "translate(-50%, -50%) scale(1)";
    pollpop_.pointerEvents = "auto";
    // give popupBx an ID of "show"
    pollpop2.id = "show";
    //

    if (popupBx2.id === "show") {
      popupBx.transform = "translate(-50%, -50%) scale(0)";
      popupBx.pointerEvents = "none";
      setTimeout(() => {
        popupBx2.id = "";
      }, 1000);
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src="/favicon.ico" alt="PrimeEx" width={50} height={50} />
        </div>
        <div className={styles.nav_links}>
          <Link href="/">
            <a>
              <i className="fa-solid fa-house"></i>
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
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_info_icon}>
            <Image src="/favicon.ico" width={50} height={50} alt="userimage" />
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
                  <span>This is me testing the new PrimeEx Poll feature.</span>
                  <div className={styles.polls_context_menu}>
                    <div className={styles.poll_context}>
                      <div className={styles.poll_menu_text}>Option A</div>
                      <div className={styles.poll_numb_tab}>5%</div>
                      <div className={styles.poll_drag}></div>
                    </div>
                    <div className={styles.poll_context}>
                      <div className={styles.poll_menu_text}>Option B</div>
                      <div className={styles.poll_numb_tab}>5%</div>
                      <div className={styles.poll_drag}></div>
                    </div>
                    <div className={styles.poll_context}>
                      <div className={styles.poll_menu_text}>Option C</div>
                      <div className={styles.poll_numb_tab}>5%</div>
                      <div className={styles.poll_drag}></div>
                    </div>
                    <div className={styles.poll_context}>
                      <div className={styles.poll_menu_text}>Option D</div>
                      <div className={styles.poll_numb_tab}>5%</div>
                      <div className={styles.poll_drag}></div>
                    </div>
                  </div>
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
      {/* popup input box */}
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
          <div className={styles.tab} onClick={showPollMenu}>
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
      {/* poll menu box */}
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
                placeholder="OptionB"
                id="getinput"
                ref={pollInput3}
              />
            </div>
            <div className={styles.poll_input}>
              <input
                type="text"
                placeholder="OptionB"
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
    </div>
  );
}
