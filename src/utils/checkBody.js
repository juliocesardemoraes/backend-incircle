const checkBody = (body) => {
  for (let i = 0; i < body.length; i++) {
    if (!body[i]) return false;
  }

  return true;
};

module.exports = { checkBody };
