import newstyle from "../../../styles/posts.module.css";
import styles from "../../../styles/Home.module.css";
export function CreateImagePost(imagepostRef, doc) {
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
          alt="image of post"
          style="object-fit: cover;
          border-radius: 5px;
          width: 100%;
          height: 500px;"
        />
      </div>
      <div class=${styles.pst_right_bottom_info}>
                  <div class=${styles.psttab}>
                    <div class=${styles.psttab_right_info}>
                      <span class=${styles.info_actions}>
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>0</span>
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
                  <i class="fa-regular fa-thumbs-up"></i>
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
              </div>`;
}
