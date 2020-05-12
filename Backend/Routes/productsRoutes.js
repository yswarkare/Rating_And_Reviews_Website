const express = require("express");
const router = express.Router();
const Products = require("../Models/Products");
const Categoreies = require("../Models/Categories");
const SubCategories = require("../Models/SubCategories");
const SubSubCategories = require("../Models/SubSubCategories");
const { validateAdmin } = require("../Utils/Validations");
const { userAuth } = require("../Utils/Auth");

// Admin Protected Routes

router.get("/", async (req, res) => {
    try {
        let products = await Products.find().populate("category").populate("subCategory").populate("subSubCategory")
        return res.json({products, message: "Got list of all products", success: true})
    } catch {
        return res.json({message: "Failed to get list of all products", success: false})
    }
})

router.post("/", userAuth, async (req, res) => {
    try {
        console.log(req.body);
        const newProduct = new Products({
            productName : req.body.product.productName,
            brandName: req.body.product.brandName,
            productDescription : req.body.product.productDescription,
            category: req.body.product.category,
            subCategory : req.body.product.subCategory,
            subSubCategory : req.body.product.subSubCategory,
            image : req.body.product.image,
            images: req.body.product.images
        })
        let product1 = await newProduct.save()
        let product = await Products.findOne({_id: product1._id}).populate("category").populate("subCategory").populate("subSubCategory");
        // Add id in categories
        try {
            let category1 = await Categoreies.findOne({_id: req.body.product.category});
            let pArr1 = category1.products
            pArr1.push(product._id)
            await Categoreies.findOneAndUpdate({_id: req.body.product.category}, {products: pArr1});
        } catch (err){
            console.log(err);
        }
        // Add Id in sub-categories
        try {
            let subCategory1 = await SubCategories.findOne({_id: req.body.product.subCategory})
            let pArr2 = subCategory1.products
            pArr2.push(product._id)
            await SubCategories.findOneAndUpdate({_id: req.body.product.subCategory}, {products: pArr2})
        } catch (err) {
            console.log(err);
        }
        // Add Id in sub-sub-categories
        try {
            let subSubCategory1 = await SubSubCategories.findOne({_id: req.body.product.subSubCategory})
            let pArr3 = subSubCategory1.products
            pArr3.push(product._id)
            await SubSubCategories.findOneAndUpdate({_id: req.body.product.subSubCategory}, {products: pArr3})
        } catch (err) {
            console.log(err);
        }

        return res.json({message: "Product added successfully", success: true, product})
    } catch (err) {
        console.log(err);
        return res.json({message: "Failed to add product", success: false, error: err})
    }
})

router.patch("/add-image", userAuth, async (req, res) => {
    try {        
        let product1 = await Products.findOne({_id: req.bdoy.product._id})
        product1.images.push[req.body.product.image]
        let product2 = await Products.findOneAndUpdate({_id: req.bdoy.product._id}, {images: product1.images})
        return res.json({message: "Product Images Added Succcessfully", success: true, product2})
    } catch (err){
        return res.json({message: "User Is Not Authorized", success: false, error: err})
    }
})

