const totalRatings = () => {
    let totalRatings = 0
    for (let i = 1; i <= 10; i++){
    
        totalRatings = totalRatings + ratings[i]
    
        avgRating1 = i * ratings[i]
    
        avgRating2 = avgRating2 + avgRating1
    }
    console.log("totalRatings => " + totalRatings);
    return totalRatings
}

const averageRating = (ratings) => {
    let totalRatings = 0
    let avgRating1
    let avgRating2 = 0
    
    for (let i = 1; i <= 10; i++){
    
        totalRatings = totalRatings + ratings[i]
    
        avgRating1 = i * ratings[i]
    
        avgRating2 = avgRating2 + avgRating1
    }
    
    let avgRating3 = avgRating2 / totalRatings
    
    let avgRating4 = Math.round(avgRating3)
    
    let avgRating = avgRating4 / 2
    
    console.log("totalRatings => " + totalRatings);
    
    console.log("avgRating => " + avgRating);
    
    console.log("avgRating => " + (avgRating));
    return avgRating;    
}

module.exports = {
    averageRating,
    totalRatings
}