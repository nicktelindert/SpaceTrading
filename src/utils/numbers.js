const generateMinMaxNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
};

export {generateMinMaxNumber};
