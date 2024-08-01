import styled from "styled-components";
import LinkedinImg from "../images/LinkedIn-logo.webp";
import Icon from "../images/search-icon.png";
import HomeIcon from "../images/Home.png";
import Network from "../images/Network.png";
import Jobs from "../images/Job.png";
import Messages from "../images/Messages.jpg";
import Notification from "../images/Notification.png";
import Arrow from "../images/Arrow.png";
import UserImg from "../images/User.webp";
import Bento from "../images/Menu.png";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="#">
            <img src={LinkedinImg} alt="LinkedIn Logo" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src={Icon} alt="Search Icon" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="#">
                <img src={HomeIcon} alt="Home Icon" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a href="#">
                <img src={Network} alt="Network Icon" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a href="#">
                <img src={Jobs} alt="Jobs Icon" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a href="#">
                <img src={Messages} alt="Messages Icon" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a href="#">
                <img src={Notification} alt="Notification Icon" />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a href="#">
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src={UserImg} alt="User" className="User" />
                )}
                <span>
                  Me
                  <img src={Arrow} alt="Dropdown Arrow" className="Arrow" />
                </span>
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a href="#">Sign Out</a>
              </SignOut>
            </User>
            <Menu>
              <a href="#">
                <img src={Bento} alt="Menu" className="Bento" />
                <span>
                  Work
                  <img src={Arrow} alt="Dropdown Arrow" className="Arrow" />
                </span>
              </a>
            </Menu>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1128px;
  margin: 0 auto;
`;

const Logo = styled.div`
  margin-right: 8px;
  img {
    width: 40px;
    height: auto;
    margin: 5px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
  max-width: 280px;

  input {
    width: 100%;
    padding: 0 8px 0 40px;
    line-height: 1.75;
    font-size: 14px;
    height: 34px;
    border: none;
    border-radius: 2px;
    background-color: #eef3f8;
    color: rgba(0, 0, 0, 0.9);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  img {
    width: 16px;
    height: 16px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  list-style: none;
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  margin-right: 20px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);

    &:hover {
      color: rgba(0, 0, 0, 0.9);
    }

    .active {
      border-bottom: 3px solid rgba(0, 0, 0, 0.9);
    }

    img {
      width: 25px;
      margin-bottom: 4px;
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0 0 5px 5px;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100px;
  font-size: 14px;
`;

const User = styled(NavList)`
  position: relative;

  .User {
    width: 35px;
    border-radius: 50%;
  }

  .Arrow {
    width: 10px;
    margin-left: 4px;
  }

  .Bento {
    width: 30px;
  }

  &:hover ${SignOut} {
    display: flex;
  }
`;

const Menu = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
