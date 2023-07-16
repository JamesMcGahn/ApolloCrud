import { gql } from '@apollo/client';

const getAllBlogs = gql`
  query Blogs(
    $category: String
    $tag: String
    $page: Int
    $status: postStatusType
  ) {
    blogs(category: $category, tag: $tag, page: $page, status: $status) {
      hasNextPage
      hasPrevPage
      limit
      nextPage
      page
      posts {
        updatedAt
        title
        tags
        id
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
        createdAt
      }
      prevPage
      totalDocs
    }
  }
`;

export default getAllBlogs;
