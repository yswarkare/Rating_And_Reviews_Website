const Users = require("../Models/Users");
const Admins = require("../Models/Admins");
// const validator = require("validator");

// Validate Unique Username

const validateUsername = async (username) => {

    let user = await Users.findOne({username: username});
    if(user){
        return true
    } else {
        return false
    }
}

// Validate Unique Email ID

const validateEmailId = async (emailId) => {

    let user = await Users.findOne({emailId: emailId});
    if(user){
        return true
    } else {
        return false
    }
}

// Validate Password

const validatePassword = async (user) => {
    let errors = []
    try {
        if (user.password === user.username) {
            return ({success: false, message: "Don't user your username as password."})
        }
        if (user.password === user.emailId) {
            return ({success: false, message: "Don't user your email ID as password."})
        }
        if (user.password.length < 8) {
            errors.push("at least 8 characters");
        }
        if (user.password.search(/[A-Z]/g) < 0) {
            errors.push("at least one uppercase letter"); 
        }
        if (user.password.search(/[a-z]/g) < 0) {
            errors.push("at least one lowercase letter"); 
        }
        if (user.password.search(/[0-9]/g) < 0) {
            errors.push("at least one digit");
        }
        if (user.password.search(/[^a-zA-Z\d]/g) < 0){
            errors.push("at least one special character")
        }
        if (errors.length > 0) {
            console.table({success: false, error: "password", message: "Your user.password must contain ",errors: `${errors}`});
            return ({success: false, error: "password", message: "Your password must contain ",errors: errors});
        }
        console.table({success: true, message: "password is valid."});
        return ({success: true, message: "password is valid."});
    } catch (err) {
        console.log(`${err}`)
        return ({success: false, message: "failed to validate password. Password must be at least 8 characters, combinations of numbers, letters and special characters.", error: `${err}`});
    }
}


const validateAdmin = async (userData) => {
    
    if (userData._id) {
        let admin = await Admins.findOne({_id: userData._id})
        if(admin){
            return true
        }
    } else if (userData.emailId){
        let admin = await Admins.findOne({emailId: userData.emailId})
        if(admin){
            return true
        }
    } else if(userData.username){
        let admin = await Admins.findOne({username: userData.username})
        if(admin){
            return true
        }
    } else {
        return false
    }
}

const getAdminByEmailOrUsername = async (userData) => {
    
    if(userData.username){
        let admin = await Admins.findOne({username: userData.username})
        if(admin){
            return admin;
        }
    } else if (userData.emailId){
        let admin = await Admins.findOne({emailId: userData.emailId})
        if(admin){
            return admin;
        }
    } else {
        return false
    }
}

const validateUser = async (userData) => {
    
    if(userData.username){
        let user = await Users.findOne({username: userData.username})
        if(user){
            return true
        }
    } else if (userData.emailId){
        let user = await Users.findOne({emailId: userData.emailId})
        if(user){
            return true
        }
    } else {
        return false
    }
}

const getUserByEmailOrUsername = async (userData) => {
    
    if(userData.username){
        let user = await Users.findOne({username: userData.username})
        if(user){
            return user;
        }
    } else if (userData.emailId){
        let user = await Users.findOne({emailId: userData.emailId})
        if(user){
            return user;
        }
    } else {
        return false
    }
}

module.exports = {
    validateUsername,
    validateEmailId,
    validatePassword,
    validateUser,
    validateAdmin,
    getUserByEmailOrUsername,
    getAdminByEmailOrUsername,
}