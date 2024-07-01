import mongoose, { Model, Schema, Document } from 'mongoose';

interface User extends Document {
  username: string;
  password: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);
export default User;
