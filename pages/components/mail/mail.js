import { useEffect, useRef } from "react";
export default function Mailfunction() {
  const status_ref = useRef();
  useEffect(() => {
    return () => {
      sendMail();
    };
  }, []);

  const sendMail = async () => {
    const reachEmailLocal = localStorage.getItem("emailval");
    const fetch_status_ref = status_ref.current;

    if (reachEmailLocal) {
      console.log("%cSUCCESS", "color: green", 200, "Email has been verified");
      status_ref.current.innerHTML = "SUCCESS 200, Email has been verified";
      const temp = `Hello ${localStorage.getItem(
        "emailval"
      )} Thanks for signing up with pickfriends, to make your account more secure and unbreachable we suggest you adding a 2FA on your account right away. Or to enable it now click the link below. ${"http://localhost:3000/components/Auth/mail"}`;

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "6a7231bb66msh88c54b17bf58fe3p12fd44jsn78f50e4bef59",
          "X-RapidAPI-Host": "hourmailer.p.rapidapi.com",
        },
        body: `{"toAddress":"${localStorage.getItem("emailval")}","title":"Welcome to PickFriends","message":"${temp}"}`,
      };

      fetch("https://hourmailer.p.rapidapi.com/send", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

      console.log(temp);
      console.log("%cSUCCESS", "color: green", 200, "Email has been verified");
      status_ref.current.innerHTML = "SUCCESS 200, Email has been verified";
    } else {
      console.log(
        "%cFAILED",
        "color: red",
        404,
        "There was an error sending the email"
      );
      status_ref.current.innerHTML =
        "FAILED 404, There was an error sending the email";
      status_ref.current.style.color = "#721c24";
      status_ref.current.style.backgroundColor = "#f8d7da";
      status_ref.current.style.borderColor = "#f5c6cb";
    }
  };

  

  return (
    <div
      className="gik"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="status"
        ref={status_ref}
        style={{
          fontSize: "30px",
          fontWeight: "600",
          textAlign: "center",
          padding: "20px",
          color: "#004085",
          backgroundColor: "#cce5ff",
          border: "1px solid #b8daff",
          borderRadius: "0.25rem",
        }}
      ></div>
    </div>
  );
}
