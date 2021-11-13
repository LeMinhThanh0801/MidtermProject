const express = require('express');
import userClassController from '../controller/userClass.controller';
import userService from '../service/user.service';
const router = express.Router();

router.get(
  '/:classID/users',
  userService.authentication,
  userClassController.getUserInfo
);

export default router;
