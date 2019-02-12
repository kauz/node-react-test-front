import React, { Component } from 'react';
import { AppBar, Toolbar, Typography }from '@material-ui/core';

class Header extends Component {

  render() {
    return (
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Car list with filtering
            </Typography>
          </Toolbar>
        </AppBar>
    );
  }
}

export default Header;
