import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {ApiError} from "../utils/apiErrors.js"



// register
export const registerUser = async (req, res, next) => {
      const role = await Role.find({ role: "User" });

      const {firstName, lastName, username, email, password} = req.body;
      // console.log({firstName, lastName, username, email, password});

      const isEmptyField = [firstName, lastName, username, email, password].some(
        (f) => f?.trim() === "");

      if (isEmptyField) {
        throw new ApiError(400,"All fields are required")
      }

      const existedUser = await User.find({
        $or: [{ username }, { email }],
      });

      if (existedUser.length > 0) {
        throw new ApiError(400,"User with email or username already exists")
      }

      // Create User
      const user = await User.create({
        firstName,
        lastName,
        email,
        username: username.toLowerCase(),
        password,
        roles: role,
      });

      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      if (!createdUser) {
        throw new ApiError(400,"Something went wrong while registering user")
      }

      return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User Registered Successfully"));

}

export const registerAdmin = async (req, res, next)=>{

  const role = await Role.find({});
  const { firstName, lastName, username, email, password } = req.body;
  if( [firstName, lastName, username, email, password].some( (f)=> f.trim() === '') ){
    throw ApiError(400,"All fields are required")
    }

  const existedUser = await User.find({
    $or:[ {email}, {username}]
  })

  if(existedUser.length > 0){
    throw new ApiError(400,"User with email or username already exists")
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    username:username.toLowerCase(),
    password,
    roles:role,
    isAdmin:true
  })

  const createdUser = await User.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400,"Something went wrong while registering user")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Admin Registered Successfully"));
} 


// Generate Tokens for login
const generateAccessAndRefreshTokens = async (userId)=>{
  try {
    const user = await User.findById(userId)
    const accessToken = user.createAccessToken()
    const refreshToken = user.createRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access token")
  }
}
 

// Login User 
 export const login = async (req, res, next)=>{

    const {email, username, password} = req.body;
    
    if(!username && !password){
      throw new ApiError(400, 'Username or email is required')
    }

    const user = await User.findOne({
      $or:[ {username}, {email} ]
    })

    if(!user){
      throw new ApiError(404, 'User does not exist')
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
      throw new ApiError(401,'Invalid user password')
    }
     const id = user.id
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(id)

    const loggedInUser = await User.findById(user._id).select("-password -refresahToken")

    const options = {
      httpOnly:true,
      secure:true
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200,{user:loggedInUser, accessToken, refreshToken}, "User Login Successfully")
    )
 }
 
//  Logout

export const logoutUser = async (req, res, next)=>{
  const id = req.params.id;

  await User.findByIdAndUpdate(
    id,
    {
      $unset:{ refreshToken:1 } // This will remove field from document
    },
    {
      new:true
    }
  )

  const options ={
    httpOnly:true,
    secure:true
  }
  // res.removeHeader('Authorization')
  return res.status(200)
            
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200,{},"user logout"))
}


//  const register = async (req, res, role) => {
//     const { firstName, lastName, username, email, password } = req.body;
//     // console.log({firstName, lastName, username, email, password});
//     // console.log(role);
//     const isEmptyField = [firstName, lastName, username, email, password].some(
//       (f) => f?.trim() === ""
//     );
  
//     if (isEmptyField) {
//       throw new ApiError(400,'All fields are required')
//       // return res.status(400).send("All fields are required");
//     }
  
//     const existedUser = await User.find({
//       $or: [{ username }, { email }],
//     });
  
//     if (existedUser.length > 0) {
//       throw new ApiError(400, "User with email or username already exist")
//       // return res.status(409).send("User with email or username already exists");
//     }
  
//     let user;
//     // Create User
//     if (role.length === 1) { // search on this line
//       user = await User.create({
//         firstName,
//         lastName,
//         email,
//         username: username.toLowerCase(),
//         password,
//         roles: role,
//       });
//       // console.log(user);
//     }
//     if (role.length === 2) {  // search on this line
//       user = await User.create({
//         firstName,
//         lastName,
//         email,
//         username: username.toLowerCase(),
//         password,
//         roles: role,
//         isAdmin: true,
//       });
//       // console.log(user);
//     }
  
//     const createdUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );
  
//     if (!createdUser) {
//       throw new ApiError(500, "Something went wrong while registering user")
//       // return res.status(500, "Something went wrong while registering user");
//     }
  
//     return res
//       .status(200)
//       .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
// };

// export const registerUser = async (req, res, next) => {

//     const role = await Role.find({ role: "User" });
//     register(req, res, role);

// };

// export const registerAdmin = async (req, res, next) => {

//     const role = await Role.find({});
//     register(req, res, role);
 
// }