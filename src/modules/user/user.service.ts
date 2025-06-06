
import { User,IUser } from "./user.schema";
import * as bcrypt from "bcryptjs";
class UserService {
  constructor(private readonly userModel:typeof User) {}

  async createUser(user: IUser): Promise<IUser> {
    return this.userModel.create(user);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).select("+password");
    if (!user) return false;
    return bcrypt.compareSync(password, user.password);
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, update: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async listUsers(limit = 10, skip = 0): Promise<IUser[]> {
    return this.userModel.find().limit(limit).skip(skip).exec();
  }
}

export default UserService;
