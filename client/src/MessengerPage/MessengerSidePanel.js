import React, { Component } from "react";
import { connect } from "react-redux";
import { chatActions } from "../actions/chatActions";

class MessengerSidePanel extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(chatActions.getChatRooms());
  };

  changeRoom = room => {
    const { dispatch } = this.props;
    dispatch(chatActions.changeRoom(room));
  };
  //room.members.filter(member => member._id !== user.data._id);
  handleSearch = e => {
    const {
      dispatch,
      rooms,
      user: { data }
    } = this.props;
    const users = rooms.filter(room => {
      const user = room.members.filter(member => member._id !== data._id);
      if (
        user[0].firstName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        user[0].lastName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        return room;
      }
      return null;
    });
    dispatch(chatActions.searchUsers(users));
  };

  render() {

    console.log(this.props)
    const { user, rooms, searchedRooms, roomId } = this.props;
    let renderRooms = searchedRooms ? searchedRooms : rooms;
   // console.log(render)
    const usersList = renderRooms.map(room => {
     // console.log(user.data._id)
     // console.log(room)

      const member = Object.keys(room.members).reduce(function (filtered, key) {
        //console.log(room.members[key])
        //console.log(room.members[key]._id)
       // console.log(room.members[key]._id !== user.data._id)
     //  console.log(user.data._id)
     //  console.log(room.memberskey)
   //  console.log(room.members[key]._id !== user.data._id)
        if (room.members[key]._id !== user.data._id) {
         // console.log(filtered[key])
         // console.log(user.data._id)
         //console.log(room.members[key])
          //console.log(room.members[key])
          filtered[key] = room.members[key]
          //console.log(filtered[key])

         /* return (
            <li
            className={room._id === roomId ? "contact active" : "contact"}
            key={room._id}
            onClick={() => this.changeRoom({ ...room, user: { ...room.members[key][0] } })}
          >
            <div className="wrap">
              <span
                className={`contact-status ${room.members[key].activityStatus}`}
              ></span>
              <img
                src={room.members[key].profilePicture}
                alt=""
              />
              <div className="meta">
                <p className="name">
                  {room.members[key].firstName + " " + room.members[key].lastName}
                </p>
                <p className="preview">{message}</p>
              </div>
            </div>
          </li>
          )*/

          return filtered[key];
          //console.log(filtered)
        }
        return filtered;
      }, {});
     
      console.log(member)
    
      //const result = room.members.filter(checkAdult);
      /*
      function checkAdult(age) {
        console.log(age)
        console.log(age._id !== user.data._id)
        return age._id !== user.data._id;
      }
      console.log(result)*/

      //console.log(filtered)
/*
      const membe = room.members.filter(
        member => {
          return member._id != user.data._id
        }
      )
      console.log(membe)*/

      let message = "...";
      if (room.lastMessage[0] && room.lastMessage[0].sender === user.data._id) {
        if (room.lastMessage[0].messageType === "text") {
          message = "Tú: " + room.lastMessage[0].text;
        } else {
          message = "You sent image ";
        }
      } else if (room.lastMessage[0]) {
        if (room.lastMessage[0].messageType === "text") {
          message = room.lastMessage[0].text;
        } else {
          message = "Image ";
        }
      }
      //return member
     
      if (member.username !== undefined){
        return (
          <li
            className={room._id === roomId ? "contact active" : "contact"}
            key={room._id}
            onClick={() => this.changeRoom({ ...room, user: { ...member } })}
          >
            <div className="wrap">
              <span
                className={`contact-status ${member.activityStatus}`}
              ></span>

{member.profilePicture=== "person.png" ? (
                                     <img
                                     src='https://cdn-icons-png.flaticon.com/512/711/711769.png'
                                     alt=""
                                   />
                                  
                                  ) : (
                                    <img
                                   src={member.profilePicture}
                                   alt=""
                                 />
                                  )}


              <div className="meta">
                <p className="name">
                  {member.username + " " + member.lastName}
                </p>
                <p className="preview">{message}</p>
              </div>
            </div>
          </li>
        );
      }
   
    });

    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src={user.data.profilePicture}
              className="online"
              alt=""
            />
            <p>{user.data.firstName + " " + user.data.lastName}</p>
            <i
              className="fa fa-chevron-down expand-button"
              aria-hidden="true"
            ></i>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span>
                  <p>Online</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span>
                  <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            placeholder="Search contacts..."
            onChange={this.handleSearch}
          />
        </div>
        <div id="contacts">
          <ul>{usersList.length ? usersList : "No users"}</ul>
        </div>
        <div id="bottom-bar">
          <button id="addcontact">
            <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
            <span>Add contact</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  rooms: state.chat.rooms,
  searchedRooms: state.chat.searchedRooms,
  roomId: state.chat.roomId
});

const connectedMessengerSidePanel = connect(mapStateToProps)(
  MessengerSidePanel
);
export { connectedMessengerSidePanel as MessengerSidePanel };
