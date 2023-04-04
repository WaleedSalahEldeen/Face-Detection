const catchAsync = require('../utils/catchAsync');
const detectFaces = require('./../modules/detectFaces');
const detectFace = require('./../modules/detectFace');
const multer = require('multer');
const modelPath = './node_modules/@vladmandic/face-api/model';

// use multer to receive & handle uploaded image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! please upload only images.', 400), false);
  }
};

const upload = multer({ fileFilter: multerFilter });

exports.uploadPhoto = upload.single('photo');

//[multiple faces detection] Handle the received photo with help of face.js
exports.getFaces = catchAsync(async (req, res, next) => {
  const data = await detectFaces(req);
  res.status(200).json({
    status: 'succss',
    data,
  });
});

//[single face detection] Handle the received photo with help of face.js
exports.getFace = catchAsync(async (req, res, next) => {
  const data = await detectFace(req);
  res.status(200).json({
    status: 'success',
    data,
  });
});
