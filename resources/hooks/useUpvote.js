import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useUpvote = (requestedSong) => {
  const { company } = useStore();
  const intialStateLikes = requestedSong.upvotes_count;
  const intialStateUpvote = requestedSong.is_upvoted_by;
  const [likes, setLikes] = useState(intialStateLikes);
  const [isUpvoted, setIsUpvoted] = useState(intialStateUpvote);
  const [isLoading, setIsLoading] = useState(false);

  const upvote = () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsUpvoted(!isUpvoted);
    isUpvoted ? setLikes(likes - 1) : setLikes(likes + 1);

    return axios
      .post(`${apiUrl}/${company.slug}/songs/${requestedSong.id}/upvote`)
      .catch((error) => {
        setIsUpvoted(intialStateUpvote);
        setLikes(intialStateLikes);

        return {
          error: error.response.data.error,
          message: error?.response?.data?.message,
        };
      })
      .finally(() => setIsLoading(false));
  };

  return {
    upvote,
    isUpvoted,
    likes,
  };
};
