import React, { Component, SyntheticEvent } from "react";
import MyProfileDisplay from "./MyProfileDisplay";
// import styled from "styled-components";
import CreatePost from "./CreatePost";
import UpdateProfileModal from "./Displays/UpdateProfileModal";
import UserDetailsDisplay from "./Displays/UserDetailsDisplay";
import APIURL from '../../helpers/environment';

interface MyProfileProps {
  sessionToken: any;
  isUserAdmin: boolean;
}

interface MyProfileState {
  name: string;
  animal: string;
  bio: string;
  gender: string;
  profile: any;
  postResults: [];
  userIdTest: number;
  editProfile: boolean;
}

// const Title = styled.h3`
//   font-family: "Krona One", sans-serif;
// `;
// const Input = styled.input`
//   height: 50 px;
//   border-radius: 100px;
//   background-color: #61c899;
//   font-family: "Krona One", sans-serif;
// `;
// const Button = styled.button`
//   background-color: #61c899;
//   font-family: "Krona One", sans-serif;
//   height: 25px;
//   border-radius: 100px;
//   color: white;
// `;

class MyProfile extends Component<MyProfileProps, MyProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      animal: "",
      bio: "",
      gender: "",
      profile: [],
      postResults: [],
      userIdTest: 0,
      editProfile: false
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      this.getMyProfile();
      this.getPosts();
    }
  }

  createProfile = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = `${APIURL}/profiles/create`;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        name: this.state.name,
        animal: this.state.animal,
        bio: this.state.bio,
        gender: this.state.gender
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(err => console.log("error: ", err));
  };

  getMyProfile = () => {
    let url = `${APIURL}/profiles/mine`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ profile: json[0] });
      })
      .catch(err => console.log("error ", err));
  };

  getPosts = () => {
    let url = `${APIURL}/posts/mine`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ postResults: json });
        this.setState({ userIdTest: json[0].userId });
      })
      .catch(err => console.log("error", err));
  };

  displayPosts = () => {
    return this.state.postResults.map((post: any) => {
      return (
        <div key={post.id}>
          <MyProfileDisplay
            post={post}
            sessionToken={this.props.sessionToken}
            getPosts={this.getPosts}
            userIdTest={this.state.userIdTest}
            isUserAdmin={this.props.isUserAdmin}
          />
        </div>
      );
    });
  };

  submitProfileUpdate = (
    profileId: number,
    name: string,
    animal: string,
    gender: string,
    bio: string
  ) => {
    let url = `${APIURL}/profiles/${profileId}`;
    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        name: name,
        animal: animal,
        gender: gender,
        bio: bio
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.getMyProfile();
        this.closeUpdateProfileModal();
      })
      .catch(err => console.log("Error: ", err));
  };

  editProfileSwitch = () => {
    this.setState({ editProfile: !this.state.editProfile });
  };

  closeUpdateProfileModal = () => {
    this.setState({ editProfile: false });
  };

  deleteProfile = (profileId: number) => {
    let url = `${APIURL}/profiles/${profileId}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(() => console.log("Profile deleted"))
      .then(() => this.getMyProfile())
      .catch(err => console.log("ERROR: ", err));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexFlow: "wrap column"
        }}
      >
        {this.state.profile !== [] ? (
          <UserDetailsDisplay
            profile={this.state.profile}
            deleteProfile={this.deleteProfile}
            editProfileSwitch={this.editProfileSwitch}
          />
        ) : null}
        <CreatePost
          sessionToken={this.props.sessionToken}
          getPosts={this.getPosts}
        />
        {this.state.editProfile ? (
          <UpdateProfileModal
            submitProfileUpdate={this.submitProfileUpdate}
            closeModal={this.closeUpdateProfileModal}
            profile={this.state.profile}
          />
        ) : null}
        {this.displayPosts()}
      </div>
    );
  }
}

export default MyProfile;
