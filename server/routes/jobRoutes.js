const express = require('express');
const router = express.Router();
const {
    getAllJobs,
    getJobStats,
    searchAllJobs
} = require('../controllers/jobController');

router.get('/jobs', getAllJobs);
router.get('/job-stats', getJobStats);
router.get('/search-jobs', searchAllJobs);

module.exports = router;
