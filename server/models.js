const pool = require('../db/index.js');

console.log(pool.query);

const getReviews = async (product_id, count, page) => {
  // limit equals count
  // offset equals page*count
  let offset = count * page;
  let queryString = `SELECT reviews.id, reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommend,
  reviews.reported, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, photos.url
  FROM reviews JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = ${product_id} AND reviews.reported = false
  order by reviews.date offset ${offset} limit ${count}`;
  // pool.query(queryString, (err) => {
  //   console.log('query string: ', queryString);
  //   if(err) {
  //     console.log(err);
  //   }
  // })
  return await pool.query(queryString);
}

module.exports.getReviews = getReviews;