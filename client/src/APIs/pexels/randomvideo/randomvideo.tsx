import React, { useState, useMemo } from 'react';
import axios from 'axios';

import { PexelKey } from '../../../config';

function RandomVideo() {
  const [videos, setVideos]: any[] = useState({});

  const getVideos = async () => {
    axios
      .get(
        'https://api.pexels.com/videos/search?query=travel&size=small&per_page=30',
        {
          headers: {
            Authorization: `${PexelKey}`,
          },
        }
      )
      .then((data) => {
        setVideos(data.data.videos);
      });
  };

  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(29));
  }

  useMemo(() => {
    getVideos();
  }, []);

  return (
    <div>
      {videos.length && (
        <video
          width={window.screen.width}
          src={videos[getRandomInt()].video_files[0].link}
          autoPlay
          loop
          muted
        ></video>
      )}
    </div>
  );
}

export default RandomVideo;
