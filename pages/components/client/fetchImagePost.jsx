import newstyle from "../../../styles/posts.module.css";
import styles from "../../../styles/Home.module.css";
export function CreateImagePost(imagepostRef, doc, db, docRef, updateDoc) {
  imagepostRef.innerHTML = `<div class=${newstyle.imgpost_top}>
  <div class=${newstyle.top_of_top}>
    <Image width=${30} height=${30} style="object-fit: cover;" src="/favicon.ico" alt="user image" />
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
  <Image src="${
    doc.data().data.image
  }" alt="image of post" style="object-fit: cover;
          border-radius: 5px;
          width: 100%;
          height: 500px;"
      placeholder=${"blur"}
      blurDataURL=${doc.data().data.image}
  />
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
        <i class="fa-light fa-comment-lines"></i>
        <span>0</span>
      </span>
    </div>
  </div>
</div>
<div class=${styles.pst_right_bottom_icon}>
  <div class=${styles.like_icon}>
    <i class="fa-regular fa-thumbs-up ${"like2"}"></i>
  </div>

  <div class=${styles.comment_icon}>
    <i class="fa-light fa-comment-lines"></i>
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
</div>`;

  const likeicon = document.querySelectorAll(".like2");
  const like_count = doc.data().counterDB;
  const retriveCounter = docRef(
    db,
    "ImagePost",
    localStorage.getItem("imgpostid")
  );
  likeicon.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.replace("fa-thumbs-up", "fa-thumbs-down");
      like_count++;
      updateDoc(retriveCounter, {
        counterDB: like_count,
      });

      document.cookie =
        "test=test; expires=Sat, 31 Dec 2022 00:00:00 UTC; path=/;"; // set cookie to expire in 2022
      if (document.cookie.includes("test")) {
        console.log("cookie is set");
        element.style.pointerEvents = "none";
      } else {
        console.log("cookie is not set");
        element.style.pointerEvents = "auto";
      }

      if (document.cookie.indexOf("test=test") !== -1) {
        console.info("=>", "cookie is set"); // if cookie is set, then don't allow the user to like the post again
        likeicon.forEach((element) => {
          // looping through the like icon, if the user has liked the post, increase the number of likes
          element.style.pointerEvents = "none";
        });
      } else {
        console.error("=>", "cookie is not set"); // if cookie is not set, then allow the user to like the post again

        likeicon.forEach((element) => {
          element.style.pointerEvents = "auto";
        });
      }
    });
  });
}
