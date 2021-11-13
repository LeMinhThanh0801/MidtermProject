import userRouter from './user.route';
import classRouter from './class.route';
import userClassRouter from './userClass.route';
function route(app: any) {
  app.use('/users', userRouter);
  app.use('/class', classRouter);
  app.use('/usersClass', userClassRouter);
}

export default route;
