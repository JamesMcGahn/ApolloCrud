import { gql } from '@apollo/client';

const getBlogsSuggested = gql`
  query Query($slug: String!) {
    blogSuggested(slug: $slug) {
      id
      title
      slug
      blurb
      category
      featuredImage {
        url
        filename
      }
    }
  }
`;

export default getBlogsSuggested;
