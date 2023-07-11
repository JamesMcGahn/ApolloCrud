import { gql } from '@apollo/client';

const getAnArticle = gql`
  query Query($articleId: ID, $slug: String) {
    article(articleId: $articleId, slug: $slug) {
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

export default getAnArticle;
