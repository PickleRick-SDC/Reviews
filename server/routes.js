const router = require('express').Router();
const { getReviews, getReviewMeta, markReviewHelpful, reportReview } = require('./controller.js');

router.get('/', getReviews);
router.get('/meta', getReviewMeta);
// router.post('/', controller.postReview);
router.put('/:review_id/helpful', markReviewHelpful);
router.put('/:review_id/report', reportReview);

module.exports = router;