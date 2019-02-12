import React, { Component } from 'react';
import './Main.scss';
import Cars from '../Cars/Cars';

class Main extends Component {

  render() {
    return (
      <main className="Main">
        <Cars/>
      </main>
    );
  }
}

export default Main;
