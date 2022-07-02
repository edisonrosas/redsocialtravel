import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Dimmer,
  Modal,
  List,
  Loader,
  Icon,
  Divider,
  Message
} from "semantic-ui-react";
import { userActions } from "../actions/userActions";

import Post from "../components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { FollowButton } from "../components/FollowButton";
import Messages from "../components/Messages";
import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
import FollowingFollowerList from "../components/FollowingFollowerList";

hashtag(linkify);
mention(linkify);

const linkifyOptions = {
  formatHref: function(href, type) {
    if (type === "hashtag") {
      href = "/hashtags/" + href.substring(1);
    }
    if (type === "mention") {
      href = "/" + href.substring(1);
    }
    return href;
  },
  attributes: {
    target: {
      url: "_blank"
    }
  }
};

class UserProfile extends Component {
  state = { username: "" };

  getFollowings = () => {
    const { dispatch, userProfileData } = this.props;
    dispatch(userActions.getUserProfileFollowings(userProfileData.data._id));
  };

  getFollowers = () => {
    const { dispatch, userProfileData } = this.props;
    dispatch(userActions.getUserProfileFollowers(userProfileData.data._id));
  };

  componentDidMount = () => {
    const { dispatch, userProfileData, match } = this.props;
    if (userProfileData.data.username !== match.params.username) {
      console.log("buscando")
      console.log()
      dispatch(userActions.getUserProfileData(match.params.username));
    }
  };

  fetchData = () => {
    const { dispatch, userProfileData } = this.props;
    const lastId =
      userProfileData.data.posts[userProfileData.data.posts.length - 1]._id;
     // console.log(userProfileData.data)
    dispatch(
    
      userActions.getUserPosts({ userId: userProfileData.data._id, lastId })
    );
  };

  render() {
    const { userProfileData, fetchingUserData, alert } = this.props;
    console.log(userProfileData.data)
    const hasMore =
      userProfileData.data.postsCount === userProfileData.data.posts.length
        ? false
        : true;
    if (alert.type) {
      return (
        <div className="container">
          <Messages alert={alert} />
        </div>
      );
    }
    if (userProfileData.loadingUser || fetchingUserData) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      const posts = userProfileData.data.posts.map(post => {
        return (
          <Modal
            key={post._id}
            size="small"
            trigger={
              <div className="gallery-item">
                <img
                  src={post.photo}
                  className="gallery-image"
                  alt=""
                />

                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <Icon name="heart" /> {post.likes}
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Commentarios:</span>
                      <Icon name="comment" /> {post.comments}
                    </li>
                  </ul>
                </div>
              </div>
            }
          >
            <Post
              post={{
                ...post,
                author: [
                  {
                    profilePicture: userProfileData.data.profilePicture,
                    username: userProfileData.data.username,
                    _id: userProfileData.data._id
                  }
                ]
              }}
            />
          </Modal>
        );
      });

      const followingList = userProfileData.data.follwingUsers.length
        ? userProfileData.data.follwingUsers.map(({ user }) => (
            <FollowingFollowerList
              key={user._id}
              user={user}
            ></FollowingFollowerList>
          ))
        : "Este usuario aún no sigue a nadie";

      const followerList = userProfileData.data.followerUsers.length
        ? userProfileData.data.followerUsers.map(({ user }) => (
            <FollowingFollowerList
              key={user._id}
              user={user}
            ></FollowingFollowerList>
          ))
        : "Sin seguidores";

      return (
        <Fragment>
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image">

                {userProfileData.data.profilePicture === "person.png" ? (
                                     <img
                                     src='https://cdn-icons-png.flaticon.com/512/711/711769.png'
                                     alt="foto_perfil.png"
                                   />
                                  
                                  ) : (
                                    <img
                                   src={userProfileData.data.profilePicture}
                                   alt="foto_perfil.png"
                                 />
                                  )}

     
                </div>

                <div className="profile-user-settings">
                  <h1 className="profile-user-name">
                    {userProfileData.data.username}
                  </h1>

                  <FollowButton
                    userId={userProfileData.data._id}
                  ></FollowButton>
                </div>

                <div className="profile-stats">
                  <ul>
                    <li>
                      <span className="profile-stat-count">
                        {userProfileData.data.postsCount}
                      </span>{" "}
                      Publicaciones
                    </li>
                    <Modal
                      trigger={
                        <li onClick={this.getFollowers}>
                          <span className="profile-stat-count">
                            {userProfileData.data.followers}
                          </span>{" "}
                          Seguidores
                        </li>
                      }
                    >
                      <Modal.Header>Seguidores</Modal.Header>
                      <Modal.Content scrolling>
                        <Modal.Description>
                          <List selection verticalAlign="middle" size="huge">
                            {followerList}
                          </List>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                    <Modal
                      trigger={
                        <li onClick={this.getFollowings}>
                          <span className="profile-stat-count">
                            {userProfileData.data.followings}
                          </span>{" "}
                          Siguiendo
                        </li>
                      }
                    >
                      <Modal.Header>Siguiendo</Modal.Header>
                      <Modal.Content scrolling>
                        <Modal.Description>
                          <List selection verticalAlign="middle" size="huge">
                            {followingList}
                          </List>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </ul>
                </div>

                <div className="profile-bio">
                  <div className="profile-real-name">
                    {userProfileData.data.firstName +
                      " " +
                      userProfileData.data.lastName}
                  </div>
                  <div className="profile-bio-description">
                    <Linkify options={linkifyOptions}>
                      {userProfileData.data.bio}
                    </Linkify>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              {userProfileData.data.postsCount === 0 ? (
                <Message info size="large">
                  Este usuario aún no hizo una publicación
                </Message>
              ) : (
                <InfiniteScroll
                  className="gallery"
                  dataLength={userProfileData.data.posts.length} //This is important field to render the next data
                  next={this.fetchData}
                  hasMore={hasMore}
                  loader={<h4>Cargando...</h4>}
                >
                  {posts}
                </InfiniteScroll>
              )}
            </div>
          </main>
          <Divider hidden></Divider>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  userProfileData: state.userProfile,
  fetchingUserData: state.user.loadingUser,
  user: state.user.data,
  alert: state.alert
});

const connectedProfilePage = connect(mapStateToProps)(UserProfile);
export { connectedProfilePage as default };
