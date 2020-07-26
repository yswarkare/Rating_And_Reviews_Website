let userState = {
    user: {
        _id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        username: "",
        emailId : "",
        password : "",
        token: "",
        ratings: [],
        reviews: [],
        likedReviews: [],
        dislikedReviews: []
    },
    loginDetails:{
        username: "",
        emailId: "",
        password: ""
    },
    loginStatus: {
        emailId: "",
        username: "",
        loggedIn: false,
        userIsAdmin: false,
        loginRedirect: "",
        logoutRedirect: "",
        userRegistered: null,
        registrationRedirect: ""
    },
    headers: {
        "Authorization": "",
        "Content-Type": "application/json"
    },
    userUpdate: {
        firstName: "",
        middleName: "",
        lastName: "",
        username: "",
        emailId : "",
        oldPassword: "",
        newPassword : "",
        repeatPassword: ""
    },
    errors: {
        firstName: { message: "", success: null },
        middleName: { message: "", success: null },
        lastName: { message: "", success: null },
        username: { message: "", success: null },
        emailId : { message: "", success: null },
        password: { message: "", success: null },
        oldPassword: { message: "", success: null },
        newPassword : { message: "", success: null },
        repeatPassword: { message: "", success: null },
        registration: {error: null, errors: [], message: null, success: null},
        login: { message: "", success: null}
    },
    users: [],
    usersCopy: [],
    firstPassword: null,
}

export default userState;