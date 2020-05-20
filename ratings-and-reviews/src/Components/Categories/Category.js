import React, { Component } from 'react'
import { Fragment } from "react"
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Tooltip, IconButton, Button, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Container, Row, Col } from 'reactstrap';
import { addCategory, setCategory, getAllCategories, updateCategoryName, deleteCategory, editCategory } from "../../Redux/Actions/categoriesActions";


class Category extends Component {

    onChangeSetCategory = (categoryName) => {
        this.props.setCategory(categoryName);
    }

    onClickAddCategory = () => {
        let category = {
            category: this.props.categories.category
        }
        this.props.addCategory(category)
    }

    onClickEditCategoryName = (index) => {
        this.props.editCategory(index);
    }

    onClickUpdateCategory = () => {
        let category = this.props.categories.category
        this.props.updateCategoryName(category);
    }

    onClickDeleteCategory = () => {
        let category = this.props.categories.category
        this.props.deleteCategory(category);
    }

    render() {
        return (
            <Fragment>
                <div className="add-categories">
                    <TextField onChange={(e)=>{this.onChangeSetCategory(e.target.value)}} value={this.props.category.categoryName} type="text" label="Category Name" variant="outlined" />
                    {
                        this.props.categories.editCategory === false &&
                        <Button onClick={()=>{this.onClickAddCategory()}} variant="contained" color="primary">
                            Add
                        </Button>
                    }
                    { 
                        this.props.categories.editCategory === true &&
                        <Button onClick={()=>{this.onClickUpdateCategory()}} variant="contained" color="primary">
                            Update
                        </Button>
                    }
                </div>
                <Container className="categories-table">
                    <Row id="categories-table">
                        <Col>#</Col>
                        <Col>Category Name</Col>
                        <Col>Edit</Col>
                        <Col>Delete</Col>
                    </Row>
                    {
                        this.props.categories.categories.map((category, index)=>{
                            return(
                                <Row id="categories-table-body" key={index}>
                                    <Col scope="row">{index}</Col>
                                    <Col>{category.categoryName}</Col>
                                    <Col>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={()=>{this.onClickEditCategoryName(index)}}>
                                                <EditIcon></EditIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                        <Tooltip title="Delete">
                                            <IconButton color="secondary" onClick={()=>{this.onClickDeleteCategory()}}>
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
    category: PropTypes.object.isRequired,
    setCategory: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired,
    updateCategoryName: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        category: state.categories.category
    }
}

export default connect(mapStateToProps, { addCategory, setCategory, getAllCategories, updateCategoryName, deleteCategory, editCategory })(Category);