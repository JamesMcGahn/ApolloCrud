import Box from '@mui/material/Box';
import { useQuery, gql } from '@apollo/client';
import CustomerLayout from '../components/layout/CustomerLayout';
import PostCategories from '../components/sections/PostCategories';

function Categories() {
  const { data, loading } = useQuery(gql`
    query Query {
      blogsCategories
    }
  `);

  return (
    <CustomerLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
        <PostCategories
          data={data?.blogsCategories}
          linkBase="/blog/categories"
          loading={loading}
        >
          Maecenas nec dui arcu. Donec posuere at sapien id scelerisque. Ut
          lacinia purus et porttitor convallis. Nullam vitae arcu ac velit
          congue euismod nec ac urna. Integer vel congue justo, rutrum faucibus
          neque. Fusce dictum in lectus non ultricies. Curabitur sit amet orci
          massa. Nullam non imperdiet nunc, ac malesuada orci. Phasellus mattis,
          neque vitae blandit condimentum, lectus nunc sagittis neque, feugiat
          suscipit nunc dolor et odio.
        </PostCategories>
      </Box>
    </CustomerLayout>
  );
}
export default Categories;
