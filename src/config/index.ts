import { config } from "dotenv";
config();
export default {
  port:process.env.PORT || 3000,
  mongoUrl:process.env.MONGO_URL || 'mongodb://localhost:27017',
  jwtSecret:process.env.JWT_SECRET,
  globalAdminSecret:process.env.GLOBAL_ADMIN_SECRET
}