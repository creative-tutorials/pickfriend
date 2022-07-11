import React from "react";
import Image from "next/image";
import newstyle from "../../../styles/posts.module.css";
export function ImagePost({}) {
  return (
    <div className={newstyle.image_post}>
      <div className={newstyle.imgpost_top}>
        <div className={newstyle.top_of_top}>
          <Image
            width={30}
            height={30}
            objectFit="cover"
            src={"/favicon.ico"}
            alt="user image"
          />
          <div className={newstyle.top_of_left_name}>
            <span className={newstyle.usex_namx}>
              <span>User Name</span>
            </span>
          </div>
          <div className={newstyle.top_of_right_time}>
            <span className={newstyle.clock}>
              <i className="fa-regular fa-clock"></i>
              <span>1 hour ago</span>
            </span>
          </div>
        </div>
      </div>
      <div className={newstyle.imgpost_text}>
        <div className={newstyle.text}>
          Hello World, this is a test post. try to see how it looks like.
        </div>
      </div>
      <div className={newstyle.image}>
        <Image
          src="/postImage/unspalsh_lab1.png"
          width={500}
          height={300}
          alt="image of post"
          objectFit="cover"
          style={{
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
}
