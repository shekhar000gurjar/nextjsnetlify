import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [false, "Please provide first name"],
      maxlength: [60, "First name cannot be more than 60 characters"],
    },
    last_name: {
      type: String,
      required: [false, "Please provide last name"],
      maxlength: [60, "Last name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [false, "Please provide email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    email_otp: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: [false, "Please provide password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return v === "" || /^\d{10}$/.test(v); // Validates that phone number is exactly 10 digits or an empty string
        },
        message: (props) =>
          `${props.value} is not a valid phone number! It should be exactly 10 digits.`,
      },
      default: "",
    },
    currentCompanyName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [false, "Please provide current comapany"],
      default: "",
    },
    currentCompanyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (
          value &&
          !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          throw new Error("Invalid company email address");
        }
      },
      default: "",
    },
    current_location: {
      type: String,
      required: [false, "Please provide current location"],
    },
    position: {
      type: String,
      trim: true,
      default: "",
    },
    graduationCollege: {
      type: String,
      required: [false, "Please provide graduation college"],
      default: "N/A",
    },
    graduationPassingYear: {
      type: String,
      default: "",
    },
    postGradCollege: {
      type: String,
      required: [false, "Please provide post graduation college"],
      default: "N/A",
    },
    postGradPassingYear: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    degree: {
      type: String,
      required: [false, "Please provide degree"],
    },
    sector: {
      type: String,
      required: [false, "Please provide sector"],
      trim: true,
    },
    upi_id: {
      type: String,
      default: "",
    },
    signup_type: {
      type: String,
      required: [true, "Please provide signup type"],
      enum: ["normal", "google", "linkedin"],
      default: "normal",
    },
    registration: {
      type: Boolean,
      default: false,
    },
    total_refer_points: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    resume: {
      type: String,
      default: "", // This will store the file path of the uploaded resume
    },
    profilePicture: {
      type: String,
      default: "", // This will store the file path of the uploaded resume
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", usersSchema);
