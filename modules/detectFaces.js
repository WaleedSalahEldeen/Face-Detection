// the core module to basically perform face api operations on images
const faceapi = require('@vladmandic/face-api');
const extractFace = require('./extractFace');
let options;

module.exports = async (req) => {
  //START
  const image = req.file.buffer;
  const maxResults = req.query.limit * 1 || 10;
  const minConfidence = (req.body.minScore / 100) * 1 || 0.1;
  const inputSize = req.body.inputSize * 1 || 608;

  //1) set models options
  if (req.body.useTiny?.toLowerCase() === 'true') {
    options = new faceapi.TinyFaceDetectorOptions({
      inputSize,
      scoreThreshold: minConfidence,
    });
  } else {
    options = new faceapi.SsdMobilenetv1Options({
      minConfidence,
      maxResults,
    });
  }
  //2) decode binary buffer to rgb tensor
  const decodeT = faceapi.tf.node.decodeImage(image, 3);
  //3) add batch dimension to tensor
  const expandT = faceapi.tf.expandDims(decodeT, 0);

  //4) run detection
  const faces = await faceapi
    .detectAllFaces(expandT, options)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender()
    .withFaceDescriptors();

  //5) dispose tensors to avoid memory leaks
  faceapi.tf.dispose([decodeT, expandT]);

  //6) extract gender,accurancy,age and expression from data
  const data = faces.map(extractFace);

  const result = {
    results: faces.length,
    data,
  };

  return result;
};
