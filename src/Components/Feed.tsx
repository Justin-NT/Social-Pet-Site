import React, { Component } from "react";
import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface IProps {
  //   sessionToken: any;
  //   userid: number;
}

interface IState {
  token: any;
  results: any;
}

export default class Feed extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      results: []
    };
  }

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
        {this.state.results.map((result: any) => (
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {result.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {result.feeling}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {result.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">Like</Button>
              <Button size="small">Comment</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   width: 100%;
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// `;

// // const Background = styled.div`
// //     background: linear-gradient(to bottom, white, #e1e6e2);
// // `;

// const Wrapper = styled.div`
//   display: block;
//   margin: auto;
//   padding: 2em;
// `;

// // const useStyles = makeStyles({
// //   card: {
// //       maxWidth: 345,
// //       maxHeight: 450
// //   }
// // })

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
