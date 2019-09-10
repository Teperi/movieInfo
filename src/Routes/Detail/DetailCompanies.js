import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { moviesApi, tvApi } from "../../api";
import Loader from "../../Components/Loader";
import { flag } from "country-emoji";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(223, 230, 233, 0.3);
  border: 1px solid rgba(223, 230, 233);
  padding: 10px;
  top: -1px;
  position: relative;
  z-index: 1;
`;
const ItemContainer = styled.div`
  display: flex;
`;

const Divider = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #111111;
`;

const ImageItem = styled.img`
  margin: 20px;
  height: 60px;
  object-fit: cover;
`;

const Item = styled.span`
  margin: 20px;
  font-size: 20px;
`;

const Text = styled.p`
  color: #111111;
  font-size: 28px;
  padding: 10px 0;
  font-weight: 800;
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
      ) : (
        <>
          <Text>Production Companies</Text>
          <ItemContainer>
            {data.production_companies.map(company => (
              <ImageItem
                key={company.id}
                src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                alt={company.name}
              />
            ))}
          </ItemContainer>
          <Divider />
          {isMovie ? (
            <>
              <Text>Production Countries</Text>
              <ItemContainer>
                {data.production_countries.map(country => (
                  <Item key={country.iso_3166_1}>{flag(country.name)}</Item>
                ))}
              </ItemContainer>
            </>
          ) : (
            <>
              <Text>Origin Countries</Text>
              <ItemContainer>
                {data.origin_country.map(country => (
                  <Item key={country}>{flag(country)}</Item>
                ))}
              </ItemContainer>{" "}
            </>
          )}
        </>
      )}
    </Section>
  );
};

export default DetailCompanies;
