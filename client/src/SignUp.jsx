import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Create an instance of Axios with a custom config
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    axiosInstance.post("/signup", { email,username, password }).then((res) => {
      if (res.data.status) {
        navigate("/login");
      } else {
        alert("something wrong please try again");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="Username"
          />
          <input
            type="text"
            name=""
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full m-3 p-2 rounded-md"
            placeholder="email"
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
          <button
            type="submit"
            className="block w-full m-3 p-2 rounded-md bg-red-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
