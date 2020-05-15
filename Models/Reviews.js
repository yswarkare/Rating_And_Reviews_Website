const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
	review: { type: String, trim: true },
	likes: { type: Number, trim: true },
	dislikes: { type: Number, trim: true },
	date: { type: Date, default: Date.now },
	product: {type: Schema.Types.ObjectId, ref: "products"},
	user: {type: Schema.Types.ObjectId, ref: "users"},
}, {timestamps: true});

const Reviews = mongoose.model("reviews", reviewsSchema);

module.exports = Reviews;