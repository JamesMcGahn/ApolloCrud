import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
  });
  next();
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
