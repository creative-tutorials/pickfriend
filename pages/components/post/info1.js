import React from "react";
import styles from "../../../styles/Home.module.css";
export function Info1({}) {
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
