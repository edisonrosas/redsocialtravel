import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

function FollowButton({ userId, user, dispatch }) {
  const handleFollowCLick = () => {
    console.log(user)
    console.log("user id ", userId)

      dispatch(userActions.followUser(userId));
    

  };

  if (user._id === userId) {
    return null;
  }

  return user.followingIds.some(e => e === userId) ? (
    <Button
      className="btn profile-edit-btn"
      basic
      color="grey"
      onClick={handleFollowCLick}
      fluid
    >
      Dejar de Seguir
    </Button>
  ) : (
    <Button
      className="btn profile-edit-btn"
      primary
      onClick={handleFollowCLick}
      fluid
    >
      Seguir
    </Button>
  );
}

const mapStateToProps = state => ({
  user: state.user.data
});
const connectedFollowButton = connect(mapStateToProps)(FollowButton);
export { connectedFollowButton as FollowButton };
