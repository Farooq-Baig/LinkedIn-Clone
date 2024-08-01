import styled from "styled-components";
import LinkedinImage from "../images/LinkedIn-image.png";
import HeroImg from "../images/Hero-Section.png";
import GoogleImg from "../images/Google.webp";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  if (props.user) {
    return <Navigate to="/home" replace={true} />;
  }

  const handleSignIn = () => {
    console.log("Google Sign-In button clicked");
    props.signIn();
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <Logo src={LinkedinImage} alt="LinkedIn" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <HeroImage src={HeroImg} alt="Hero" />
        </Hero>
        <Form>
          <Google onClick={handleSignIn}>
            <GoogleLogo src={GoogleImg} alt="Google" />
            <span>Sign in with Google</span>
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
`;

const Nav = styled.div`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (min-width: 768px) {
    margin: auto;
    min-height: 0;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
`;

const HeroImage = styled.img`
  width: 700px;
  height: 670px;
  position: absolute;
  bottom: -285px;
  right: -130px;
  border-radius: 700px;
  @media (max-width: 768px) {
    top: 230px;
    width: initial;
    position: initial;
    height: initial;
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px #ccc;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  height: 56px;
  line-height: 1.5;
  padding: 0 24px;
  width: 100%;
  span {
    margin-left: 10px;
  }
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
