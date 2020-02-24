import React, { Component, SyntheticEvent } from "react";

interface MyProfileProps {
  sessionToken: any;
  userid: number;
}

interface MyProfileState {
  name: string;
  animal: string;
  bio: string;
  gender: string;
  profileActivity: [];
}

class MyProfile extends Component<MyProfileProps, MyProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      animal: "",
      bio: "",
      gender: "",
      profileActivity: []
    };
  }

  componentDidMount() {
    console.log("MyProfile mounted");
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      this.showMyProfile();
    }
    if (this.props.userid !== prevProps.userid) {
      this.showMyProfile();
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
        // this.setState({ profileActivity: json });
      })
      .catch(err => console.log("error ", err));
  };

  //Works but returns profile null?
  //   showMyActivity = () => {
  //     let url = `http://localhost:3000/profiles/${this.props.userid}`;
  //     fetch(url, {
  //       method: "GET",
  //       headers: new Headers({
  //         "Content-Type": "application/json",
  //         Authorization: this.props.sessionToken
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         console.log(json);
  //         this.setState({ profileActivity: json });
  //       })
  //       .catch(err => console.log("error ", err));
  //   };

  profileMapper = () => {
    return;
  };

  render() {
    return (
      <div>
        Create Profile
        <form onSubmit={e => this.createProfile(e)}>
          <input
            type="text"
            value={this.state.name}
            name="name"
            placeholder="name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            value={this.state.animal}
            name="animal"
            placeholder="animal"
            onChange={e => this.setState({ animal: e.target.value })}
          />
          <input
            type="text"
            value={this.state.bio}
            name="bio"
            placeholder="bio"
            onChange={e => this.setState({ bio: e.target.value })}
          />
          <input
            type="text"
            value={this.state.gender}
            name="gender"
            placeholder="gender"
            onChange={e => this.setState({ gender: e.target.value })}
          />
          <button>Create Profile</button>
        </form>
        {/* <button onClick={() => this.showMyActivity()}>Click</button> */}
        <hr />
      </div>
    );
  }
}

export default MyProfile;

const MyProfileDisplay = () => {
  return <div></div>;
};
