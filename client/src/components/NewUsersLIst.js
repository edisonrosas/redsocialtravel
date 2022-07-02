import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { List, Image, Dimmer, Loader, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/es';
dayjs.locale("es");
dayjs.extend(relativeTime);

class NewUsersList extends Component {
  componentDidMount = () => {
    const { dispatch, newUsers } = this.props;
    if (!newUsers.users.length) {
      dispatch(userActions.getNewUsers({ initialFetch: true }));
    }
  };

  fetchMoreUsers = () => {
    const {
      dispatch,
      newUsers: { users, fetchingNewUsers },
    } = this.props;

    if (!fetchingNewUsers) {
      const lastId = users[users.length - 1]._id;
      dispatch(userActions.getNewUsers({ initialFetch: false, lastId }));
    }
  };

  render() {
    const { newUsers, username } = this.props;

    const users = newUsers.users.map((user) => {
      return (
        <List.Item key={user._id}>
          {user.profilePicture === "person.png" ? (
                                   <Image
                                   avatar
                                   src='https://cdn-icons-png.flaticon.com/512/711/711769.png'
                                 />
                                  ) : (
                                    <Image
                                    avatar
                                    src={user.profilePicture}
                                  />
          )}

          
          <List.Content>
            <List.Header
              as={Link}
              to={user.username === username ? "/profile" : "/" + user.username}
            >
              {user.username}
            </List.Header>

            <span style={{ color: "#757575" }}>
               Conectado {dayjs(user.date).fromNow()}
            </span>
          </List.Content>
        </List.Item>
      );
    });
    return (
      <Fragment>
        <List size="big">
          {newUsers.fetching ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : null}
          {
            <List.Item>
              <List.Content>
                <List.Header> Todos los usuarios: {newUsers.usersCount}</List.Header>
              </List.Content>
            </List.Item>
          }
          {users}
          {newUsers.usersCount - newUsers.users.length !== 0 ? (
            <Button
              fluid
              loading={newUsers.fetchingNewUsers}
              onClick={() => this.fetchMoreUsers()}
            >
              Más usuarios
            </Button>
          ) : null}
        </List>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  newUsers: state.newUsers,
  username: state.user.data.username,
});

const connectedNewUsersList = connect(mapStateToProps)(NewUsersList);
export { connectedNewUsersList as NewUsersList };
