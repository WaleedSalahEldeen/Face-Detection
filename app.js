const express = require('express');
const faceapi = require('@vladmandic/face-api');
const globalErrorHandler = require('./controllers/errorController');
const faceRouter = require('./routes/faceRoutes');
const AppError = require('./utils/appError');
const compression = require('compression');
const modelPath = `${__dirname}/node_modules/@vladmandic/face-api/model`;

const app = express();

//0) load models from a specific patch & call it in start
(async function () {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
})();

//1) handle main router & error and compression
app.use('/api/v1/', faceRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(compression());
app.use(globalErrorHandler);

module.exports = app;
