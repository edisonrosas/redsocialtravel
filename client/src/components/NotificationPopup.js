import React from "react";
import {
  Popup,
  Grid,
  Card,
  Feed,
  Image,
  Divider,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { notificationActions } from "../actions/notificationActions";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/es'
dayjs.locale("es");
dayjs.extend(relativeTime);

function postLikeNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
   {sender[0].profilePicture === "person.png" ? (
 
                                   <Feed.Label
                                   image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
                                 />
                                  ) : (
                                    <Feed.Label
                                    image={sender[0].profilePicture}
                                  />
                                  )}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Le dio me gusta a tu </span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />

          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentLikeNotification({ _id, createdAt, sender, comment, post }) {
  return (
    <Feed.Event key={_id}>
         {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Le dio me gusta a tu comentario </span>{" "}
          {comment[0].text} <span style={{ fontWeight: "normal" }}>en</span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function likeCommentReplyNotification({ _id, createdAt, sender, reply, post }) {
  return (
    <Feed.Event key={_id}>
         {sender[0].profilePicture === "person.png" ? (
 
                                   <Feed.Label
                                   image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
                                 />
                                  ) : (
                                    <Feed.Label
                                    image={sender[0].profilePicture}
                                  />
                                  )}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Le dio me gusta a tu respuesta</span>{" "}
          {reply[0].text} <span style={{ fontWeight: "normal" }}>en</span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function postTaggedNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
         {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}> Te etiquetó en</span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentTaggedNotification({ _id, createdAt, sender, post }) {
  return (
    <Feed.Event key={_id}>
         {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Te mencionó en</span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function addCommentNotification({ _id, createdAt, sender, comment, post }) {
  return (
    <Feed.Event key={_id}>
         {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Comentó </span>{" "}
          {comment[0].text} <span style={{ fontWeight: "normal" }}>en</span>{" "}
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

function followNotification({ _id, createdAt, sender }) {
  return (
    <Feed.Event key={_id}>
        {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Te sigue ahora</span>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}

function commentReplyNotification({
  _id,
  createdAt,
  post,
  sender,
  reply,
  comment
}) {
  return (
    <Feed.Event key={_id}>
        {sender[0].profilePicture === "person.png" ? (
 
 <Feed.Label
 image={`https://cdn-icons-png.flaticon.com/512/711/711769.png`}
/>
) : (
  <Feed.Label
  image={sender[0].profilePicture}
/>
)}
      <Feed.Content>
        <Feed.Summary>
          <Feed.User as={Link} to={"/" + sender[0].username}>
            {sender[0].username}
          </Feed.User>{" "}
          <span style={{ fontWeight: "normal" }}>Respondio</span> {reply[0].text}{" "}
          <span style={{ fontWeight: "normal" }}>a</span> {comment[0].text}
          <span style={{ fontWeight: "normal" }}> en </span>
          <Link to={`/p/${post[0]._id}`}>Publicación</Link>
          <Feed.Date>{dayjs(createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra images>
          <Link to={`/p/${post[0]._id}`}>
            <Image
              rounded
              src={post[0].photo}
            />
          </Link>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

const NotificationPopup = ({
  dispatch,
  isOpen,
  children,
  notifications,
  allNotificationsCount
}) => {
  const notificationsFeed = notifications.map(notification => {
    if (notification.type === "like_post") {
      return postLikeNotification(notification);
    } else if (notification.type === "follow") {
      return followNotification(notification);
    } else if (notification.type === "post_comment") {
      return addCommentNotification(notification);
    } else if (notification.type === "comment_reply") {
      return commentReplyNotification(notification);
    } else if (notification.type === "comment_tagged") {
      return commentTaggedNotification(notification);
    } else if (notification.type === "post_tagged") {
      return postTaggedNotification(notification);
    } else if (notification.type === "like_commentReply") {
      return likeCommentReplyNotification(notification);
    } else {
      return commentLikeNotification(notification);
    }
  });
  const fetchData = () => {
    const lastId = notifications[notifications.length - 1]._id;
    dispatch(
      notificationActions.fetchNotifications({ initialFetch: false, lastId })
    );
  };
  return (
    <Popup
      trigger={children}
      on="click"
      position="top center"
      style={{ border: "none" }}
      open={isOpen}
    >
      <Grid centered divided columns="equal">
        <Card
          id="scrollableDiv"
          style={{ overflow: "auto", maxHeight: "300px" }}
        >
          <Card.Content>
            {" "}
            <InfiniteScroll
              dataLength={notificationsFeed.length} //This is important field to render the next data
              next={fetchData}
              scrollableTarget="scrollableDiv"
              hasMore={
                allNotificationsCount === notifications.length ? false : true
              }
              loader={<h4>Cargando...</h4>}
              endMessage={
                <Divider horizontal>
                  <Header as="h5">No hay más notificaciones</Header>
                </Divider>
              }
            >
              <Feed>{notificationsFeed} </Feed>
            </InfiniteScroll>
          </Card.Content>
        </Card>
      </Grid>
    </Popup>
  );
};

const mapStateToProps = state => ({
  isOpen: state.notification.isOpen,
  notifications: state.notification.notifications,
  allNotificationsCount: state.notification.allNotificationsCount
});

const connectNotificationPopup = connect(mapStateToProps)(NotificationPopup);
export { connectNotificationPopup as NotificationPopup };
