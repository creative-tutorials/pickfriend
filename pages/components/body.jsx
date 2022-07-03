import { Post2 } from "./post2";
import { Post } from "./post";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRef, useEffect } from "react";
import {
  doc as docRef,
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

  const getUserStatus = async () => {
    const usr = localStorage.getItem("user_id");
    const getPostUser = post_user.current;
    if (usr) {
      console.log("user is logged in");
      getPostUser.innerHTML = "user";
    } else {
      console.log("user is not logged in");
      getPostUser.innerHTML = "null";
    }
  };

  const showPopup = () => {
    // local
    localStorage.setItem("popup", true);
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
      const randomPollNumb = generateFirstIDElement();
      const randomPollNumb2 = generateSecondIDElement();
      const randomPollNumb3 = generateThirdIDElement();
      const randomPollNumb4 = generateFourthIDElement();
      const FirstpollValue = ""; // pollPercent is the ID of the pollPercent element
      for (let i = 0; i < 6; i++) {
        FirstpollValue += char.charAt(Math.floor(Math.random() * char.length));
      }
      const SecondpollValue = "";
      for (let i = 0; i < 6; i++) {
        SecondpollValue += char.charAt(Math.floor(Math.random() * char.length));
      }
      const ThirdpollValue = "";
      for (let i = 0; i < 6; i++) {
        ThirdpollValue += char.charAt(Math.floor(Math.random() * char.length));
      }
      const FourthpollValue = "";
      for (let i = 0; i < 6; i++) {
        FourthpollValue += char.charAt(Math.floor(Math.random() * char.length));
      }
      const dragID = updatePollEl();
      const dragID2 = updatePollEl();
      const dragID3 = updatePollEl();
      const dragID4 = updatePollEl();
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
                      <div class=${styles.poll_numb_tab} id=${FirstpollValue}>${
        doc.data().data.poll_count
      }</div>
                      <div class=${styles.poll_drag} id=${dragID}></div>
                    </div>
                    <div class=${styles.poll_context} id=${randomPollNumb2}>
                      <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab2
      }</div>
                      <div class=${
                        styles.poll_numb_tab
                      } id=${SecondpollValue}>${
        doc.data().data.poll_count2
      }</div>
                      <div class=${styles.poll_drag} id=${dragID2}></div>
                    </div>
                    <div class=${styles.poll_context} id=${randomPollNumb3}>
                      <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab3
      }</div>
                      <div class=${styles.poll_numb_tab} id=${ThirdpollValue}>${
        doc.data().data.poll_count3
      }</div>
                      <div class=${styles.poll_drag} id=${dragID3}></div>
                    </div>
                    <div class=${styles.poll_context} id=${randomPollNumb4}>
                      <div class=${styles.poll_menu_text}>${
        doc.data().data.poll_tab4
      }</div>
                      <div class=${
                        styles.poll_numb_tab
                      } id=${FourthpollValue}>${
        doc.data().data.poll_count4
      }</div>
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
      const pollPx = document.querySelector(`#${FirstpollValue}`);
      const pollPx2 = document.querySelector(`#${SecondpollValue}`);
      const pollPx3 = document.querySelector(`#${ThirdpollValue}`);
      const pollPx4 = document.querySelector(`#${FourthpollValue}`);
      const pollDrag = document.querySelector(`#${dragID}`);
      const pollDrag2 = document.querySelector(`#${dragID2}`);
      const pollDrag3 = document.querySelector(`#${dragID3}`);
      const pollDrag4 = document.querySelector(`#${dragID4}`);

      function updatePollEl() {
        const dragID = "";
        for (let i = 0; i < 6; i++) {
          dragID += char.charAt(Math.floor(Math.random() * char.length));
        }
        const dragID2 = "";
        for (let i = 0; i < 6; i++) {
          dragID2 += char.charAt(Math.floor(Math.random() * char.length));
        }
        const dragID3 = "";
        for (let i = 0; i < 6; i++) {
          dragID3 += char.charAt(Math.floor(Math.random() * char.length));
        }
        const dragID4 = "";
        for (let i = 0; i < 6; i++) {
          dragID4 += char.charAt(Math.floor(Math.random() * char.length));
        }
      }

      function generateFourthIDElement() {
        const randomPollNumb4 = "";
        for (let i = 0; i < 6; i++) {
          randomPollNumb4 += char.charAt(
            Math.floor(Math.random() * char.length)
          );
        }
        return randomPollNumb4;
      }

      function generateThirdIDElement() {
        const randomPollNumb3 = "";
        for (let i = 0; i < 6; i++) {
          randomPollNumb3 += char.charAt(
            Math.floor(Math.random() * char.length)
          );
        }
        return randomPollNumb3;
      }

      function generateSecondIDElement() {
        const randomPollNumb2 = "";
        for (let i = 0; i < 6; i++) {
          randomPollNumb2 += char.charAt(
            Math.floor(Math.random() * char.length)
          );
        }
        return randomPollNumb2;
      }

      function generateFirstIDElement() {
        const randomPollNumb = "";
        for (let i = 0; i < 6; i++) {
          randomPollNumb += char.charAt(
            Math.floor(Math.random() * char.length)
          );
        }
        return randomPollNumb;
      }

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

        const updateFirstPoll = () => {
          poll_count = poll_count * 2;
          pollPx.innerText = poll_count + "%";
          localStorage.setItem("poll_count", poll_count + "%");
          pollDrag.style.width = poll_count + "%"; // update the poll drag element

          const pollid =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const voteRef = docRef(db, "pollRef", pollid);

          const getLocalStorageItems = {
            title: localStorage.getItem("poll_title"),
            poll_tab: localStorage.getItem("poll_tab"),
            poll_tab2: localStorage.getItem("poll_tab2"),
            poll_tab3: localStorage.getItem("poll_tab3"),
            poll_tab4: localStorage.getItem("poll_tab4"),
            poll_count: localStorage.getItem("poll_count"),
          };
          setDoc(voteRef, {
            data: getLocalStorageItems,
          });
          setTimeout(() => {
            deleteDoc(
              docRef(db, "pollRef", localStorage.getItem("previousID"))
            );
          }, 1000);

          if (poll_count > 100) {
            poll_count = 100;
            pollPx.innerText = poll_count + "%";
            localStorage.setItem("poll_count", poll_count + "%");
            pollDrag.style.width = poll_count + "%";

            const getLocalStorageItems = {
              title: localStorage.getItem("poll_title"),
              poll_tab: localStorage.getItem("poll_tab"),
              poll_tab2: localStorage.getItem("poll_tab2"),
              poll_tab3: localStorage.getItem("poll_tab3"),
              poll_tab4: localStorage.getItem("poll_tab4"),
              poll_count: localStorage.getItem("poll_count"),
            };

            setDoc(voteRef, {
              data: getLocalStorageItems,
            });
          }
          console.log(poll_count);
        };

        const updateSecondPoll = () => {
          poll_count2 = poll_count2 * 2;
          pollPx2.innerText = poll_count2 + "%";
          localStorage.setItem("poll_count2", poll_count2 + "%");
          pollDrag2.style.width = poll_count2 + "%";

          const pollid =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const voteRef = docRef(db, "pollRef", pollid);

          const getLocalStorageItems = {
            title: localStorage.getItem("poll_title"),
            poll_tab: localStorage.getItem("poll_tab"),
            poll_tab2: localStorage.getItem("poll_tab2"),
            poll_tab3: localStorage.getItem("poll_tab3"),
            poll_tab4: localStorage.getItem("poll_tab4"),
            poll_count2: localStorage.getItem("poll_count2"),
          };

          setDoc(voteRef, {
            data: getLocalStorageItems,
          });

          setTimeout(() => {
            deleteDoc(
              docRef(db, "pollRef", localStorage.getItem("previousID"))
            );
          }, 1000);

          if (poll_count2 > 100) {
            poll_count2 = 100;
            pollPx2.innerText = poll_count2 + "%";
            localStorage.setItem("poll_count2", poll_count2 + "%");
            pollDrag2.style.width = poll_count2 + "%";

            const getLocalStorageItems = {
              title: localStorage.getItem("poll_title"),
              poll_tab: localStorage.getItem("poll_tab"),
              poll_tab2: localStorage.getItem("poll_tab2"),
              poll_tab3: localStorage.getItem("poll_tab3"),
              poll_tab4: localStorage.getItem("poll_tab4"),
              poll_count2: localStorage.getItem("poll_count2"),
            };

            setDoc(voteRef, {
              data: getLocalStorageItems,
            });
          }
        };

        const updateThirdPoll = () => {
          poll_count3 = poll_count3 * 2;
          pollPx3.innerText = poll_count3 + "%";
          localStorage.setItem("poll_count3", poll_count3 + "%");
          pollDrag3.style.width = poll_count3 + "%";

          const pollid =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const voteRef = docRef(db, "pollRef", pollid);

          const getLocalStorageItems = {
            title: localStorage.getItem("poll_title"),
            poll_tab: localStorage.getItem("poll_tab"),
            poll_tab2: localStorage.getItem("poll_tab2"),
            poll_tab3: localStorage.getItem("poll_tab3"),
            poll_tab4: localStorage.getItem("poll_tab4"),
            poll_count3: localStorage.getItem("poll_count3"),
          };

          setDoc(voteRef, {
            data: getLocalStorageItems,
          });

          setTimeout(() => {
            deleteDoc(
              docRef(db, "pollRef", localStorage.getItem("previousID"))
            );
          }, 1000);

          if (poll_count3 > 100) {
            poll_count3 = 100;
            pollPx3.innerText = poll_count3 + "%";
            localStorage.setItem("poll_count3", poll_count3 + "%");
            pollDrag3.style.width = poll_count3 + "%";

            const getLocalStorageItems = {
              title: localStorage.getItem("poll_title"),
              poll_tab: localStorage.getItem("poll_tab"),
              poll_tab2: localStorage.getItem("poll_tab2"),
              poll_tab3: localStorage.getItem("poll_tab3"),
              poll_tab4: localStorage.getItem("poll_tab4"),
              poll_count3: localStorage.getItem("poll_count3"),
            };

            setDoc(voteRef, {
              data: getLocalStorageItems,
            });
          }
          console.log(poll_count);
        };

        const updateFourthPoll = () => {
          poll_count4 = poll_count4 * 2;
          pollPx4.innerText = poll_count4 + "%";
          localStorage.setItem("poll_count4", poll_count4 + "%");
          pollDrag4.style.width = poll_count4 + "%";

          const pollid =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const voteRef = docRef(db, "pollRef", pollid);

          const getLocalStorageItems = {
            title: localStorage.getItem("poll_title"),
            poll_tab: localStorage.getItem("poll_tab"),
            poll_tab2: localStorage.getItem("poll_tab2"),
            poll_tab3: localStorage.getItem("poll_tab3"),
            poll_tab4: localStorage.getItem("poll_tab4"),
            poll_count3: localStorage.getItem("poll_count3"),
          };

          setDoc(voteRef, {
            data: getLocalStorageItems,
          });

          setTimeout(() => {
            deleteDoc(
              docRef(db, "pollRef", localStorage.getItem("previousID"))
            );
          }, 1000);

          if (poll_count4 > 100) {
            poll_count4 = 100;
            pollPx4.innerText = poll_count4 + "%";
            localStorage.setItem("poll_count4", poll_count4 + "%");
            pollDrag4.style.width = poll_count4 + "%";

            const getLocalStorageItems = {
              title: localStorage.getItem("poll_title"),
              poll_tab: localStorage.getItem("poll_tab"),
              poll_tab2: localStorage.getItem("poll_tab2"),
              poll_tab3: localStorage.getItem("poll_tab3"),
              poll_tab4: localStorage.getItem("poll_tab4"),
              poll_count4: localStorage.getItem("poll_count4"),
            };

            setDoc(voteRef, {
              data: getLocalStorageItems,
            });
          }
          console.log(poll_count);
        };
        updateFirstPoll();
        updateSecondPoll();
        updateThirdPoll();
        updateFourthPoll();
      }

      const upv = document.querySelector(`#${upvoterand}`); // selecting the upvote element
      upv.onclick = () => {
        upvote(); // call the upvote function
      };
      const downv = document.querySelector(`#${downvoterand}`); // selecting the downvote element
      downv.onclick = () => {
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
      pollCaller3.onclick = () => {
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
      pollCaller4.onclick = () => {
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
  return (
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
      <Post
        upvote={upvote}
        count={count}
        counter={counter}
        downvote={downvote}
        post_user={post_user}
      />
      <Post2
        upvote={upvote}
        count={count}
        counter={counter}
        downvote={downvote}
        post_user={post_user}
      />
    </div>
  );
}
