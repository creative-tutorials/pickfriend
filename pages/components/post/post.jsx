import { Info1 } from "./info1";
import React from "react";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
export function Post({ post_user }) {
  return (
    <div className={styles.post_board}>
      <div className={styles.post_board_content}>
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
                Building the next generation social network - PickFriend
                PickFriend is a social network that allows you to connect with
                people around the world, share your thoughts and ideas, and
                interact with other people.
              </span>
            </div>
            <PstTab />
            <div className={styles.pst_right_bottom_icon}>
              {/* like */}
              <div className={styles.like_icon}>
                <i className="fa-regular fa-thumbs-up"></i>
              </div>
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
              {/* repost */}
              <div className={styles.repost_icon}>
                <i className="fa-solid fa-rotate-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function PstTab({}) {
    return (
      <div className={styles.pst_right_bottom_info}>
        <div className={styles.psttab}>
          <div className={styles.psttab_right_info}>
            <span className={styles.info_actions}>
              <i className="fa-regular fa-thumbs-up"></i>
              <span>0</span>
            </span>
          </div>
          <div className={styles.psttab_left_info}>
            <span className={styles.info_actions}>
              <i className="fa-regular fa-comment-dots"></i>
              <span>0</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
