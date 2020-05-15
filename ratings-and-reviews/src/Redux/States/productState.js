let productState = {
    product: {
        _id: "",
        productName : "",
        brandName: "",
        productDescription : "",
        category: "",
        subCategory : "",
        subSubCategory : "",
        totalRatings: "",
        avgRating: "",
        ratings: { 1: '10', 2: '20', 3: '30', 4: '40', 5: '50', 6: '60', 7: '70', 8: '80', 9: '90', 10: '100'},
        reviews: [],
        images: [],
        image: ""
    },
    editProduct: false,
    editIndex: "",
    filters_1: {
        categoryToFilter: "",
        filterSubCategories: false,
        filteredSubCategories: "",
        subCategoryToFilter: "",
        filterSubSubCategories: false,
        filteredSubSubCategories: ""
    },
    products: [
        {
            _id: "",
            productName : "Product 1",
            brandName: "Brand name 1",
            productDescription : "Description 1",
            category: "",
            subCategory : "",
            subSubCategory : "",
            totalRatings: "",
            avgRating: "",
            ratings: { 1: '10', 2: '20', 3: '30', 4: '40', 5: '50', 6: '60', 7: '70', 8: '80', 9: '90', 10: '100'},
            reviews: [],
            image: "",
            images: []
        },
        {
            _id: "",
            productName : "Product 2",
            brandName: "Brand Name 2",
            productDescription : "Description 2",
            category: "",
            subCategory : "",
            subSubCategory : "",
            totalRatings: "",
            avgRating: "",
            ratings: { 1: '10', 2: '20', 3: '30', 4: '40', 5: '50', 6: '60', 7: '70', 8: '80', 9: '90', 10: '100'},
            reviews: [],
            images: [],
            image: "",
        },
    ],
    productObject: {
        _id: "",
        productName : "",
        brandName: "",
        productDescription : "",
        category: "",
        subCategory : "",
        subSubCategory : "",
        totalRatings: "",
        avgRating: "",
        ratings: { 1: '10', 2: '20', 3: '30', 4: '40', 5: '50', 6: '60', 7: '70', 8: '80', 9: '90', 10: '100'},
        reviews: [],
        images: [],
        image: ""
    }
}

export default productState;