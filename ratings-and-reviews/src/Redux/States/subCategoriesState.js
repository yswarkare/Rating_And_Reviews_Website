
let subCategoriesState = {
    subCategory: {
        _id: "",
        subCategoryName: "",
        category: "",
        products: [],
        subSubCategories: []
    },
    subCategories: [{
        subCategoryName: "Mobile Phones",
        category: {
            _id: "",
            categoryName: ""
        },
        products: [],
        subSubCategories: []
    },{
        subCategoryName: "TV",
        category: {
            _id: "",
            categoryName: ""
        },
        products: [],
        subSubCategories: []
    },{
        subCategoryName: "Fridge",
        category: {
            _id: "",
            categoryName: ""
        },
        products: [],
        subSubCategories: []
    },],
    subCategoriesCopy: [],
    editIndex: "",
    editSubCategory: false
}

export default subCategoriesState;