const express = require("express");
const router = express.Router();
const { userAuth } = require("../Utils/Auth");

const Ratings = require("../Models/Ratings"); 

router.get("/", (req, res) => {
    Ratings.find()
    .them(rating =>  res.json(rating))
    .catch(err => console.log(err));
})

router.post("/", (req, res) => {
    const newRating = new Ratings({
        rating : req.body.rating.rating
    });
    newRating.save().then(rating => res.json(rating)).catch(err => console.log(err))
})

router.put("/:id", (req, res) => {
    Ratings.findOneAndUpdate({_id: req.params.id}, {
        rating : req.body.rating.rating
    }).then(rating => res.json(rating)).catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
    Ratings.findOneAndRemove({_id: req.params.id})
        .then(rating => res.json(rating))
        .catch(err => console.log(err));
})


router.patch("/get-user-rating", userAuth, async (req, res) => {
    console.log(req.body);
    try {
        let rating = await Ratings.find({product: req.body.product, user: req.body.user})
        console.log(rating);
        return res.json({message: "Got User Rating Successfully", success: true, rating})
    } catch {
        return res.json({message: "Failed To Get User Rating", success: false})
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
        let rating = await newRating.save()
        return res.json({message: "Rating Posted Successfully", success: true, rating})
    } catch {
        return res.json({message: "Failed to post rating", success: false})
    }
})

router.patch("/update-user-rating", userAuth, async (req, res) => {
    await Ratings.findOneAndUpdate({_id: req.body.rating._id}, {
        rating : req.body.rating.rating
    }).then(rating => res.json(rating)).catch(err => console.log(err))
})

router.delete("/user-rating/:id", userAuth, async (req, res) => {
    await Ratings.findOneAndRemove({_id: req.params.id})
        .then(rating => res.json(rating))
        .catch(err => console.log(err));
})


module.exports = router;