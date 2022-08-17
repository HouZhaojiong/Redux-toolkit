import { useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
// import { useAppSelector, useAppDispatch } from '@/hooks';
// import { postUpdated, selectPostById } from '@/store/slice/postsSlice';
import { selectAllUsers } from '@/store/slice/usersSlice';
import { useGetPostQuery, useEditPostMutation } from '@/store/api/apiSlice';
import './style.less';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  // const post = useAppSelector((state) => selectPostById(state, postId!));
  const users = useAppSelector(selectAllUsers);
  // const dispatch = useAppDispatch();
  const { data: post } = useGetPostQuery(postId!);
  const [updatePost] = useEditPostMutation();

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [userId, setUserId] = useState(post?.user || '');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setUserId(event.target.value);

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const handleSavePostClicked = async () => {
    if (title && content) {
      // dispatch(
      //   postUpdated({
      //     id: postId!,
      //     title,
      //     content,
      //   })
      // );
      await updatePost({ id: postId!, title, content });
      setTitle('');
      setContent('');
      navigate(`/SinglePostPage/${postId}`);
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className='EditPostForm'>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={handleTitleChange}
        />

        <label htmlFor='postAuthor'>Author:</label>
        <select
          id='postAuthor'
          value={userId}
          onChange={handleUserChange}
          disabled
        >
          <option value=''></option>
          {usersOptions}
        </select>

        <label htmlFor='postContent'>Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={handleContentChange}
        />

        <button type='button' onClick={handleSavePostClicked}>
          Save Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
