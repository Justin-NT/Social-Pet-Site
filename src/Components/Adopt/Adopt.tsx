import React, { Component } from "react";
// import PetFinderKey from "../../helpers/environment";
// import PetFinderSecret from "../../helpers/environment";
let PetFinderKey = "QYKORCbKtERgCS5ycOCD6qCg6uxQU2duXV6rCVou8EvMCflEwc";
let PetFinderSecret = "sZgS6xKAiUeB90YgkAB3gStLG3qU6XlWnqY6YjCM";

interface adoptState {
  results: object;
  bearerToken: string;
}

class Adopt extends Component<{}, adoptState> {
  constructor(props: any) {
    super(props);
    this.state = { results: [], bearerToken: "" };
  }

  // state: adoptState = {
  //   results: [],
  //   bearerToken: ""
  // };

  requestTest = () => {
    let url = "https://api.petfinder.com/v2/oauth2/token";
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      }),
      body: `grant_type=client_credentials&client_id=${PetFinderKey}&client_secret=${PetFinderSecret}`
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ bearerToken: data.access_token });
      })
      .catch(err => console.log("error", err));
  };

  adoptFetch = () => {
    let url = "https://api.petfinder.com/v2/animals?type=dog&page=2";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.state.bearerToken}`
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ results: json.animals });
      });
  };

  componentDidMount() {
    this.requestTest();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.bearerToken !== prevState.bearerToken) {
      this.adoptFetch();
    }
  }

  render() {
    return <div>Adopt Component</div>;
  }
}

export default Adopt;
