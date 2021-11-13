import classModel from '../model/class.model';
import userClass from '../model/user-class.model';
class userClasses {
  async getUserInfo(req: any, res: any) {
    const classID = req.params.classID;
    try {
      const result = await userClass.aggregate([
        {
          $match: { class: classID },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'users',
          },
        },
      ]);
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

export default new userClasses();
