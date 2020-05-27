function paramsBuilder(validParams, body) {
  let params = {};
  validParams.forEach((attr) => {
    if (Object.prototype.hasOwnProperty.call(body, attr))
      // Buscar si en el objeto existe la propiedad
      params[attr] = body[attr];
  });
  return params;
};

module.exports = {
    paramsBuilder
}