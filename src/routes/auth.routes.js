import express from 'express';
import { registerUser, registerAdmin, login, logoutUser } from '../controllers/auth.controller.js';
import { asyncHandlerPromise } from '../utils/asyncHandler.js';
import {verifyUser} from '../middlewares/auth.middleware.js'


const router = express.Router();

router.route('/registerUser').post(asyncHandlerPromise(registerUser));
router.route('/registerAdmin').post(asyncHandlerPromise(registerAdmin));
router.route('/login').post(asyncHandlerPromise(login));
router.route('/logout/:id').post(asyncHandlerPromise(verifyUser), asyncHandlerPromise(logoutUser));


export default router