import { api, Axios } from "./axiosDefaults";
import { Get_User_Review,
    Get_Product_Reviews,
    Edit_User_Review,
    Set_User_Review,
    Post_User_Review,
    Update_User_Review,
    Delete_User_Review } from "./actionTypes";

export const getUserReview = (review) => async (dispatch) => {
    console.log("get user review => "+ JSON.stringify(review))
    let res = await api.patch("/reviews/get-user-review", review)
    dispatch({
        type: Get_User_Review,
        payload: res
    })
}

export const getProductReviews = (product) => async (dispatch) => {
    console.log("Product ID => " + JSON.stringify(product))
    let res = await Axios.patch("/reviews/get-product-reviews", product);
    dispatch({
        type: Get_Product_Reviews,
        payload: res
    })
}

export const editUserReview = () => (dispatch) => {
    dispatch({
        type: Edit_User_Review
    })
}

export const setUserReview = (review) => (dispatch) => {
    dispatch({
        type: Set_User_Review,
        payload: review
    })
}

export const postUserReview = (review) => async (dispatch) => {
    let res = await api.patch("/reviews/post-user-review", review);
    dispatch({
        type: Post_User_Review,
        payload: res
    })
}

export const updateUserReview = (review) => async (dispatch) => {
    let res = await api.patch("/reviews/update-user-review", review)
    dispatch({
        type: Update_User_Review,
        payload: res
    })
}

export const deleteUserReview = (review) => async (dispatch) => {
    let res = await api.patch("/reviews/delete-user-review", review)
    dispatch({
        type: Delete_User_Review,
        payload: res
    })
}