import Markdown from 'markdown-to-jsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green, blue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import convert2FullDateTime from '../../utils/convert2FullDateTime';

function Comment({
  comment,
  agent = false,
  convertInternal,
  tixStatus = 'Closed',
}) {
  const handleClickInternal = () => {
    if (convertInternal) {
      convertInternal(comment.id);
    }
  };

  return (
    <Card sx={{ backgroundColor: comment.private ? 'yellow' : '' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: comment.author.role === 'user' ? green[500] : blue[500],
            }}
            aria-label="recipe"
          >
            {`${comment.author.name}`[0].toUpperCase()}
          </Avatar>
        }
        action={
          <>
            {!comment.private && tixStatus !== 'Closed' && agent && (
              <Chip
                label="Convert to Private Comment"
                onClick={handleClickInternal}
                sx={{ marginRight: '5px' }}
              />
            )}
            <Chip
              label={comment.author.role}
              color={comment.author.role === 'user' ? 'success' : 'primary'}
            />
          </>
        }
        title={comment.author.email}
        subheader={convert2FullDateTime(comment.createdAt)}
      />
      <CardContent>
        <Markdown>{comment.content}</Markdown>
      </CardContent>
    </Card>
  );
}

export default Comment;
