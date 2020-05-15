const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    categoryName: { type: String, required: true, trim: true },
    products: [{type: Schema.Types.ObjectId, ref: "products"}],
    subCategories: [{type: Schema.Types.ObjectId, ref: "subcategories"}],
    subSubCategories: [{type: Schema.Types.ObjectId, ref: "subsubcategories"}]
});

const Categories = mongoose.model("categories", categoriesSchema);

module.exports = Categories;