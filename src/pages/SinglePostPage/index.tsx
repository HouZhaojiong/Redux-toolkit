import { useParams, Link } from 'react-router-dom';
import PostAuthor from '@/components/PostAuthor';
import TimeAgo from '@/components/TimeAgo';
import ReactionButtons from '@/components/ReactionButtons';
// import { useAppSelector } from '@/hooks';
// import { selectPostById } from '@/store/slice/postsSlice';
import { useGetPostQuery } from '@/store/api/apiSlice';

const SinglePostPage = () => {
  const { postId } = useParams();

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId!);

  // const post = useAppSelector((state) => selectPostById(state, postId!));
  let content;

  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className='post-content'>{post.content}</p>
        <Link to={`/EditPostForm/${postId}`}>Edit Post</Link>
        <ReactionButtons post={post} />
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default SinglePostPage;
