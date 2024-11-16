import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "", "User is created"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(new ApiResponse(200, users, "All Users"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};

export const getUserById = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "", "Get User by id"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};

export const updateUser = async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, "", "User is updated"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, "", "User is deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};
