// import {Request, Response} from 'express'
import userService from '../service/user.service';
import User from '../model/user.model';
import Session from '../model/session.model';
// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');

class NewController {
  async Register(req: any, res: any) {
    const password = await userService.hashpass(req.body.password);
    let user_info = { ...req.body };
    user_info.password = password;
    try {
      const response = await User.create(user_info);
      res.json(req.body);
    } catch (error: any) {
      console.log('error', error);
      if (+error.code === 11000) {
        res.json({ error: 'Name or Email is already taken' });
      }
    }
  }

  async Login(req: any, res: any) {
    const { email, password } = req.body;
    const user = <any>await User.findOne({ email }).exec();

    if (!user) {
      res.json({ status: 'error', error: 'Invalid username or password' });
    } else {
      if (await userService.comparepass(password, user.password)) {
        const token = userService.JWT(user);
        const refreshToken = userService.refreshToken(user);
        const session = {
          name: user.name,
          refreshToken: refreshToken,
        };
        const check_session = await Session.findOne({ name: user.name });
        if (check_session) {
          await Session.updateOne({ name: user.name }, session);
        } else {
          await Session.create(session);
        }

        res.json({
          status: 'OK',
          token: token,
          refreshToken: refreshToken,
          typeUser: user.typeUser,
        });
      } else {
        res.json({ status: 'error', error: 'Invalid username or password' });
      }
    }
  }
  async loginGoogle(req: any, res: any) {
    const { email } = req.body;
    const user = <any>await User.findOne({ email }).exec();
    if (!user) {
      res.json({ status: 'Invalid User', error: ' User is not authorized' });
    } else {
      const token = userService.JWT(user);
      const refreshToken = userService.refreshToken(user);
      const session = {
        name: user.name,
        refreshToken: refreshToken,
      };
      const check_session = await Session.findOne({ name: user.name });
      if (check_session) {
        await Session.updateOne({ name: user.name }, session);
      } else {
        await Session.create(session);
      }
      res.json({
        status: 'OK',
        token: token,
        refreshToken: refreshToken,
        typeUser: user.typeUser,
      });
    }
  }
  async refreshToken(req: any, res: any) {
    const refresh = req.body.refreshToken;
    if (!refresh) {
      res.sendStatus(403);
    } else {
      try {
        const session = <any>(
          await Session.findOne({ refreshToken: refresh }).exec()
        );
        if (!session) {
          res.sendStatus(403);
        } else {
          //verify token
          const user = await jwt.verify(
            refresh,
            process.env.JWT_TOKEN_SECRET || ''
          );
          //generate new token
          const token = userService.JWT(user);
          const new_token = userService.refreshToken(user);
          //delete current refresh token
          const update_session = { refreshToken: new_token };
          await Session.updateOne({ refreshToken: refresh }, update_session);
          res.json({ status: 'OK', refreshToken: new_token, token: token });
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  async check_login(req: any, res: any) {
    const refreshToken = req.body.refreshToken;
    try {
      //check token of user is valid or not
      const sesion = await Session.findOne({ refreshToken: refreshToken });
      try {
        const user = await jwt.verify(
          refreshToken,
          process.env.JWT_TOKEN_SECRET || ''
        );
        const token = userService.JWT(user);
        const _refreshToken = userService.refreshToken(user);
        const update_session = { refreshToken: _refreshToken };
        await Session.updateOne({ refreshToken: refreshToken }, update_session);
        res.json({ status: 200, token: token, refreshToken: _refreshToken });
      } catch (error) {
        res.json({ status: 'Log out' });
      }
    } catch (error) {
      console.log('error', error);
      res.json(500);
    }
  }

  async Logout(req: any, res: any) {
    const userName = req.params.user_name;
    try {
      const respone = await Session.deleteOne({ name: userName });
      res.json({ status: 200 });
    } catch (error) {
      res.json(500);
    }
  }
}

export default new NewController();
