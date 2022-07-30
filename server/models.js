const pool = require('../db/index.js');

console.log(pool.query);

const getReviews = (product_id, count, page, sort) => {
  // limit equals count
  // offset equals page*count
  let offset = count * page;
  if (sort === 'newest') {
    sort = 'reviews.date DESC';
  } else if (sort === 'helpful') {
    sort = `reviews.helpfulness DESC`;
  } else {
    sort = `reviews.date DESC, reviews.helpfulness DESC`;
  }
  let queryString = `SELECT reviews.id,
                      reviews.rating,
                      reviews.date,
                      reviews.summary,
                      reviews.body,
                      reviews.recommend,
                      reviews.reviewer_name,
                      reviews.reviewer_email,
                      reviews.response,
                      reviews.helpfulness,
                      json_agg( COALESCE (json_build_object('id', photos.id, 'url', photos.url), '[]')) AS photos
                      FROM reviews
                      LEFT JOIN photos ON reviews.id = photos.review_id
                      WHERE reviews.product_id = ${product_id}
                      AND reviews.reported = false
                      GROUP BY reviews.id
                      order by ${sort} offset ${offset} limit ${count}`;
  // pool.query(queryString, (err) => {
  //   console.log('query string: ', queryString);
  //   if(err) {
  //     console.log(err);
  //   }
  // })
  return pool.query(queryString);
}

const getReviewMeta = (product_id) => {
  // reviews table, characteristics table, characteristic_reviews table
  // get ratings -> reviews table
  // get recommended -> reviews table
  // get characteristics -> reviews table, chars table, char_reviews table

  let queryString = `SELECT json_build_object('1', COUNT(*) FILTER (WHERE reviews.rating = 1),
                                              '2', COUNT(1) FILTER (WHERE reviews.rating = 2),
                                              '3', COUNT(1) FILTER (WHERE reviews.rating = 3),
                                              '4', COUNT(1) FILTER (WHERE reviews.rating = 4),
                                              '5', COUNT(1) FILTER (WHERE reviews.rating = 5)
                                              ) AS ratings,
                     json_build_object('false', COUNT(*) FILTER (WHERE reviews.recommend = false),
                                       'true', COUNT(*) FILTER (WHERE reviews.recommend = true)
                                       ) AS recommend,

                     FROM reviews WHERE reviews.product_id = ${product_id}`;

  return pool.query(queryString);
}

module.exports.getReviews = getReviews;
module.exports.getReviewMeta = getReviewMeta;

