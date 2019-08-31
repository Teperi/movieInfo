import React from "react";
import { Link, withRouter } from "react-router-dom";

import styled from "styled-components";

const Header = styled.header`
  color: #dfe6e9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${props => (props.current ? "#F9AA33" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export default withRouter(({ location: { pathname } }) => {
  return (
    <Header>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">Movies</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>
      </List>
    </Header>
  );
});
