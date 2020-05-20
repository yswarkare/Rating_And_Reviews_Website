import categoriesState from "../States/categoriesState";
import {Set_Category_Name, Add_Category_Name, Get_All_Categories, Update_Category_Name, Delete_Category, Edit_Category } from "../Actions/actionTypes";

let categoriesReducer = ( state = categoriesState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type){

        case Set_Category_Name:
            stateCopy.category.categoryName = action.payload
            console.log(stateCopy)
            return stateCopy;

        case Get_All_Categories:
            if (action.payload.data.success === true){
                stateCopy.categories = action.payload.data.categories;
            }
            console.log(stateCopy)
            return stateCopy
            
        case Add_Category_Name:
            console.log(action.payload);
            stateCopy.categories.push(action.payload.data.category);
            stateCopy.category._id = "";
            stateCopy.category.categoryName = "";
            console.log(stateCopy);
            return stateCopy;

        case Edit_Category:
            let eIndex = action.payload
            stateCopy.editIndex = action.payload 
            stateCopy.editCategory = true;
            stateCopy.category.categoryName = stateCopy.categories[eIndex].categoryName;
            stateCopy.category._id = stateCopy.categories[eIndex]._id;
            console.log(stateCopy);
            return stateCopy;
    

        case Update_Category_Name:
            console.log(action.payload);
            let uIndex = stateCopy.editIndex;
            stateCopy.categories[uIndex].categoryName = action.payload.data.updated.categoryName;
            stateCopy.editCategory = false;
            console.log(stateCopy);
            return stateCopy;

        case Delete_Category:
            console.log(action.payload);
            let dId = action.payload.data.deleted._id
            let cArray = stateCopy.categories
            for (let i = 0; i < cArray.length; i++){
                if (cArray[i]._id === dId){
                    cArray.splice(i, 1);
                }
            }
            stateCopy.categories = cArray;
            console.log(stateCopy);
            return stateCopy

        default:
            return stateCopy
    }
}

export default categoriesReducer;