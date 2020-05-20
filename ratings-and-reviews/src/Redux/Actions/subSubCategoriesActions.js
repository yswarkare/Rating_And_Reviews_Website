import { api, Axios } from "./axiosDefaults";
import { Set_Sub_Sub_Category_Name,
    Set_Category_In_Sub_Sub_Category,
    Set_Sub_Category_In_Sub_Sub_Category,
    Add_Sub_Sub_Category_Name,
    Get_All_Sub_Sub_Categories,
    Update_Sub_Sub_Category,
    Delete_Sub_Sub_Category,
    Edit_Sub_Sub_Category } from "./actionTypes";


export const getAllSubSubCategories = () => async (dispatch) => {
    let res = await Axios.get(`/sub-sub-categories`)
    dispatch({
        type: Get_All_Sub_Sub_Categories,
        payload: res
    });
} 

export const setSubSubCategory =(subSubCategoryName) => {
    return {
        type: Set_Sub_Sub_Category_Name,
        payload: subSubCategoryName
    }
}

export const setCategoryInSubSubCategory =(category) => {
    console.log(category);
    return {
        type: Set_Category_In_Sub_Sub_Category,
        payload: category
    }
}

export const setSubCategoryInSubSubCategory =(subCategory) => {
    return {
        type: Set_Sub_Category_In_Sub_Sub_Category,
        payload: subCategory
    }
}

export const addSubSubCategory =(subSubCategory) => async (dispatch) => {
    let res = await api.post(`/sub-sub-categories`, subSubCategory)
    dispatch({
        type: Add_Sub_Sub_Category_Name,
        payload: res
    })
}

export const editSubSubCategory = (index) => async (dispatch) => {
    dispatch({
        type: Edit_Sub_Sub_Category,
        payload: index
    })
}

export const updateSubSubCategory = (subSubCategory) => async (dispatch) => {
    let res = await api.patch("/sub-sub-categories/update-sub-sub-category-name", subSubCategory)
    dispatch({
        type: Update_Sub_Sub_Category,
        payload: res
    })
}

export const deleteSubSubCategory = (subSubCategory, index) => async (dispatch) => {
    let res = await api.patch("/sub-sub-categories/delete-sub-sub-category", subSubCategory)
    dispatch({
        type: Delete_Sub_Sub_Category,
        payload: res,
        dIndex: index
    })
    return res
}