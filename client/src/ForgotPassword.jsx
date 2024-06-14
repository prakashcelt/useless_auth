import React from "react";
import { useState } from "react";

import {useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email);
    axiosInstance.post("/forgotpassword", { email }).then((res) => {
      if (res.data.status) {
        alert("check your email");
        navigate("/login");
      } else {
        alert("something wrong please try again or signup again");
      }
    });
  }

  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center  items-center">
      <div className="flex justify-center">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="email"
          />

          <button
            type="submit"
            className="block w-full m-3 p-2 rounded-md bg-red-400"
          >
            Forgot password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
