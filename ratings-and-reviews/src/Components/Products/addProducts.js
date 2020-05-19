import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, TextField, TextareaAutosize, Select, InputLabel, FormControl, Tooltip, IconButton } from '@material-ui/core/';
import { Container, Table } from "reactstrap";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllCategories } from "../../Redux/Actions/categoriesActions";
import { getAllSubCategories } from "../../Redux/Actions/subCategoriesActions";
import { getAllSubSubCategories } from "../../Redux/Actions/subSubCategoriesActions";
import { getAllProducts,
    setProductName,
    setBrandName,
    setProductImage,
    setProductDescription,
    setProductCategory,
    setProductSubCategory,
    setProductSubSubCategory,
    addProduct,
    editProduct,
    deleteProduct,
    updateProduct } from "../../Redux/Actions/productActions";

class AddProducts extends Component {


    componentDidMount = () => {
        this.props.getAllProducts()
        let admin = {
            emailId: this.props.loginStatus.emailId,
            headers: this.props.headers
        }
        this.props.getAllCategories(admin);
        this.props.getAllSubCategories(admin);
        this.props.getAllSubSubCategories(admin)
    }

    onChangeSetProductName = (productName) => {
        this.props.setProductName(productName)
    }

    onChangeSetBrandName = (brandName) => {
        this.props.setBrandName(brandName)
    }

    onChangeSetProductImage = (image) => {
        this.props.setProductImage(image)
    }

    onChangeSetProductDescription = (productDescription) => {
        this.props.setProductDescription(productDescription)
    }

    onChangeSetProductCategory = (categoryId) => {
        let cArr = this.props.categories.categories;
        let category
        for (let i = 0; i < cArr.length; i++){
            if (cArr[i]._id === categoryId) {
                category = cArr[i]
            }
        }
        this.props.setProductCategory(category)
    }

    onChangeSetProductSubCategory = (subCategoryId) => {
        let sCArr = this.props.subCategories.subCategories;
        let subCategory
        for (let i = 0; i < sCArr.length; i++){
            if (sCArr[i]._id === subCategoryId){
                subCategory = sCArr[i]
            }
        }
        this.props.setProductSubCategory(subCategory)
    }

    onChangeSetProductSubSubCategory = (subSubCategory) => {
        this.props.setProductSubSubCategory(subSubCategory)
    }

    onClickAddProduct = () => {
        let product = {
            product: this.props.products.product,
        }
        if (this.props.products.editProduct === true){
            this.props.updateProduct(product);
        } else {
            this.props.addProduct(product)
        }
    }

    onClickEditProduct = (index) => {
        this.props.editProduct(index);
    }

    onClickDeleteProduct = (index, product) => {
        let uProduct = {
            product: product,
            index: index
        }
        this.props.deleteProduct(uProduct)
    }

