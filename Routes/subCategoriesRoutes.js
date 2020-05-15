const express = require("express");
const router = express.Router();
const SubCategories = require("../Models/SubCategories");
const Categories = require("../Models/Categories");
const { validateAdmin } = require("../Utils/Validations");
const { userAuth } = require("../Utils/Auth");

// Admin Protected Routes

router.get("/", async (req, res) => {
    try {
        let subCategories = await SubCategories.find().populate("category").populate("subSubCategories")
        return res.json({message: "All Sub-Categories List", success: true, subCategories})
    } catch (err) {
        return res.json({message: "Failed to get sub-categories list", success: false, error: err})
    }
})

router.post("/", userAuth, async (req, res) => {
    try{
        let sCat = await SubCategories.findOne({subCategoryName: req.body.subCategory.subCategoryName})
        if (sCat){
            return res.json({message: "Sub-Category already exists", success: false})
        }
        console.log("after validation => "+req.user);
        const newSubCategory = new SubCategories({
            subCategoryName : req.body.subCategory.subCategoryName,
            category: req.body.subCategory.category,
        });
        let subCategory = await newSubCategory.save()
        let category1 = await Categories.findOne({_id: req.body.subCategory.category})
        let subCArray = category1.subCategories
        subCArray.push(subCategory._id)
        await Categories.findOneAndUpdate({_id: req.body.subCategory.category}, {subCategories: subCArray})
        let subCategory2 = await SubCategories.findOne({_id: subCategory._id}).populate("category")
        return res.json({message: "Sub-Category added successfully", success: true, subCategory2});
    } catch {
        return res.json({message: "Unable To Add Sub-Category", success: false})
    }
})

router.put("/:id", userAuth, async (req, res) => {
    try {
        await SubCategories.findOneAndUpdate({_id: req.params.id}, {
            subCategoryName : req.body.subCategory.subCategoryName,
            category: req.body.subCategory.category,
        })
    } catch {
        return res.json({message: "User is Unauthorized", success: false})
    }
})

router.delete("/", userAuth, async (req, res) => {
    if (validateAdmin(req.user) === true){
        await SubCategories.findOneAndRemove({_id: req.body._id})
            .then(subCategory => res.json(subCategory))
            .catch(err => console.log(err));
    } else {
        return res.json({message: "User is Unauthorized", success: false})
    }
})

router.patch("/update-sub-category-name", userAuth, async (req, res) => {
    console.log(req.body)
    try {
        let subCategory1 = await SubCategories.findOne({_id: req.body._id});
        if (subCategory1.category !== req.body.category){
            let category2 = await Categories.findOne({_id: subCategory1.category})
            let sCArray = category2.subCategories;
            let index = sCArray.indexOf(req.body._id);
            sCArray.splice(index, 1)
            await Categories.findOneAndUpdate({_id: subCategory1.category}, {subCategories: sCArray});
        }
        let subCategory = await SubCategories.findOneAndUpdate({_id: req.body._id}, {
            subCategoryName: req.body.subCategoryName,
            category: req.body.category,
        });
        let updated = await SubCategories.findOne({_id: req.body._id}).populate("category")
        let category1 = await Categories.findOne({_id: req.body.category})
        let subCArray = category1.subCategories
        subCArray.push(updated._id)
        await Categories.findOneAndUpdate({_id: req.body.category}, {subCategories: subCArray})
        return res.json({message: "Category name updated successfully", success: true, subCategory, updated })
    } catch {
        return res.json({message: "Unable to update category name", success: false})
    }
})

router.patch("/delete-sub-category", userAuth, async (req, res) => {
    console.log(req.body)
    try {
        let subCategory1 = await SubCategories.findOne({_id: req.body._id});
        let category2 = await Categories.findOne({_id: subCategory1.category})
        let sCArray = category2.subCategories;
        let index = sCArray.indexOf(req.body._id);
        sCArray.splice(index, 1)
        await Categories.findOneAndUpdate({_id: subCategory1.category}, {subCategories: sCArray});
        let deleted = await SubCategories.findOneAndDelete({_id: req.body._id})
        return res.json({message: "Sub-Category deleted successfully", success: true, deleted})
    } catch (err) {
        console.log(err);
        return res.json({message: "Unabe to delete sub-category", success: false, error: `${err}`})
    }
})

module.exports = router;
