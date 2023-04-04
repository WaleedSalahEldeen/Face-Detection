// the core module to basically perform face api operations on images
const faceapi = require('@vladmandic/face-api');
const extractFace = require('./extractFace');
let options;

module.exports = async (req) => {
  //START
  const image = req.file.buffer;
  const inputSize = req.body.inputSize * 1 || 608;
  //1) set models options
  if (req.body.useTiny?.toLowerCase() === 'true') {
    options = new faceapi.TinyFaceDetectorOptions({
      inputSize,
    });
  } else {
    options = new faceapi.SsdMobilenetv1Options();
  }
  //2) decode binary buffer to rgb tensor
  const decodeT = faceapi.tf.node.decodeImage(image, 3);
  //3) add batch dimension to tensor
  const expandT = faceapi.tf.expandDims(decodeT, 0);
  console.log('sd');
  //4) run detection
  const face = await faceapi
    .detectSingleFace(expandT, options)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

  //5) dispose tensors to avoid memory leaks
  faceapi.tf.dispose([decodeT, expandT]);

  //6) extract gender,accurancy,age and expression from data
  if (!face) {
    return { data: null };
  }
  const data = extractFace(face);

  const result = {
    data,
  };

  return result;
};
