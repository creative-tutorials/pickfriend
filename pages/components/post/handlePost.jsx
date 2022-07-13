export function sendHandlePost(
  retrTextblock,
  imgObjURL,
  setisAccepted,
  retrpostbutton,
  isAccepted
) {
  const postid =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const cityRef = doc(db, "ImagePost", postid);
  let post = {
    text: retrTextblock,
    image: imgObjURL,
  };
  setDoc(cityRef, {
    data: post,
  });
  setisAccepted(true);
  retrpostbutton.disabled = true;
  retrpostbutton.innerHTML = "Posting...";
  setTimeout(() => {
    retrpostbutton.disabled = false;
    retrpostbutton.innerHTML = "Post";
    setisAccepted(true);
  }, 5000);

  if (isAccepted === true) {
    localStorage.setItem("isAccepted", isAccepted);
  }
}
