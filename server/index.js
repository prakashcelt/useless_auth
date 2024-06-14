import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import userModel from "./userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import { UserRouter } from "./routes.js";
const jwt_secret = "1234";
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
// app.use("/",UserRouter)

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const preUser = await userModel.findOne({ email });
    if (!preUser) {
      const hashPassword = await bcrypt.hash(password, 3);

      const newUser = await userModel.create({
        email,
        username,
        password: hashPassword,
      });
      console.log(newUser._id);
      return res.json({ status: true, message: "user created succ" });
    } else {
      res.json({ message: "user exists already, login please" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const preUser = await userModel.findOne({ email });
    if (preUser) {
      const correctPassword = await bcrypt.compare(password, preUser.password);
      if (correctPassword) {
        const token = jwt.sign({ username: preUser.email }, jwt_secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
        return res.json({ status: true, message: "user created succ" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const User = await userModel.findOne({ email });
    if (User) {
      const token = jwt.sign({ user: User._id }, jwt_secret, {
        expiresIn: "3m",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "prakash17sss@gmail.com",
          pass: "hfak lany wqcw otyc",
        },
      });

      var mailOptions = {
        from: "prakash17sss@gmail.com",
        to: email,
        subject: "Sending Email using Node.js for resetting password",
        text: `http://localhost:5173/resetpassword/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.json({ status: true, message: "user created succ" });
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, jwt_secret);
    console.log(decoded);
    const id = decoded.user;
    const hashPassword = await bcrypt.hash(password, 3);
    await userModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    // return res.json({message:decoded})
    return res.json({ status: true, message: "password changed succ" });
  } catch (error) {
    res.json({ error });
  }
});

const mongo_url = "mongodb://127.0.0.1:27017/auth";
const db = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("db suu");
  } catch (error) {
    console.log(error.message);
  }
};

db();
app.listen(3000, () => {
  console.log("server on");
});
