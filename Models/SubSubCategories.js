const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subSubCategoriesSchema = new Schema({
    subSubCategoryName: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "categories"},
    subCategory: { type: Schema.Types.ObjectId, ref: "subcategories"},
    products: [{type: Schema.Types.ObjectId, ref: "products"}],		
});

const SubSubCategories = mongoose.model("subsubcategories", subSubCategoriesSchema);

module.exports = SubSubCategories;