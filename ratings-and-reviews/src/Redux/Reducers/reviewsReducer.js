import reviewsState from "../States/reviewsState";
import { Get_User_Review,
    Edit_User_Review,
    Set_User_Review,
    Post_User_Review,
    Update_User_Review,
    Delete_User_Review } from "../Actions/actionTypes";

let reviewsReducer = ( state = reviewsState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    
    switch (action.type) {
        
        case Get_User_Review:
            console.log(action.payload);
            if (action.payload.data.success === true){
                state.review = action.payload.data.review[0];
                state.reviewExists = true;
            } else {
                state.reviewExists = false;
            }
            console.log(state);
            return state;

        case Edit_User_Review:
            console.log(action.payload);
            state.editReview = true;
            console.log(state);
            return state;

        case Set_User_Review:
            console.log(action.payload);
            state.review.review = action.payload.review;
            state.review.product = action.payload.product;
            state.review.user = action.payload.user;
            console.log(state);
            return state;

        case Post_User_Review:
            console.log(action.payload);
            state.review = action.payload.data.review;
            state.editReview = false;
            state.reviewExists = true;
            console.log(state);
            return state;

        case Update_User_Review:
            console.log(action.payload);
            state.review = action.payload.data.review;
            state.editReview = false;
            console.log("Username => "+state.review.user.username);
            console.log(state);
            return state;

        case Delete_User_Review:
            console.log(action.payload);
            state.reviewExists = false;
            console.log(state);
            return state;

        default:
            return stateCopy;
    }
}

export default reviewsReducer;