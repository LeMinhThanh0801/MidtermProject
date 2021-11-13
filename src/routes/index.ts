import userRouter from './user.route';
import classRouter from './class.route';
function route(app: any) {
  app.use('/users', userRouter);
  app.use('/class', classRouter);
}

export default route;
