import React, { Component } from "react";
// import PetFinderKey from "../../helpers/environment";
// import PetFinderSecret from "../../helpers/environment";

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], bearerToken: "" };
  }

  requestTest = () => {
    let url = `https://api.petfinder.com/v2/oauth2/token?grant_type=client_credentials&client_id=${PetFinderKey}&client_secret=${PetFinderSecret}`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "text-plain"
      })
    })
      .then(ret => console.log(ret))
      .catch(err => console.log("error", err));
  };

  adoptFetch = () => {
    let url = "https://api.petfinder.com/v2/animals?type=dog&page=2";
    let bearer =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY5NDY3ODI2NDRiYWQxNmE5Yjk5NDFlYTI3OWJiMTA4YWUwNWZlZDI1OTJlYzE0MDU4Y2EyODVmODExZTRiMzlkY2Q4YjQ1NzUwYWNlZTEyIn0.eyJhdWQiOiJRWUtPUkNiS3RFUmdDUzV5Y09DRDZxQ2c2dXhRVTJkdVhWNnJDVm91OEV2TUNmbEV3YyIsImp0aSI6ImY5NDY3ODI2NDRiYWQxNmE5Yjk5NDFlYTI3OWJiMTA4YWUwNWZlZDI1OTJlYzE0MDU4Y2EyODVmODExZTRiMzlkY2Q4YjQ1NzUwYWNlZTEyIiwiaWF0IjoxNTgxODA3Mzc4LCJuYmYiOjE1ODE4MDczNzgsImV4cCI6MTU4MTgxMDk3OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.pUSLGbPzUtF2d7U-RPoPPavo685OqHFbjnbSyAzRtvYVlW4TRiNBxBRKlgV8nELHMHkc4iLfjQ-_gcex0kLeFAh8RpSeAo9CPi4lJ-IXg7gAvJl4gzX2QFycteJ6tC7aERYJ4-MAZtNJU8-Kk5qE4ruZwpr_kLYvuL-bQOOhVTXrvMBFP8lolbhO53pACkXjzzEY6rbUPasuyvz3seFrFQrkloryEU8VT5Ak48zFsb4DBltSrLXHGW7QSDWfB6MU-3OF1SLzU0FmAshWVReOBwD6ywMiQVxgwxIHXvf5-4-ZNQDjNWAmzmI_ZdvKf1rZgCWRjQQYeSorNGTcueYBkQ";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${bearer}`
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ results: json.animals });
      });
  };

  componentDidMount() {
    // this.adoptFetch();
    this.requestTest();
  }

  render() {
    return <div>Adopt Component</div>;
  }
}

export default Adopt;
