import React, { Component } from "react";
import FeedDisplay from "./Posting/FeedDisplay";

interface FeedProps {
  //   sessionToken: any;
  //   userid: number;
}

interface FeedState {
  token: any;
  results: any;
}

export default class Feed extends Component<FeedProps, FeedState> {
  // constructor(props: any) {
  //   super(props);
  state: FeedState = {
    token: localStorage.getItem("token"),
    results: []
  };

  newsFeed = () => {
    //   e.preventDefault();
    let url = "http://localhost:3000/posts/all";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.state.token
      })
    })
      .then(res => res.json())
      .then(posts => {
        console.log(posts);
        this.setState({ results: posts });
      })
      .catch(err => console.log("Error:", err));
  };

  componentDidMount() {
    this.newsFeed();
  }

  render() {
    return (
      <div>
        {/* <FeedDisplay results=this.state.results /> */}
        <FeedDisplay results={this.state.results} />
      </div>
    );
  }
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
