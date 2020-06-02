const express = require("express");
const router = express.Router();
const { userAuth } = require("../Utils/Auth")
const Reviews = require("../Models/Reviews");
const Users = require("../Models/Users");
const Products = require("../Models/Products");

router.get("/", async (req, res) => {
    try {
        let reviews = await Reviews.find().populate("user").populate("product");
        return res.json({message: "Got All Reviews", success: true, reviews});
    } catch (error) {
        console.log(error);
    }
})

router.patch("/get-user-review", userAuth, async (req, res) => {
    try {
        let review = await Reviews.find({user: req.body.user, product: req.body.product}).populate("product").populate("user");
        return res.json({message: "Got User Review Successfully", success: true, review: review});
    } catch {
        return res.json({message: "Failed to Get User Review", success: false});
    }
})

router.patch("/post-user-review", userAuth, async (req, res) => {
    console.log("in post user review => " + req.body);
    try {
        const newReview = new Reviews({
            review : req.body.review,
            product: req.body.product,
            user: req.body.user
        });
        let review1 = await newReview.save();
        let review3 = await Reviews.findOne({_id: review1._id}).populate("user").populate("product")
        console.log("review3 => " + review3);
        let user1 = await Users.findOne({_id: req.user._id})
        let uReviews = user1.reviews
        uReviews.push(review1._id)
        await Users.findOneAndUpdate({_id: req.user._id}, {reviews: uReviews});
        let product1 = await Products.findOne({_id: req.body.product})
        let pReviews = product1.reviews;
        pReviews.push(review1._id)
        await Products.findOneAndUpdate({_id: req.body.product}, {reviews: pReviews});
        return res.json({message: "User Review Posted Successfully", success: true, review: review3})
    } catch (err) {
        console.log(err);
        return res.json({message: "Failed to Post User Review", success: false, error: `${err}`});
    }
})

router.patch("/update-user-review", userAuth, async (req, res) => {
    try {
        await Reviews.findOneAndUpdate({_id: req.body._id}, {
            review : req.body.review,
            date: req.body.date
        });
        let review = await Reviews.findOne({_id: req.body._id}).populate("user").populate("product");
        return res.json({message: "User Review Updated Scuccessfully", success: true, review});
    } catch {
        return res.json({message: "Failed to update user review", success: false});
    }
})

router.patch("/delete-user-review", userAuth, async (req, res) => {
    let review1 = await Reviews.findOne({_id: req.body._id})
    try {
        let user1 = await Users.findOne({_id: req.body.user})
        let rArr1 = user1.reviews
        let index1 = rArr1.indexOf(req.body._id)
        rArr1.splice(index1, 1)
        await Users.findOneAndUpdate({_id: req.body.user}, {reviews: rArr1})
    } catch (error) {
        console.log(error);
    }
    try {
        let product1 = await Products.findOne({_id: req.body.product})
        let rArr2 = product1.reviews
        let index2 = rArr2.indexOf(req.body._id)
        rArr2.splice(index2, 1)
        await Products.findOneAndUpdate({_id: req.body.product}, {reviews: rArr2})
    } catch (error) {
        console.log(error);
    }
    try {
        let review = await Reviews.findOneAndRemove({_id: req.body._id}).populate("user").populate("product");
        return res.json({message: "User Review Deleted Successfully", success: true, review});
    } catch (err) {
        console.log(err);
        return res.json({message: "Failed to delete user review", success: false, error: err});
    }
})

router.patch("/get-product-reviews", async (req, res) => {
    console.log( "Get Product Review => " + JSON.stringify(req.body));
    try {
        let reviews = await Reviews.find({product: req.body.product}).populate("user").populate("product")
        return res.json({message: "Got All Product Reviews Successfully", success: true, reviews})
    } catch (err) {
        return res.json({message: "Failed to get product reviews", success: false, error: `${err}`})
    }
})



module.exports = router;