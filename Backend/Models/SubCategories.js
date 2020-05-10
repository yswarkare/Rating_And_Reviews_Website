const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategoriesSchema = new Schema({
        subCategoryName: { type: String, required: true, trim: true },
        category: { type: Schema.Types.ObjectId, ref: "categories"},
        products: [{type: Schema.Types.ObjectId, ref: "products"}],
        subSubCategories: [{type: Schema.Types.ObjectId, ref: "subsubcategories"}]
});

const SubCategories = mongoose.model("subcategories", subCategoriesSchema);

module.exports = SubCategories;