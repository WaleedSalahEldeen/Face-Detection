module.exports = (face) => {
  // copy expression Object & exract the one with the most probability
  const copiedExpression = face.expressions;
  const expressions = Object.keys(copiedExpression).map((key) => {
    const value = copiedExpression[key];
    return value;
  });
  const max = Math.max(...expressions);
  const expression_value = Object.keys(copiedExpression).filter((key) => {
    return copiedExpression[key] === max;
  })[0];

  // return a formatted faceObject
  return {
    gender: face.gender,
    age: Math.round(face.age),
    expression: expression_value,
    genderAccurancy: Math.round(face.genderProbability * 10000) / 100,
    detectionScore: Math.round(face.detection._score * 10000) / 100,
  };
};
