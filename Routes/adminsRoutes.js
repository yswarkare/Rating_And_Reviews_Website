const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { userAuth } = require("../Utils/Auth");
const { getAdminByEmailOrUsername } = require("../Utils/Validations")
const validator = require("validator");
const Admins = require("../Models/Admins"); 

router.get("/", async (req, res) => {
    try {
        await Admins.find()
        .then((admins) => {res.json(admins)})
    } catch {
        (err => console.log(err))
    };
})

router.post("/", async (req, res) => {
    console.log(req.body);
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.admin.password, salt);
    const newAdmin = new Admins({
        firstName: req.body.admin.firstName,
        middleName: req.body.admin.middleName,
        lastName: req.body.admin.lastName,
        username: req.body.admin.username,
        emailId : req.body.admin.emailId,
        password : hashedPassword,
    });
    await newAdmin.save().then(admin => res.json(admin)).catch(err => console.log(err))
})

router.put("/:id", userAuth, async (req, res) => {
    let salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.admin.password, salt);
    Admins.findOneAndUpdate({_id: req.params.id}, {
        firstName: req.body.admin.firstName,
        middleName: req.body.admin.middleName,
        lastName: req.body.admin.lastName,
        username: req.body.admin.username,
        emailId : req.body.admin.emailId,
        password : hashedPassword,
    }).then(admin => res.json(admin)).catch(err => console.log(err))
})

router.delete("/:id", userAuth, async (req, res) => {
    await Admins.findOneAndRemove({_id: req.params.id})
        .then(admin => res.json(admin))
        .catch(err => console.log(err));
})

router.get("/admin-profile", userAuth, async (req, res) => {
    await Admins.populate("ratings").populate("reviews");
    let admin = await getAdminByEmailOrUsername(req.body);
    res.json({admin});
})

router.get("/admin-dashboard", userAuth, async (req, res) => {
    await Admins.populate("ratings").populate("reviews");
    let admin = await getAdminByEmailOrUsername(req.body);
    return res.json({admin});
})

router.get("/admin-by-id/", userAuth, async (req, res) => {
    let admin = await Admins.findOne({_id: req.body.user._id})
    return res.json(admin);
})


router.patch("/admin-logout", async (req, res) => {
    try {
        return res.json({message: "Admin Logged Out Successfully", success: true})
    } catch (err){
        res.json({message: "Admin Logout failed", success: false, error: err})
    }
})

router.get("/get-admin-info", userAuth, async (req, res) => {
    try {
        let user = await Admins.findOne({_id: req.user._id}).populate("reviews");
        return res.json({user, message: "Got Admin Info Successfully", success: true});
    } catch (err) {
        return res.json({message: "Failed To Get Admin Info", success: false, error: err});
    }
})

router.patch("/update-admin-name", userAuth, async (req, res) => {
    try {
        let updated = await Admins.findOneAndUpdate({_id: req.user._id}, {
            firstName: req.body.user.firstName,
            middleName: req.body.user.middleName,
            lastName: req.body.user.lastName
        })
        return res.json({updated, message: "Name of User Updated Successfull", success: true})
    } catch {
        return res.json({message: "Unable to Update Name of User", success: false})
    }
})

router.patch("/update-admin-username", userAuth, async (req, res) => {
    try {
        let usernameIsTaken = await validateUsername(req.body.user.username)
        if ( usernameIsTaken === true){
            return res.json({message: "Username is not available", success: false})
        } else {
            let updated = await Admins.findOneAndUpdate({_id: req.user._id}, {username: req.body.user.username});
            return res.json({updated, message: "Username Updated SuccessFully", success: true});
        }
    } catch {
        return res.json({message: "Unable to update username", success: false})
    }
})

router.patch("/update-admin-email", userAuth, async (req, res) => {
        let checkEmail = validator.isEmail(req.body.user.emailId)
        if (checkEmail === false){
            return res.json({message: "It is not a valid email id", success: false})
        }
        let emailIsTaken = await validateEmailId(req.body.user.emailId)
        if ( emailIsTaken === true){
            return res.json({message: "Email is not available", success: false})
        } else {
            let updated = await Admins.findOneAndUpdate({_id: req.user._id}, {emailId: req.body.user.emailId})
            .then(()=>{return res.json({updated, message: "Email Updated SuccessFully", success: true})})
            .catch(()=>{return res.json({message: "Unable to update Email", success: false})})
        }
        
})

router.patch("/update-admin-password", userAuth, async (req, res) => {
    let user = Admins.findOne({_id: req.user})
    let isMatch = await bcrypt.compare(req.body.user.oldPassword, user.password);
    if (isMatch === false){
        return res.json({message: "Entered Wrong Old Password", success: false})
    }
    if (req.body.user.newPassword !== req.body.user.repeatPassword){
        return res.json({message: "Password didn't matched", success: false})
    }
    let salt = bcrypt.genSaltSync(10);
    const newHashedPassword = bcrypt.hashSync(req.body.user.newPassword, salt);
    try {
        let updated = await Admins.findOneAndUpdate({_id: req.user}, {password, newHashedPassword})
        return res.json({updated, message: "Password changed successfully", success: true})
    } catch {
        return res.json({message: "Unable to update password", success: fasle})
    }
})

module.exports = router;