const express = require('express');
import userController from '../controller/user.controller';
import userService from '../service/user.service';

const router = express.Router();
router.post(
  '/register',
  userService.verifyrole_student,
  userController.Register
);
router.post(
  '/teacher/register',
  userService.verifyrole_teacher,
  userController.Register
);
router.post('/login', userController.Login);
router.post('/login/google', userController.loginGoogle);
//User use token to get another token
router.post('/token', userController.refreshToken);
//check login
router.post(
  '/check-login',
  userService.authentication,
  userController.check_login
);
router.delete('/:user_name', userService.authentication, userController.Logout);
//user logout

export default router;
