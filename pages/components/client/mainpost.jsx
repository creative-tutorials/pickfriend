import styles from "../../../styles/Home.module.css";

export function MainPost(createEl, post_user, doc) {
  // creating a function to fetch the post from the database
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
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
}
