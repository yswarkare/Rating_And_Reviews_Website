import productState from "../States/productState";
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
    Send_Product_Id } from "../Actions/actionTypes.js"

let productReducer = ( state = productState, action ) => {
    let stateCopy = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case Get_All_Products:
            console.log(action.payload);
            stateCopy.products = action.payload.data.products;
            console.log(stateCopy);
            return stateCopy;

        case Set_Product_Name:
            stateCopy.product.productName = action.payload;
            console.log(stateCopy)
            return stateCopy

        case Set_Brand_Name:
            stateCopy.product.brandName = action.payload;
            console.log(stateCopy)
            return stateCopy

        case Set_Product_Image:
            stateCopy.product.image = action.payload;
            console.log(stateCopy)
            return stateCopy

        case Set_Product_Description:
            stateCopy.product.productDescription = action.payload;
            console.log(stateCopy)
            return stateCopy
            
        case Set_Product_Category:
            console.log(action.payload)
            stateCopy.product.category = action.payload._id;
            stateCopy.filters_1.filterSubCategories = true;
            stateCopy.filters_1.categoryToFilter = action.payload;
            stateCopy.filters_1.filteredSubCategories = action.payload.subCategories;
            console.log(stateCopy)
            return stateCopy
            
        case Set_Product_Sub_Category:
            console.log(action.payload);
            stateCopy.product.subCategory = action.payload._id;
            stateCopy.filters_1.filterSubSubCategories = true;
            stateCopy.filters_1.subCategoryToFilter = action.payload;
            stateCopy.filters_1.filteredSubSubCategories = action.payload.subSubCategories;
            console.log(stateCopy)
            return stateCopy

        case Set_Product_Sub_Sub_Category:
            stateCopy.product.subSubCategory = action.payload;
            console.log(stateCopy)
            return stateCopy

        case Add_Product:
            console.log(action.payload);
            stateCopy.products.push(action.payload.data.product);
            stateCopy.filters_1.filterSubCategories = false;
            stateCopy.filters_1.filterSubSubCategories = false;
            console.log(stateCopy)
            return stateCopy;

        case Edit_Product:
            let eIndex = action.payload;
            stateCopy.editIndex = action.payload;
            stateCopy.editProduct = true;
            stateCopy.product._id = stateCopy.products[eIndex]._id;
            stateCopy.product.productName = stateCopy.products[eIndex].productName;
            stateCopy.product.brandName = stateCopy.products[eIndex].brandName;
            stateCopy.product.image = stateCopy.products[eIndex].image;
            stateCopy.product.productDescription = stateCopy.products[eIndex].productDescription;
            stateCopy.product.category = stateCopy.products[eIndex].category;
            stateCopy.product.subCategory = stateCopy.products[eIndex].subCategory;
            stateCopy.product.subSubCategory = stateCopy.products[eIndex].subSubCategory;

            console.log(stateCopy);
            return stateCopy

        case Update_Product:
            console.log(action.payload);
            let uIndex = stateCopy.editIndex;
            stateCopy.products[uIndex] = action.payload.data.updated
            // let pArray = stateCopy.products;
            // let uProduct = action.payload.data.updated;
            // pArray[uIndex].productName = uProduct.productName;
            // pArray[uIndex].brandName = uProduct.brandName;
            // pArray[uIndex].image = uProduct.image;
            // pArray[uIndex].productDescription = uProduct.productDescription;
            // pArray[uIndex].category = uProduct.category;
            // pArray[uIndex].subCategory = uProduct.subCategory;
            // pArray[uIndex].subSubCategory = uProduct.subSubCategory;
            // stateCopy.products = pArray;
            stateCopy.editProduct = false;
            console.log(stateCopy)
            return stateCopy

        case Delete_Product:
            console.log(action.payload);
            let pdArray = stateCopy.products;
            let dIndex
            for (let i = 0; i < pdArray.length; i++){
                if (pdArray[i]._id === action.payload.data.product._id){
                    dIndex = i
                }
            }
            pdArray.splice(dIndex, 1)
            stateCopy.products = pdArray;
            console.log(stateCopy)
            return stateCopy

        case Send_Product_Id:
            let id = action.payload;
            let products = state.products
            for (let i = 0; i < products.length; i++) {
                if (products[i]._id === id) {
                    state.productObject = products[i]
                }
            }
            state.productObject.avgRating = state.productObject.avgRating.$numberDecimal
            console.log(state)
            return state

        default:
            return stateCopy;
    }
}

export default productReducer;