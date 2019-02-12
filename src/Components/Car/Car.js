import React, {Component} from 'react';
import {Card, CardContent, CardActions, CardActionArea, CardMedia, Typography, Button} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import "./Car.scss"


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class Car extends Component {

  render() {
    let name = `${this.props.manufacturer} ${this.props.carModel} (${this.props.year})`;

    return (
      <Card className='Car'>
        <CardActionArea>
          <CardMedia
            image={this.props.picture}
            title={name}
            className="Car-Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet tellus venenatis,
              tempus metus id, posuere urna.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Car);
