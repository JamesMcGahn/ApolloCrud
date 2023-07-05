import { gql } from '@apollo/client';

const getAllBlogs = gql`
  query Blogs($page: Int, $category: String, $status: postStatusType) {
    blogs(page: $page, category: $category, status: $status) {
      posts {
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
      totalDocs
      limit
      page
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
  }
`;

export default getAllBlogs;
