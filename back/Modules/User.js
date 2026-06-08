const mongoose = require("mongoose");
const joi = require("joi");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ProfileName: {
        type: String,
        default: "Slucher"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId: null
        }
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ], // Store favorite product IDs
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password in database
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

// ✅ Validation Schema for User
const UserValidate = (obj) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(obj);
};

// ✅ Validation Schema for Updating User
const UserUpdateValidate = (obj) => {
    const schema = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string().min(8),
        profileName: joi.string(),
    });
    return schema.validate(obj);
};

// ✅ Validation Schema for Login
const UserLogin = (obj) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(obj);
};

module.exports = { User, UserValidate, UserUpdateValidate, UserLogin };
