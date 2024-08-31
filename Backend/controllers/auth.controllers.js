import bcrypt from "bcryptjs";
import User from "../Database/models/user.model.js";
import generateTokenAndSetCookie from "../Utils/GenerateJWT.js";

export const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({
      Username: Username,
    });
    if (!user) {
      return res.status(422).json({ error: "Invalid Username or Password" });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Username or Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      message: "User logged in successfully",
      FullName: user.FullName,
      Username: user.Username,
      Email: user.Email,
      Phone: user.Phone,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

export const signup = async (req, res) => {
  console.log(req.body);
  try {
    const {
      FullName,
      Username,
      Email,
      Password,
      ConfirmPassword,
      Phone,
      Gender,
    } = req.body;

    if (
      !FullName ||
      !Username ||
      !Email ||
      !Password ||
      !ConfirmPassword ||
      !Phone ||
      !Gender
    ) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    if (Password != ConfirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({
      $or: [{ Email: Email }, { Username: Username }, { Phone: Phone }],
    });
    if (user) {
      console.log(user);
      return res.status(422).json({ error: "User already exists" });
    }

    const get_dp = (Gender, Username) => {
      if (Gender === "other") {
        return "https://avatar.iran.liara.run/public";
      } else {
        return `https://avatar.iran.liara.run/public/${
          Gender === "male" ? "boy" : "girl"
        }?username=${Username}`;
      }
    };

    const newUser = new User({
      FullName,
      Username,
      Email,
      Password: hashedPassword,
      Phone,
      Gender,
      profilepic: get_dp(Gender, Username),
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        message: "User registered successfully",
        FullName: newUser.FullName,
        Username: newUser.Username,
        Email: newUser.Email,
        Phone: newUser.Phone,
        Gender: newUser.Gender,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};
