import React from "react";
import Link from 'next/link'
import styles from "../../../styles/Home.module.css";
export function Sidebar({
  currSidebar
}) {
  return <div className={styles.sidebar} ref={currSidebar}>
        <div className={styles.sidebar_search}>
          <input type="text" placeholder="Search PickFriend" />
        </div>
        <div className={styles.sidebar_item}>
          <div className={styles.itemsSidebar}>
            {
          /* FontAwesome Home Icon */
        }
            <Link href="/">
              <a>
                <i className="fa-light fa-house"></i>
                <span>Home</span>
              </a>
            </Link>
            <Link href={"/notification"}>
              <a>
                <i className="fa-light fa-bell"></i>
                <span>Notification</span>
              </a>
            </Link>
            <Link href={"/profile"}>
              <a>
                <i className="fa-light fa-user"></i>
                <span>Profile</span>
              </a>
            </Link>
            {
          /* bookmark icon */
        }
            <Link href={"/bookmark"}>
              <a>
                <i className="fa-light fa-bookmark"></i>
                <span>Bookmark</span>
              </a>
            </Link>
            {
          /* chat icon */
        }
            <Link href={"/chat"}>
              <a>
                <i className="fa-light fa-comments"></i>
                <span>Chat</span>
              </a>
            </Link>
          </div>
        </div>
      </div>;
}
  