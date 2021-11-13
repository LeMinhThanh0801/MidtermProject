const express = require('express');
import classController from '../controller/class.controller';
import userService from '../service/user.service';
const router = express.Router();

router.post('/', userService.authentication, classController.createClass);
router.get('/', userService.authentication, classController.getClass);
router.get(
  '/:classID',
  userService.authentication,
  classController.detailClass
);

export default router;
