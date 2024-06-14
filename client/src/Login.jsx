import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    axiosInstance.post("/login", { email, password }).then((res) => {
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
            type="text"
            name=""
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="Username"
          />
          <input
            type="password"
            name=""
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="Password"
          />
          <Link to={"/forgotpassword"}>
          
          <button className="block text-sm  m-3 p-2 rounded underline">
            Forgot passwowrd
          </button>
          </Link>
          <button
            type="submit"
            className="block w-full m-3 p-2 rounded-md bg-red-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
