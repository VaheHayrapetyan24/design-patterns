module.exports = (functionToThunkify) => {
  return function() {
      const outerArguments = [].slice.call(arguments);
      return function(callback) {
          functionToThunkify(...outerArguments, callback);
      }
  }
};
