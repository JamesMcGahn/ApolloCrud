import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import convert2FullDateTime from '../utils/convert2FullDateTime';

function Comment({ comment }) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {`${comment.author.name}`[0].toUpperCase()}
          </Avatar>
        }
        action={
          <Chip
            label={comment.author.role}
            color={comment.author.role === 'user' ? 'success' : 'primary'}
          />
        }
        title={comment.author.email}
        subheader={convert2FullDateTime(comment.createdAt)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
