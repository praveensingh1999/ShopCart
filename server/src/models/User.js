import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    address: {
      type: String,
      required: false
    },
    contact: {
      type: Number,
      required: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // createdAt + updatedAt automatically
);

// Hash password before saving
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


// Compare password method
userSchema.methods.comparePassword = async function (givenPassword) {
  return bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
