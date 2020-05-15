let ratingsState = {
    rating: {
        _id: "",
        rating: "0",
        product: "",
        user: "",
    },
    ratings: [],
    ratingsCopy: [],
    userRatingExists: false,
    editRating: false,
    ratingErrors: {
        rating: {message: "", success: null},
        product: {message: "", success: null},
        user: {message: "", success: null},
    }
}

export default ratingsState;