import mongoose from 'mongoose';
const { ObjectId } = require('mongoose').Types;
const UserClass = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    class: {
      type: ObjectId,
      required: true,
      ref: 'class',
    },
  },
  { timestamps: true }
);

const model = mongoose.model('userclass', UserClass);
export default model;
