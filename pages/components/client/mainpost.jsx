import styles from "../../../styles/Home.module.css";
export function sendTextPost(createEl, doc, docRef, db, updateDoc) {
  createEl.innerHTML += `<div class=${styles.post_board}>
  <div class=${styles.post_board_content}>
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
            <span class=${styles.userhtml} id="getuserhtml">User Name</span>
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
        <div class=${styles.pst_right_bottom_info}>
          <div class=${styles.psttab}>
            <div class=${styles.psttab_right_info}>
              <span class=${styles.info_actions}>
                <i class="fa-regular fa-thumbs-up"></i>
                <span id=${"countHTML"}>${doc.data().counterDB}</span>
              </span>
            </div>
            <div class=${styles.psttab_left_info}>
              <span class=${styles.info_actions}>
                <i class="fa-regular fa-comment-dots"></i>
                <span>0</span>
              </span>
            </div>
          </div>
        </div>
        <div class=${styles.pst_right_bottom_icon}>
          <div class=${styles.like_icon}>
            <i class="fa-regular fa-thumbs-up" id=${"like"}></i>
          </div>

          <div class=${styles.comment_icon}>
            <i class="fa-regular fa-comment-dots"></i>
          </div>

          <div class=${styles.share_icon}>
            <i class="fa-regular fa-share-alt"></i>
          </div>

          <div class=${styles.save_icon}>
            <i class="fa-regular fa-bookmark"></i>
          </div>

          <div class=${styles.repost_icon}>
          <i class="fa-solid fa-rotate-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  const likeicon = document.querySelectorAll("#like");
  const like_count = doc.data().counterDB;
  const retriveCounter = docRef(
    db,
    "postRef",
    localStorage.getItem("retrieveId")
  );
  likeicon.forEach((element) => {
    // looping through the like icon, if the user has liked the post, increase the number of likes
    element.addEventListener("click", () => {
      if (element.classList.contains("fa-thumbs-up")) {
        element.classList.remove("fa-thumbs-up");
        element.classList.add("fa-thumbs-down");
        like_count++;
        updateDoc(retriveCounter, {
          counterDB: like_count,
        });
      } else {
        element.classList.remove("fa-thumbs-down");
        element.classList.add("fa-thumbs-up");
        like_count--;
        updateDoc(retriveCounter, {
          counterDB: like_count,
        });
      }
      document.cookie =
        "test=test; expires=Sat, 31 Dec 2022 00:00:00 UTC; path=/;"; // set cookie to expire in 2022
      if (document.cookie.includes("test")) {
        console.log("cookie is set");
        element.style.pointerEvents = "none";
      } else {
        console.log("cookie is not set");
        element.style.pointerEvents = "auto";
      }
    });
  });

  if (document.cookie.indexOf("test=test") !== -1) {
    console.info("cookie is set"); // if cookie is set, then don't allow the user to like the post again
    likeicon.forEach((element) => {
      // looping through the like icon, if the user has liked the post, increase the number of likes
      element.style.pointerEvents = "none";
    });
  } else {
    console.error("cookie is not set"); // if cookie is not set, then allow the user to like the post again

    likeicon.forEach((element) => {
      element.style.pointerEvents = "auto";
    });
  }
}
