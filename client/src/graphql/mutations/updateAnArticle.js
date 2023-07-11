import { gql } from '@apollo/client';

const updateAnArticle = gql`
  mutation Mutation($updatePost: updatePost!, $articleId: ID, $slug: String) {
    updateArticle(updatePost: $updatePost, articleId: $articleId, slug: $slug) {
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

export default updateAnArticle;
