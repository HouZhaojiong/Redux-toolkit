import { useAppSelector } from '@/hooks';
import { selectUserById } from '@/store/slice/usersSlice';

interface IProps {
  userId: string;
}

const PostAuthor = (props: IProps) => {
  const { userId } = props;

  const author = useAppSelector((state) => selectUserById(state, userId));

  return <div>by {author ? author.name : 'Unknown author'}</div>;
};

export default PostAuthor;
