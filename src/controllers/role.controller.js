import mongoose from "mongoose";
import { Role } from "../models/role.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";

// Create a role
export const createRoles = async (req, res, next) => {
  if (req.body != null) {
    const role = new Role(req.body);
    await role.save();
    return res.json(new ApiResponse(201, role, "Role is created"));
  } else {
    throw new ApiError(500, "Internal Server Error");
  }
};

// Get all Roles
export const getAllRoles = async (req, res, next) => {
  const roles = await Role.find({});
  if (roles.length !== 0) {
    return res.json(new ApiResponse(200, roles, "All Roles"));
  } else {
    throw new ApiError(404, "No role find");
  }
};

// Get a role by id
export const getRoleById = async (req, res, next) => {
  const role = await Role.findById(req.params.id);
  if (role) {
    return res.status(200).json(new ApiResponse(200, role, "Role is found"));
  } else {
    return next(new ApiError(404, "No role find with given id"));
  }
};

// Update a role
export const updateRole = async (req, res) => {
  const id = req.params.id;
  const role = await Role.findById(id);
  if (role) {
    await Role.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    return res.status(200).json(new ApiResponse(200, "", "Role is updated"));
  } else {
    throw new ApiError(404, "No role to find");
  }
};

// Delete a Role
export const deleteRole = async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (role) {
    await Role.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Role is deleted successfully"));
  } else {
    throw new ApiError(404, "Role is not found");
  }
};
