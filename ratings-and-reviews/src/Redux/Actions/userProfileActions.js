import { api } from "./axiosDefaults";
import { Get_User_Info,
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
    Update_User_Password } from "./actionTypes";

export const getUserInfo = (userIsAdmin) => async (dispatch) => {
    if (userIsAdmin === true) {
        let res = await api.get("/admins/get-admin-info");
        return dispatch({
            type: Get_User_Info,
            payload: res
        })
    } else {
        let res = await api.get("/users/get-user-info");
        return dispatch({
            type: Get_User_Info,
            payload: res
        })
    }
}

export const setUserUpdate = () => {
    return ({
        type: Set_User_Update
    })
}

export const setUpdateFirstName = (firstName) => {
    return ({
        type: Set_Update_First_Name,
        payload: firstName
    })
}

export const setUpdateMiddleName = (middleName) => {
    return ({
        type: Set_Update_Middle_Name,
        payload: middleName
    })
}

export const setUpdateLastName = (lastName) => {
    return ({
        type: Set_Update_Last_Name,
        payload: lastName
    })
}

export const setUpdateUsername = (username) => {
    return ({
        type: Set_Update_Username,
        payload: username
    })
}

export const setUpdateEmailId = (emailId) => {
    return ({
        type: Set_Update_Email_Id,
        payload: emailId
    })
}

export const setUpdateOldPassword = (oldPassword) => {
    return ({
        type: Set_Update_Old_Password,
        payload: oldPassword
    })
}

export const setUpdateNewPassword = (newPassword) => {
    return ({
        type: Set_Update_New_Password,
        payload: newPassword
    })
}

export const setUpdateRepeatPassword = (repeatPassword) => {
    return ({
        type: Set_Update_Repeat_Password,
        payload: repeatPassword
    })
}

export const updateUserName = (user) => async (dispatch) => {
    if (user.userIsAdmin === true) {
        let res = await api.patch("/admins/update-admin-name", user)
        return await dispatch({
            type: Update_User_Name,
            payload: res
        })
    } else {
        let res = await api.patch("/users/update-user-name", user)
        return await dispatch({
            type: Update_User_Name,
            payload: res
        })
    }
}

export const updateUserUsername = (user) => async (dispatch) => {
    if (user.userIsAdmin === true) {
        let res = await api.patch("/admins/update-admin-username", user)
        return await dispatch({
            type: Update_User_Username,
            payload: res
        })
    } else {
        let res = await api.patch("/users/update-user-username", user)
        return await dispatch({
            type: Update_User_Username,
            payload: res
        })
    }
}

export const updateUserEmailId = (user) => async (dispatch) => {
    if (user.userIsAdmin === true) {
        let res = await api.patch("/admins/update-admin-email", user)
        return await dispatch({
            type: Update_User_Email_Id,
            payload: res
        })
    } else {
        let res = await api.patch("/users/update-user-email", user)
        return await dispatch({
            type: Update_User_Email_Id,
            payload: res
        })
    }
}

export const updateUserPassword = (user) => async (dispatch) => {
    if (user.userIsAdmin === true) {
        let res = await api.patch("/admins/update-admin-password", user)
        return await dispatch({
            type: Update_User_Password,
            payload: res
        })
    } else {
        let res = await api.patch("/users/update-user-password", user)
        return await dispatch({
            type: Update_User_Password,
            payload: res
        })
    }
}