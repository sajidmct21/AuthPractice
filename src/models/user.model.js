import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        roles:{
            type:[Schema.Types.ObjectId],
            ref:'Role'
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true}
);

// Password Ecription
userSchema.pre("save", async function(next){
    // If password is not modified then call next()
    // modified password = new password or changed password

    if(!this.isModified("password")) return next();

    // Encrypt password
    this.password = await bcrypt.hash(this.password,10)
})


// Password decryption
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Create Access Token
userSchema.methods.createAccessToken = function(){
 return  jwt.sign(
        {
            _id: this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            isAdmin:this.isAdmin,
            roles:this.roles        
        },
        // eslint-disable-next-line no-undef
        process.env.ACCESSS_TOKEN_SECRET,
        {
            // eslint-disable-next-line no-undef
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// create refresh token
userSchema.methods.createRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        // eslint-disable-next-line no-undef
        process.env.REFRESH_TOKEN_SECRET,
        {
            // eslint-disable-next-line no-undef
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)