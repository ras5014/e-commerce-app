/*
- The pre("save") hook runs every time a document is saved — not only when a 
user is first created, but also when updating other fields later.

- If the password field has not changed, we don’t want to re-hash it again. 
Otherwise, each save would keep hashing an already hashed password, 
which would break authentication (since the hash would never match the plain 
text password anymore).

- this.isModified("password") tells Mongoose whether the password field was 
changed in the current operation.
*/

import bcrypt from "bcryptjs";
import mongoose, { CallbackError } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// Pre save to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error as CallbackError);
  }
});

// Adds a custom method called comparePassword to your user schema (We can call it later with User)
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Model name would be users (Because mongoose pluralizes)
const User = mongoose.model("User", userSchema);

export default User;
