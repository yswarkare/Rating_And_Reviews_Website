import { Get_User_Rating, Set_User_Rating, Post_User_Rating, Update_User_Rating } from "./actionTypes";
import { api } from "./axiosDefaults";

export const getUserRating = (rating) => async (dispatch) => {
    console.log(rating)
    let res = await api.patch("/ratings/get-user-rating", rating)
    dispatch({
        type: Get_User_Rating,
        payload: res
    })
}

export const setUserRating = (rating) => async (dispatch) => {
    dispatch({
        type: Set_User_Rating,
        payload: rating
    })
}

export const postUserRating = (rating) => async (dispatch) => {
    let res = await api.post("/ratings/post-user-rating", rating)
    dispatch({
        type: Post_User_Rating,
        payload: res
    })
}

export const updateUserRating = (rating) => async (dispatch) => {
    let res = await api.patch("/ratings/update-user-rating", rating)
    dispatch({
        type: Update_User_Rating,
        payload: res
    })
}