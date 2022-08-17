// import { useAppDispatch } from '@/hooks';
// import { IPost, IReactions, reactionAdded } from '@/store/slice/postsSlice';
import { IPost, IReactions } from '@/store/slice/postsSlice';
import { useAddReactionMutation } from '@/store/api/apiSlice';

interface IProps {
  post: IPost;
}

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

const ReactionButtons = (props: IProps) => {
  const { post } = props;

  // const dispatch = useAppDispatch();
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className='muted-button reaction-button'
        onClick={() =>
          // dispatch(
          //   reactionAdded({
          //     postId: post.id,
          //     reaction: name as keyof IReactions,
          //   })
          // )
          addReaction({ postId: post.id, reaction: name })
        }
      >
        {emoji} {post.reactions[name as keyof IReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
