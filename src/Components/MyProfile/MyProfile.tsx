import React, { Component, SyntheticEvent } from "react";
import MyProfileDisplay from "./MyProfileDisplay";
<<<<<<< HEAD
import styled from "styled-components";

interface MyProfileProps {
  sessionToken: any;
=======
import CreatePost from "./CreatePost";
import UpdateProfileModal from "./Displays/UpdateProfileModal";
import UserDetailsDisplay from "./Displays/UserDetailsDisplay";

interface MyProfileProps {
  sessionToken: any;
  isUserAdmin: boolean;
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
}

interface MyProfileState {
  name: string;
  animal: string;
  bio: string;
  gender: string;
<<<<<<< HEAD
  profile: [];
  postResults: [];
  userIdTest: number;
=======
  profile: any;
  postResults: [];
  userIdTest: number;
  editProfile: boolean;
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
}

const Title = styled.h3`
font-family: 'Krona One', sans-serif;
`
const Input = styled.input`
height: 50 px;
border-radius: 100px;
 background-color: #61C899;
 font-family: 'Krona One', sans-serif;
`
const Button = styled.button`
background-color: #61C899;
font-family: 'Krona One', sans-serif;
height: 25px;
border-radius: 100px;
color: white;

`


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
<<<<<<< HEAD
      userIdTest: 0
=======
      userIdTest: 0,
      editProfile: false
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    console.log("MyProfile mounted");
=======
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
    this.getPosts();
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
<<<<<<< HEAD
      // this.showMyProfile();
      this.getPosts();
      console.log(this.props.sessionToken);
      console.log(prevProps.sessionToken);
    } else {
      console.log(this.props.sessionToken);
      console.log(prevProps.sessionToken);
=======
      this.getMyProfile();
      this.getPosts();
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
    }
  }

  createProfile = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = "http://localhost:3000/profiles/create";
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
    let url = "http://localhost:3000/profiles/mine";
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
<<<<<<< HEAD
        this.setState({ profile: json });
=======
        this.setState({ profile: json[0] });
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
      })
      .catch(err => console.log("error ", err));
  };

  getPosts = () => {
    let url = "http://localhost:3000/posts/mine";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(json => {
<<<<<<< HEAD
        console.log(json);
        this.setState({ postResults: json });
        this.setState({ userIdTest: json[0].userId });
        console.log(json[0].userId);
=======
        this.setState({ postResults: json });
        this.setState({ userIdTest: json[0].userId });
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
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
<<<<<<< HEAD
=======
            isUserAdmin={this.props.isUserAdmin}
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
          />
        </div>
      );
    });
<<<<<<< HEAD
=======
  };

  submitProfileUpdate = (
    profileId: number,
    name: string,
    animal: string,
    gender: string,
    bio: string
  ) => {
    let url = `http://localhost:3000/profiles/${profileId}`;
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
    let url = `http://localhost:3000/profiles/${profileId}`;
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
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexFlow: "wrap column"
        }}
<<<<<<< HEAD
        >
        <Title>Create Profile
        </Title>
        <form onSubmit={e => this.createProfile(e)}>
          <Input
            type="text"
            value={this.state.name}
            name="name"
            placeholder="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Input
            type="text"
            value={this.state.animal}
            name="animal"
            placeholder="animal"
            onChange={e => this.setState({ animal: e.target.value })}
          />
          <Input
            type="text"
            value={this.state.bio}
            name="bio"
            placeholder="bio"
            onChange={e => this.setState({ bio: e.target.value })}
          />
          <Input
            type="text"
            value={this.state.gender}
            name="gender"
            placeholder="gender"
            onChange={e => this.setState({ gender: e.target.value })}
          />
          <Button>Update Profile(still need to update)</Button>
        </form>
        <Button onClick={() => this.showMyProfile()}>Show Profile</Button>
=======
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
>>>>>>> d924a530b2f39cf49e175d978b021ea5dcbfe0fd
        {this.displayPosts()}
      </div>
    );
  }
}

export default MyProfile;
