import { useNavigate } from 'react-router';
import { apiUrl } from '../js/App';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const useUpvote = (requestedSong, user) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [likes, setLikes] = useState(requestedSong.upvotes_count);
  const [isUpvoted, setIsUpvoted] = useState(requestedSong.is_upvoted_by);
  const [isLoading, setIsLoading] = useState(false);

  const upvote = () => {
    const requestedSongId = requestedSong.id;
    const intialStateUpvote = isUpvoted;
    const intialStateLikes = likes;
    if (!user) {
      navigate('/login');
    }

    if (isLoading) return;

    setIsLoading(true);
    axios
      .post(`${apiUrl}/${id}/songs/${requestedSongId}/upvote`)
      .catch(() => {
        setIsUpvoted(intialStateUpvote);
        setLikes(intialStateLikes);
      })
      .finally(() => setIsLoading(false));

    setIsUpvoted(!isUpvoted);
    isUpvoted ? setLikes(likes - 1) : setLikes(likes + 1);
  };

  return {
    upvote,
    isUpvoted,
    likes,
  };
};
