import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { asyncHandlerPromise } from "../utils/asyncHandler.js";
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// create a user
router.route("/createUser").post(createUser);

// get all users
router.route("/getAllUsers").get(asyncHandlerPromise(verifyAdmin), asyncHandlerPromise(getAllUsers));

// get user by id
router.route("/getUserById/:id").get(asyncHandlerPromise(verifyUser),asyncHandlerPromise(getUserById));

// update user
router.route("/updateUser/:id").put(asyncHandlerPromise(verifyUser),asyncHandlerPromise(updateUser));

// delete a user
router.route("/deleteUser/:id").delete(asyncHandlerPromise(verifyAdmin),asyncHandlerPromise(deleteUser));

export default router;
