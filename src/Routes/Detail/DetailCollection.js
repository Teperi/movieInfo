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
  z-index: 1;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageItem = styled.img`
  margin: 20px 20px 0;
  height: 300px;
  object-fit: cover;
`;

const Title = styled.span`
  padding-top: 4px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
`;

const DetailCompanies = ({
  location: { pathname },
  match: {
    params: { id },
  },
}) => {
  const isMovie = pathname.includes("movie");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data: result } = isMovie
        ? await moviesApi.movieDetail(id)
        : await tvApi.showDetail(id);
      setData(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Section>
      {loading ? (
        <Loader />
      ) : isMovie && data.belongs_to_collection ? (
        <ItemContainer>
          <Item>
            <ImageItem
              src={`https://image.tmdb.org/t/p/original/${data.belongs_to_collection.poster_path}`}
              alt={data.belongs_to_collection.name}
            />
            <Title>{data.belongs_to_collection.name}</Title>
          </Item>
        </ItemContainer>
      ) : !isMovie && data.seasons.length > 0 ? (
        <ItemContainer>
          {data.seasons.map(season => (
            <Item key={season.id}>
              <ImageItem
                src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                alt={season.name}
              />
              <Title>{season.name}</Title>
            </Item>
          ))}
        </ItemContainer>
      ) : (
        "No Collections"
      )}
    </Section>
  );
};

export default DetailCompanies;
