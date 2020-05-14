const express = require("express");
const router = express.Router();
const { success, error } = require("consola");
const Users = require("../Models/Users"); 
const { userRegistration, userLogin, userAuth } = require("../Utils/Auth");
const bcrypt = require("bcryptjs");
const { getUserByEmailOrUsername, validateAdmin, validateUsername, validateEmailId } = require("../Utils/Validations");
const validator = require("validator");

router.get("/", userAuth, async (req, res) => {
    if (validateAdmin(req.body) === true){
        try {
            await Users.find()
            .then((users) => {res.json(users)})
        } catch {
            (err => console.log(err))
        };
    }else{
        return res.json({message: "User is not Admin", success: false})
    }
    
})

router.post("/", async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.user.password, salt);
    const newUser = new Users({
        firstName: req.body.user.firstName,
        middleName: req.body.user.middleName,
        lastName: req.body.user.lastName,
        username: req.body.user.username,
        emailId : req.body.user.emailId,
        password : hashedPassword,
    });
    await newUser.save().then(user => res.json(user)).catch(err => console.log(err))
})

router.put("/:id", userAuth, async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.user.password, salt);
    await Users.findOneAndUpdate({_id: req.params.id}, {
        firstName: req.body.user.firstName,
        middleName: req.body.user.middleName,
        lastName: req.body.user.lastName,
        username: (req.body.user.username).toLowerCase(),
        emailId : req.body.user.emailId,
        password : hashedPassword,
    }).then(user => res.json(user)).catch(err => console.log(err))
})

router.delete("/:id", userAuth, async (req, res) => {
    try {
        await Users.findOneAndRemove({_id: req.params.id})
        .then(() => res.json(success({ message:`User Account Deleted Successfully`, badge: true })))
    } catch {
        (err => res.status(404).json(error({ message: err, badge: true })))
    }
})

// User Session Routes

// User Registration
router.post("/user-registration", async (req, res) => {
    console.log(req.body);
    await userRegistration(req.body, res)
})

router.post("/user-login", async (req, res) => {
    console.log(req.body);
    await userLogin(req.body, res)
})

router.get("/user-profile", userAuth, async (req, res) => {
    await Users.populate("ratings").populate("reviews");
    let user = await getUserByEmailOrUsername(req.body)
    res.json({user});
})

router.get("/user-dashboard", userAuth, async (req, res) => {
    await Users.populate("ratings").populate("reviews");
    let user = await getUserByEmailOrUsername(req.body);
    res.json({user});
})

router.get("/user-by-id/", userAuth, async (req, res) => {
    let user = await Users.findOne({_id: req.body.user._id})
    return res.json(user)
})

router.patch("/user-logout", async (req, res) => {
    try {
        return res.json({message: "User Logged Out Successfully", success: true})
    } catch (err){
        res.json({message: "User Logout failed", success: false, error: err})
    }
})

router.get("/is-user-logged-in", userAuth, async (req, res) => {
    try {
        // console.log("Response => ", req.user);
        let user = req.user
        let userIsAdmin
        if( await validateAdmin(req.user) === true){
            userIsAdmin = true;
        } else {
            userIsAdmin = false
        }
        return res.json({userIsAdmin, success: true, user})
    } catch (err){
        return res.json({userIsAdmin: false, success: false, error: err})
    }
})

router.get("/get-user-info", userAuth, async (req, res) => {
    // console.log("User in req => "+ req.user);
    try {
        let user = await Users.findOne({_id: req.user._id})
        return res.json({user, message: "Got User Info Successfully", success: true});
    } catch (err) {
        return res.json({message: "Failed To Get User Info", success: false, error: err});
    }
})

router.patch("/update-user-name", userAuth, async (req, res) => {
    // console.log(req.body);
    if (req.body.user.username === ""){
        return res.json({message: "Username should not be empty", success: false})
    }
    try {
        let updated = await Users.findOneAndUpdate({_id: req.user._id}, {
            firstName: req.body.user.firstName,
            middleName: req.body.user.middleName,
            lastName: req.body.user.lastName
        })
        return res.json({updated, message: "Name of User Updated Successfull", success: true})
    } catch {
        return res.json({message: "Unable to Update Name of User", success: false})
    }
})

router.patch("/update-user-username", userAuth, async (req, res) => {
    // console.log(req.body);
    let usernameIsTaken = await validateUsername(req.body.user.username)
    if ( usernameIsTaken === true){
        return res.json({message: "Username is not available", success: false})
    } else {
        try {
            await Users.findOneAndUpdate({_id: req.user._id}, {username: req.body.user.username});
            let updated = await Users.findOne({_id: req.user_id});
            return res.json({updated, message: "Username Updated SuccessFully", success: true});
        } catch {
            return res.json({message: "Unable to update username", success: false})
        }
    }
})

router.patch("/update-user-email", userAuth, async (req, res) => {  
    let checkEmail = validator.isEmail(req.body.user.emailId)
    if (checkEmail === false){
        return res.json({message: "It is not a valid email id", success: false})
    }
    let emailIsTaken = await validateEmailId(req.body.user.emailId)
    if ( emailIsTaken === true){
        return res.json({message: "Email is not available", success: false})
    } else {
        try {
            let updated = await Users.findOneAndUpdate({_id: req.user._id}, {emailId: req.body.user.emailId});
            return res.json({updated, message: "Email Updated SuccessFully", success: true});
        } catch {
            return res.json({message: "Unable to update Email", success: false})
        }
    }
})

router.patch("/update-user-password", userAuth, async (req, res) => {
    let user = Users.findOne({_id: req.user})
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
        let updated = await Users.findOneAndUpdate({_id: req.user}, {password, newHashedPassword})
        return res.json({updated, message: "Password changed successfully", success: true})
    } catch {
        return res.json({message: "Unable to update password", success: fasle})
    }
})


module.exports = router;