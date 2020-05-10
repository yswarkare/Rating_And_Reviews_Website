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
import { addSubCategory, editSubCategory, setSubCategory, setCategoryId, updateSubCategoryName, deleteSubCategory } from "../../Redux/Actions/subCategoriesActions";


class Category extends Component {

    onChangeSetSubCategory =(subCategoryName) => {
        this.props.setSubCategory(subCategoryName)
    }

    onChangeSetCategory = (category) => {
        this.props.setCategoryId(category)
    }

    onClickAddSubCategory =() => {
        let subCategory = {
            subCategory: this.props.subCategories.subCategory,
        }
        this.props.addSubCategory(subCategory)
    }

    onClickEditSubCategoryName = (index) => {
        this.props.editSubCategory(index)
    }

    onClickUpdateSubCategory = () => {
        let subCategory = this.props.subCategory
        this.props.updateSubCategoryName(subCategory);
    }

    onClickDeleteSubCategory = (subCategory, index) => {
        this.props.deleteSubCategory(subCategory, index)
    }

    render() {
        return (
            <Fragment>
                <div className="sub-categories">
                    <FormControl>
                        <InputLabel>&nbsp;&nbsp;Category</InputLabel>
                        <Select type="text" native onChange={(e)=>{this.onChangeSetCategory(e.target.value)}} value={this.props.subCategory.category._id} variant="outlined" >
                            <option></option>
                        {this.props.categories.categories.map((category, index)=>{
                            return (
                                <option key={index} value={category._id}>{category.categoryName}</option>
                            )
                        })}
                        </Select>
                    </FormControl>
                    <TextField onChange={(e)=>{this.onChangeSetSubCategory(e.target.value)}} value={this.props.subCategory.subCategoryName} type="text" label="Sub-Category Name" variant="outlined" />
                    {
                        this.props.subCategories.editSubCategory === false &&
                        <Button onClick={()=>{this.onClickAddSubCategory()}} variant="contained" color="primary">Add</Button>
                    }
                    {
                        this.props.subCategories.editSubCategory === true &&
                        <Button onClick={()=>{this.onClickUpdateSubCategory()}} variant="contained" color="primary">Update</Button>
                    }
                </div>
                <Container className="categories-table">
                    <Row id="sub-categories-table">
                        <Col>#</Col>
                        <Col>Sub-Category Name</Col>
                        <Col>Category</Col>
                        <Col>Edit</Col>
                        <Col>Delete</Col>
                    </Row>
                    {
                        this.props.subCategories.subCategories.map((subCategory, index)=>{
                            return(
                                <Row id="sub-categories-table-body" key={index}>
                                    <Col scope="row">{index}</Col>
                                    <Col>{subCategory.subCategoryName}</Col>
                                    <Col>{subCategory.category.categoryName}</Col>
                                    <Col>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={()=>{this.onClickEditSubCategoryName(index)}}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={()=>{this.onClickDeleteSubCategory(subCategory, index)}}>
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
    subCategory: PropTypes.object.isRequired,
    setSubCategory: PropTypes.func.isRequired,
    setCategoryId: PropTypes.func.isRequired,
    editSubCategory: PropTypes.func.isRequired,
    addSubCategory: PropTypes.func.isRequired,
    updateSubCategoryName: PropTypes.func.isRequired,
    deleteSubCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        subCategories: state.subCategories,
        subCategory: state.subCategories.subCategory,
    }
}

export default connect(mapStateToProps, { addSubCategory, editSubCategory, setSubCategory, setCategoryId, updateSubCategoryName, deleteSubCategory })(Category);