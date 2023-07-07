import { gql } from '@apollo/client';

const getABlog = gql`
  query Query($blogId: ID, $slug: String) {
    blog(blogId: $blogId, slug: $slug) {
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

export default getABlog;
