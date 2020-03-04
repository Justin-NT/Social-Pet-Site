import React, { Component, SyntheticEvent } from "react";
import FeedDisplay from "./Posting/FeedDisplay";

interface FeedProps {
  sessionToken: any;
  //   userid: number;
}

interface FeedState {
  posts: string[];
  body: any;
  comment: any;
  name: string;
  profile: any;
  userId: number;
  // postId: number;
}

export default class Feed extends Component<FeedProps, FeedState> {
  // constructor(props: any) {
  // super(props);
  state: FeedState = {
    // token: localStorage.getItem("token"),
    posts: [],
    body: "",
    comment: "",
    name: "",
    profile: "",
    userId: 0
    // postId: 0
  };

  newsFeed = () => {
    //   e.preventDefault();
    let url = "http://localhost:3000/posts/all";
    console.log(this.props.sessionToken);

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(posts => {
        console.log(posts.post);
        // this.setState({ postId: posts.id });
        // console.log(this.state.postId);
        this.setState({ posts: posts.post });
      })
      .catch(err => console.log("Error:", err));
  };

  findPet = () => {
    let url = `http://localhost:3000/profiles/${this.state.userId}`;
    console.log(this.state.userId);
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      })
    })
      .then(res => res.json())
      .then(profile => {
        console.log(profile[0].userId);
        console.log(profile[0].name);
        this.setState({ name: profile.name });
        console.log(profile.userId);
        this.setState({ profile: profile });
      })
      .catch(err => console.log("error:", err));
  };

  createPost = (e: SyntheticEvent) => {
    e.preventDefault();
    let url = "http://localhost:3000/posts/create";

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        body: this.state.body
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ userId: json.userId });
      })
      .then(() => {
        this.findPet();
        this.newsFeed();
      })

      .catch(err => console.log("Error: ", err));
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      this.newsFeed();
    } else {
      console.log(this.props.sessionToken);
    }
  }

  render() {
    return (
      <div>
        <h3>Post</h3>
        <form
          onSubmit={e => {
            this.createPost(e);
            this.newsFeed();
          }}
        >
          <input
            type="text"
            value={this.state.body}
            name="body"
            placeholder="body"
            onChange={e => this.setState({ body: e.target.value })}
          />
          <button>Create Post</button>
        </form>
        {this.state.posts.map(post => {
          return (
            <FeedDisplay
              post={post}
              newsFeed={this.newsFeed}
              sessionToken={this.props.sessionToken}
              petName={this.state.name}
              profile={this.state.profile}
              // postId={this.state.postId}
            />
          );
        })}
      </div>
    );
  }
  // }
}
// const FeedDisplay = () => {
//   return (
//     <div>
//       <Row>
//         <Column>
//           <Wrapper>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   alt="GuineaPig"
//                   height="180"
//                   src={Gunny}
//                   title="GuineaPig"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     Ginny the Guinea Pig
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   ></Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions>
//                 <Button size="small">Like</Button>
//                 <Button size="small">Comment</Button>
//               </CardActions>
//             </Card>
//           </Wrapper>
//         </Column>
//         <Column>
//           <Wrapper>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   alt="Piglet"
//                   height="180"
//                   src={Pig}
//                   title="Piglet"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     Wiglet the Piglet
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     {" "}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions>
//                 <Button size="small">Like</Button>
//                 <Button size="small">Comment</Button>
//               </CardActions>
//             </Card>
//           </Wrapper>
//         </Column>
//         <Column>
//           <Wrapper>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   alt="Kitty"
//                   height="180"
//                   src={Kitty}
//                   title="Kitty"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     Pretty the Kitty
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     component="p"
//                   >
//                     {" "}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions>
//                 <Button size="small">Like</Button>
//                 <Button size="small">Comment</Button>
//               </CardActions>
//             </Card>
//           </Wrapper>
//         </Column>
//       </Row>
//     </div>
//   );
// };
