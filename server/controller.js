const models = require('./models.js');

const getReviews = (req, res) => {
  console.log('request.query: ', req.query);
  let count = req.query.count || 5;
  let page = (req.query.page - 1) || 0;
  let product_id = req.query.product_id;
  let sort = req.query.sort;
  models.getReviews(product_id, count, page, sort)
  .then((response) => {
    console.log('response: ', response.rows)
    res.send(response.rows);
  })
  .catch((err) => {
    console.log('error getting reviews: ', err)
  })
}

const getReviewMeta = (req, res) => {
  console.log('request.query: ', req.query);
  let product_id = req.query.product_id;
  models.getReviewMeta(product_id)
  .then((response) => {
    console.log('response: ', response.rows)
    res.send(response.rows[0]);
  })
  .catch((err) => {
    console.log('error getting metadata: ', err)
  })
}

const markReviewHelpful = (req, res) => {
  // console.log('request.params: ', req.params.review_id);
  let review_id = req.params.review_id;
  models.markReviewHelpful(review_id)
  .then(() => {
    res.status(204).send('Review marked as helpful!')
  })
  .catch((err) => {
    console.log('error marking review as helpful: ', err);
  })
}

const reportReview = (req, res) => {
  // console.log('request.params: ', req.params.review_id);
  let review_id = req.params.review_id;
  models.reportReview(review_id)
  .then(() => {
    res.status(204).send('Review reported')
  })
  .catch((err) => {
    console.log('error reporting review: ', err);
  })
}


module.exports.getReviews = getReviews;
module.exports.getReviewMeta = getReviewMeta;
module.exports.markReviewHelpful = markReviewHelpful;
module.exports.reportReview = reportReview;