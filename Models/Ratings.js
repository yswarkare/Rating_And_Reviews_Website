const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
	rating: { type: Schema.Types.Decimal128, required: true, trim: true },
	product: {type: Schema.Types.ObjectId, ref: "products"},
	user: {type: Schema.Types.ObjectId, ref: "users"},
}, {timestamps: true});

const Ratings = mongoose.model("ratings", ratingsSchema);

module.exports = Ratings;