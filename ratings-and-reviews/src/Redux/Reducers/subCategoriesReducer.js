import subCategoriesState from "../States/subCategoriesState";
import { Set_Sub_Category_Name,
    Set_Category_In_Sub_Category,
    Add_Sub_Category_Name,
    Get_All_Sub_Categories,
    Update_Sub_Category_Name,
    Delete_Sub_Category,
    Edit_Sub_Category } from "../Actions/actionTypes"

let subCategoriesReducer = ( state = subCategoriesState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case Get_All_Sub_Categories:
            console.log(action.payload)
            if (action.payload.data.success === true){
                stateCopy.subCategories = action.payload.data.subCategories
            }
            console.log(stateCopy);
            return stateCopy

        case Set_Category_In_Sub_Category:
            stateCopy.subCategory.category = action.payload;
            console.log(stateCopy)
            return stateCopy

        case Set_Sub_Category_Name:
            stateCopy.subCategory.subCategoryName = action.payload;
            console.log(stateCopy);
            return stateCopy

        case Add_Sub_Category_Name:
            stateCopy.subCategories.push(action.payload.data.subCategory2);
            console.log(stateCopy);
            return stateCopy

        case Edit_Sub_Category:
            stateCopy.editIndex = action.payload;
            stateCopy.subCategory = stateCopy.subCategories[action.payload]
            stateCopy.editSubCategory = true;
            console.log(stateCopy);
            return stateCopy;

        case Update_Sub_Category_Name:
            console.log(action.payload);
            let eIndex = stateCopy.editIndex;
            stateCopy.subCategories[eIndex] = action.payload.data.updated;
            stateCopy.editSubCategory = false;
            console.log(stateCopy);
            return stateCopy;

        case Delete_Sub_Category:
            console.log(action.payload);
            let dIndex = action.dIndex;
            stateCopy.subCategories.splice(dIndex, 1);
            console.log(stateCopy);
            return stateCopy;

        default:
        return stateCopy;
    }
}

export default subCategoriesReducer;