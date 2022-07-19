export function fetchUserStatus(header_user, setUserStatus) {
  return async () => {
    const usr = localStorage.getItem("emailval");
    const getheaderUser = header_user.current;

    if (usr) {
      console.log("user is logged in");
      const q = query(
        collection(db, "createdAccount"),
        where("email", "==", localStorage.getItem("emailval"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        getheaderUser.innerHTML = doc.data().email; // split getheaderUser.innerHTML to get the first part of the email
        const splitEmail = getheaderUser.innerHTML.split("@"); // if email length is greater than 10 then truncate the email

        if (splitEmail[0].length > 10) {
          getheaderUser.innerHTML = splitEmail[0].substring(0, 10);
        }
      });
      setUserStatus(true);
    } else {
      // alert("user is not logged in");
      console.log("user is not logged in");
      // window.location.href = "/components/Auth/signup";
      getheaderUser.innerHTML = "null";
      setUserStatus(false);
    }
  };
}
