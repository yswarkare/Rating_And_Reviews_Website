
let categoriesState = {
    category: {
        _id: "",
        categoryName: "",
        products: [],
        subCategories: [],
        subSubCategories: [],
    },
    categories: [{
        categoryName: "Home Appliances",
        products: [],
        subCategories: []
    },{
        categoryName: "Cloths",
        products: [],
        subCategories: []
    }],
    categoriesCopy: [],
    editIndex: "",
    editCategory: false
}

export default categoriesState;