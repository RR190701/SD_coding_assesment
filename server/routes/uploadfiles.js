//A private route that will be only
const express = require('express');
const router =  express.Router();
const { protect } = require('../middlewares/auth');
const { UploadFiles, getAllFiles } = require('../controllers/uploadfile');
// const upload = multer({ dest: './public/data/uploads/' });

router.route("/uploadFile").post(protect, UploadFiles);
router.route("/getAllFile/:username").get(protect, getAllFiles);
module.exports = router;