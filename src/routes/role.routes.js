import express from "express";
import { createRoles, deleteRole, getAllRoles, getRoleById, updateRole } from "../controllers/role.controller.js";
import { asyncHandlerPromise } from "../utils/asyncHandler.js";

const router = express.Router();

// Create Role
router.route('/create').post(asyncHandlerPromise(createRoles));

// Get all roles
router.route('/getAllRoles').get(asyncHandlerPromise(getAllRoles));

// Get a role by id
router.route('/getRoleById/:id').get(asyncHandlerPromise(getRoleById));

// update a role
router.route('/updateRole/:id').put(asyncHandlerPromise(updateRole))

// delete a role
router.route('/deleteRole/:id').delete(asyncHandlerPromise(deleteRole))

export default router;