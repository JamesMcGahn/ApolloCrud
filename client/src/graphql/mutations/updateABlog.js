import { gql } from '@apollo/client';

const updateABlog = gql`
  mutation Mutation($updatePost: updatePost!, $blogId: ID, $slug: String) {
    updateBlog(updatePost: $updatePost, blogId: $blogId, slug: $slug) {
      id
      title
      slug
      featuredImage {
        url
        filename
      }
      images {
        url
        filename
      }
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
    }
  }
`;

export default updateABlog;
