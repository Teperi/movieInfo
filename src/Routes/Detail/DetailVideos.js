import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { moviesApi, tvApi } from "../../api";
import Loader from "../../Components/Loader";

const Section = styled.div`
  display: flex;
  background-color: rgba(223, 230, 233, 0.3);
  border: 1px solid rgba(223, 230, 233);
  padding: 10px;
  top: -1px;
  position: relative;
  z-index: 1;
`;

const VideoListContainer = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
`;

const VideoTitle = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  color: #232f34;
  text-align: center;
  text-decoration: none;
  border: 1px solid rgba(223, 230, 233);
  background-color: ${props => (props.active ? "rgba(223, 230, 233)" : "transparent")};
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Item = styled.iframe`
  margin: 10px;
  flex-basis: 60%;
`;

const DetailVideos = ({
  location: { pathname },
  match: {
    params: { id },
  },
}) => {
  const isMovie = pathname.includes("movie");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [selectVideo, setSelectVideo] = useState(null);

  const getVideos = async () => {
    try {
      const {
        data: { results },
      } = isMovie ? await moviesApi.getVideos(id) : await tvApi.getVideos(id);
      setVideos(results);
      setSelectVideo(results[0].key);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Section>
      {loading ? (
        <Loader />
      ) : videos.length !== 0 ? (
        <>
          <Item
            width="480"
            height="320"
            src={`https://www.youtube.com/embed/${selectVideo}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></Item>
          <VideoListContainer>
            {videos.map(video => {
              if (video.site === "YouTube") {
                return (
                  <VideoTitle
                    key={video.id}
                    onClick={() => setSelectVideo(video.key)}
                    active={selectVideo === video.key}>
                    {video.name}
                  </VideoTitle>
                );
              }
            })}
          </VideoListContainer>
        </>
      ) : (
        "Don't Find Videos"
      )}
    </Section>
  );
};

export default DetailVideos;
