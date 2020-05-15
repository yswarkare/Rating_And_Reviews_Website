const express = require("express");
const router = express.Router();
const SubSubCategories = require("../Models/SubSubCategories");
const SubCategories = require("../Models/SubCategories");
const Categories = require("../Models/Categories");
const { validateAdmin } = require("../Utils/Validations");
const { userAuth } = require("../Utils/Auth");

// Admin Protected Routes

router.get("/", async (req, res) => {
    try {
        let subSubCategories = await SubSubCategories.find().populate("category").populate("subCategory")
        return res.json({message: "All Sub-Sub-Categories List", success: true, subSubCategories})
    } catch (err) {
        return res.json({message: "Failed to get sub-sub-categories", success: false, error: err})
    }
})

router.post("/", userAuth , async (req, res) => {
    try {
        const newSubSubCategory = new SubSubCategories({
            subSubCategoryName : req.body.subSubCategory.subSubCategoryName,
            category: req.body.subSubCategory.category,
            subCategory: req.body.subSubCategory.subCategory,
        });
        let subSubCategory = await newSubSubCategory.save()
        // add subSubCategory id in Categories document
        let category1 = await Categories.findOne({_id: req.body.subSubCategory.category})
        let subCArray = category1.subSubCategories
        subCArray.push(subSubCategory._id)
        await Categories.findOneAndUpdate({_id: req.body.subSubCategory.category}, {subSubCategories: subCArray})
        // add subSubCategory id in Sub-Categories document
        let subCategory1 = await SubCategories.findOne({_id: req.body.subSubCategory.subCategory})
        let subSubCArray = subCategory1.subSubCategories
        subSubCArray.push(subSubCategory._id)
        await SubCategories.findOneAndUpdate({_id: req.body.subSubCategory.subCategory}, {subSubCategories: subSubCArray})
        let subSubCategory2 = await SubSubCategories.findOne({_id: subSubCategory._id}).populate("category").populate("subCategory")
        console.log(subSubCategory2);
        return res.json({subSubCategory2, message: "Sub-Category Added Successfully", success: true})
    } catch {
        return res.json({message: "Failed To Add Sub-Sub-Category", success: false})
    }
})

router.patch("/update-sub-sub-category-name", userAuth, async (req, res) => {
    try {
        let subSubCategory1 = await SubSubCategories.findOne({_id: req.body._id});
        try {
            if (subSubCategory1.category !== req.body.category){
                let category2 = await Categories.findOne({_id: subSubCategory1.category})
                let sSCArr = category2.subSubCategories;
                let index = sSCArr.indexOf(req.body._id);
                sSCArr.splice(index, 1)
                await Categories.findOneAndUpdate({_id: subSubCategory1.category}, {subSubCategories: sSCArr});
            }
        } catch {
            console.log("failed to delete id from categories");
        }
        try {
            if (subSubCategory1.subCategory !== req.body.subCategory){
                let subCategory2 = await SubCategories.findOne({_id: subSubCategory1.subCategory})
                let sSCArray = subCategory2.subSubCategories;
                let index2 = sSCArray.indexOf(req.body._id);
                sSCArray.splice(index2, 1)
                await SubCategories.findOneAndUpdate({_id: subSubCategory1.subCategory}, {subSubCategories: sSCArray});
            }
        } catch {
            console.log("failed to delete id from sub-categories");
        }
        let subSubCategory = await SubSubCategories.findOneAndUpdate({_id: req.body._id}, {
            subSubCategoryName: req.body.subSubCategoryName,
            category: req.body.category,
            subCategory: req.body.subCategory
        });
        let updated = await SubSubCategories.findOne({_id: req.body._id}).populate("category").populate("subCategory")
        console.log(updated);
        try {
            let category1 = await Categories.findOne({_id: req.body.category})
            let subSCArray = category1.subSubCategories
            subSCArray.push(updated._id)
            await Categories.findOneAndUpdate({_id: req.body.category}, {subSubCategories: subSCArray})
        } catch {
            console.log("failed to update id in category");
        }
        try {
            let subCategory1 = await SubCategories.findOne({_id: req.body.subCategory})
            let subSCArr = subCategory1.subSubCategories
            subSCArr.push(updated._id)
            await SubCategories.findOneAndUpdate({_id: req.body.subCategory}, {subSubCategories: subSCArr})
        } catch {
            console.log("failed to update id in sub-category");
        }
        return res.json({message: "Category name updated successfully", success: true, subSubCategory, updated })
    } catch {
        return res.json({message: "Unable to update category name", success: false})
    }
})

router.patch("/delete-sub-sub-category", userAuth, async (req, res) => {
    try {
        let subSubCategory1 = await SubSubCategories.findOne({_id: req.body._id});
        let category2 = await Categories.findOne({_id: subSubCategory1.category})
        let sSCArr = category2.subSubCategories;
        let index = sSCArr.indexOf(req.body._id);
        sSCArr.splice(index, 1)
        await Categories.findOneAndUpdate({_id: subSubCategory1.category}, {subSubCategories: sSCArr});
        let subCategory2 = await SubCategories.findOne({_id: subSubCategory1.subCategory})
        let sSCArray = subCategory2.subSubCategories;
        let index2 = sSCArray.indexOf(req.body._id);
        sSCArray.splice(index2, 1)
        await SubCategories.findOneAndUpdate({_id: subSubCategory1.subCategory}, {subSubCategories: sSCArray});
        let deleted = await SubSubCategories.findOneAndDelete({_id: req.body._id})
        return res.json({message: "Sub-Sub-Category deleted successfully", success: true, deleted})
    } catch {
        return res.json({message: "Unabe to delete sub-sub-category", success: false})
    }
})


module.exports = router;