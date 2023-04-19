import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import Logo from "../img/logo.png";
import "./login.css"
function Login() {

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <img src={Logo} alt="logo" />
        <button className="btn-login" onClick={handleClick}>Login to Continue</button>
      </div>
    </div>

  )
}

export default Login;