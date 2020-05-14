let reviewsState = {
    review: {
        _id: "",
        review: "",
        likes: "",
        dislikes: "",
        date: "",
        product: "",
        user: "",
    },
    reviews: [],
    productReviews: [{
        _id: "",
        review: "",
        likes: "",
        dislikes: "",
        date: "",
        product: "",
        user: {username: ""},
    }],
    reviewsCopy: [],
    reviewExists: false,
    editReview: false,
}

export default reviewsState;