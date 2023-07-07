import { gql } from '@apollo/client';

const createABlog = gql`
  mutation CreateBlog($newPost: newPost) {
    createBlog(newPost: $newPost) {
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

export default createABlog;
