import React from "react";
import Link from 'next/link'
import nutcss from "../../../styles/notify.module.css";
export function Notifypop({ slideNotify, changeText }) {
  return (
    <div className={nutcss.slide_notification} ref={slideNotify}>
      <div className={nutcss.slide_notification_text}>
        <p ref={changeText}>
          <span>
            <i className="fa-light fa-bell"></i>
          </span>
          Your Image has been uploaded click{" "}
          <Link href="/components/clipboard/clipbrd">
            <a>here to generate a link for it</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
