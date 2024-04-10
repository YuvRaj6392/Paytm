import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  firstNameAtom,
  lastNameAtom,
  passwordAtom,
  usernameAtom,
} from "../../store/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../../Api/SignupApi";
import { SigninApi } from "../../Api/SigninApi";

export default function CredButton({ buttonName, handler }) {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
 const firstName=useRecoilValue(firstNameAtom)
  const lastName = useRecoilValue(lastNameAtom);
  const username = useRecoilValue(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);

  const callSignup = async () => {
    setLoading(true);
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill all the details");
      setLoading(false);
    } else if (password.length < 8) {
      alert("Password should be of more than 8 characters");
      setLoading(false);
    } else {
      const obj = {
        firstName,
        lastName,
        username,
        password,
      };
      const json = await SignupApi(obj);

      console.log(json);
      if (!json.success) {
        setLoading(false);
        alert(json.msg);
      } else {
        setLoading(false);
        setPassword("");
        history("/signin");
      }
    }
  };

  const callSignin = async () => {
    setLoading(true);
    if (!username || !password) {
      alert("Please fill all the details");
      setLoading(false);
    } else if (password.length < 8) {
      alert("Password should be of more than 8 characters");
      setLoading(false);
    } else {
      const obj = {
        username,
        password,
      };
      const json = await SigninApi(obj);

      console.log(json);
      if (!json.success) {
        setLoading(false);
        alert(json.msg);
      } else {
        localStorage.setItem("token", json.token);
        setLoading(false);
        setPassword("");
        history("/");
        window.location.reload()
      }
    }
  };

  const singupSignHandler = (handler) => {
    handler == "signup" ? callSignup() : callSignin();
  };
  return (
    <div
      onClick={(e) => {
        singupSignHandler(handler);
      }}
      className={`bg-black h-10 flex justify-center items-center text-white w-[75%] m-auto cursor-pointer ${
        loading ? "pointer-events-none" : ""
      }`}
    >
      {loading ? "Loading..." : buttonName}
    </div>
  );
}
