import subSubCategoriesState from "../States/subSubCategoriesState";
import { Set_Sub_Sub_Category_Name,
    Set_Category_In_Sub_Sub_Category,
    Set_Sub_Category_In_Sub_Sub_Category,
    Add_Sub_Sub_Category_Name,
    Get_All_Sub_Sub_Categories,
    Update_Sub_Sub_Category,
    Delete_Sub_Sub_Category,
    Edit_Sub_Sub_Category } from "../Actions/actionTypes"
;
let subSubCategoriesReducer = ( state = subSubCategoriesState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    
    switch (action.type){

        case Get_All_Sub_Sub_Categories:
            if (action.payload.data.success === true){
                stateCopy.subSubCategories = action.payload.data.subSubCategories
            }
            console.log(stateCopy);
            return stateCopy;

        case Set_Sub_Sub_Category_Name:
            stateCopy.subSubCategory.subSubCategoryName = action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Set_Category_In_Sub_Sub_Category:
            console.log(action.payload)
            stateCopy.subSubCategory.category = action.payload._id;
            stateCopy.categoryToFilter = action.payload
            stateCopy.filterSubCategories = true;
            stateCopy.filteredSubCategories = action.payload.subCategories;
            console.log(stateCopy);
            return stateCopy;

        case Set_Sub_Category_In_Sub_Sub_Category:
            console.log(action.payload)
            stateCopy.subSubCategory.subCategory = action.payload;
            console.log(stateCopy);
            return stateCopy;

        case Add_Sub_Sub_Category_Name:
            console.log(action.payload);
            stateCopy.subSubCategories.push(action.payload.data.subSubCategory2)
            stateCopy.filterSubCategories = false;
            console.log(stateCopy);
            return stateCopy;

        case Edit_Sub_Sub_Category:
            console.log(action.payload);
            stateCopy.editSubSubCategory = true;
            stateCopy.editIndex = action.payload;
            stateCopy.subSubCategory = stateCopy.subSubCategories[action.payload]
            stateCopy.filteredSubCategories = stateCopy.categoryToFilter.subCategories;
            console.log(stateCopy);
            return stateCopy;

        case Update_Sub_Sub_Category:
            console.log(action.payload);
            let eIndex = stateCopy.editIndex;
            stateCopy.subSubCategories[eIndex] = action.payload.data.updated;
            stateCopy.filterSubCategories = false;
            stateCopy.editSubSubCategory = false;
            console.log(stateCopy);
            return stateCopy;

        case Delete_Sub_Sub_Category:
            console.log(action.payload);
            console.log("delete index => "+action.dIndex);
            let dIndex = action.dIndex
            stateCopy.subSubCategories.splice(dIndex, 1);
            console.log(stateCopy);
            return stateCopy;

        default:
        return stateCopy;
    }
}

export default subSubCategoriesReducer;