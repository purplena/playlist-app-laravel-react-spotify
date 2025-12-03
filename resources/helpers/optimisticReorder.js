export function optimisticReorder(updatedSongId, setRequestedSongs) {
  setRequestedSongs((prevSongs) => {
    const newList = prevSongs.map((song) => {
      if (song.id === updatedSongId) {
        if (song.is_upvoted_by) {
          return {
            ...song,
            upvotes_count: song.upvotes_count - 1,
            is_upvoted_by: false,
          };
        }
        return {
          ...song,
          upvotes_count: song.upvotes_count + 1,
          is_upvoted_by: true,
        };
      }
      return song;
    });

    newList.sort((a, b) => b.upvotes_count - a.upvotes_count);

    return newList;
  });
}
