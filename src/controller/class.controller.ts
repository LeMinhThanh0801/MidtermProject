import classModel from '../model/class.model';
import userClass from '../model/user-class.model';
class classes {
  async createClass(req: any, res: any) {
    const user = res.locals.user;
    if (user.userType === 1) {
      res.sendStatus(400);
    } else {
      const body = {
        ...req.body,
      };
      try {
        const newClass = await classModel.create(body);
        await userClass.create({ user: user.id, class: newClass._id });
        res.json(body);
      } catch (error) {
        res.sendStatus(500);
      }
    }
  }

  async detailClass(req: any, res: any) {
    const classID = req.params.classID;
    const detailClass = await classModel.findById(classID);
    if (detailClass) {
      res.json(detailClass);
    } else {
      res.json({ status: 400, error: 'invalid classID' });
    }
  }

  async getClass(req: any, res: any) {
    try {
      const result = await classModel.find();
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

export default new classes();
