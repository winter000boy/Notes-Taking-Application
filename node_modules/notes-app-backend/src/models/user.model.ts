import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  googleId?: string;
  otp?: string;
  otpExpiry?: Date;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    otp: String,
    otpExpiry: Date,
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

// Index for OTP expiry
userSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 300 }); // 5 minutes

export const User = mongoose.model<IUser>('User', userSchema);
