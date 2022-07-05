import React from "react";
import lgn from "../../../styles/login.module.css";
export function GoogleSignIn({}) {
  const signInWithGoogle = () => {
    console.log("signInWithGoogle");
  };
  return (
    <div className={lgn.LoginButton}>
      <button className={lgn.googlebtn} onClick={signInWithGoogle}>
        <i className="fa-brands fa-google"></i>
        <span>Sign In with Google</span>
      </button>
    </div>
  );
}
