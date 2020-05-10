const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    productName : { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
    productDescription : { type: String, required: true, trim: true },
    category: {type: Schema.Types.ObjectId, ref: "categories"},
    subCategory : {type: Schema.Types.ObjectId, ref: "subcategories"},
    subSubCategory : {type: Schema.Types.ObjectId, ref: "subsubcategories"},
    totalRatings: { type: Number, trim: true, default: 0 },
    avgRating: { type: Schema.Types.Decimal128, trim: true, default: 0 },
    ratings: {
        1: { type: Number, trim: true, default: 0 },
        2: { type: Number, trim: true, default: 0 },
        3: { type: Number, trim: true, default: 0 },
        4: { type: Number, trim: true, default: 0 },
        5: { type: Number, trim: true, default: 0 },
        6: { type: Number, trim: true, default: 0 },
        7: { type: Number, trim: true, default: 0 },
        8: { type: Number, trim: true, default: 0 },
        9: { type: Number, trim: true, default: 0 },
        10: { type: Number, trim: true, default: 0 },
    },
    allRatings: [{type: Schema.Types.ObjectId, ref: "ratings"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "reviews"}],
    images: [{type: String, trim: true}],
    image: {type: String, trim: true}
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;