import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "", "User is created"));
  } catch (error) {
    throw new ApiError(500, "Internal server error", error);
  }
};

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    return next(new ApiError(401, "No user to find"));
  } else {
    return res.status(200).json(new ApiResponse(200, users, "All Users"));
  }
};

export const getUserById = async (req, res, next) => {
  const user = await User.findById({ _id: req.params.id });
  if (!user) {
    return next(new ApiError(401, "No User to find"));
  } else {
    return res.status(200).json(new ApiResponse(200, user, "Get User by id"));
  }
};

export const updateUser = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "", "User is updated"));
  } catch (error) {
    throw new ApiError(500, "Internal server error", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, "", "User is deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error", error);
  }
};
