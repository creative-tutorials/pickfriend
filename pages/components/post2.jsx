import React from "react";
import Image from 'next/image'
import styles from "../../styles/Home.module.css";
export function Post2({
  upvote,
  count,
  counter,
  downvote,
  post_user
}) {
  return <div className={styles.post_board}>
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
                  <Image src="/favicon.ico" width={30} height={30} alt="userimage" />
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
                {
              /* comment */
            }
                <div className={styles.comment_icon}>
                  <i className="fa-regular fa-comment-dots"></i>
                </div>
                {
              /* share */
            }
                <div className={styles.share_icon}>
                  <i className="fa-regular fa-share-alt"></i>
                </div>
                {
              /* save */
            }
                <div className={styles.save_icon}>
                  <i className="fa-regular fa-bookmark"></i>
                </div>
                {
              /* sponsor */
            }
                <div className={styles.sponsor_icon}>
                  <i className="fa-regular fa-user-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
}
  