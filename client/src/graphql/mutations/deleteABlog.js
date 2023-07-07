import { gql } from '@apollo/client';

const deleteABlog = gql`
  mutation DeleteBlog($blogId: ID, $slug: String) {
    deleteBlog(blogId: $blogId, slug: $slug) {
      id
      slug
      title
    }
  }
`;

export default deleteABlog;
