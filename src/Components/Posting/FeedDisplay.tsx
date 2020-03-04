import React, { SyntheticEvent, Component } from "react";
// import Feed from "../Feed";
// import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";

// const styles = (theme: Theme )

interface FeedDisplayProps {
  post: any;
  newsFeed: any;
  sessionToken: string;
  petName: string;
  profile: any;
  // postId: number;
}

interface FeedDisplayState {
  //   onClick: (e : SyntheticEvent) => void;
  //   Row: any;
  //   Column: any;
  //   Wrapper: any;
  comment: any;
}

export default class FeedDisplay extends Component<
  FeedDisplayProps,
  FeedDisplayState
> {
  state: FeedDisplayState = {
    comment: ""
  };

  createComment = (e: SyntheticEvent, postId: number) => {
    e.preventDefault();
    let url = `http://localhost:3000/comments/create/${postId}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
      body: JSON.stringify({
        comment: this.state.comment
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.props.newsFeed(e);
      })
      .catch(err => console.log("Error:", err));
  };

  //   state: FeedDisplayState = {
  //     Row: "",
  //     Column: "",
  //     Wrapper: ""
  //   };
  //   this.Row = styled.div`
  //     display: flex;
  //     flex-direction: row;
  //     flex-wrap: wrap;
  //     width: 100%;
  //   `;

  //   this.Column = styled.div`
  //     display: flex;
  //     flex-direction: column;
  //     flex: 1;
  //   `;

  //   // const Background = styled.div`
  //   //     background: linear-gradient(to bottom, white, #e1e6e2);
  //   // `;

  //   Wrapper = styled.div`
  //     display: block;
  //     margin: auto;
  //     padding: 2em;
  //   `;

  //   // const useStyles = makeStyles({
  //   //   card: {
  //   //       maxWidth: 345,
  //   //       maxHeight: 450
  //   //   }
  //   // })

  // newComment = (e: SyntheticEvent, props: FeedDisplayProps) => {
  //   return (
  //     <modal>
  //       <form
  //         onSubmit={e => {
  //           props.newsFeed(e);
  //         }}
  //       >
  //         <Input
  //           type="text"
  //           value={this.state.comment}
  //           name="comment"
  //           placeholder="comment"
  //           onChange={e => this.setState({ comment: e.target.value })}
  //         />
  //         <Button size="small">Comment</Button>
  //       </form>
  //     </modal>
  //   );
  // };

  render() {
    return (
      <Card key={this.props.post.id}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h2" color="textSecondary" component="p">
              {this.props.petName}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {this.props.post.body}
            </Typography>

            {this.props.post.comments.map((comment: any) => (
              <Typography variant="body1" color="textSecondary" component="p">
                Comment: {comment.comment}
              </Typography>
            ))}
          </CardContent>
        </CardActionArea>
        <CardContent>
          {/* <Button size="small">Like</Button> */}
          <form
            onSubmit={(e: any) => {
              this.createComment(e, this.props.post.id);
              this.props.newsFeed(e);
            }}
          >
            <Input
              type="text"
              // value={""}
              name="comment"
              placeholder="comment"
              onChange={e => this.setState({ comment: e.target.value })}
            />
            <Button size="small" type="submit">
              Comment
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
