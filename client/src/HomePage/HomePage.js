import React, { Component } from "react";
import { connect } from "react-redux";
import Feed from "../components/Post/Feed";
import { NewUsersList } from "../components/NewUsersLIst";
import  { Navbar }  from "../components/Navbar";
//
class HomePage extends Component {
  componentDidMount = () => {
    console.log(this.props)
    document.title = "Viajes - Red Social";
  };

  render() {
    return (
      
      <div className="container" id="homepage-container">
        <div id="left-container" className="section">
          <NewUsersList></NewUsersList>
        </div>

        <div id="right">
        <Feed />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.post
});

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as default };
