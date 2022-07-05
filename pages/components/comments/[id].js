import { Index } from "./index";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import cmnt from "../../../styles/comments.module.css";
import avatar from "../../../avatar/student.jpeg";
export default function Comments() {
  const [uuid, setuuid] = useState();
  const [comments, setcomments] = useState();
  const readComment = useRef();
  useEffect(() => {
    // first

    return () => {
      generateUUID();
    };
  }, []);

  // generate UUID for the URL
  const generateUUID = () => {
    const UUID = "ABCDEFGHIJKLMNOP";
    let captureID = "";
    for (let i = 0; i < 10; i++) {
      captureID += UUID.charAt(Math.floor(Math.random() * UUID.length));
    }
    // set the URL
    window.history.pushState(null, null, `/components/comments/${captureID}`);

    // set the uuid
    setuuid(captureID);
    console.log("state => ", captureID);
  };

  // get the comments
  const postComment = (e) => {
    const getCommentVal = readComment.current.value;
    if (getCommentVal) {
      //? if the commentInputValue is not empty
      // set the comments
      setcomments([...comments, getCommentVal]);
      // clear the input
      readComment.current.value = "";

      console.log("comments => ", comments);

      console.log("comment val => ", getCommentVal);

      localStorage.setItem("commentAllowed", true);
    } else {
      localStorage.setItem("commentAllowed", false);
      alert("Please enter a comment");
    }
  };

  return (
    <div className={cmnt.wrapper}>
      <div className={cmnt.content}>
        <div className={cmnt.comment_box}>
          <Index />
          <div className={cmnt.comment_input}>
            <div className={cmnt.comment_input_top}>
              <div className={cmnt.comment_input_top_left}>
                <div className={cmnt.comment_input_top_left_icon}>
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
              </div>
              <div className={cmnt.comment_input_top_right}>
                <div className={cmnt.comment_input_top_right_text}>
                  <textarea
                    placeholder="Write a comment🏄‍♂️..."
                    ref={readComment}
                  ></textarea>
                </div>
                <div className={cmnt.comment_input_top_right_button}>
                  <button onClick={postComment}>Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
