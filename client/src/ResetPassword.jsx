import { useState } from "react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {token} = useParams();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(password);
    axiosInstance
      .post("/resetpassword/"+token, {
        password,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status) {
          navigate("/home");
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
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="Password"
          />
          {/* <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder=" confirm Password"
          /> */}

          <button className="block text-sm  m-3 p-2 rounded underline">
            Forgot passwowrd
          </button>

          <button
            type="submit"
            className="block w-full m-3 p-2 rounded-md bg-red-400"
          >
            reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
