import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AddPostForm from '@/components/AddPostForm';
import PostAuthor from '@/components/PostAuthor';
import TimeAgo from '@/components/TimeAgo';
import ReactionButtons from '@/components/ReactionButtons';
import Spinner from '@/components/Spinner';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  fetchPosts,
  selectPostIds,
  selectPostById,
} from '@/store/slice/postsSlice';

interface IProps {
  postId: string;
}

const PostExcerpt = (props: IProps) => {
  const { postId } = props;
  const post = useAppSelector((state) => selectPostById(state, postId))!;

  return (
    <div className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className='post-content'>{post.content.substring(0, 30)}</p>
      <Link to={`/SinglePostPage/${post.id}`}>View Post</Link>
      <ReactionButtons post={post} />
    </div>
  );
};

const PostList = () => {
  const orderedPostIds = useAppSelector(selectPostIds);
  const dispatch = useAppDispatch();

  const flag = useRef(false);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle' && !flag.current) {
      flag.current = true;
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text='Loading...' />;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId as string} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <AddPostForm />
      {content}
    </div>
  );
};

export default PostList;

// import { Link } from 'react-router-dom';
// import AddPostForm from '@/components/AddPostForm';
// import PostAuthor from '@/components/PostAuthor';
// import TimeAgo from '@/components/TimeAgo';
// import ReactionButtons from '@/components/ReactionButtons';
// import Spinner from '@/components/Spinner';
// import { IPost } from '@/store/slice/postsSlice';
// import { useGetPostsQuery } from '@/store/api/apiSlice';

// interface IProps {
//   post: IPost;
// }

// const PostExcerpt = (props: IProps) => {
//   const { post } = props;

//   return (
//     <div className='post-excerpt' key={post.id}>
//       <h3>{post.title}</h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className='post-content'>{post.content.substring(0, 30)}</p>
//       <Link to={`/SinglePostPage/${post.id}`}>View Post</Link>
//       <ReactionButtons post={post} />
//     </div>
//   );
// };

// const PostList = () => {
//   const {
//     data: posts = [],
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetPostsQuery();
//   console.log(useGetPostsQuery());

//   let content;

//   if (isLoading) {
//     content = <Spinner text='Loading...' />;
//   } else if (isSuccess) {
//     content = posts.map((post: any) => (
//       <PostExcerpt key={post.id} post={post} />
//     ));
//   } else if (isError) {
//     content = <div>{error.toString()}</div>;
//   }

//   return (
//     <div>
//       <h2>Posts</h2>
//       <AddPostForm />
//       {content}
//     </div>
//   );
// };

// export default PostList;
