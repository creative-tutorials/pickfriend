import { Commenting } from "./commenting";
import React from "react";
import cmnt from "../../../styles/comments.module.css";
import Image from "next/image";
import avatar from "../../../avatar/avatr.png";
export function Index({}) {
  return (
    <div className={cmnt.cpBox}>
      <div className={cmnt.comment_threads}>
        <div className={cmnt.commnet_top}>
          <div className={cmnt.user_icon}>
            <Image
              width={50}
              height={50}
              objectFit="cover"
              src={avatar}
              alt="user_image"
              placeholder="blur"
              blurDataURL={avatar}
              style={{
                // borderRadius: "50%",
              }}
            />
          </div>
          <div className={cmnt.user_name}>test</div>
          <div className={cmnt.time_post}>1 hour ago</div>
        </div>
        {/*  */}
        <div className={cmnt.commnet_bottom}>
          <div className={cmnt.comment_post}>
            <div className={cmnt.comment_text}>
              Building the next generation social network - PrimeEX PrimeEx is a
              social network that allows you to connect with people around the
              world, share your thoughts and ideas, and interact with other
              people.
            </div>
          </div>
        </div>
      </div>
      <i className="fa-light fa-circle-sort"></i>
      <Commenting />
    </div>
  );
}
