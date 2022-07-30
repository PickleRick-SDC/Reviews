const router = require('express').Router();
const {getReviews, getReviewMeta} = require('./controller.js');

router.get('/', getReviews);
router.get('/meta', getReviewMeta);
// router.post('/', controller.postReview);
// router.put(':/review_id/helpful', controller.markReviewHelpful);
// router.put(':/review_id/report', controller.reportReview);

module.exports = router;