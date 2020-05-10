const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, required: true,trim: true },
        lastName: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        emailId : { type: String, required: true, lowercase: true, trim: true },
        password : { type: String, required: true, trim: true },
        ratings: [{type: Schema.Types.ObjectId, ref: "ratings"}],
        reviews: [{type: Schema.Types.ObjectId, ref: "reviews"}],
        likedReviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
        dislikedReviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

const Admins = mongoose.model("admins", adminSchema);

module.exports = Admins;