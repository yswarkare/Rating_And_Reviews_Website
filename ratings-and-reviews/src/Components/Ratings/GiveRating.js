import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getUserRating, setUserRating, postUserRating, updateUserRating } from "../../Redux/Actions/ratingsActions"



class GiveRating extends Component {

  state = {
    ratingValue: "",
    hover: "",
    labels: {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    }
  }

  componentDidMount = () => {
    let rating = {
      product: this.props.product._id,
      user: this.props.user._id
    }
    this.props.getUserRating(rating)
  }

  onChangeSetUserRatingValue = (value) => {
    // console.log("value => "+value)
    let rating = {
      rating: value,
      product: this.props.product._id,
      user: this.props.user._id
    }
    this.props.postUserRating(rating);
    this.setState({
      ratingValue: value
    })
  }

  onChangeSetHover = (e, hover) => {
    // console.log("hover => "+hover)
    this.setState({
      hover: hover
    })
  }

  render() {
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rate Product</Typography>
          <Rating
            name="simple-feedback"
            size="large"
            value={this.props.rating.rating}
            precision ={0.5}
            onChange={(e)=>{this.onChangeSetUserRatingValue(e.target.value)}}
            onChangeActive={(e, hover)=>{this.onChangeSetHover(e, hover)}}/>
        </Box>
        {this.state.ratingValue !== null && <Box ml={2}>{this.state.labels[this.state.hover !== -1 ? this.state.hover : this.state.ratingValue]}</Box>}
      </div>
    );
  }
}


GiveRating.propTypes = {
  getUserRating: PropTypes.func.isRequired,
  setUserRating: PropTypes.func.isRequired,
  postUserRating: PropTypes.func.isRequired,
  updateUserRating: PropTypes.func.isRequired,
  rating: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    rating: state.ratings.rating,
    product: state.products.productObject,
    user: state.users.user
  }
}

export default connect(mapStateToProps, { getUserRating, setUserRating, postUserRating, updateUserRating })(GiveRating);
