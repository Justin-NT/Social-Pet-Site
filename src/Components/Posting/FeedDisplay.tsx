import * as React from "react";
import Feed from "../Feed";
import styled from "styled-components";
// import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface FeedDisplayProps {
  results: any;
}

interface FeedDisplayState {}

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

const FeedDisplay = (props: FeedDisplayProps) => {
  return props.results.map((result: any) => (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {result.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
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
  ));
};

export default FeedDisplay;
