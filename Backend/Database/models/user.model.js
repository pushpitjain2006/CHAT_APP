import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  profilepic: String,
  FullName: { type: String, required: true },
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, minlength: 6 },
  Phone: { type: Number, required: true, unique: true },
  Gender: { type: String, required: true, enum: ["male", "female", "other"] },
});

const User = mongoose.model("User", userSchema);

export default User;