router.patch("/update-product", userAuth, async (req, res) => {
    console.log(req.body);
    let product1 = await Products.findOne({_id: req.body.product._id})
    try {
        if (product1.category !== req.body.product.category) {
            let category1 = await Categoreies.findOne({_id: product1.category})
            let pArr1 = category1.products;
            let index1 = pArr1.indexOf(req.body.product._id);
            pArr1.splice(index1, 1);
            await Categoreies.findOneAndUpdate({_id: product1.category}, {products: pArr1});
        }
    } catch (error) {
        console.log(error);
    }
    try {
        if (product1.subCategory !== req.body.product.subCategory) {
            let subCategory1 = await SubCategories.findOne({_id: product1.subCategory});
            let pArr2 = subCategory1.products;
            let index2 = pArr2.indexOf(req.body.product._id);
            pArr2.splice(index2, 1);
            await SubCategories.findOneAndUpdate({_id: product1.subCategory}, {products: pArr2});
        }
    } catch (error) {
        console.log(error);
    }
    try {
        if (product1.subSubCategory !== req.body.product.subSubCategory) {
            let subSubCategory1 = await SubSubCategories.findOne({_id: product1.subSubCategory});
            let pArr3 = subSubCategory1.products;
            let index3 = pArr3.indexOf(req.body.product._id);
            pArr3.splice(index3, 1);
            await SubSubCategories.findOneAndUpdate({_id: product1.subSubCategory}, {products: pArr3});
        }
    } catch (error) {
        console.log(error);
    }
    try {
        let product = await Products.findOneAndUpdate({_id: req.body.product._id}, {
            productName: req.body.product.productName,
            brandName: req.body.product.brandName,
            image: req.body.product.image,
            productDescription: req.body.product.productDescription,
            category: req.body.product.category,
            subCategory: req.body.product.subCategory,
            subSubCategory: req.body.product.subSubCategory,
        })
        let updated = await Products.findOne({_id: req.body.product._id}).populate("category").populate("subCategory").populate("subSubCategory");
        try {
            let category2 = await Categoreies.findOne({_id: req.body.product.category})
            let pArray1 = category2.products;
            pArray1.push(updated._id);
            await Categoreies.findOneAndUpdate({_id: req.body.product.category}, {products: pArray1})
        } catch (error) {
            console.log(error);
        }
        try {
            let subCategory2 = await SubCategories.findOne({_id: req.body.product.subCategory})
            let pArray2 = subCategory2.products;
            pArray2.push(updated._id);
            await SubCategories.findOneAndUpdate({_id: req.body.product.subCategory}, {products: pArray2})
        } catch (error) {
            console.log(error);
        }
        try {
            let subSubCategories2 = await SubSubCategories.findOne({_id: req.body.product.subSubCategory})
            let pArray3 = subSubCategories2.products;
            pArray3.push(updated._id);
            await SubSubCategories.findOneAndUpdate({_id: req.body.product.subSubCategory}, {products: pArray3})
        } catch (error) {
            console.log(error);
        }
        return res.json({message: "Product updated successfull", success: true, product, updated});
    } catch {
        return res.json({message: "Unable to update product", success: false})
    }
})

router.patch("/delete-product", userAuth, async (req, res) => {
    console.log(req.body);
    let product1 = await Products.findOne({_id: req.body.product._id})
    try {        
        let category1 = await Categoreies.findOne({_id: product1.category})
        let pArr1 = category1.products;
        let index1 = pArr1.indexOf(req.body.product._id);
        pArr1.splice(index1, 1);
        await Categoreies.findOneAndUpdate({_id: product1.category}, {products: pArr1});
    } catch (error) {
        console.log(error);
    }
    try {
        let subCategory1 = await SubCategories.findOne({_id: product1.subCategory});
        let pArr2 = subCategory1.products;
        let index2 = pArr2.indexOf(req.body.product._id);
        pArr2.splice(index2, 1);
        await SubCategories.findOneAndUpdate({_id: product1.subCategory}, {products: pArr2});
    } catch (error) {
        console.log(error);
    }
    try {
        let subSubCategory1 = await SubSubCategories.findOne({_id: product1.subSubCategory});
        let pArr3 = subSubCategory1.products;
        let index3 = pArr3.indexOf(req.body.product._id);
        pArr3.splice(index3, 1);
        await SubSubCategories.findOneAndUpdate({_id: product1.subSubCategory}, {products: pArr3});
    } catch (error) {
        console.log(error);
    }
    try {
        let product = await Products.findOneAndDelete({_id: req.body.product._id})
        return res.json({message: "Product deleted successfully", success: true, product})
    } catch {
        return res.json({message: "Unable to delete product", success: false});
    }
})

module.exports = router;