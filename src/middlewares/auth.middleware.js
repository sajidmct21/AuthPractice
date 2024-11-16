// import {ApiError} from '../utils/apiErrors.js';
// import jwt from 'jsonwebtoken';
// import {User} from '../models/user.model.js'

// export const verifyJWT = async (req, res, next)=>{

//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    
//             if(!token){
//                 throw new ApiError(401, "Unauthorized request")
//             }
    
//             const decodedToken = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET)
//             const user = await User.findById(decodedToken?._id).select('-password -refresToken');
//             if(!user){
//                 throw new ApiError(401,"Invalid Access Token")
//             }
    
//             req.user = user;
//             next()
    
//     } catch (error) {
//         // throw new ApiError(401, error?.message || "Invalid access token")
//         next(error)
//     }
// }

// export const verifyUser = (req, res, next)=>{
//     verifyJWT(req, res, ()=>{
//         if(req.user.id === req.params.id || req.user.isAdmin){
//             next()
//         }
//         else{
//             throw new ApiError(403, 'You are not Authorize')
//         }
//     })
// }

// export const verifyAdmin = (req, res, next)=>{

//      verifyJWT(req, res, ()=>{
//          if(req.user.isAdmin){
//              next()
//          }
//          else{
//              throw new ApiError(403, 'You are not Authorize')
//          }
//      })
// }


// By chatgpt 
import { ApiError } from '../utils/apiErrors.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// Middleware to verify JWT
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return next(new ApiError(401, "Unauthorized request"));
        }

        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.ACCESSS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken');

        if (!user) {
            return next(new ApiError(401, "Invalid Access Token"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(error); // Passes the error to Express's error handler
    }
};

// Middleware to verify if the user matches the ID parameter or is an admin
export const verifyUser = (req, res, next) => {
    verifyJWT(req, res, (err) => {
        if (err) return next(err); // Pass any errors from verifyJWT to the next middleware

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(new ApiError(403, 'You are not authorized'));
        }
    });
};

// Middleware to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
    verifyJWT(req, res, (err) => {
        if (err) return next(err); // Pass any errors from verifyJWT to the next middleware

        if (req.user.isAdmin) {
            next();
        } else {
            next(new ApiError(403, 'You are not authorized'));
        }
    });
};
