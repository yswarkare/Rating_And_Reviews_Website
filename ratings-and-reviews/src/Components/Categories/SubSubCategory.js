import React, { Component } from 'react'
import { Fragment } from "react"
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
import { Container, Row, Col } from 'reactstrap';
import { getAllCategories } from "../../Redux/Actions/categoriesActions";
import { getAllSubCategories } from "../../Redux/Actions/subCategoriesActions";
import { 
    getAllSubSubCategories,
    setCategoryInSubSubCategory,
    setSubCategoryInSubSubCategory,
    addSubSubCategory,
    editSubSubCategory,
    setSubSubCategory,
    updateSubSubCategory,
    deleteSubSubCategory } from "../../Redux/Actions/subSubCategoriesActions";


class Category extends Component {

    componentDidMount = () => {
        this.props.getAllCategories();
        this.props.getAllSubCategories();
        this.props.getAllSubSubCategories()
    }

    onChangeSetSubSubCategory =(subSubCategoryName) => {
        this.props.setSubSubCategory(subSubCategoryName)
    }

    onChangeSetCategory = (category) => {
        let cArray = this.props.categories.categories;
        let category1
        for (let i = 0; i < cArray.length; i++) {
            if (cArray[i]._id === category) {
                category1 = cArray[i]
            }
        }
        this.props.setCategoryInSubSubCategory(category1)
    }

    onChangeSetSubCategory = (subCategory) => {
        this.props.setSubCategoryInSubSubCategory(subCategory)
    }

    onClickAddSubSubCategory =() => {
        let subSubCategory = {
            subSubCategory: this.props.subSubCategories.subSubCategory,
        }
        this.props.addSubSubCategory(subSubCategory)
    }

    onClickEditSubSubCategoryName = (index) => {
        this.props.editSubSubCategory(index)
    }

    onClickUpdateSubSubCategory = () => {
        let subSubCategory = this.props.subSubCategory        
        this.props.updateSubSubCategory(subSubCategory);
    }

    onClickDeleteSubSubCategory = (subSubCategory, index) => {
        this.props.deleteSubSubCategory(subSubCategory, index);
    }

    render() {
        return (
            <Fragment>
                <div className="sub-sub-categories">
                    <FormControl>
                        <InputLabel>&nbsp;&nbsp;Category</InputLabel>
                        <Select type="text" native onChange={(e)=>{this.onChangeSetCategory(e.target.value)}} value={this.props.subSubCategory.category._id} variant="outlined" >
                            <option></option>
                        {this.props.categories.categories.map((category, index)=>{
                            return (
                                <option key={index} value={category._id}>{category.categoryName}</option>
                            )
                        })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>&nbsp;&nbsp;Sub-Category</InputLabel>
                        <Select type="text" native onChange={(e)=>{this.onChangeSetSubCategory(e.target.value)}} value={this.props.subSubCategory.subCategoryName} variant="outlined" >
                        <option aria-label="Sub Category" value="" />
                        {this.props.subSubCategories.filterSubCategories === false && this.props.subCategories.subCategories.map((subCategory, index)=>{
                            return (
                                <option key={index} value={subCategory._id}>{subCategory.subCategoryName}</option>
                            )
                        })}
                        { this.props.subSubCategories.filterSubCategories === true && this.props.subSubCategories.filteredSubCategories.map((subCategory, index)=>{
                            return (
                                <option key={index} value={subCategory._id}>{subCategory.subCategoryName}</option>
                            )
                        })}
                        </Select>
                    </FormControl>
                    <TextField onChange={(e)=>{this.onChangeSetSubSubCategory(e.target.value)}} value={this.props.subSubCategory.subSubCategoryName} type="text" label="Sub-Sub-Category Name" variant="outlined" />
                    { 
                        this.props.subSubCategories.editSubSubCategory === false && 
                        <Button onClick={()=>{this.onClickAddSubSubCategory()}} variant="contained" color="primary">Add</Button>
                    }
                    { 
                        this.props.subSubCategories.editSubSubCategory === true && 
                        <Button onClick={()=>{this.onClickUpdateSubSubCategory()}} variant="contained" color="primary">Update</Button>
                    }
                </div>
                <Container className="sub-sub-categories-table">
                    <Row id="sub-sub-categories-table">
                        <Col>#</Col>
                        <Col>Sub-Sub-Category Name</Col>
                        <Col>Sub-Category Name</Col>
                        <Col>Category Name</Col>
                        <Col>Edit</Col>
                        <Col>Delete</Col>
                    </Row>
                    {
                        this.props.subSubCategories.subSubCategories.map((subSubCategory, index)=>{
                            return(
                                <Row id="sub-sub-categories-table-body" key={index}>
                                    <Col scope="row">{index}</Col>
                                        <Col>{subSubCategory.subSubCategoryName}</Col>
                                        <Col>{subSubCategory.subCategory.subCategoryName}</Col>
                                        <Col>{subSubCategory.category.categoryName}</Col>
                                    <Col>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={()=>{this.onClickEditSubSubCategoryName(index)}}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                        <Tooltip title="Delete">
                                            <IconButton color="secondary" onClick={()=>{this.onClickDeleteSubSubCategory(subSubCategory, index)}}>
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Container>
            </Fragment>
        )
    }
}

Category.propTypes = {
    categories: PropTypes.object.isRequired,
    subCategories: PropTypes.object.isRequired,
    subSubCategories: PropTypes.object.isRequired,
    subSubCategory: PropTypes.object.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    getAllSubCategories: PropTypes.func.isRequired,
    getAllSubSubCategories: PropTypes.func.isRequired,
    setSubSubCategory: PropTypes.func.isRequired,
    setCategoryInSubSubCategory: PropTypes.func.isRequired,
    setSubCategoryInSubSubCategory: PropTypes.func.isRequired,
    addSubSubCategory: PropTypes.func.isRequired,
    editSubSubCategory: PropTypes.func.isRequired,
    updateSubSubCategory: PropTypes.func.isRequired,
    deleteSubSubCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        subCategories: state.subCategories,
        subSubCategories: state.subSubCategories,
        subSubCategory: state.subSubCategories.subSubCategory,
    }
}

export default connect(mapStateToProps, { 
    getAllCategories,
    getAllSubCategories,
    getAllSubSubCategories,
    setCategoryInSubSubCategory,
    setSubCategoryInSubSubCategory,
    addSubSubCategory,
    editSubSubCategory,
    setSubSubCategory,
    updateSubSubCategory,
    deleteSubSubCategory })(Category);