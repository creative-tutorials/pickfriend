import { useEffect, useState, useRef } from "react";
import clipcss from "../../../styles/clipbrd.module.css";
const ClipBoard = () => {
  const [isValid, setisValid] = useState(false);
  const cliptext = useRef();
  const copyBtnHTML = useRef();
  useEffect(() => {
    //   first

    return () => {
      FecthImageObject();
    };
  }, []);

  const FecthImageObject = () => {
    const getClipText = localStorage.getItem("image");
    const clipts = cliptext.current;
    setisValid(true);
    if (getClipText) {
      clipts.value = getClipText;
      clipts.style.pointerEvents = "auto";
    } else {
      clipts.value = "Error can't get image URL";
      clipts.style.pointerEvents = "none";
    }
  };
  const execCopy = () => {
    const clipts = cliptext.current;
    const copyHTML = copyBtnHTML.current;
    clipts.select(); // Select the text field
    document.execCommand("copy");
    copyHTML.innerHTML = "Copied";

    setTimeout(() => {
      clipts.blur(); // remove focus from element
      copyHTML.innerHTML = "Copy";
    }, 2000);
  };
  //   const x = 200;
  return (
    <div className={clipcss.clip_board}>
      <div className={clipcss.ciptext}>
        <input type="text" ref={cliptext} />
      </div>
      <div className={clipcss.copy_btn}>
        <button onClick={execCopy} ref={copyBtnHTML}>
          Copy
        </button>
      </div>
    </div>
  );
};
export default ClipBoard;
