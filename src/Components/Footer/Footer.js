import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import './Footer.scss';

class Footer extends Component {

  render() {
    return (
      <footer className="Footer">
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Telegram:
          <Button variant="text" color="primary" component="a" href="tg://resolve?domain=kauzlein">@kauzlein</Button>
        </Typography>
      </footer>
    );
  }
}

export default Footer;
