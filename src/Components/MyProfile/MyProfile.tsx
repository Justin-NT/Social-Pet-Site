import React, { Component, SyntheticEvent } from "react";
import MyProfileDisplay from "./MyProfileDisplay";
import styled from "styled-components";

interface MyProfileProps {
  sessionToken: any;
}

interface MyProfileState {
  name: string;
  animal: string;
  bio: string;
  gender: string;
  profile: [];
  postResults: [];
  userIdTest: number;
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
      userIdTest: 0
    };
  }

  componentDidMount() {
    console.log("MyProfile mounted");
    this.getPosts();
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      // this.showMyProfile();
      this.getPosts();
      console.log(this.props.sessionToken);
      console.log(prevProps.sessionToken);
    } else {
      console.log(this.props.sessionToken);
      console.log(prevProps.sessionToken);
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

  showMyProfile = () => {
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
        this.setState({ profile: json });
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
        console.log(json);
        this.setState({ postResults: json });
        this.setState({ userIdTest: json[0].userId });
        console.log(json[0].userId);
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
          />
        </div>
      );
    });
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
        {this.displayPosts()}
      </div>
    );
  }
}

export default MyProfile;
