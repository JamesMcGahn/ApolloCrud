const createImages = async (req, res, next) => {
  console.log(req);
  console.log(req.user);
  console.log(req.params.slug);
  res.status('200').json({
    message: 'success',
  });
};

export { createImages };
