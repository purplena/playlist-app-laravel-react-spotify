import { useNavigate, useLocation } from 'react-router';
import { apiUrl } from '../js/App';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '../js/useUserStore';
import axios from 'axios';

export const useSongAdd = (song, setOpen, setModalMessage, setModalHeader) => {
  const [isAdded, setIsAdded] = useState(song.is_requested);
  const [isLoading, setIsLoading] = useState(false);
  const intialStateIsAdded = isAdded;
  const navigate = useNavigate();
  const { id } = useParams();
  const spotifyId = song.spotify_id;
  const { user } = useUserStore();
  const location = useLocation();

  const addSong = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    }

    if (song.is_requested) {
      setModalHeader('Oooooups!');
      setModalMessage('Cette chanson a été déjà suggérée!');
      setOpen(true);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    axios
      .post(`${apiUrl}/${id}/songs/${spotifyId}/store`, [
        {
          spotifyId,
        },
      ])
      .then((response) => {
        if (response.data.status === 'added') {
          setModalHeader('BRAVO!');
        } else {
          setModalHeader("C'EST FAIT!");
        }
        setModalMessage(response.data.message);
        setOpen(true);
      })
      .catch((error) => {
        if (error.response.data.error === 'forbidden') {
          setIsAdded(isAdded);
          setModalHeader('Oooooups!');
          setModalMessage(error.response.data.message);
          setOpen(true);
        } else if (error.response.data.error === 'blacklisted') {
          setIsAdded(isAdded);
          setModalHeader('Oooooups!');
          setModalMessage(error.response.data.message);
          setOpen(true);
        } else {
          setIsAdded(isAdded);
          setModalHeader('Oooooups!');
          setModalMessage(error.response.data.message);
          setOpen(true);
        }
        setIsAdded(intialStateIsAdded);
      })
      .finally(() => setIsLoading(false));

    setIsAdded(!isAdded);
  };

  return {
    addSong,
    isAdded,
  };
};
