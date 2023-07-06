import pify from 'pify';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Post from '../models/Post.mjs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'apolloTickets',
    allowedFormats: ['jpeg', 'png', 'jpg', 'gif'],
  },
});

const upload = pify(multer({ storage }).array('images'));

const updateImages = async (req, res, next) => {
  if (!req.user || req.user.role === 'user') {
    res.status(401).json({
      success: false,
      message: 'You are not allowed to upload images.',
    });
    return;
  }

  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    res
      .status(400)
      .json({ success: false, message: 'We cannot find that Post.' });
    return;
  }

  try {
    await upload(req, res);

    if (
      (!req.files || req.files.length === 0) &&
      (!req.body.delete || req.body.delete.length === 0)
    ) {
      res
        .status(400)
        .json({ success: false, message: 'Please provide atleast 1 Image.' });
      return;
    }
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((image) => ({
        url: image.path,
        filename: image.filename,
      }));
      post.images.push(...newImages);
      post.featuredImage.url = newImages[0].url;
      post.featuredImage.filename = newImages[0].filename;
      await post.save();
    }
    if (req.body.delete) {
      const deleteImages = [...req.body.delete];

      if (post.featuredImage && post.featuredImage.filename) {
        if (deleteImages.includes(post.featuredImage.filename)) {
          post.featuredImage.filename = null;
          post.featuredImage.url = null;
          await post.save();
        }
      }

      await post.updateOne({
        $pull: { images: { filename: { $in: deleteImages } } },
      });
      const results = deleteImages.map(async (pic) => {
        return await cloudinary.uploader.destroy(pic);
      });

      await Promise.all(results);
    }
    return res.status(201).send({ success: true, message: 'Images uploaded.' });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: 'Something went wrong. Try again.' });
  }
};

// trunk-ignore(eslint/import/prefer-default-export)
export { updateImages };
