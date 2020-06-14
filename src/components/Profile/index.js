import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import ProfileForm from "./profile";

const ProfilePage = () => (
  <div>
    <ProfileHeader>Profile</ProfileHeader>
    <Profile />
  </div>
);

const ProfileHeader = styled.h1`
  text-align: center;
  margin: 0 auto;
`;

export class ProfileBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dbUser: null,
    };
  }

  componentDidMount() {
    this.loadUserFromDb();
  }

  loadUserFromDb = () => {
    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", (snapshot) => {
        this.setState({
          dbUser: snapshot.val(),
          loading: false,
        });
      });
  };

  onUserChange = (user) => {
    //TODO: Actually Update
    console.log("updating user");
    console.log(JSON.stringify(user));
    this.loadUserFromDb();
  };

  render() {
    const { id } = this.props.match.params;
    const { dbUser, isLoading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          !authUser ? (
            <div>Please Sign in</div>
          ) : isLoading || !dbUser ? (
            <div>Loading</div>
          ) : (
            <div>
              <ProfileForm
                user={dbUser}
                isAuthed={authUser && authUser.uid === id}
                onSubmitChange={this.onUserChange}
              />
            </div>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

const Profile = withRouter(withFirebase(ProfileBase));

export default ProfilePage;

export { Profile };
