import mongoose from "mongoose";

const userModelSchema = mongoose.Schema({
    email:{type:String,unique:true,required:true},
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
},{timeStamps:true})


const userModel = mongoose.model("user",userModelSchema)
export default userModel