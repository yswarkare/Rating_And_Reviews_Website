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
    validateAdmin,
    validateUser,
    validateEmailId,
    validateUsername,
    getUserByEmailOrUsername,
    getAdminByEmailOrUsername,
}