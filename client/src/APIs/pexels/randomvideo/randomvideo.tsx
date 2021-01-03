import React, { useState, useEffect } from 'react';
// TODO import axios from 'axios';

import '../pexels.css';
import { PexelKey } from '../../../config';

//  delete mock data
const data = require('./mockdata');

function RandomVideo() {
  const [videos, setVideos]: any[] = useState([]);

  const getVideos = async () => {
    try {
      console.log(data);

      //  use
      // const data = await axios.get(
      //   'https://api.pexels.com/videos/search?query=travel&size=small&per_page=30',
      //   {
      //     headers: {
      //       Authorization: `${PexelKey}`,
      //     },
      //   }
      // );
      // setVideos(data.data.videos);
      setVideos(data.videos);
    } catch (e) {
      console.log(e);
    }
  };

  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(29));
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      {videos.length && (
        <video
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
