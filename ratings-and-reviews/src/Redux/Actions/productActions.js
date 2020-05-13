import { 
    Get_All_Products,
    Set_Product_Name, 
    Set_Brand_Name,
    Set_Product_Image,
    Set_Product_Description, 
    Set_Product_Category, 
    Set_Product_Sub_Category, 
    Set_Product_Sub_Sub_Category, 
    Add_Product,
    Edit_Product,
    Delete_Product,
    Update_Product,
    Send_Product_Id } from "./actionTypes"
import { api, Axios } from "./axiosDefaults"


export const getAllProducts = () => async (dispatch) => {
    let res = await Axios.get("/products")
    dispatch({
        type: Get_All_Products,
        payload: res
    })
}

export const setProductName = (productName) => {
    return ({
        type: Set_Product_Name,
        payload: productName
    })
}

export const setBrandName = (brandName) => {
    return ({
        type: Set_Brand_Name,
        payload: brandName
    })
}

export const setProductImage = (image) => {
    return ({
        type: Set_Product_Image,
        payload: image
    })
}

export const setProductDescription = (productDescription) => {
    return ({
        type: Set_Product_Description,
        payload: productDescription
    })
}

export const setProductCategory = (category) => {
    return ({
        type: Set_Product_Category,
        payload: category
    })
}

export const setProductSubCategory = (subCategory) => {
    return ({
        type: Set_Product_Sub_Category,
        payload: subCategory
    })
}

export const setProductSubSubCategory = (subSubCategory) => {
    return ({
        type: Set_Product_Sub_Sub_Category,
        payload: subSubCategory
    })
}

export const addProduct = (product) => async (dispatch) => {
    let res = await api.post("/products", product)
    dispatch({
        type: Add_Product,
        payload: res
    });
}

export const editProduct = (index) => (dispatch) => {
    dispatch({
        type: Edit_Product,
        payload: index
    });
}

export const updateProduct = (product) => async (dispatch) => {
    let res = await api.patch("/products/update-product", product);
    dispatch({
        type: Update_Product,
        payload: res
    });
}

export const deleteProduct = (product) => async (dispatch) => {
    let res = await api.patch("/products/delete-product", product)
    dispatch({
        type: Delete_Product,
        payload: res
    });
    return res;
}

export const sendProductId = (_id) => async (dispatch) => {
    console.log(_id)
    dispatch({
        type: Send_Product_Id,
        payload: _id
    })
}