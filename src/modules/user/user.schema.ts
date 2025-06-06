import { Document, Schema,model } from "mongoose";
import * as bcrypt from "bcryptjs";
export type UserRole = 0|1|2; // 0 for user, 1 for admin, 2 for super admin

export interface IUser extends Document{
  firstName: string;
  lastName?: string;
  role:UserRole;
  email: string;
  emailVerified:boolean;
  phone?:string;
  phoneVerified:boolean;
  password: string;
  organization?:string;
  address?:string;
  city?:string;
  state?:string;
  zipCode?:string;
  country?:string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    role: { type: Number, enum: [0, 1, 2], required: true, default: 0 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    emailVerified: { type: Boolean, required: true, default: false },
    phone: { type: String },
    phoneVerified: { type: Boolean, required: true, default: false },
    password: { type: String, required: true,select: false },
    organization: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  if(!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
})

UserSchema.set("toJSON", {
  versionKey: false,
  transform: function (_, ret) {
    ret.id=ret._id;
    delete ret._id;
    return ret;
  },
});


export const User = model<IUser>("User", UserSchema);

