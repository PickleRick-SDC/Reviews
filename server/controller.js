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

module.exports.getReviews = getReviews;