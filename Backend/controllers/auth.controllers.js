import bcrypt from "bcryptjs";
import User from "../Database/models/user.model.js";
import generateTokenAndSetCookie from "../Utils/GenerateJWT.js";

export const login = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log("New user logged in.");
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

    if (Password !== ConfirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }
    if (Phone.length !== 10) {
      return res
        .status(422)
        .json({ error: "Phone number should be 10 characters long" });
    }

    if (Password.length < 8) {
      return res
        .status(422)
        .json({ error: "Password should be atleast 8 characters long" });
    }

    if (Username.length < 4) {
      return res
        .status(422)
        .json({ error: "Username should be atleast 4 characters long" });
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
        return "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png";
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
