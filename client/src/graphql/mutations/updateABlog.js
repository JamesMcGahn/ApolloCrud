import { gql } from '@apollo/client';

const updateABlog = gql`
  mutation Mutation($updatePost: updatePost!, $blogId: ID, $slug: String) {
    updateBlog(updatePost: $updatePost, blogId: $blogId, slug: $slug) {
      id
      title
      slug
      blurb
      content
      category
      tags
      author {
        id
        name
        email
        role
        isActive
      }
      type
      status
      isPrivate
      updatedAt
      createdAt
      featuredImage
    }
  }
`;

export default updateABlog;
