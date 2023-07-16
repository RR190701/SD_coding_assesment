//A private route that will be only
const express = require('express');
const router =  express.Router();
const { protect } = require('../middlewares/auth');
const { UploadFiles, getAllFiles, shareFile, getAllSharedFiles, viewFile } = require('../controllers/uploadfile');
// const upload = multer({ dest: './public/data/uploads/' });

router.route("/uploadFile").post(protect, UploadFiles);
router.route("/getAllFile").get(protect, getAllFiles);
router.route("/getAllSharedFile").get(protect, getAllSharedFiles);
router.route("/viewFile/:username/:fileName").get(protect, viewFile);
router.route("/shareFile").post(protect, shareFile );

module.exports = router;