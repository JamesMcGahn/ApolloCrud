import { gql } from '@apollo/client';

const deleteAnArticle = gql`
  mutation DeleteArticle($articleId: ID, $slug: String) {
    deleteArticle(articleId: $articleId, slug: $slug) {
      id
      slug
      title
    }
  }
`;

export default deleteAnArticle;
