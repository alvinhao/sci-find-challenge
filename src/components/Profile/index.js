import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import ProfileForm from "./profile";

const ProfilePage = () => (
  <div>
    <h1>Profile</h1>
    <Profile />
  </div>
);

class ProfileBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.state);
    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  render() {
    const { id } = this.props.match.params;
    const { user, isLoading } = this.state;
    return (
      <div>
        <AuthUserContext.Consumer>
          {(authUser) =>
            isLoading || !authUser || !user ? (
              <div>Loading</div>
            ) : (
              <ProfileForm
                user={user}
                isAuthed={authUser && authUser.uid === id}
              />
            )
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const Profile = withRouter(withFirebase(ProfileBase));

export default ProfilePage;

export { Profile };
