import mongoose from 'mongoose';
import { type } from 'os';
const { ObjectId } = require('mongoose').Types;
const Class = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    user: [
      {
        type: ObjectId,
        ref: 'user',
      },
    ],
    startTime: { type: Date },
    completedTime: { type: Date },
  },

  { timestamps: true }
);

const model = mongoose.model('Class', Class);
export default model;
