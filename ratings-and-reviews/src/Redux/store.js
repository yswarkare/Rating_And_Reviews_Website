import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import categoriesReducer from "./Reducers/categoriesReducer";
import subCategoriesReducer from "./Reducers/subCategoriesReducer";
import subSubCategoriesReducer from "./Reducers/subSubCategoriesReducer";
import productReducer from "./Reducers/productReducer";
import userReducer from "./Reducers/userReducer";
import ratingsReducer from "./Reducers/ratingsReducer";
import reviewsReducer from "./Reducers/reviewsReducer";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    subSubCategories: subSubCategoriesReducer,
    products: productReducer,
    users: userReducer,
    ratings: ratingsReducer,
    reviews: reviewsReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;