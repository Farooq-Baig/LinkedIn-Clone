import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI } from "../actions";
import User from "../images/User.webp";
import Photo from "../images/Photo.png";
import Video from "../images/Video.png";
import Event from "../images/Photo.png";
import ArticleImg from "../images/Article.png";
import Ellipsis from "../images/Ellipsis.jpg";
import Like from "../images/Like.png";
import Clap from "../images/Clap.png";
import Comments from "../images/Comments.png";
import ShareImg from "../images/Share.jpg";
import Send from "../images/Send.png";
import PostModel from "./postModel";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModel, setShowModel] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, [props]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowModel(showModel === "close" ? "open" : "close");
  };

  return (
    <>
      {props.articles && props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              <img src={props.user.photoURL} width="50px" />
              <button onClick={handleClick}>Start a post</button>
            </div>
            <div>
              <button>
                <img src={Photo} alt="Photo" width="20px" height="auto" />
                <span>Photo</span>
              </button>
              <button>
                <img src={Video} alt="Video" width="20px" height="auto" />
                <span>Video</span>
              </button>
              <button>
                <img src={Event} alt="Event" width="20px" height="auto" />
                <span>Event</span>
              </button>
              <button>
                <img
                  src={ArticleImg}
                  alt="Write article"
                  width="20px"
                  height="auto"
                />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <div>
            {props.articles && props.articles.length > 0 ? (
              props.articles.map((article, index) => (
                <Article key={index}>
                  <SharedActor>
                    <a href="#">
                      <img src={article.actor.image || User} alt="" />{" "}
                      {/* Fallback image */}
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {new Date(
                            article.actor.date.seconds * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src={Ellipsis} alt="Options" width="30px" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  {article.SharedImage || article.video ? (
                    <SharedImg>
                      <a>
                        {article.video && !article.SharedImage ? (
                          <ReactPlayer width={"100%"} url={article.video} />
                        ) : (
                          article.SharedImage && (
                            <img
                              src={article.SharedImage}
                              alt="Shared content"
                            />
                          )
                        )}
                      </a>
                    </SharedImg>
                  ) : null}
                  <SocialCounts>
                    <li>
                      <button>
                        <img src={Like} alt="Like" width="15px" />
                        <img src={Clap} alt="Clap" width="15px" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{`${article.comments} Comments`}</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src={Like} alt="Like" width="15px" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src={Comments} alt="Comment" width="15px" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src={ShareImg} alt="Share" width="15px" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src={Send} alt="Send" width="15px" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
          <PostModel showModel={showModel} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 70px;
      height: 50px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: #fff;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background-color: #fff;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
  articles: state.articleState.articles, // Ensure the property name is correct
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
