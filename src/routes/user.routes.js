import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller.js';
import { asyncHandlerPromise } from '../utils/asyncHandler.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// create a user
router.route('/createUser').post(createUser);

// get all users
router.route('/getAllUsers').get(asyncHandlerPromise(verifyAdmin),getAllUsers);

// get user by id
router.route('/getUserById/:id').get(getUserById);

// update user
router.route('/updateUser/:id').put(updateUser);

// delete a user
router.route('/deleteUser/:id').delete(deleteUser);

export default router;