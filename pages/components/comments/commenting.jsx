import React from "react";
import cmnt from "../../../styles/comments.module.css";
import avatar from "../../../avatar/student.jpeg";
import Image from "next/image";
export function Commenting({}) {
  return (
    <div className={cmnt.comment_thread}>
      <div className={cmnt.comment_thread_top}>
        <div className={cmnt.comment_thread_top_left}>
          <div className={cmnt.comment_thread_top_left_icon}>
            <Image
              width={50}
              height={50}
              objectFit="cover"
              src={avatar}
              alt="user_image"
              placeholder="blur"
              blurDataURL={avatar}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
          <div className={cmnt.comment_thread_top_left_name}>test</div>
          <div className={cmnt.comment_thread_top_left_time}>1 hour ago</div>
        </div>
      </div>
      <div className={cmnt.comment_thread_bottom}>
        <div className={cmnt.comment_thread_bottom_text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni facere
          illo aspernatur aliquam sequi, pariatur dolor doloremque quisquam
          veniam temporibus ipsam fuga dolore quis vero sint consequatur,
          cupiditate nisi voluptates.
        </div>
      </div>
    </div>
  );
}
