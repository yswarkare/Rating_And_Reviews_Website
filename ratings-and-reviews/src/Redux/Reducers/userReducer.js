import userState from "../States/userState";
import validator from "validator";
import Cookies from "js-cookie";

import { 
    Set_User_First_Name,
    Set_User_Middle_Name,
    Set_User_Last_Name,
    Set_User_Username,
    Set_User_Email_Id,
    Set_First_Password,
    Set_Second_Password,
    Register_User,
    Is_User_Logged_In,
    Get_Login_Username_Or_Email_ID,
    Get_Login_Password,
    Set_Login_Redirect,
    User_Logout,
    Get_User_Info,
    Set_User_Update,
    Set_Update_First_Name,
    Set_Update_Middle_Name,
    Set_Update_Last_Name,
    Set_Update_Username,
    Set_Update_Email_Id,
    Set_Update_Old_Password,
    Set_Update_New_Password,
    Set_Update_Repeat_Password,
    Update_User_Name,
    Update_User_Username,
    Update_User_Email_Id,
    Update_User_Password } from "../Actions/actionTypes.js";

let userReducer = ( state = userState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
 
    switch(action.type) {      

        case Set_User_First_Name:
            stateCopy.user.firstName = action.payload
            return stateCopy

        case Set_User_Middle_Name:
            stateCopy.user.middleName = action.payload
            return stateCopy

        case Set_User_Last_Name:
            stateCopy.user.lastName = action.payload
            return stateCopy

        case Set_User_Username:
            stateCopy.user.username = action.payload
            return stateCopy

        case Set_User_Email_Id:
            let email = validator.isEmail(action.payload);
            if(email === true){
                stateCopy.errors.emailId.success = false;
                stateCopy.user.emailId = action.payload
            } else {
                stateCopy.errors.emailId.success = true;
            }
            return stateCopy

        case Set_First_Password:
            stateCopy.firstPassword = action.payload
            return stateCopy

        case Set_Second_Password:
            if (stateCopy.firstPassword === action.payload){
                stateCopy.user.password = action.payload
                stateCopy.errors.password = false
            } else {
                stateCopy.errors.password = true
            }
            return stateCopy

        case Register_User:
            console.log(action.payload);
            stateCopy.errors.registration.success = action.payload.data.success;
            stateCopy.errors.registration.message = action.payload.data.message;
            if (action.payload.data.success === true){
                stateCopy.loginStatus.registrationRedirect = "/user-login";
                stateCopy.loginStatus.userRegistered = true;
            } else {
                stateCopy.errors.registration.error = action.payload.data.error;
                stateCopy.loginStatus.registrationRedirect = "/";
            }
            console.log(stateCopy);
            return stateCopy

        case Is_User_Logged_In:
            console.log(action.payload)
            console.log("Cookie "+Cookies.get("userToken"))
            state.user._id = action.payload.data.user._id;
            state.user.username = action.payload.data.user.username;
            state.user.emailId = action.payload.data.user.emailId;
            state.loginStatus.loggedIn = action.payload.data.success;
            state.loginStatus.userIsAdmin = action.payload.data.userIsAdmin;
            if (action.payload.data.success === true && action.payload.data.userIsAdmin === false) {
                state.loginStatus.loginRedirect = "/user-account"
            } else if (action.payload.data.success === true && state.loginStatus.userIsAdmin === true) {
                state.loginStatus.loginRedirect = "/admin-dashboard"
            } else {
                state.loginStatus.loginRedirect = "/"
            }
            console.log(state)
            return state;

        case Get_Login_Username_Or_Email_ID:
            if (validator.isEmail(action.payload) === true) {
                stateCopy.loginDetails.emailId = action.payload
            } else {
                stateCopy.loginDetails.username = action.payload
            }
            console.log(stateCopy);
            return stateCopy

        case Get_Login_Password:
            stateCopy.loginDetails.password = action.payload;
            return stateCopy

        case Set_Login_Redirect:
            console.log(action.payload)
            Cookies.set("userToken", action.payload.data.token)
            state.loginStatus.loggedIn = action.payload.data.success;
            state.loginStatus.userIsAdmin = action.payload.data.userIsAdmin;
            state.loginStatus.emailId = action.payload.data.emailId;
            state.loginStatus.username = action.payload.data.username;
            state.headers.Authorization = action.payload.data.token;
            if (state.loginStatus.userIsAdmin === false) {
                state.user = action.payload.data.user
                state.loginStatus.loginRedirect = "/user-dashboard"
            } else if (state.loginStatus.userIsAdmin === true) {
                state.user = action.payload.data.admin
                state.loginStatus.loginRedirect = "/admin-dashboard"
            }
            console.log("Cookie "+Cookies.get("userToken"))
            console.log(state);
            return state
        
        case User_Logout:
            console.log(action.payload)
            Cookies.remove("userToken")
            state.loginStatus.loggedIn = !action.payload.data.success;
            state.user.token = "";
            state.headers.Authorization = "";
            state.loginStatus.logoutRedirect = "/";
            state.loginStatus.userIsAdmin = false;
            console.log(state);
            return state

        case Get_User_Info:
            console.log(action.payload);
            // stateCopy.user = action.payload.data.user,
            stateCopy.user._id = action.payload.data.user._id;
            stateCopy.user.firstName = action.payload.data.user.firstName;
            stateCopy.user.middleName = action.payload.data.user.middleName;
            stateCopy.user.lastName = action.payload.data.user.lastName;
            stateCopy.user.username = action.payload.data.user.username;
            stateCopy.user.emailId = action.payload.data.user.emailId;
            console.log(stateCopy)
            return stateCopy;

        case Set_User_Update:
            stateCopy.userUpdate.firstName = stateCopy.user.firstName;
            stateCopy.userUpdate.middleName = stateCopy.user.middleName;
            stateCopy.userUpdate.lastName = stateCopy.user.lastName;
            stateCopy.userUpdate.username = stateCopy.user.username;
            stateCopy.userUpdate.emailId = stateCopy.user.emailId;
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_First_Name:
            stateCopy.userUpdate.firstName = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Middle_Name:
            stateCopy.userUpdate.middleName = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Last_Name:
            stateCopy.userUpdate.lastName = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Username:
            stateCopy.userUpdate.username = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Email_Id:
            stateCopy.userUpdate.emailId = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Old_Password:
            stateCopy.userUpdate.oldPassword = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_New_Password:
            stateCopy.userUpdate.newPassword = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Set_Update_Repeat_Password:
            stateCopy.userUpdate.repeatPassword = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Update_User_Name:
            console.log(action.payload)
            stateCopy.errors.emailId.message = action.payload.data.message;
            stateCopy.errors.emailId.success = action.payload.data.success;
            console.log(stateCopy);
            return stateCopy;

        case Update_User_Username:
            console.log(action.payload)
            stateCopy.errors.emailId.message = action.payload.data.message;
            stateCopy.errors.emailId.success = action.payload.data.success;
            console.log(stateCopy);
            return stateCopy;

        case Update_User_Email_Id:
            console.log(action.payload)
            stateCopy.errors.emailId.message = action.payload.data.message;
            stateCopy.errors.emailId.success = action.payload.data.success;
            console.log(stateCopy);
            return stateCopy;

        case Update_User_Password:
            console.log(action.payload)
            stateCopy.errors.emailId.message = action.payload.data.message;
            stateCopy.errors.emailId.success = action.payload.data.success;
            console.log(stateCopy);
            return stateCopy;

        default:
            return stateCopy
    }
}

export default userReducer;