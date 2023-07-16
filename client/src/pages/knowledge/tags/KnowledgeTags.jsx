import Box from '@mui/material/Box';
import { useQuery, gql } from '@apollo/client';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PostCategories from '../../../components/sections/PostCategories';
import loggedInUserQ from '../../../graphql/queries/loggedInUser';

function KnowledgeTags() {
  const {
    data: { currentUser },
  } = useQuery(loggedInUserQ);
  const { data, loading } = useQuery(gql`
    query Query {
      articlesTags
    }
  `);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 2 }}>
      <PostCategories
        data={data?.articlesTags}
        linkBase={
          currentUser !== 'user'
            ? '/agent/knowledge/tags'
            : '/customer/knowledge/tags'
        }
        loading={loading}
        title="Tags"
        icon={<LocalOfferIcon />}
      >
        Maecenas nec dui arcu. Donec posuere at sapien id scelerisque. Ut
        lacinia purus et porttitor convallis. Nullam vitae arcu ac velit congue
        euismod nec ac urna. Integer vel congue justo, rutrum faucibus neque.
        Fusce dictum in lectus non ultricies. Curabitur sit amet orci massa.
        Nullam non imperdiet nunc, ac malesuada orci. Phasellus mattis, neque
        vitae blandit condimentum, lectus nunc sagittis neque, feugiat suscipit
        nunc dolor et odio.
      </PostCategories>
    </Box>
  );
}
export default KnowledgeTags;
