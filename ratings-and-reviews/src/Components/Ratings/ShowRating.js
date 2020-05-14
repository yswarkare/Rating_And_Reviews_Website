import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';



class ShowRating extends Component {

  state = {
    ratingValue: "2.5",
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

  onChangeSetRatingValue = (value) => {
    console.log("value => "+value)
    this.setState({
      ratingValue: value
    })
  }

  onChangeSetHover = (e, hover) => {
    console.log("hover => "+hover)
    this.setState({
      hover: hover
    })
  }

  render() {
    return (
      <div className="ratings-display">
        <div className="ratings-table-rows">
          <div className="ratings-table-columns">
            <div><span>5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[10]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[10]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>4.5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[9]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[9]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>4</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[8]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[8]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>3.5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[7]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[7]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>3</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[6]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[6]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>2.5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[5]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[5]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>2</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[4]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[4]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>1.5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[3]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[3]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>1</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[2]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[2]}</span></div>
          </div>
          <div className="ratings-table-columns">
            <div><span>0.5</span></div>
            <div><LinearProgress variant="determinate" value={((parseFloat(this.props.product.ratings[1]))*100)/(parseFloat(this.props.product.totalRatings))}></LinearProgress></div>
            <div><span>{this.props.product.ratings[1]}</span></div>
          </div>
        </div>
        <div className="rating-stars">
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Total Ratings {parseFloat(this.props.product.totalRatings)}</Typography>
            <Rating
            readOnly
              name="simple-feedback"
              size="large"
              value={parseFloat(this.props.product.avgRating)}
              precision ={0.5}/>
          </Box>
          {this.state.ratingValue !== null && <Typography ml={2}>{this.state.labels[this.props.product.avgRating]}</Typography>}
        </div>
      </div>
    );
  }
}


ShowRating.propTypes = {
  
};

export default ShowRating;
