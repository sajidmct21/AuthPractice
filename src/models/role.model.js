import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
    {
        role:{
            type:String,
            required:true,
            unique:[true,'Role is already exsist']
        }
    },
    
    {timestamps:true}
)

export const Role = mongoose.model("Role",roleSchema)