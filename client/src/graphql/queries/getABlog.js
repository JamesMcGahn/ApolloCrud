import { gql } from '@apollo/client';

const getABlog = gql`
  query Blog($slug: String, $blogId: ID) {
    blog(slug: $slug, blogId: $blogId) {
      id
      title
      slug
      featuredImage
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
