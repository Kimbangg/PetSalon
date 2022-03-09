import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';

const BottomNav = () => {
  const { pathname: currentPath } = useLocation();

  return (
    <Wrapper>
      <StyledLink to="/">
        <NavHomeIcon color={currentPath === '/' ? '#F5C63E' : '#c4c4c4'} />
      </StyledLink>
      <StyledLink to="/search">
        <NavSearchIcon
          color={currentPath === '/search' ? '#F5C63E' : '#c4c4c4'}
        />
      </StyledLink>
      <StyledLink to="/write">
        <NavAddIcon color={currentPath === '/write' ? '#F5C63E' : '#c4c4c4'} />
      </StyledLink>
      <StyledLink to="/alarm">
        <NavNotifyIcon
          color={currentPath === '/alarm' ? '#F5C63E' : '#c4c4c4'}
        />
      </StyledLink>
      <StyledLink to="/edit/info">
        <NavInfoIcon
          color={currentPath === '/edit/info' ? '#F5C63E' : '#c4c4c4'}
        />
      </StyledLink>
    </Wrapper>
  );
};

export default BottomNav;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavHomeIcon = styled(HomeIcon)`
  color: ${({ color }) => color};
  height: 1.25rem;
  width: 1.25rem;
`;

const NavSearchIcon = styled(SearchIcon)`
  color: ${({ color }) => color};
  height: 1.25rem;
  width: 1.25rem;
`;

const NavAddIcon = styled(AddIcon)`
  color: ${({ color }) => color};
  height: 1.25rem;
  width: 1.25rem;
`;

const NavNotifyIcon = styled(NotificationsIcon)`
  color: ${({ color }) => color};
  height: 1.25rem;
  width: 1.25rem;
`;

const NavInfoIcon = styled(PetsIcon)`
  color: ${({ color }) => color};
  height: 1.25rem;
  width: 1.25rem;
`;

const Wrapper = styled.div`
  align-items: center;
  background-color: #f5f5f5;
  bottom: 0;
  display: flex;
  height: 3.375rem;
  justify-content: space-around;
  left: 0;
  position: fixed;
  right: 0;
  width: 100%;
  text-align: center;
`;
