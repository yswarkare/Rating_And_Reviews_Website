const express = require("express");
const router = express.Router();
const { userAuth } = require("../Utils/Auth");
const { averageRating } = require("../Utils/RatingsCal");

const Ratings = require("../Models/Ratings");
const Products = require("../Models/Products");
const Users = require("../Models/Users");

router.get("/", (req, res) => {
    Ratings.find()
    .them(rating =>  res.json(rating))
    .catch(err => console.log(err));
})

router.patch("/get-user-rating", userAuth, async (req, res) => {
    console.log(req.body);
    try {
        let rating = await Ratings.find({product: req.body.product, user: req.body.user}).populate("user").populate("product")
        console.log(rating);
        return res.json({message: "Got User Rating Successfully", success: true, rating})
    } catch (err) {
        return res.json({message: "Failed To Get User Rating", success: false, error: `${err}`})
    }
})

router.post("/post-user-rating", userAuth, async (req, res) => {
    console.log(req.body);
    try {
        const newRating = new Ratings({
            rating : req.body.rating,
            product: req.body.product,
            user: req.body.user
        });
        let rating2 = await newRating.save()
        let rating = await Ratings.findOne({_id: rating2._id}).populate("user").populate("product");
        try {
            let product1 = await Products.findOne({_id: req.body.product})
            let totalRatings1 = (product1.totalRatings + 1);
            let ratings1 = product1.ratings
            let rating1 = (ratings1[(2 * req.body.rating)] + 1)
            ratings1[(2 * req.body.rating)] = rating1
            let avgRating1 = await averageRating(ratings1)
            let rArr = product1.allRatings
            rArr.push(rating._id)
            await Products.findOneAndUpdate({_id: req.body.product},{
                totalRatings: totalRatings1,
                avgRating: avgRating1,
                ratings: ratings1,
                allRatings: rArr
            })
        } catch (error) {
            console.log(error);
        }
        try {
            let user1 = await Users.findOne({_id: req.body.user})
            let rArr2 = user1.ratings
            rArr2.push(req.rating._id)
            await Users.findOneAndUpdate({_id: req.body.user}, {ratings: rArr2})
        } catch (error) {
            console.log(error);
        }
        return res.json({message: "Rating Posted Successfully", success: true, rating})
    } catch (err) {
        return res.json({message: "Failed to post rating", success: false, error: `${err}`})
    }
})

router.patch("/update-user-rating", userAuth, async (req, res) => {
    console.log(req.body);
    try {
        await Ratings.findOneAndUpdate({_id: req.body._id}, {
            rating : req.body.rating
        })
        let rating = await Ratings.findOne({_id: req.body._id}).populate("user").populate("product")
        try {
            let product1 = await Products.findOne({_id: req.body.product})
            let ratings1 = product1.ratings
            let rating1 = (ratings1[(2 * req.body.rating)] + 1)
            ratings1[(2 * req.body.rating)] = rating1
            let avgRating1 = await averageRating(ratings1)
            await Products.findOneAndUpdate({_id: req.body.product},{
                avgRating: avgRating1,
                ratings: ratings1,
            })
        } catch (error) {
            console.log(error);
        }
        return res.json({message: "User ratings updated successfully", success: true, rating})
    } catch (err) {
        console.log(err);
        return res.json({message: "Failed to update user rating", success: false, error: `${err}`})
    }
})

router.delete("/delete-user-rating", userAuth, async (req, res) => {
    try {
        await Ratings.findOneAndRemove({_id: req.body._id})
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;