import React, {Component} from 'react';
import styled from 'styled-components';
// import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Kitty from "../assets/kitty.jpeg";
import Gunny from "../assets/gunny.jpeg";
import Pig from "../assets/piglet.jpeg";

class Feed extends Component {
    // constructor(){
    //     super();
    //     this.state ={

    //     }
    // }
    render(){
        return(
            <div>
                <FeedDisplay />
            </div>
        )
    }
}




const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

// const Background = styled.div`
//     background: linear-gradient(to bottom, white, #e1e6e2);
// `;

const Wrapper = styled.div`
    display: block;
    margin: auto;
    padding: 2em;
`;

// const useStyles = makeStyles({
//   card: {
//       maxWidth: 345,
//       maxHeight: 450
//   }
// })

const FeedDisplay = ()  => {
    return(
        <div>
            <Row>
          <Column>
              <Wrapper>
                  <Card>
                      <CardActionArea>
                          <CardMedia component="img" alt="Joy Division" height="180" src={Gunny} title="Joy Division" />
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">Ginny the Guinea Pig</Typography>
                              <Typography variant="body2" color="textSecondary" component="p"></Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button size="small">Like</Button>
                          <Button size="small">Comment</Button>
                      </CardActions>
                  </Card>
              </Wrapper>
          </Column>
          <Column>
              <Wrapper>
                  <Card>
                      <CardActionArea>
                          <CardMedia
                          component="img"
                          alt="Piglet"
                          height="180"
                          src={Pig}
                          title="Dark Side of the Moon" />
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">Wiglet the Piglet</Typography>
                              <Typography variant="body2" color="textSecondary" component="p"> </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button size="small" >Like</Button>
                          <Button size="small" >Comment</Button>
                      </CardActions>
                  </Card>
              </Wrapper>
          </Column>
          <Column>
              <Wrapper>
                  <Card>
                      <CardActionArea>
                          <CardMedia
                          component="img"
                          alt="Abbey Road"
                          height="180"
                          src={Kitty}
                          title="Abbey Road" />
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">Pretty the Kitty</Typography>
                              <Typography variant="body2" color="textSecondary" component="p"> </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button size="small" >Like</Button>
                          <Button size="small" >Comment</Button>
                      </CardActions>
                  </Card>
              </Wrapper>
          </Column>
      </Row>

        </div>
    )
}

export default Feed;