    render(){
        return(
            <div className="add-products-container mt-2">
                <div className="add-product">
                    <div className="add-product-row-1">
                        <div className="add-product-row-1-col-1">
                            <TextField onChange={(e)=>{this.onChangeSetProductName(e.target.value)}} value={this.props.products.product.productName} type="text" label="Product Name" variant="outlined" />
                        </div>
                        <div className="add-product-row-1-col-2">
                            <TextField onChange={(e)=>{this.onChangeSetBrandName(e.target.value)}} value={this.props.products.product.brandName} type="text" label="Brand Name" variant="outlined" />
                        </div>
                        <div className="add-product-row-1-col-3">
                            <TextField onChange={(e)=>{this.onChangeSetProductImage(e.target.value)}} value={this.props.products.product.image} type="text" label="Image URL" variant="outlined" />
                        </div>
                    </div>
                    <div className="add-product-row-2">
                        <div className="add-product-row-2-col-1">
                        <TextareaAutosize onChange={(e)=>{this.onChangeSetProductDescription(e.target.value)}} value={this.props.products.product.productDescription} rowsMin={3} aria-label="Product Description" className="add-description" placeholder="  Product Description" />
                        </div>
                    </div>
                    <div className="add-product-row-3">
                    <div className="add-product-row-3-col-1">
                        <FormControl className="select-p-c-1">
                            <InputLabel>&nbsp;&nbsp;Category</InputLabel>
                            <Select type="text" native onChange={(e)=>{this.onChangeSetProductCategory(e.target.value)}} value={this.props.products.product.category} variant="outlined" >
                                <option></option>
                            {this.props.categories.categories.map((category, index)=>{
                                return (
                                    <option key={index} value={category._id}>{category.categoryName}</option>
                                )
                            })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="add-product-row-3-col-2">
                    {
                        this.props.filters_1.filterSubCategories === false &&
                        <FormControl className="select-p-c-1">
                            <InputLabel>&nbsp;&nbsp;Sub-Category</InputLabel>
                            <Select type="text" native onChange={(e)=>{this.onChangeSetProductSubCategory(e.target.value)}} value={this.props.products.product.subCategory} variant="outlined" >
                            <option aria-label="Sub Category" value="                       " />
                            {this.props.subCategories.subCategories.map((subCategory, index)=>{
                                return (
                                    <option key={index} value={subCategory._id}>{subCategory.subCategoryName}</option>
                                )
                            })}
                            </Select>
                        </FormControl>
                    }
                    {
                        this.props.filters_1.filterSubCategories === true &&
                        <FormControl className="select-p-c-1">
                            <InputLabel>&nbsp;&nbsp;Sub-Category</InputLabel>
                            <Select type="text" native onChange={(e)=>{this.onChangeSetProductSubCategory(e.target.value)}} value={this.props.products.product.subCategory} variant="outlined" >
                            <option aria-label="Sub Category" value="                       " />
                            {this.props.filters_1.filteredSubCategories.map((subCategory, index)=>{
                                return (
                                    <option key={index} value={subCategory._id}>{subCategory.subCategoryName}</option>
                                )
                            })}
                            </Select>
                        </FormControl>
                    }
                    </div>
                    <div className="add-product-row-3-col-3">
                    {
                        this.props.filters_1.filterSubSubCategories === false &&
                        <FormControl className="select-p-c-1">
                            <InputLabel>&nbsp;&nbsp;Sub-Sub-Category</InputLabel>
                            <Select type="text" native onChange={(e)=>{this.onChangeSetProductSubSubCategory(e.target.value)}} value={this.props.products.product.subSubCategory} variant="outlined" >
                            <option aria-label="Sub Sub Category" value="                       " />
                            {this.props.subSubCategories.subSubCategories.map((subSubCategory, index)=>{
                                return (
                                    <option key={index} value={subSubCategory._id}>{subSubCategory.subSubCategoryName}</option>
                                )
                            })}
                            </Select>
                        </FormControl>
                    }
                    {
                        this.props.filters_1.filterSubSubCategories === true &&
                        <FormControl className="select-p-c-1">
                            <InputLabel>&nbsp;&nbsp;Sub-Sub-Category</InputLabel>
                            <Select type="text" native onChange={(e)=>{this.onChangeSetProductSubSubCategory(e.target.value)}} value={this.props.products.product.subSubCategory} variant="outlined" >
                            <option aria-label="Sub Sub Category" value="                       " />
                            {this.props.filters_1.filteredSubSubCategories.map((subSubCategory, index)=>{
                                return (
                                    <option key={index} value={subSubCategory._id}>{subSubCategory.subSubCategoryName}</option>
                                )
                            })}
                            </Select>
                        </FormControl>
                    }
                    </div>
                    </div>
                    <div className="add-product-row-4">
                        <div className="add-product-row-4-col-1">
                            {
                                this.props.products.editProduct === false &&
                                <Button onClick={()=>{this.onClickAddProduct()}} variant="contained" divor="primary">
                                    Add Product
                                </Button>
                            }
                            {
                                this.props.products.editProduct === true &&
                                <Button onClick={()=>{this.onClickAddProduct()}} variant="contained" divor="primary">
                                    Save Product
                                </Button>
                            }
                        </div>
                    </div>
                </div>
                <Container className="mt-3">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Brand Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Sub-Sub-Category</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.products.products.map((product, index)=>{
                                return (
                                    <tr key={index}>
                                        <th>{index}</th>
                                        <td><img src={`${product.image}`} className="product-image-in-list" alt="Product Image"/></td>
                                        <td>{product.productName}</td>
                                        <td>{product.brandName}</td>
                                        <td>{product.productDescription}</td>
                                        <td>{product.category.categoryName}</td>
                                        <td>{product.subCategory.subCategoryName}</td>
                                        <td>{product.subSubCategory.subSubCategoryName}</td>
                                        <td>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={()=>{this.onClickEditProduct(index)}}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                        </Tooltip>
                                        </td>
                                        <td>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={()=>{this.onClickDeleteProduct(index, product)}}>
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

AddProducts.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    subCategories: PropTypes.object.isRequired,
    subSubCategories: PropTypes.object.isRequired,
    filters_1: PropTypes.object.isRequired,
    setProductName: PropTypes.func.isRequired,
    setBrandName: PropTypes.func.isRequired,
    setProductImage: PropTypes.func.isRequired,
    setProductDescription: PropTypes.func.isRequired,
    setProductCategory: PropTypes.func.isRequired,
    setProductSubCategory: PropTypes.func.isRequired,
    setProductSubSubCategory: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    getAllSubCategories: PropTypes.func.isRequired,
    getAllSubSubCategories: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        errors: state.users.errors,
        loginStatus: state.users.loginStatus,
        products: state.products,
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories,
        filters_1: state.products.filters_1,
    };
}

export default connect(mapStateToProps, { getAllProducts,
    getAllCategories,
    getAllSubCategories,
    getAllSubSubCategories,
    setProductName,
    setBrandName,
    setProductImage,
    setProductDescription,
    setProductCategory,
    setProductSubCategory,
    setProductSubSubCategory,
    addProduct,
    editProduct,
    deleteProduct,
    updateProduct })(AddProducts);