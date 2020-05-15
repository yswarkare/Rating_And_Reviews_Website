import { Set_Sub_Category_Name, Set_Category_In_Sub_Category, Add_Sub_Category_Name, Get_All_Sub_Categories, Update_Sub_Category_Name, Delete_Sub_Category, Edit_Sub_Category } from "./actionTypes";
import { api, Axios } from "./axiosDefaults";


export const getAllSubCategories = (admin) => async (dispatch) => {
    let res = await Axios.get(`/sub-categories`, admin)
    dispatch({
        type: Get_All_Sub_Categories,
        payload: res
    });
}

export const setSubCategory =(subCategoryName) => {
    return {
        type: Set_Sub_Category_Name,
        payload: subCategoryName
    }
}

export const setCategoryId =(category) => {
    return {
        type: Set_Category_In_Sub_Category,
        payload: category
    }
}

export const editSubCategory = (index) => async (dispatch) => {
    dispatch({
        type: Edit_Sub_Category,
        payload: index
    })
}

export const addSubCategory =(subCategory) => async (dispatch) => {
    let res = await api.post(`/sub-categories`,subCategory)
    dispatch({
        type: Add_Sub_Category_Name,
        payload: res
    })
}

export const updateSubCategoryName = (subCategory) => async (dispatch) => {
    let res = await api.patch("/sub-categories/update-sub-category-name", subCategory)
    dispatch({
        type: Update_Sub_Category_Name,
        payload: res
    })
}

export const deleteSubCategory = (subCategory, index) => async (dispatch) => {
    let res = await api.patch("/sub-categories/delete-sub-category", subCategory);
    dispatch({
        type: Delete_Sub_Category,
        payload: res,
        dIndex: index
    })
}