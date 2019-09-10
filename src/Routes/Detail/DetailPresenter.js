import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link, Route } from "react-router-dom";
import DetailVideos from "./DetailVideos";
import DetailCompanies from "./DetailCompanies";
import DetailCollection from "./DetailCollection";

const Container = styled.div`
  margin-top: 10px;
  height: calc(100vh - 55px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;

  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Button = styled.a``;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 85%;
`;

const InsideMenu = styled("div")`
  margin-top: 20px;
`;

const List = styled("ul")`
  display: flex;
`;

const ItemLink = styled("li")`
  margin-right: 20px;
  text-transform: uppercase;
  font-size: 18px;
  border-top: 1px solid rgba(223, 230, 233);
  border-left: 1px solid rgba(223, 230, 233);
  border-right: 1px solid rgba(223, 230, 233);
  border-bottom: ${props => (props.active ? "transparent" : "1px solid rgba(223, 230, 233);")};
  font-weight: 600;
  padding: 5px;
  z-index: 2;
  position: relative;
  border-radius: 3px 3px 0 0;
  background-color: ${props => (props.active ? "rgba(223, 230, 233)" : "transparent")};
  color: ${props => (props.active ? "#232f34" : "#dfe6e9")};
`;

const DetailPresenter = ({ result, error, loading, isMovie, location: { pathname } }) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require("../../assets/320px-NULL.jpg")
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/320px-NULL.jpg")
          }
        />
        <Data>
          <Title>
            {result.original_title ? result.original_title : result.original_name}{" "}
            <Button href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">
              <img
                src={require("../../assets/IMDb.png")}
                alt="IMDb Button"
                style={{ height: "20px" }}
              />
            </Button>
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {isMovie ? (result.runtime ? result.runtime : "-") : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <InsideMenu>
            <List>
              {isMovie ? (
                <>
                  <ItemLink active={pathname === `/movie/${result.id}/videos`}>
                    <Link to={`/movie/${result.id}/videos`}>Videos</Link>
                  </ItemLink>
                  <ItemLink active={pathname === `/movie/${result.id}/production`}>
                    <Link to={`/movie/${result.id}/production`}>Production Info</Link>
                  </ItemLink>
                  <ItemLink active={pathname === `/movie/${result.id}/collection`}>
                    <Link to={`/movie/${result.id}/collection`}>Collection</Link>
                  </ItemLink>
                </>
              ) : (
                <>
                  <ItemLink active={pathname === `/show/${result.id}/videos`}>
                    <Link to={`/show/${result.id}/videos`}>Videos</Link>
                  </ItemLink>
                  <ItemLink active={pathname === `/show/${result.id}/production`}>
                    <Link to={`/show/${result.id}/production`}>Production Info</Link>
                  </ItemLink>
                  <ItemLink active={pathname === `/show/${result.id}/seasons`}>
                    <Link to={`/show/${result.id}/seasons`}>seasons</Link>
                  </ItemLink>
                </>
              )}
            </List>
          </InsideMenu>
          {isMovie ? (
            <>
              <Route path="/movie/:id/videos" component={DetailVideos} />
              <Route path="/movie/:id/production" component={DetailCompanies} />
              <Route path="/movie/:id/collection" component={DetailCollection} />
            </>
          ) : (
            <>
              <Route path="/show/:id/videos" component={DetailVideos} />
              <Route path="/show/:id/production" component={DetailCompanies} />
              <Route path="/show/:id/seasons" component={DetailCollection} />
            </>
          )}
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
