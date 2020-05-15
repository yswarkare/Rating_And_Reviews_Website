
let subSubCategoriesState = {
    subSubCategory: {
        _id: "",
        subSubCategoryName: "",
        category: "",
        subCategory: "",
        products: [],
    },
    subSubCategories: [{
        subSubCategoryName: "Mobile Charger",
        category: "",
        subCategory: "",
        products: [],
    },{
        subSubCategoryName: "Mobile Back Cover",
        category: "",
        subCategory: "",
        products: [],
    }],
    subSubCategoriesCopy: [],
    editIndex: "",
    editSubSubCategory: false,
    categoryToFilter: {},
    filterSubCategories: false,
    filteredSubCategories: [],
}

export default subSubCategoriesState;