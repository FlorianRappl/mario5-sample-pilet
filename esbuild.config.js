module.exports = options => {
  options.loader['.ttf'] = 'file';
  return options;
};
