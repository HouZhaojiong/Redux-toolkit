import { useState, ChangeEvent } from 'react';
// import { useAppSelector, useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks';
// import { addNewPost } from '@/store/slice/postsSlice';
import { selectAllUsers } from '@/store/slice/usersSlice';
import { useAddNewPostMutation } from '@/store/api/apiSlice';
import './style.less';

const AddPostForm = () => {
  const users = useAppSelector(selectAllUsers);
  // const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  // const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setUserId(event.target.value);

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const handleSavePostClicked = async () => {
    // const canSave =
    //   [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
    const canSave = [title, content, userId].every(Boolean) && !isLoading;
    if (canSave) {
      try {
        // setAddRequestStatus('pending');
        // await dispatch(addNewPost({ title, content, user: userId })).unwrap();
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.log(error);
      } finally {
        // setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className='AddPostForm'>
      <h2>Add a New Post</h2>
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
        <select id='postAuthor' value={userId} onChange={handleUserChange}>
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

export default AddPostForm;
