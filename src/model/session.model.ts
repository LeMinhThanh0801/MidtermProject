import moongoose from 'mongoose';
const Session = new moongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});
const model = moongoose.model('Session', Session);

export default model;
