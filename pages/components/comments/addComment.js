export function addComment(
  btnTxt,
  setDoc,
  doc,
  db,
  readComment,
  last_array_item,
  setuuid
) {
  setTimeout(() => {
    btnTxt.innerText = "Post"; // clear the input

    readComment.current.value = "";
    setDoc(doc(db, "commentRef", "comments"), {
      comment: last_array_item,
      commentdate: new Date().toLocaleString(),
    });
    const UUID = "ABCDEFGHIJKLMNOP";
    let captureID = "";

    for (let i = 0; i < 10; i++) {
      captureID += UUID.charAt(Math.floor(Math.random() * UUID.length));
    } // set the URL

    window.history.pushState(null, null, `/components/comments/${captureID}`); // set the uuid

    setuuid(captureID);
    console.log("state => ", captureID);
  }, 7000);
}
