import { Router } from "express";
import userModel from "./userModel";

const router = Router();

export const UserRouter = router.post("/signup",async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username})
    if(!user){
        console.log("user exists")
    }
    else{
        userModel.create({username,password})
    }
})