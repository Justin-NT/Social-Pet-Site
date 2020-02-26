import * as React from "react";
import { Link } from "react-router-dom";

interface PostProps {
  sessionToken: any; // Need to fix. Currently don't know how to input anything but any atm
}

interface PostState {
  title: string;
  feeling: string;
  body: string;
  postResults: [];
}

class Post extends React.Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);
    this.state = {
      title: "",
      feeling: "",
      body: "",
      postResults: []
    };
  }
  //   state = { title: "", feeling: "", body: "" };
  componentDidMount() {
    console.log("Post mounted");
  }

  //There was a bug with the component rendering before the prop of sessiontoken could be passed, so the post fetch wasnt rendering. This will fetch all of the users own posts on load
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      console.log("Component updated");
      this.getPosts();
    }
    //Arrays are copied by reference value and not actual value, so comparing the previous and current postResults will always bring back false. We have to use a function to compare
    // their contents instead
    // if (
    //   JSON.stringify(this.state.postResults) !==
    //   JSON.stringify(prevState.postResults)
    // ) {
    //   console.log(this.state.postResults);
    //   console.log(prevState.postResults);
    //   this.getPosts();
    // }
  }

  //Create a Post fetch
  submitPost = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("submitted");
    let url = "http://localhost:3000/posts/create";
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        title: this.state.title,
        feeling: this.state.feeling,
        body: this.state.body
      })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(() => this.getPosts())
      .catch(err => console.log("error", err));
  };

  //Find all posts for this user fetch
  getPosts = () => {
    console.log("Getting Posts");
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
      })
      .catch(err => console.log("error", err));
  };

  deletePost = (id: number) => {
    let url = `http://localhost:3000/posts/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: this.props.sessionToken
      })
    })
      .then(res => JSON.stringify(res))
      .then(json => {
        console.log("Post deleted", json);
      })
      .then(() => this.getPosts())
      .catch(err => console.log("error", err));
  };

  updatePost = (id: number) => {
    let url = `http://localhost:3000/posts/${id}`;
    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        title: this.state.title,
        feeling: this.state.feeling,
        body: this.state.body
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("Updated successfully", json);
        this.getPosts();
      })
      .catch(err => console.log("error: ", err));
  };

  //Map through posts and display them in a functional component
  postsMapper = () => {
    return this.state.postResults.map((post, index) => {
      return (
        <div key={index}>
          <PostDisplay
            post={post}
            bodyTest={this.state.body}
            deletePost={this.deletePost}
            updatePost={this.updatePost}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Link to="/myprofile">
          <span>Go to myprofile</span>
        </Link>
        <hr></hr>
        Posting
        <form onSubmit={e => this.submitPost(e)}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            type="text"
            name="reaction"
            placeholder="reaction"
            value={this.state.feeling}
            onChange={e => this.setState({ feeling: e.target.value })}
          />
          <input
            type="text"
            name="body"
            placeholder="body"
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          />
          <button>Post</button>
        </form>
        <br />
        <button onClick={() => this.getPosts()}>Get Posts in console</button>
        <hr />
        <h3>PostDisplay</h3>
        {this.postsMapper()}
      </div>
    );
  }
}

const PostDisplay = (props: any) => {
  return (
    <div>
      <p>Title: {props.post.title}</p>
      <p>Feeling: {props.post.feeling}</p>
      <p>Body: {props.post.body}</p>
      <button onClick={() => console.log(props.post.id)}>Click</button>
      <button onClick={() => props.deletePost(props.post.id)}>Delete</button>
      <button onClick={() => props.updatePost(props.post.id)}>Update</button>
      <hr />
    </div>
  );
};

export default Post;
