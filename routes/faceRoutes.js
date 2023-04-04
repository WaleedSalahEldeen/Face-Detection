const express = require('express');
const router = express.Router();
const faceController = require(`${__dirname}/../controllers/faceController`);

router
  .route('/faces')
  .post(faceController.uploadPhoto, faceController.getFaces);
router.route('/face').post(faceController.uploadPhoto, faceController.getFace);

module.exports = router;
