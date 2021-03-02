import React, { useState, useEffect } from "react";
import axios from "axios";

import "../pexels.css";
import { PexelKey } from "../../../config";

interface IVideos {
  video_files: {
    link: string;
  }[];
}

function RandomVideo() {
  const [videos, setVideos] = useState<IVideos[]>([]);

  const getVideos = async () => {
    try {
      const data = await axios.get(
        "https://api.pexels.com/videos/search?query=travel&size=small&per_page=30",
        {
          headers: {
            Authorization: `${PexelKey}`,
          },
        }
      );
      setVideos(data?.data?.videos);
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
      {videos?.length > 0 && (
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
