import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
export function Header({ header_user, toogleClass, toogleSidebar, dropdwn }) {
  return (
    <div className={styles.header} header_user={header_user}>
      <div className={styles.logo} onClick={toogleSidebar}>
        <Image
          src="/app icon.png"
          alt="pickieimage"
          width={70}
          height={70}
          style={{
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>
      <div className={styles.nav_links}>
        <Link href="/">
          <a>
            <i className="fa-solid fa-house"></i>
          </a>
        </Link>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search PickFriend" />
      </div>
      <div className={styles.action_links}>
        <Link href="/chat">
          <a>
            <i className="fa-light fa-comments"></i>
          </a>
        </Link>
        <Link href="/notification">
          <a>
            <i className="fa-light fa-bell"></i>
          </a>
        </Link>
      </div>
      <div className={styles.user_info}>
        <div className={styles.user_info_icon} onClick={toogleClass}>
          <Image src="/favicon.ico" width={50} height={50} alt="userimage" />
        </div>
        <div className={styles.dropdown} ref={dropdwn}>
          <div className={styles.settings}>
            <div className={styles.details}>
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="userimage"
                style={{
                  borderRadius: "50%",
                }}
                placeholder={"blur"}
                blurDataURL={`/logo.png`}
              />
              <span ref={header_user}></span>
            </div>
            <div className={styles.cjx}>
              <i className="fa-solid fa-gear"></i>
              <p>Settings</p>
            </div>
            <div className={styles.cjx}>
              <i className="fa-solid fa-circle-question"></i>
              <p>Help</p>
            </div>
            <div className={styles.cjx}>
              <i className="fa-solid fa-universal-access"></i>
              <p>Accessibility</p>
            </div>
            <div className={styles.cjx}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p>Log Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
