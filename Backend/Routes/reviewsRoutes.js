const express = require("express");
const router = express.Router();
const { userAuth } = require("../Utils/Auth")
const Reviews = require("../Models/Reviews");
const Users = require("../Models/Users");
const Products = require("../Models/Products");

router.get("/", (req, res) => {
    Reviews.find()
    .them(reviews =>  res.json(reviews))
    .catch(err => console.log(err));
})

router.post("/", (req, res) => {
    const newReview = new Reviews({
        review : req.body.review,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        date: req.body.date
    });
    newReview.save().then(review => res.json(review)).catch(err => console.log(err))
})

router.put("/:id", (req, res) => {
    Reviews.findOneAndUpdate({_id: req.params.id}, {
        review : req.body.review,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        date: req.body.date
    }).then(review => res.json(review)).catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    Reviews.findOneAndRemove({_id: req.params.id})
        .then(review => res.json(review))
        .catch(err => console.log(err));
})

router.patch("/get-user-review", userAuth, async (req, res) => {
    try {
        let review = await Reviews.find({user: req.body.user, product: req.body.product}).populate("products");
        return res.json({message: "Got User Review Successfully", success: true, review});
    } catch {
        return res.json({message: "Failed to Get User Review", success: false});
    }
})

router.patch("/post-user-review", userAuth, async (req, res) => {
    try {
        const newReview = new Reviews({
            review : req.body.review,
            product: req.body.product,
            user: req.body.user
        });
        let review1 = await newReview.save();
        let user1 = await Users.findOne({_id: req.user._id})
        let uReviews = user1.reviews
        uReviews.push(review1._id)
        await Users.findOneAndUpdate({_id: req.user._id}, {reviews: uReviews});
        let prodcut1 = await Products.findOne({_id: req.body.product})
        let pReviews = prodcut1.reviews;
        pReviews.push(review1._id)
        await Products.findOneAndUpdate({_id: req.body.product}, {reviews: pReviews});
        return res.json({message: "User Review Posted Successfully", success: true, review: review1})
    } catch {
        return res.json({message: "Failed to Post User Review", success: false});
    }
})

router.patch("/update-user-review", userAuth, async (req, res) => {
    try {
        await Reviews.findOneAndUpdate({_id: req.body._id}, {
            review : req.body.review,
            product: req.body.product,
            user: req.body.user
        });
        let review = await (await Reviews.findOne({_id: req.body._id})).populate("product").execPopulate((err, user1)=>{console.log(user1);})
        return res.json({message: "User Review Updated Scuccessfully", success: true, review});
    } catch {
        return res.json({message: "Failed to update user review", success: false});
    }
})

router.patch("/delete-user-review", userAuth, async (req, res) => {
    try {
        let review = await Reviews.findOneAndRemove({_id: req.body._id}).populate("user");
        return res.json({message: "User Review Deleted Successfully", success: true, review});
    } catch {
        return res.json({message: "Failed to delete user review", success: false});
    }
})

module.exports = router;