const Admins = require("../Models/Admins");
const Users = require("../Models/Users");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { SECRET } = require("../Config/config");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
}

const checkUserId = async (jwt_payload) => {
    let admin1 = await Admins.findOne({_id: jwt_payload._id});
    let user1 = await Users.findOne({_id: jwt_payload._id});
    if (user1){
        // console.log(user1);
        return user1;
    } else if (admin1){
        // console.log(admin1);
        return admin1
    } else {
        return null;
    }
}

const strategy = new Strategy(opts, async (jwt_payload, done) => {
    try {
        let user = await checkUserId(jwt_payload)
        if(user){
            console.log(user);
            // console.log(jwt_payload);
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        
        console.log(err);
        return done(err, false);
    }    
})

module.exports = {
    strategy
};
